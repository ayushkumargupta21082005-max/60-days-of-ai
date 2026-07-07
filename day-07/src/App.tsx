import React, { useState } from "react";
import { SAMPLES, SampleSet } from "./sampleData";
import { OptimizationResponse } from "./types";
import AtsScores from "./components/AtsScores";
import GapAnalysisView from "./components/GapAnalysisView";
import ImprovementOpportunitiesView from "./components/ImprovementOpportunitiesView";
import KeywordOptimizerView from "./components/KeywordOptimizerView";
import OptimizedResumeView from "./components/OptimizedResumeView";
import {
  FileText,
  Briefcase,
  Sparkles,
  RefreshCw,
  Info,
  Layers,
  Search,
  BookOpen,
  Layout,
  AlertCircle,
  TrendingUp,
  Download,
  CheckCircle,
  HelpCircle
} from "lucide-react";

export default function App() {
  const [resumeText, setResumeText] = useState("");
  const [jdText, setJdText] = useState("");
  const [selectedSample, setSelectedSample] = useState<number>(-1);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<OptimizationResponse | null>(null);
  const [activeTab, setActiveTab] = useState<"scores" | "gaps" | "roadmap" | "keywords" | "draft">("scores");

  // Loading messages loop
  const loadingMessages = [
    "Ingesting resume data and target Job Description...",
    "Extracting key competencies and industry keywords from JD...",
    "Evaluating formatting standards and structure for ATS engines...",
    "Conducting Gap Analysis across technical and soft skill categories...",
    "Rephrasing bullets with technical recruiter action verbs...",
    "Generating optimized, high-impact compiled draft (factually preserved)..."
  ];

  React.useEffect(() => {
    let interval: any;
    if (isLoading) {
      interval = setInterval(() => {
        setLoadingStep((prev) => (prev + 1) % loadingMessages.length);
      }, 2500);
    } else {
      setLoadingStep(0);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  const loadSample = (idx: number) => {
    if (idx === -1) {
      setResumeText("");
      setJdText("");
      setSelectedSample(-1);
    } else {
      const sample = SAMPLES[idx];
      setResumeText(sample.resume);
      setJdText(sample.jd);
      setSelectedSample(idx);
    }
    setError(null);
  };

  const handleOptimize = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resumeText.trim()) {
      setError("Please provide your existing resume text first.");
      return;
    }
    if (!jdText.trim()) {
      setError("Please provide the target Job Description (JD) to match against.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/optimize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resume: resumeText,
          jd: jdText,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server error (Status ${response.status})`);
      }

      const data: OptimizationResponse = await response.json();
      setResult(data);
      setActiveTab("scores");
      // Scroll to result section after loaded
      setTimeout(() => {
        document.getElementById("optimization-results")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Something went wrong during optimization. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, target: "resume" | "jd") => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (target === "resume") {
        setResumeText(text);
      } else {
        setJdText(text);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans antialiased flex flex-col">
      {/* Top Navigation Bar from Professional Polish Theme */}
      <nav className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-8 shrink-0 sticky top-0 z-40 shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-md shadow-blue-100">
            <Sparkles className="w-5 h-5" />
          </div>
          <span className="text-lg sm:text-xl font-bold tracking-tight text-slate-800">
            Resume Optimizer <span className="text-blue-600 font-normal">Pro</span>
          </span>
        </div>
        
        <div className="flex items-center space-x-3 sm:space-x-4">
          <div className="flex items-center bg-slate-100 rounded-full px-3.5 py-1.5 border border-slate-200/50">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
            <span className="text-[10px] sm:text-xs font-semibold text-slate-600 uppercase tracking-wider">System: Active</span>
          </div>
          
          <select
            value={selectedSample}
            onChange={(e) => loadSample(Number(e.target.value))}
            className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 font-semibold focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
          >
            <option value={-1}>-- Clean Canvas --</option>
            {SAMPLES.map((s, idx) => (
              <option key={idx} value={idx}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-12 flex-1">
        
        {/* Intro Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4 pt-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold bg-blue-50 text-blue-600 border border-blue-100">
            Factual Preservation Mode Active
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Elevate Your Technical Match & ATS Readability
          </h2>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
            Our optimizer acts as an Executive Hiring Manager to evaluate formatting, detect missing keywords, run a high-fidelity gap analysis, and polish your bullet points with zero hallucinated details.
          </p>
        </div>

        {/* Form Inputs (Resume and JD) */}
        <form onSubmit={handleOptimize} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Left: Existing Resume Input */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 bg-slate-100 rounded-lg text-slate-700">
                      <FileText className="w-4 h-4 text-blue-600" />
                    </span>
                    <label className="font-bold text-slate-800 text-sm tracking-tight">1. Your Existing Resume</label>
                  </div>
                  {/* File upload trigger */}
                  <label className="text-[11px] font-bold text-blue-600 hover:text-blue-700 cursor-pointer bg-blue-50 hover:bg-blue-100/70 px-2.5 py-1 rounded-md transition-colors border border-blue-100">
                    Upload TXT/MD
                    <input
                      type="file"
                      accept=".txt,.md,.json"
                      onChange={(e) => handleFileUpload(e, "resume")}
                      className="hidden"
                    />
                  </label>
                </div>
                <p className="text-xs text-slate-400">
                  Paste your raw resume text below. Word-for-word accuracy is preserved across dates and institutions.
                </p>
                <textarea
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  placeholder="Paste resume content here... (e.g. contact, skills, work experience bullets, projects, education)"
                  className="w-full h-80 p-4 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm font-sans leading-relaxed resize-y bg-[#fcfdfe]"
                />
              </div>
              <div className="text-[11px] text-slate-400 flex items-center gap-1 pt-2">
                <Info className="w-3 h-3 shrink-0 text-slate-400" />
                100% compliance: We only optimize wording & keywords, never inventing experience.
              </div>
            </div>

            {/* Right: Target JD Input */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 bg-slate-100 rounded-lg text-slate-700">
                      <Briefcase className="w-4 h-4 text-blue-600" />
                    </span>
                    <label className="font-bold text-slate-800 text-sm tracking-tight">2. Target Job Description (JD)</label>
                  </div>
                  {/* File upload trigger */}
                  <label className="text-[11px] font-bold text-blue-600 hover:text-blue-700 cursor-pointer bg-blue-50 hover:bg-blue-100/70 px-2.5 py-1 rounded-md transition-colors border border-blue-100">
                    Upload TXT/MD
                    <input
                      type="file"
                      accept=".txt,.md,.json"
                      onChange={(e) => handleFileUpload(e, "jd")}
                      className="hidden"
                    />
                  </label>
                </div>
                <p className="text-xs text-slate-400">
                  Paste the target JD below. Our parser automatically extracts core skills and top ATS keywords.
                </p>
                <textarea
                  value={jdText}
                  onChange={(e) => setJdText(e.target.value)}
                  placeholder="Paste target job description details here... (e.g., job overview, required/preferred qualifications, tools, tech stack)"
                  className="w-full h-80 p-4 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm font-sans leading-relaxed resize-y bg-[#fcfdfe]"
                />
              </div>
              <div className="text-[11px] text-slate-400 flex items-center gap-1 pt-2">
                <Info className="w-3 h-3 shrink-0 text-slate-400" />
                Real-time gap evaluation runs securely against extracted requirements.
              </div>
            </div>

          </div>

          {/* Action buttons bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => loadSample(0)}
                className="px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 rounded-xl text-xs font-bold transition-colors shadow-sm"
              >
                AI Engineer Sample
              </button>
              <button
                type="button"
                onClick={() => loadSample(1)}
                className="px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 rounded-xl text-xs font-bold transition-colors shadow-sm"
              >
                Full-Stack Sample
              </button>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => {
                  loadSample(-1);
                  setResult(null);
                  setError(null);
                }}
                className="flex-1 sm:flex-none px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 rounded-xl text-xs font-bold transition-colors"
              >
                Clear Canvas
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white disabled:bg-blue-400 rounded-xl text-xs font-extrabold transition-all shadow-md shadow-blue-100"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Analyzing Data...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Optimize & Audit Resume
                  </>
                )}
              </button>
            </div>
          </div>
        </form>

        {/* Loading overlay panel */}
        {isLoading && (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-md text-center max-w-xl mx-auto space-y-6 animate-pulse">
            <div className="relative flex justify-center">
              <div className="w-12 h-12 rounded-full border-4 border-slate-100 border-t-blue-600 animate-spin"></div>
              <Sparkles className="absolute top-3.5 w-5 h-5 text-blue-500 animate-bounce" />
            </div>
            <div className="space-y-2">
              <h4 className="font-extrabold text-slate-900 text-base">ATS Analysis Underway</h4>
              <p className="text-slate-400 text-xs">Evaluating formatting standards, missing competencies and keyword metrics.</p>
            </div>
            <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl max-w-sm mx-auto">
              <span className="text-[10px] uppercase font-bold text-blue-600 tracking-wider block mb-1">
                Step {loadingStep + 1} of {loadingMessages.length}
              </span>
              <p className="text-xs text-slate-600 font-semibold transition-all duration-300">
                "{loadingMessages[loadingStep]}"
              </p>
            </div>
          </div>
        )}

        {/* Error notification display */}
        {error && (
          <div className="bg-rose-50 border border-rose-200 rounded-xl p-5 max-w-2xl mx-auto flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="font-bold text-rose-900 text-sm">Optimization Failed</h4>
              <p className="text-xs text-rose-700 leading-relaxed">{error}</p>
            </div>
          </div>
        )}

        {/* Results Sections Output */}
        {result && (
          <div className="space-y-8 pt-6" id="optimization-results">
            <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">Audit and Optimization Report</h3>
                <p className="text-xs text-slate-500 mt-1">Review recruiter insights, gaps, keywords and copy the tailored draft.</p>
              </div>
            </div>

            {/* Sticky Step tabs navigation redesigned for Professional Polish workflow */}
            <div className="bg-white border border-slate-200 p-1.5 rounded-2xl flex flex-wrap gap-1 sticky top-[72px] z-30 shadow-md">
              <button
                onClick={() => setActiveTab("scores")}
                className={`flex-1 min-w-[140px] flex items-center justify-center gap-2 px-3 py-3 rounded-xl text-xs font-bold transition-all ${
                  activeTab === "scores"
                    ? "bg-blue-50 text-blue-700 border border-blue-100 shadow-sm"
                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                  activeTab === "scores" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500"
                }`}>01</span>
                ATS Scoring
              </button>
              
              <button
                onClick={() => setActiveTab("gaps")}
                className={`flex-1 min-w-[140px] flex items-center justify-center gap-2 px-3 py-3 rounded-xl text-xs font-bold transition-all ${
                  activeTab === "gaps"
                    ? "bg-blue-50 text-blue-700 border border-blue-100 shadow-sm"
                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                  activeTab === "gaps" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500"
                }`}>02</span>
                Gap Analysis
              </button>
              
              <button
                onClick={() => setActiveTab("roadmap")}
                className={`flex-1 min-w-[140px] flex items-center justify-center gap-2 px-3 py-3 rounded-xl text-xs font-bold transition-all ${
                  activeTab === "roadmap"
                    ? "bg-blue-50 text-blue-700 border border-blue-100 shadow-sm"
                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                  activeTab === "roadmap" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500"
                }`}>03</span>
                Improvement Path
              </button>
              
              <button
                onClick={() => setActiveTab("keywords")}
                className={`flex-1 min-w-[140px] flex items-center justify-center gap-2 px-3 py-3 rounded-xl text-xs font-bold transition-all ${
                  activeTab === "keywords"
                    ? "bg-blue-50 text-blue-700 border border-blue-100 shadow-sm"
                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                  activeTab === "keywords" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500"
                }`}>04</span>
                Keyword Strategy
              </button>
              
              <button
                onClick={() => setActiveTab("draft")}
                className={`flex-1 min-w-[140px] flex items-center justify-center gap-2 px-3 py-3 rounded-xl text-xs font-bold transition-all ${
                  activeTab === "draft"
                    ? "bg-slate-800 text-white shadow-md"
                    : "text-blue-600 hover:bg-blue-50 font-extrabold"
                }`}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                  activeTab === "draft" ? "bg-white text-slate-800" : "bg-blue-50 text-blue-600"
                }`}>05</span>
                Optimized Resume
              </button>
            </div>

            {/* Dynamic Rendering based on Selected Tab */}
            <div className="pt-2">
              {activeTab === "scores" && <AtsScores analysis={result.atsAnalysis} />}
              {activeTab === "gaps" && <GapAnalysisView gapAnalysis={result.gapAnalysis} />}
              {activeTab === "roadmap" && <ImprovementOpportunitiesView opportunities={result.opportunities} />}
              {activeTab === "keywords" && <KeywordOptimizerView keywords={result.keywords} />}
              {activeTab === "draft" && <OptimizedResumeView resume={result.optimizedResume} />}
            </div>
          </div>
        )}

      </main>

      {/* Footer Branding from Professional Polish Theme */}
      <footer className="bg-white border-t border-slate-200 mt-20 py-8 text-center text-xs text-slate-400 font-semibold">
        <div className="max-w-7xl mx-auto px-4">
          <p>© 2026 Resume Optimizer Pro. Built with professional grade compliance standards for modern recruiters.</p>
        </div>
      </footer>
    </div>
  );
}
