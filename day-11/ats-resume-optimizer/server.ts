import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

// Lazy initialization of the Gemini client to prevent crash if key is temporarily missing
let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not configured in the Secrets / Environment variables.");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "15mb" }));

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // ATS Optimization API endpoint
  app.post("/api/optimize", async (req, res) => {
    try {
      const { resume, jd } = req.body;

      if (!resume || !resume.trim()) {
        res.status(400).json({ error: "Please provide your existing resume text." });
        return;
      }
      if (!jd || !jd.trim()) {
        res.status(400).json({ error: "Please provide the target Job Description (JD)." });
        return;
      }

      const ai = getAiClient();

      const systemInstruction = `
You are a Senior Technical Recruiter, ATS Optimization Expert, Resume Strategist, and Hiring Manager with experience recruiting Software Engineers and AI Engineers at Google, Microsoft, Amazon, NVIDIA, Adobe, Atlassian, and leading AI startups.

Your task is to analyze my resume against a target Job Description (JD) and optimize it for maximum ATS compatibility and recruiter impact while maintaining 100% factual accuracy.

STRICT RULES:
Never under any circumstance:
❌ Invent work experience
❌ Invent employers
❌ Invent projects
❌ Invent certifications
❌ Invent skills
❌ Invent technologies
❌ Invent achievements
❌ Invent dates
❌ Invent metrics
❌ Invent responsibilities

If information is missing, mention it under gapAnalysis or opportunities instead of creating fake content.
Only improve wording, organization, formatting, readability, and keyword optimization of the actual experiences.
Ensure keywords from the target JD are embedded naturally into the experience bullets only if the resume demonstrates corresponding skills, or provide recommendations on where to add them.
`;

      const prompt = `
--- EXISTING RESUME ---
${resume}

--- TARGET JOB DESCRIPTION (JD) ---
${jd}

Objective:
Optimize this resume to match the Job Description. Produce the JSON response matching the schema.
For the optimizedResume section, write out beautiful, polished, impact-driven markdown sections. Rewriting should use action verbs and strong phrasing, strictly preserving the original facts/dates/metrics. If the original lacks metrics, do not invent them, but frame the sentences professionally to show achievements.
The rawFullMarkdown property should be the complete compiled optimized resume in beautiful, standardized ATS markdown format.
`;

      const responseSchema = {
        type: Type.OBJECT,
        properties: {
          atsAnalysis: {
            type: Type.OBJECT,
            properties: {
              overallScore: {
                type: Type.OBJECT,
                properties: {
                  score: { type: Type.INTEGER, description: "Overall score out of 100" },
                  explanation: { type: Type.STRING }
                },
                required: ["score", "explanation"]
              },
              readabilityScore: {
                type: Type.OBJECT,
                properties: {
                  score: { type: Type.INTEGER, description: "Recruiter Readability Score out of 100" },
                  explanation: { type: Type.STRING }
                },
                required: ["score", "explanation"]
              },
              keywordScore: {
                type: Type.OBJECT,
                properties: {
                  score: { type: Type.INTEGER, description: "Keyword Match Score out of 100" },
                  explanation: { type: Type.STRING }
                },
                required: ["score", "explanation"]
              },
              formattingScore: {
                type: Type.OBJECT,
                properties: {
                  score: { type: Type.INTEGER, description: "Formatting Score out of 100" },
                  explanation: { type: Type.STRING }
                },
                required: ["score", "explanation"]
              },
              organizationScore: {
                type: Type.OBJECT,
                properties: {
                  score: { type: Type.INTEGER, description: "Section Organization Score out of 100" },
                  explanation: { type: Type.STRING }
                },
                required: ["score", "explanation"]
              }
            },
            required: ["overallScore", "readabilityScore", "keywordScore", "formattingScore", "organizationScore"]
          },
          gapAnalysis: {
            type: Type.OBJECT,
            properties: {
              missingKeywords: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    item: { type: Type.STRING },
                    whyItMatters: { type: Type.STRING }
                  },
                  required: ["item", "whyItMatters"]
                }
              },
              missingTechnicalSkills: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    item: { type: Type.STRING },
                    whyItMatters: { type: Type.STRING }
                  },
                  required: ["item", "whyItMatters"]
                }
              },
              missingSoftSkills: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    item: { type: Type.STRING },
                    whyItMatters: { type: Type.STRING }
                  },
                  required: ["item", "whyItMatters"]
                }
              },
              missingActionVerbs: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    item: { type: Type.STRING },
                    whyItMatters: { type: Type.STRING }
                  },
                  required: ["item", "whyItMatters"]
                }
              },
              missingATSSections: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    item: { type: Type.STRING },
                    whyItMatters: { type: Type.STRING }
                  },
                  required: ["item", "whyItMatters"]
                }
              },
              missingRecruiterExpectations: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    item: { type: Type.STRING },
                    whyItMatters: { type: Type.STRING }
                  },
                  required: ["item", "whyItMatters"]
                }
              }
            },
            required: ["missingKeywords", "missingTechnicalSkills", "missingSoftSkills", "missingActionVerbs", "missingATSSections", "missingRecruiterExpectations"]
          },
          opportunities: {
            type: Type.OBJECT,
            properties: {
              highPriority: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    recommendation: { type: Type.STRING },
                    impact: { type: Type.STRING }
                  },
                  required: ["recommendation", "impact"]
                }
              },
              mediumPriority: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    recommendation: { type: Type.STRING },
                    impact: { type: Type.STRING }
                  },
                  required: ["recommendation", "impact"]
                }
              },
              lowPriority: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    recommendation: { type: Type.STRING },
                    impact: { type: Type.STRING }
                  },
                  required: ["recommendation", "impact"]
                }
              }
            },
            required: ["highPriority", "mediumPriority", "lowPriority"]
          },
          keywords: {
            type: Type.ARRAY,
            description: "Top 30 ATS Keywords from the JD",
            items: {
              type: Type.OBJECT,
              properties: {
                keyword: { type: Type.STRING },
                present: { type: Type.BOOLEAN },
                recommendedPlacement: { type: Type.STRING }
              },
              required: ["keyword", "present", "recommendedPlacement"]
            }
          },
          optimizedResume: {
            type: Type.OBJECT,
            properties: {
              contactInfo: { type: Type.STRING, description: "Contact info markdown" },
              summary: { type: Type.STRING, description: "Professional summary markdown" },
              skillsSection: { type: Type.STRING, description: "Skills section markdown" },
              experienceSection: { type: Type.STRING, description: "Work experience markdown with optimized bullet points" },
              educationSection: { type: Type.STRING, description: "Education section markdown" },
              projectsSection: { type: Type.STRING, description: "Projects section markdown" },
              rawFullMarkdown: { type: Type.STRING, description: "Complete compiled optimized resume in ATS-friendly Markdown" }
            },
            required: ["contactInfo", "summary", "skillsSection", "experienceSection", "educationSection", "projectsSection", "rawFullMarkdown"]
          }
        },
        required: ["atsAnalysis", "gapAnalysis", "opportunities", "keywords", "optimizedResume"]
      };

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          responseSchema,
        },
      });

      const responseText = response.text;
      if (!responseText) {
        throw new Error("Empty response received from the Gemini API model.");
      }

      const parsedData = JSON.parse(responseText);
      res.json(parsedData);
    } catch (error: any) {
      console.error("Optimization error:", error);
      res.status(500).json({ error: error?.message || "Internal server error during resume optimization." });
    }
  });

  // Vite Integration for Dev / Prod static serving
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
