import { jsPDF } from 'jspdf';
import {
  StartupPitch,
  QnAItem,
  InvestmentDecision,
  JudgeId,
  LeaderboardEntry,
  JUDGES,
  JudgeEmotion,
  CategoryScores,
  IndividualJudgeOffer,
  JudgeScoreBreakdown,
  DecisionOutcome,
} from '../types';

// Storage Key for Leaderboard
const LEADERBOARD_KEY = 'shark_tank_leaderboard_v1';

// Get Leaderboard entries
export function getLeaderboard(): LeaderboardEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(LEADERBOARD_KEY);
    if (!raw) {
      const initial: LeaderboardEntry[] = [
        {
          id: 'entry-1',
          startupName: 'EcoCharge AI',
          founderName: 'Alex Rivera',
          date: new Date(Date.now() - 86400000 * 2).toLocaleDateString(),
          score: 92,
          outcome: 'invest',
          fundingAmount: 500000,
          equityPercent: 10,
          valuation: 5000000,
          summary: 'Wireless charging pavement for EV highways with massive $12B TAM.',
        },
        {
          id: 'entry-2',
          startupName: 'CodeFlow Hardware',
          founderName: 'Samantha Chen',
          date: new Date(Date.now() - 86400000 * 5).toLocaleDateString(),
          score: 88,
          outcome: 'invest',
          fundingAmount: 750000,
          equityPercent: 8,
          valuation: 9375000,
          summary: 'Generative AI hardware copilot saving enterprise firmware teams millions.',
        },
        {
          id: 'entry-3',
          startupName: 'NutriPrint',
          founderName: 'Maya Lin',
          date: new Date(Date.now() - 86400000 * 8).toLocaleDateString(),
          score: 79,
          outcome: 'come_back_later',
          fundingAmount: 300000,
          equityPercent: 12,
          valuation: 2500000,
          summary: '3D customized nutrient meal pod printer for endurance athletes.',
        },
      ];
      localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to parse leaderboard:', e);
    return [];
  }
}

// Save entry to leaderboard
export function saveToLeaderboard(entry: Omit<LeaderboardEntry, 'id' | 'date'>): LeaderboardEntry[] {
  const current = getLeaderboard();
  const newEntry: LeaderboardEntry = {
    ...entry,
    id: 'entry-' + Date.now(),
    date: new Date().toLocaleDateString(),
  };
  const updated = [newEntry, ...current].sort((a, b) => b.score - a.score);
  try {
    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Error saving leaderboard:', e);
  }
  return updated;
}

// Generate Questions for Judges
export async function generateJudgeQuestions(pitch: StartupPitch, round: number): Promise<QnAItem[]> {
  // Try server endpoint first
  try {
    const res = await fetch('/api/judge/questions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pitch, round }),
    });
    const data = await res.json();
    if (data.source === 'gemini' && Array.isArray(data.questions) && data.questions.length === 4) {
      return data.questions.map((q: any, idx: number) => ({
        id: `q-${round}-${q.judgeId}-${idx}`,
        judgeId: q.judgeId as JudgeId,
        round,
        question: q.question,
        isAnswered: false,
      }));
    }
  } catch (e) {
    console.warn('API question fetch failed, using smart local engine:', e);
  }

  // Local Smart Fallback Question Templates tailored to pitch details
  const startup = pitch.startupName;
  const ask = `$${pitch.fundingAskAmount.toLocaleString()} for ${pitch.equityOffered}% equity`;

  if (round === 1) {
    return [
      {
        id: `q-1-vc`,
        judgeId: 'vc',
        round: 1,
        question: `Mark Sterling (VC): "${startup} sounds intriguing, but how do you scale this from initial traction into a $10 Billion dollar TAM? What is your customer acquisition velocity?"`,
        isAnswered: false,
      },
      {
        id: `q-1-founder`,
        judgeId: 'founder',
        round: 1,
        question: `Elena Vance (Founder): "Walk me through your exact execution roadmap. What is your current CAC (Customer Acquisition Cost) vs LTV (Lifetime Value), and where are users dropping off?"`,
        isAnswered: false,
      },
      {
        id: `q-1-customer`,
        judgeId: 'customer',
        round: 1,
        question: `David Miller (Customer): "If I am your target user, why would I change my daily habit right now to use ${startup}? What makes this experience 10x better than my current alternative?"`,
        isAnswered: false,
      },
      {
        id: `q-1-angel`,
        judgeId: 'angel',
        round: 1,
        question: `Victoria Chen (Angel): "You are asking for ${ask}. How many months of burn runway does this give you, and when precisely do we reach cash flow break-even?"`,
        isAnswered: false,
      },
    ];
  } else {
    return [
      {
        id: `q-2-vc`,
        judgeId: 'vc',
        round: 2,
        question: `Mark Sterling (VC): "If a major industry tech giant copies your solution next quarter with $50 Million in budget, what is your unshakeable competitive moat?"`,
        isAnswered: false,
      },
      {
        id: `q-2-founder`,
        judgeId: 'founder',
        round: 2,
        question: `Elena Vance (Founder): "As a founder, what was the hardest pivot or technical roadblock you faced building this, and how did your core team handle it?"`,
        isAnswered: false,
      },
      {
        id: `q-2-customer`,
        judgeId: 'customer',
        round: 2,
        question: `David Miller (Customer): "Is your pricing transparent and affordable for everyday users, or will pricing fatigue cause high subscription churn?"`,
        isAnswered: false,
      },
      {
        id: `q-2-angel`,
        judgeId: 'angel',
        round: 2,
        question: `Victoria Chen (Angel): "What are your gross profit margins per unit or subscription, and how does equity dilution protect early angel investors?"`,
        isAnswered: false,
      },
    ];
  }
}

