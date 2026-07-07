import React from "react";
import { ATSAnalysis } from "../types";
import { FileText, Search, Layout, BookOpen, Layers } from "lucide-react";

interface AtsScoresProps {
  analysis: ATSAnalysis;
}

export default function AtsScores({ analysis }: AtsScoresProps) {
  const scoreCards = [
    {
      title: "Overall Match Score",
      value: analysis.overallScore.score,
      explanation: analysis.overallScore.explanation,
      icon: <Layers className="w-5 h-5 text-blue-600" />,
      color: "from-blue-500 to-indigo-600",
      bgColor: "bg-blue-50",
      strokeColor: "stroke-blue-600",
    },
    {
      title: "Recruiter Readability",
      value: analysis.readabilityScore.score,
      explanation: analysis.readabilityScore.explanation,
      icon: <BookOpen className="w-5 h-5 text-emerald-600" />,
      color: "from-emerald-500 to-teal-600",
      bgColor: "bg-emerald-50",
      strokeColor: "stroke-emerald-600",
    },
    {
      title: "Keyword Match",
      value: analysis.keywordScore.score,
      explanation: analysis.keywordScore.explanation,
      icon: <Search className="w-5 h-5 text-orange-600" />,
      color: "from-orange-500 to-amber-600",
      bgColor: "bg-orange-50",
      strokeColor: "stroke-orange-600",
    },
    {
      title: "Formatting Compliance",
      value: analysis.formattingScore.score,
      explanation: analysis.formattingScore.explanation,
      icon: <FileText className="w-5 h-5 text-sky-600" />,
      color: "from-sky-500 to-blue-600",
      bgColor: "bg-sky-50",
      strokeColor: "stroke-sky-600",
    },
    {
      title: "Section Organization",
      value: analysis.organizationScore.score,
      explanation: analysis.organizationScore.explanation,
      icon: <Layout className="w-5 h-5 text-fuchsia-600" />,
      color: "from-fuchsia-500 to-pink-600",
      bgColor: "bg-fuchsia-50",
      strokeColor: "stroke-fuchsia-600",
    },
  ];

  return (
    <div className="space-y-8" id="ats-scores-section">
      {/* Hero overall score display */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-850 rounded-2xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden border border-slate-800">
        <div className="absolute right-0 top-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute left-1/3 bottom-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl"></div>

        <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
          <div className="relative flex items-center justify-center">
            {/* SVG Radial Progress */}
            <svg className="w-36 h-36 transform -rotate-90">
              <circle
                cx="72"
                cy="72"
                r="64"
                className="stroke-slate-700 fill-none"
                strokeWidth="10"
              />
              <circle
                cx="72"
                cy="72"
                r="64"
                className="stroke-blue-500 fill-none transition-all duration-1000 ease-out"
                strokeWidth="10"
                strokeDasharray={`${2 * Math.PI * 64}`}
                strokeDashoffset={`${2 * Math.PI * 64 * (1 - analysis.overallScore.score / 100)}`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-4xl font-extrabold tracking-tight">{analysis.overallScore.score}%</span>
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">ATS Score</span>
            </div>
          </div>

          <div className="flex-1 text-center md:text-left space-y-3">
            <h3 className="text-2xl font-bold tracking-tight">Executive Recruiter Scorecard</h3>
            <p className="text-slate-300 leading-relaxed max-w-2xl text-sm md:text-base">
              {analysis.overallScore.explanation}
            </p>
            <div className="flex flex-wrap gap-3 pt-2 justify-center md:justify-start">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                ● Ready for Screening
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                100% Factually Preserved
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid of details score cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {scoreCards.slice(1).map((card, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            id={`score-card-${idx}`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className={`p-2.5 rounded-lg ${card.bgColor}`}>
                  {card.icon}
                </span>
                <span className="text-2xl font-black text-slate-800">{card.value}%</span>
              </div>
              <div>
                <h4 className="font-bold text-slate-700 text-sm tracking-tight">{card.title}</h4>
                <p className="text-slate-500 text-xs mt-1.5 leading-relaxed">{card.explanation}</p>
              </div>
            </div>
            {/* Progress line */}
            <div className="mt-4 pt-3 border-t border-slate-100">
              <div className="w-full bg-slate-100 rounded-full h-1.5">
                <div
                  className="bg-blue-600 h-1.5 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${card.value}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
