import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Initialize Gemini Client safely
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    hasGeminiKey: Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY'),
  });
});

// Generate dynamic Judge Questions
app.post('/api/judge/questions', async (req, res) => {
  try {
    const { pitch, round } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.status(200).json({ source: 'fallback', message: 'No Gemini API key available, using smart local engine.' });
    }

    const systemInstruction = `You are a Shark Tank simulator AI generating questions for 4 sharks judging a startup pitch.
The 4 sharks are:
1. "Mark 'The Titan' Sterling" (Venture Capitalist): Focus on Total Addressable Market (TAM), scalability, viral expansion, 10x ROI.
2. "Elena 'The Operator' Vance" (Serial Founder): Focus on execution, CAC/LTV, founder resilience, friction points, team experience.
3. "David 'The End-User' Miller" (Target Customer): Focus on product usability, pricing, real-world utility, daily adoption habits.
4. "Victoria 'The Treasury' Chen" (Angel Investor): Focus on profitability, unit economics, cash burn rate, defensible moat, EBITDA margins.

Round: ${round || 1}. Generate exactly ONE specific, sharp, realistic question per judge based on the startup pitch provided.

Return strict JSON array with 4 items:
[
  { "judgeId": "vc", "question": "..." },
  { "judgeId": "founder", "question": "..." },
  { "judgeId": "customer", "question": "..." },
  { "judgeId": "angel", "question": "..." }
]`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: `Startup Pitch Details:
Startup Name: ${pitch.startupName}
Problem: ${pitch.problemStatement}
Solution: ${pitch.solution}
Revenue Model: ${pitch.revenueModel}
Target Audience: ${pitch.targetAudience}
Funding Ask: $${pitch.fundingAskAmount?.toLocaleString()} for ${pitch.equityOffered}% equity ($${pitch.valuation?.toLocaleString()} valuation)`,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              judgeId: { type: Type.STRING },
              question: { type: Type.STRING },
            },
            required: ['judgeId', 'question'],
          },
        },
      },
    });

    const text = response.text || '[]';
    const parsed = JSON.parse(text);
    return res.json({ source: 'gemini', questions: parsed });
  } catch (err: any) {
    console.error('Error generating questions with Gemini:', err?.message || err);
    return res.status(200).json({ source: 'fallback', error: err?.message });
  }
});

// Generate dynamic Judge Reaction & Evaluation
app.post('/api/judge/evaluate', async (req, res) => {
  try {
    const { pitch, qnaHistory } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.status(200).json({ source: 'fallback', message: 'No Gemini API key available, using smart local engine.' });
    }

    const systemInstruction = `You are the master AI Shark Tank Evaluation Engine.
Analyze the startup pitch and the founder's Q&A answers.
Evaluate the pitch across 5 dimensions (0 to 20 points each, totaling 100):
1. marketPotential (0-20)
2. innovation (0-20)
3. businessModel (0-20)
4. execution (0-20)
5. investmentWorthiness (0-20)

Also generate:
- overallScore (sum of 5 criteria)
- outcome: one of "invest", "reject", "acquire", "come_back_later"
- valuation: suggested valuation in USD
- fundingAmount: USD offered
- equityPercent: % equity demanded
- reasoning: summary of the investment decision rationale
- offersPerJudge: Object mapping each judgeId ("vc", "founder", "customer", "angel") to:
  {
    "outcome": "invest" | "reject" | "acquire" | "come_back_later",
    "offer": string (e.g. "$500,000 for 12% equity" or "Out"),
    "reasoning": string,
    "quote": string (shark catchphrase)
  }
- judgeScores: Object mapping each judgeId to:
  {
    "marketPotential": number,
    "innovation": number,
    "businessModel": number,
    "execution": number,
    "investmentWorthiness": number,
    "totalScore": number,
    "commentary": string
  }`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: `PITCH:
Startup Name: ${pitch.startupName}
Problem: ${pitch.problemStatement}
Solution: ${pitch.solution}
Revenue Model: ${pitch.revenueModel}
Target Audience: ${pitch.targetAudience}
Funding Ask: $${pitch.fundingAskAmount} for ${pitch.equityOffered}% equity

Q&A RESPONSES FROM FOUNDER:
${JSON.stringify(qnaHistory, null, 2)}`,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
      },
    });

    const text = response.text || '{}';
    const parsed = JSON.parse(text);
    return res.json({ source: 'gemini', evaluation: parsed });
  } catch (err: any) {
    console.error('Error evaluating pitch with Gemini:', err?.message || err);
    return res.status(200).json({ source: 'fallback', error: err?.message });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