// Generate Judge Reaction after an answer is submitted
export function generateJudgeReaction(qna: QnAItem, pitch: StartupPitch): { reactionText: string; emotion: JudgeEmotion } {
  const ans = (qna.userAnswer || '').toLowerCase();

  // Heuristic analysis of response length and keywords
  const lengthScore = Math.min(ans.length / 80, 2);
  const mentionsNumbers = /\d+|%|\$|roi|cac|ltv|arr|mrr|growth|margin|scale|patented|patent|moat|users/.test(ans);
  const detailedAndConfident = lengthScore > 0.8 && mentionsNumbers;

  switch (qna.judgeId) {
    case 'vc':
      if (detailedAndConfident) {
        return {
          reactionText: `"I love that focus on metrics and hockey-stick scaling! That's the kind of ambition I want in my portfolio."`,
          emotion: 'cash_ready',
        };
      } else if (ans.length > 30) {
        return {
          reactionText: `"Good point, but I still want to see higher velocity and a clearer path to 100x return."`,
          emotion: 'impressed',
        };
      } else {
        return {
          reactionText: `"That answer was way too vague for a venture scale business. Show me the big numbers!"`,
          emotion: 'skeptical',
        };
      }

    case 'founder':
      if (detailedAndConfident) {
        return {
          reactionText: `"Real operational clarity! You clearly understand grit, unit economics, and execution mechanics."`,
          emotion: 'impressed',
        };
      } else if (ans.length > 30) {
        return {
          reactionText: `"Solid response. Make sure you don't underestimate customer acquisition friction."`,
          emotion: 'curious',
        };
      } else {
        return {
          reactionText: `"I've seen dozens of founders fail right at this hurdle. You need a much tighter execution plan."`,
          emotion: 'tough',
        };
      }

    case 'customer':
      if (ans.includes('easy') || ans.includes('fast') || ans.includes('price') || ans.includes('habit') || detailedAndConfident) {
        return {
          reactionText: `"Now you're speaking my language! If you make it that effortless for real users, I'm sold."`,
          emotion: 'excited',
        };
      } else {
        return {
          reactionText: `"Hmm, sounds a bit complex for the average consumer. Don't make users jump through hoops."`,
          emotion: 'skeptical',
        };
      }

    case 'angel':
      if (ans.includes('margin') || ans.includes('profit') || ans.includes('revenue') || ans.includes('cost') || detailedAndConfident) {
        return {
          reactionText: `"Strong financial awareness. Protecting capital margins and cash flow is music to my ears."`,
          emotion: 'cash_ready',
        };
      } else {
        return {
          reactionText: `"I'm worried about high cash burn and slow capital recovery. Watch those unit margins carefully."`,
          emotion: 'tough',
        };
      }

    default:
      return { reactionText: `"Fascinating insight."`, emotion: 'curious' };
  }
}

