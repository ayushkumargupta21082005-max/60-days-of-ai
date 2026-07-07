import React, { useState } from "react";
import { KeywordDetail } from "../types";
import { Search, Sparkles, CheckCircle2, XCircle, Filter } from "lucide-react";

interface KeywordOptimizerViewProps {
  keywords: KeywordDetail[];
}

export default function KeywordOptimizerView({ keywords }: KeywordOptimizerViewProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"all" | "present" | "missing">("all");

  const filteredKeywords = keywords.filter((kw) => {
    const matchesSearch = kw.keyword.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterType === "all" ||
      (filterType === "present" && kw.present) ||
      (filterType === "missing" && !kw.present);
    return matchesSearch && matchesFilter;
  });

  const totalCount = keywords.length;
  const presentCount = keywords.filter((k) => k.present).length;
  const missingCount = totalCount - presentCount;
  const coveragePercent = totalCount > 0 ? Math.round((presentCount / totalCount) * 100) : 0;

  return (
    <div className="space-y-6" id="keyword-optimizer-section">
      <div className="flex items-center gap-2 mb-2">
        <Sparkles className="w-5 h-5 text-indigo-500" />
        <h3 className="text-lg font-bold text-gray-900 tracking-tight">ATS Keyword Optimization</h3>
      </div>

      {/* Top statistics banners */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-4 flex flex-col justify-between">
          <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">Already Present</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-bold text-emerald-900">{presentCount}</span>
            <span className="text-xs text-emerald-700">/ {totalCount} Keywords</span>
          </div>
        </div>
        <div className="bg-rose-50/50 border border-rose-100 rounded-xl p-4 flex flex-col justify-between">
          <span className="text-xs font-semibold text-rose-800 uppercase tracking-wider">Missing & Critical</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-bold text-rose-900">{missingCount}</span>
            <span className="text-xs text-rose-700">Needed Keywords</span>
          </div>
        </div>
        <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-4 flex flex-col justify-between">
          <span className="text-xs font-semibold text-indigo-800 uppercase tracking-wider">JD Keyword Density</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-bold text-indigo-900">{coveragePercent}%</span>
            <span className="text-xs text-indigo-700">Initial Match Rate</span>
          </div>
        </div>
      </div>

      {/* Search & filters */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search keywords..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
          />
        </div>

        <div className="flex items-center gap-1.5 self-end sm:self-auto shrink-0">
          <Filter className="w-4 h-4 text-gray-400" />
          <button
            onClick={() => setFilterType("all")}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              filterType === "all" ? "bg-gray-900 text-white" : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            All ({totalCount})
          </button>
          <button
            onClick={() => setFilterType("present")}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              filterType === "present" ? "bg-emerald-600 text-white" : "text-emerald-600 hover:bg-emerald-50"
            }`}
          >
            Present ({presentCount})
          </button>
          <button
            onClick={() => setFilterType("missing")}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              filterType === "missing" ? "bg-rose-600 text-white" : "text-rose-600 hover:bg-rose-50"
            }`}
          >
            Missing ({missingCount})
          </button>
        </div>
      </div>

      {/* Grid of keywords */}
      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
        {filteredKeywords.length > 0 ? (
          <div className="divide-y divide-gray-100 max-h-[480px] overflow-y-auto">
            {filteredKeywords.map((kw, idx) => (
              <div
                key={idx}
                className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-gray-50/50 transition-colors"
                id={`keyword-row-${idx}`}
              >
                <div className="flex items-center gap-3">
                  {kw.present ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  ) : (
                    <XCircle className="w-5 h-5 text-gray-300 shrink-0" />
                  )}
                  <div>
                    <span className="font-semibold text-gray-900 text-sm tracking-tight">{kw.keyword}</span>
                    <span
                      className={`ml-2 inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold tracking-wide uppercase ${
                        kw.present
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-rose-50 text-rose-700"
                      }`}
                    >
                      {kw.present ? "Present" : "Missing"}
                    </span>
                  </div>
                </div>

                <div className="sm:max-w-md text-left sm:text-right">
                  <span className="text-gray-400 text-xs block">Recommended Placement:</span>
                  <span className="text-gray-600 text-xs font-medium">{kw.recommendedPlacement}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-gray-400 text-sm">
            No keywords found matching the filter criteria.
          </div>
        )}
      </div>
    </div>
  );
}
