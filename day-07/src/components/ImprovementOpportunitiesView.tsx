import React from "react";
import { ImprovementOpportunities } from "../types";
import { ListTodo, ShieldAlert, ShieldAlert as ShieldWarning, CheckCircle2 } from "lucide-react";

interface ImprovementOpportunitiesViewProps {
  opportunities: ImprovementOpportunities;
}

export default function ImprovementOpportunitiesView({ opportunities }: ImprovementOpportunitiesViewProps) {
  const priorities = [
    {
      title: "High Priority",
      description: "Critical adjustments required for passing initial ATS parsing filters.",
      items: opportunities.highPriority,
      color: "border-red-100 bg-red-50/20 text-red-700",
      iconColor: "text-red-500",
      icon: <ShieldAlert className="w-5 h-5" />,
      badgeBg: "bg-red-50 border border-red-200",
    },
    {
      title: "Medium Priority",
      description: "Recommended updates to align with hiring manager & industry standards.",
      items: opportunities.mediumPriority,
      color: "border-amber-100 bg-amber-50/20 text-amber-700",
      iconColor: "text-amber-500",
      icon: <ShieldWarning className="w-5 h-5" />,
      badgeBg: "bg-amber-50 border border-amber-200",
    },
    {
      title: "Low Priority",
      description: "Polishing details to elevate readability and overall visual impact.",
      items: opportunities.lowPriority,
      color: "border-blue-100 bg-blue-50/20 text-blue-700",
      iconColor: "text-blue-500",
      icon: <CheckCircle2 className="w-5 h-5" />,
      badgeBg: "bg-blue-50 border border-blue-200",
    },
  ];

  return (
    <div className="space-y-6" id="improvement-opportunities-section">
      <div className="flex items-center gap-2 mb-2">
        <ListTodo className="w-5 h-5 text-indigo-500" />
        <h3 className="text-lg font-bold text-gray-900 tracking-tight">Prioritized Improvement Roadmap</h3>
      </div>

      <div className="space-y-6">
        {priorities.map((priority, pIdx) => (
          <div
            key={pIdx}
            className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm"
            id={`opportunity-priority-${pIdx}`}
          >
            {/* Header banner */}
            <div className={`px-5 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-gray-50`}>
              <div className="flex items-center gap-2.5">
                <span className={priority.iconColor}>
                  {priority.icon}
                </span>
                <span className="font-bold text-gray-900 tracking-tight text-sm sm:text-base">
                  {priority.title}
                </span>
              </div>
              <p className="text-gray-400 text-xs font-normal">
                {priority.description}
              </p>
            </div>

            {/* List items */}
            {priority.items && priority.items.length > 0 ? (
              <div className="divide-y divide-gray-50">
                {priority.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="p-5 flex flex-col sm:flex-row gap-4 justify-between items-start">
                    <div className="space-y-1 sm:flex-1">
                      <div className="flex items-start gap-2">
                        <span className="inline-block mt-2 w-1.5 h-1.5 rounded-full bg-slate-600 shrink-0"></span>
                        <h4 className="font-semibold text-gray-900 text-sm leading-snug">
                          {item.recommendation}
                        </h4>
                      </div>
                    </div>
                    {/* Impact badge */}
                    <div className="sm:max-w-xs w-full pl-3.5 sm:pl-0">
                      <div className={`p-3 rounded-lg text-xs leading-relaxed ${priority.badgeBg}`}>
                        <span className="font-semibold block mb-0.5 text-slate-700">Expected Impact:</span>
                        <p className="text-slate-600">{item.impact}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center text-gray-400 text-xs">
                No outstanding recommendations for this category. Complete!
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