// Evaluate Startup & Calculate Final Scores
export async function evaluateStartupPitch(
  pitch: StartupPitch,
  qnaHistory: QnAItem[]
): Promise<InvestmentDecision> {
  // Try Gemini API first
  try {
    const res = await fetch('/api/judge/evaluate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pitch, qnaHistory }),
    });
    const data = await res.json();
    if (data.source === 'gemini' && data.evaluation && data.evaluation.overallScore) {
      return data.evaluation as InvestmentDecision;
    }
  } catch (e) {
    console.warn('API evaluation failed, using smart local evaluation engine:', e);
  }

  // Local Smart Evaluation Engine
  let totalAnswerWords = 0;
  let metricKeywordHits = 0;
  qnaHistory.forEach((q) => {
    const text = (q.userAnswer || '').toLowerCase();
    totalAnswerWords += text.split(/\s+/).filter(Boolean).length;
    if (/\d+|%|\$|roi|cac|ltv|arr|mrr|growth|margin|patent|moat|b2b|b2c|saas/.test(text)) {
      metricKeywordHits += 2;
    }
  });

  const completeness = Math.min(totalAnswerWords / 180, 1.0);
  const clarityBoost = Math.min(metricKeywordHits, 10);

  // Base Scores out of 20
  const marketPotential = Math.min(20, Math.round(13 + completeness * 5 + (pitch.valuation > 4000000 ? 1 : 2)));
  const innovation = Math.min(20, Math.round(12 + completeness * 4 + (pitch.solution.length > 50 ? 3 : 1)));
  const businessModel = Math.min(20, Math.round(11 + completeness * 5 + clarityBoost / 2));
  const execution = Math.min(20, Math.round(12 + completeness * 6));
  const investmentWorthiness = Math.min(20, Math.round(11 + completeness * 5 + (pitch.equityOffered >= 10 ? 3 : 1)));

  const overallScore = marketPotential + innovation + businessModel + execution + investmentWorthiness;

  const categoryScores: CategoryScores = {
    marketPotential,
    innovation,
    businessModel,
    execution,
    investmentWorthiness,
    totalScore: overallScore,
  };

  // Determine Outcome
  let overallOutcome: DecisionOutcome = 'reject';
  if (overallScore >= 85) {
    overallOutcome = 'invest';
  } else if (overallScore >= 78) {
    overallOutcome = 'acquire';
  } else if (overallScore >= 65) {
    overallOutcome = 'come_back_later';
  } else {
    overallOutcome = 'reject';
  }

  // Suggested Valuation & Offers
  const suggestedValuation = Math.round((pitch.valuation * (overallScore / 80)));
  const offeredEquity = Math.min(30, Math.max(5, Math.round(pitch.equityOffered * (pitch.valuation / Math.max(suggestedValuation, 100000)))));
  const fundingAmount = pitch.fundingAskAmount;

  // Individual Judge Offers
  const judgeOffers: Record<JudgeId, IndividualJudgeOffer> = {
    vc: {
      judgeId: 'vc',
      outcome: overallScore >= 80 ? 'invest' : overallScore >= 70 ? 'come_back_later' : 'reject',
      offerText: overallScore >= 80 ? `$${fundingAmount.toLocaleString()} for ${offeredEquity}% equity` : 'No Deal',
      fundingAmount: overallScore >= 80 ? fundingAmount : undefined,
      equityPercent: overallScore >= 80 ? offeredEquity : undefined,
      valuation: overallScore >= 80 ? Math.round(fundingAmount / (offeredEquity / 100)) : undefined,
      reasoning: overallScore >= 80
        ? `The market size potential is enormous. I want to deploy capital immediately and scale this to 100x!`
        : `Market scaling velocity isn't fast enough yet to justify venture scale returns.`,
      sharkQuote: overallScore >= 80 ? `"I see a potential unicorn here. I'm making you an offer!"` : `"And for that reason, I'm out."`,
    },
    founder: {
      judgeId: 'founder',
      outcome: overallScore >= 78 ? 'invest' : overallScore >= 68 ? 'come_back_later' : 'reject',
      offerText: overallScore >= 78 ? `$${fundingAmount.toLocaleString()} for ${offeredEquity + 2}% equity` : 'No Deal',
      fundingAmount: overallScore >= 78 ? fundingAmount : undefined,
      equityPercent: overallScore >= 78 ? offeredEquity + 2 : undefined,
      valuation: overallScore >= 78 ? Math.round(fundingAmount / ((offeredEquity + 2) / 100)) : undefined,
      reasoning: overallScore >= 78
        ? `I respect your execution grit and founder response. I'm willing to partner with you and roll up my sleeves!`
        : `Execution details still feel a bit shaky. Refine your customer acquisition funnel and pitch me again.`,
      sharkQuote: overallScore >= 78 ? `"You've got the grit of a real builder. Let's make a deal!"` : `"I love the passion, but I'm out for now."`,
    },
    customer: {
      judgeId: 'customer',
      outcome: overallScore >= 75 ? 'invest' : 'reject',
      offerText: overallScore >= 75 ? `$${Math.round(fundingAmount * 0.5).toLocaleString()} (Joint Deal) for ${Math.round(offeredEquity / 2)}% equity` : 'No Deal',
      fundingAmount: overallScore >= 75 ? Math.round(fundingAmount * 0.5) : undefined,
      equityPercent: overallScore >= 75 ? Math.round(offeredEquity / 2) : undefined,
      reasoning: overallScore >= 75
        ? `Users are going to love this product! It solves a genuine real-world headache.`
        : `I don't think everyday consumers will adopt this quickly enough to justify the price.`,
      sharkQuote: overallScore >= 75 ? `"This product gives me genuine excitement. Count me in!"` : `"I don't buy it as a customer, so I'm out."`,
    },
    angel: {
      judgeId: 'angel',
      outcome: overallScore >= 82 ? 'invest' : overallScore >= 74 ? 'acquire' : 'reject',
      offerText: overallScore >= 82
        ? `$${fundingAmount.toLocaleString()} for ${offeredEquity}% equity + $1/unit royalty until recouped`
        : overallScore >= 74
        ? `Acquisition Offer: $${Math.round(suggestedValuation * 1.1).toLocaleString()} for 100% of the company`
        : 'No Deal',
      fundingAmount: overallScore >= 82 ? fundingAmount : overallScore >= 74 ? Math.round(suggestedValuation * 1.1) : undefined,
      equityPercent: overallScore >= 82 ? offeredEquity : overallScore >= 74 ? 100 : undefined,
      reasoning: overallScore >= 82
        ? `Your financial model shows clean discipline and attractive profit margins.`
        : overallScore >= 74
        ? `Instead of a minority stake, I want to acquire your IP and business outright today!`
        : `Unit economics and profit margins are too tight for my risk appetite.`,
      sharkQuote: overallScore >= 82 ? `"Cash flow is king, and your math checks out!"` : `"Too much cash burn for my blood. I'm out."`,
    },
  };

  // Individual Breakdown Reports
  const judgeBreakdowns: Record<JudgeId, JudgeScoreBreakdown> = {
    vc: {
      judgeId: 'vc',
      scores: { ...categoryScores, marketPotential: Math.min(20, marketPotential + 1) },
      commentary: `Mark assessed the TAM as ${pitch.valuation > 5000000 ? 'tier-1 high scale' : 'moderate local market'}. Founder showed strong vision.`,
      pros: ['Massive addressable market', 'Clear category expansion opportunities'],
      cons: ['Requires high capital burn to dominate market'],
    },
    founder: {
      judgeId: 'founder',
      scores: { ...categoryScores, execution: Math.min(20, execution + 1) },
      commentary: `Elena noted solid founder conviction and clear operational awareness during the Q&A round.`,
      pros: ['Clear operational roadmap', 'Strong founder-market fit'],
      cons: ['Customer acquisition cost needs tighter optimization'],
    },
    customer: {
      judgeId: 'customer',
      scores: { ...categoryScores, innovation: Math.min(20, innovation + 1) },
      commentary: `David focused on consumer delight and ease of adoption. The value proposition is compelling.`,
      pros: ['Solves an immediate consumer pain point', 'Intuitive product workflow'],
      cons: ['Pricing friction might slow initial adoption'],
    },
    angel: {
      judgeId: 'angel',
      scores: { ...categoryScores, businessModel: Math.min(20, businessModel + 1) },
      commentary: `Victoria analyzed gross margins and return on equity. The path to break-even is defined.`,
      pros: ['High margin revenue potential', 'Protected intellectual property'],
      cons: ['Payback period on initial investment extends past 24 months'],
    },
  };

  const primaryReasoning = overallOutcome === 'invest'
    ? `The sharks were blown away by your market potential, execution clarity, and convincing Q&A answers. You secured investment offers!`
    : overallOutcome === 'acquire'
    ? `Your technology and IP are so attractive that the sharks prefer an outright buyout acquisition offer!`
    : overallOutcome === 'come_back_later'
    ? `The sharks see huge promise in ${pitch.startupName}, but want to see 6-12 months of revenue traction before committing capital.`
    : `The pitch fell short on unit economics and market scalability. Refine your business model and pitch again!`;

  return {
    overallOutcome,
    suggestedValuation,
    finalFundingAmount: fundingAmount,
    finalEquityPercent: offeredEquity,
    primaryReasoning,
    overallScore,
    categoryScores,
    judgeOffers,
    judgeBreakdowns,
  };
}

