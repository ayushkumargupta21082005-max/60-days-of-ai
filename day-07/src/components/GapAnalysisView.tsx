import React from "react";
import { GapAnalysis } from "../types";
import { HelpCircle, AlertTriangle, Cpu, Users, Award, Tag, Compass } from "lucide-react";

interface GapAnalysisViewProps {
  gapAnalysis: GapAnalysis;
}

export default function GapAnalysisView({ gapAnalysis }: GapAnalysisViewProps) {
  const sections = [
    {
      title: "Missing Keywords",
      icon: <Tag className="w-5 h-5 text-amber-500" />,
      items: gapAnalysis.missingKeywords,
      color: "border-amber-100 bg-amber-50/30",
    },
    {
      title: "Missing Technical Skills",
      icon: <Cpu className="w-5 h-5 text-blue-500" />,
      items: gapAnalysis.missingTechnicalSkills,
      color: "border-blue-100 bg-blue-50/30",
    },
    {
      title: "Missing Soft Skills",
      icon: <Users className="w-5 h-5 text-emerald-500" />,
      items: gapAnalysis.missingSoftSkills,
      color: "border-emerald-100 bg-emerald-50/30",
    },
    {
      title: "Missing Action Verbs",
      icon: <Award className="w-5 h-5 text-violet-500" />,
      items: gapAnalysis.missingActionVerbs,
      color: "border-violet-100 bg-violet-50/30",
    },
    {
      title: "Missing ATS Sections",
      icon: <Compass className="w-5 h-5 text-rose-500" />,
      items: gapAnalysis.missingATSSections,
      color: "border-rose-100 bg-rose-50/30",
    },
    {
      title: "Missing Recruiter Expectations",
      icon: <AlertTriangle className="w-5 h-5 text-orange-500" />,
      items: gapAnalysis.missingRecruiterExpectations,
      color: "border-orange-100 bg-orange-50/30",
    },
  ];

  return (
    <div className="space-y-6" id="gap-analysis-section">
      <div className="flex items-center gap-2 mb-2">
        <HelpCircle className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-bold text-slate-800 tracking-tight">Recruiter-Identified Gaps</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map((section, idx) => {
          if (!section.items || section.items.length === 0) {
            return (
              <div
                key={idx}
                className="bg-slate-50/50 rounded-2xl p-5 border border-dashed border-slate-200 flex flex-col items-center justify-center text-center"
              >
                <div className="p-2.5 bg-slate-100 rounded-lg text-slate-400">
                  {section.icon}
                </div>
                <h4 className="font-bold text-slate-700 text-sm mt-3">{section.title}</h4>
                <p className="text-slate-400 text-xs mt-1 font-medium">100% Complete — No Gaps Found!</p>
              </div>
            );
          }

          return (
            <div
              key={idx}
              className={`rounded-2xl border border-slate-200 p-5 space-y-4 shadow-sm bg-white hover:shadow-md transition-all`}
              id={`gap-section-${idx}`}
            >
              <div className="flex items-center gap-2.5">
                <span className="p-2 bg-slate-50 rounded-lg">
                  {section.icon}
                </span>
                <h4 className="font-bold text-slate-800 text-sm tracking-tight">{section.title}</h4>
              </div>

              <div className="space-y-3.5 divide-y divide-slate-100">
                {section.items.map((gap, gIdx) => (
                  <div key={gIdx} className={`pt-3.5 first:pt-0 space-y-1.5`}>
                    <div className="flex items-start gap-2">
                      <span className="inline-block mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-600 shrink-0"></span>
                      <span className="font-bold text-slate-800 text-sm">{gap.item}</span>
                    </div>
                    <p className="text-slate-500 text-xs pl-3.5 leading-relaxed">
                      <span className="font-bold text-slate-700">Why it matters:</span> {gap.whyItMatters}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