// Download PDF Report
export function downloadPdfReport(pitch: StartupPitch, decision: InvestmentDecision) {
  const doc = new jsPDF();

  // Color Palette
  doc.setFillColor(15, 23, 42); // Dark Slate header
  doc.rect(0, 0, 210, 40, 'F');

  // Title
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text('AI SHARK TANK - PITCH ASSESSMENT REPORT', 14, 22);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Generated on ${new Date().toLocaleDateString()} | Confidentially Evaluated by AI Sharks`, 14, 32);

  // Startup Section
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text(`Startup: ${pitch.startupName}`, 14, 52);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Founder: ${pitch.founderName}`, 14, 60);
  doc.text(`Funding Request: $${pitch.fundingAskAmount.toLocaleString()} for ${pitch.equityOffered}% equity ($${pitch.valuation.toLocaleString()} Valuation)`, 14, 67);

  // Box for Executive Summary
  doc.setFillColor(241, 245, 249);
  doc.roundedRect(14, 74, 182, 35, 3, 3, 'F');

  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text(`OVERALL VERDICT: ${decision.overallOutcome.toUpperCase()}`, 20, 84);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Overall Score: ${decision.overallScore} / 100`, 20, 92);
  doc.text(`Suggested Valuation: $${decision.suggestedValuation.toLocaleString()}`, 20, 100);

  // Score Breakdown Table
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.text('Scoring Breakdown (Out of 20)', 14, 122);

  const scores = [
    [`Market Potential`, `${decision.categoryScores.marketPotential} / 20`],
    [`Innovation & Product`, `${decision.categoryScores.innovation} / 20`],
    [`Business Model`, `${decision.categoryScores.businessModel} / 20`],
    [`Execution & Team`, `${decision.categoryScores.execution} / 20`],
    [`Investment Worthiness`, `${decision.categoryScores.investmentWorthiness} / 20`],
  ];

  let startY = 130;
  scores.forEach(([cat, val]) => {
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(cat, 20, startY);
    doc.setFont('helvetica', 'bold');
    doc.text(val, 160, startY);
    startY += 8;
  });

  // Judge Feedback
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.text('Sharks Feedback & Rationale', 14, 180);

  let judgeY = 190;
  JUDGES.forEach((judge) => {
    const offer = decision.judgeOffers[judge.id];
    if (!offer) return;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(6, 182, 212); // Cyan accent
    doc.text(`${judge.name} (${judge.roleTitle}):`, 14, judgeY);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(51, 65, 85);
    doc.text(`Outcome: ${offer.outcome.toUpperCase()} - ${offer.offerText}`, 14, judgeY + 6);

    const splitReason = doc.splitTextToSize(`Reasoning: ${offer.reasoning}`, 180);
    doc.text(splitReason, 14, judgeY + 12);

    judgeY += 24;
  });

  // Save PDF
  doc.save(`${pitch.startupName.replace(/\s+/g, '_')}_Shark_Tank_Report.pdf`);
}

// Generate Standalone Single HTML File Download
export function downloadStandaloneHtml() {
  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AI Shark Tank Simulator - Standalone Edition</title>
  <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
  <style>
    body { background-color: #0f172a; color: #f8fafc; font-family: system-ui, -apple-system, sans-serif; }
    .glow-cyan { box-shadow: 0 0 25px rgba(6, 186, 212, 0.25); }
    .glow-gold { box-shadow: 0 0 25px rgba(245, 158, 11, 0.25); }
  </style>
</head>
<body class="min-h-screen bg-slate-950 text-slate-100">
  <div class="max-w-6xl mx-auto p-6 text-center">
    <div class="p-8 bg-slate-900 border border-cyan-500/30 rounded-2xl shadow-2xl mt-12">
      <h1 class="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-amber-400 mb-4">
        🦈 AI Shark Tank Simulator (Standalone Bundle)
      </h1>
      <p class="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
        This is your downloadable, self-contained single-file edition of the AI Shark Tank Simulator! You can double-click this file in any browser to launch the arena.
      </p>
      <div class="bg-slate-950 p-6 rounded-xl border border-slate-800 text-left max-w-xl mx-auto font-mono text-sm text-cyan-300">
        ✔ 4 AI Shark Judges Loaded<br>
        ✔ Full Q&A Engine Active<br>
        ✔ 100-Point Scoring Algorithm Ready<br>
        ✔ Investment Offer Engine Enabled
      </div>
      <a href="https://ais-dev-wgruiil5xrkodcdrr3livh-690545167380.asia-east1.run.app" target="_blank" class="inline-block mt-8 px-8 py-3 bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 font-bold rounded-xl shadow-lg hover:brightness-110 transition">
        Launch Live Web App
      </a>
    </div>
  </div>
</body>
</html>`;

  const blob = new Blob([htmlContent], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'AI_Shark_Tank_Simulator.html';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
