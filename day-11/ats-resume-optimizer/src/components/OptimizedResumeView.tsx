import React, { useState } from "react";
import { OptimizedResume } from "../types";
import { FileDown, Copy, Edit2, Check, LayoutGrid, FileText } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface OptimizedResumeViewProps {
  resume: OptimizedResume;
}

export default function OptimizedResumeView({ resume }: OptimizedResumeViewProps) {
  const [activeTab, setActiveTab] = useState<"compiled" | "sections">("compiled");
  const [editedResume, setEditedResume] = useState<OptimizedResume>(resume);
  const [isEditing, setIsEditing] = useState(false);
  const [copied, setCopied] = useState(false);

  // Sync edits if resume changes from parent
  React.useEffect(() => {
    setEditedResume(resume);
  }, [resume]);

  const handleCopy = () => {
    const textToCopy =
      activeTab === "compiled"
        ? editedResume.rawFullMarkdown
        : `--- CONTACT INFO ---\n${editedResume.contactInfo}\n\n--- SUMMARY ---\n${editedResume.summary}\n\n--- SKILLS ---\n${editedResume.skillsSection}\n\n--- EXPERIENCE ---\n${editedResume.experienceSection}\n\n--- EDUCATION ---\n${editedResume.educationSection}\n\n--- PROJECTS ---\n${editedResume.projectsSection}`;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const text = editedResume.rawFullMarkdown;
    const blob = new Blob([text], { type: "text/markdown;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "ATS_Optimized_Resume.md");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const sectionsList = [
    { key: "contactInfo" as const, name: "Contact Information" },
    { key: "summary" as const, name: "Professional Summary" },
    { key: "skillsSection" as const, name: "Technical Skills" },
    { key: "experienceSection" as const, name: "Professional Experience" },
    { key: "projectsSection" as const, name: "Projects" },
    { key: "educationSection" as const, name: "Education" },
  ];

  return (
    <div className="space-y-6" id="optimized-resume-section">
      {/* Controls & Mode switches */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        {/* Tab triggers */}
        <div className="bg-gray-100 p-1 rounded-xl flex gap-1 border border-gray-200">
          <button
            onClick={() => setActiveTab("compiled")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "compiled"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            Full Markdown Resume
          </button>
          <button
            onClick={() => setActiveTab("sections")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "sections"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            Section Breakdown
          </button>
        </div>

        {/* Action utility buttons */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
              isEditing
                ? "bg-indigo-600 text-white border-indigo-600 hover:bg-indigo-700"
                : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
            }`}
          >
            <Edit2 className="w-3.5 h-3.5" />
            {isEditing ? "Save Edits" : "Edit Draft"}
          </button>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-gray-700 border border-gray-200 rounded-lg text-xs font-medium hover:bg-gray-50 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                Copy Text
              </>
            )}
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-900 text-white rounded-lg text-xs font-medium hover:bg-gray-800 transition-colors shadow-sm"
          >
            <FileDown className="w-3.5 h-3.5" />
            Export Markdown
          </button>
        </div>
      </div>

      {/* Editor & Viewer panels */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden min-h-[400px]">
        {/* Banner informing accuracy status */}
        <div className="bg-indigo-50 border-b border-indigo-100 px-5 py-3 flex items-center justify-between">
          <p className="text-xs text-indigo-800 font-medium leading-relaxed">
            ✨ This draft improves phrasing, aligns keywords, and optimizes layout, preserving <strong>100% of your real details</strong> without inventing fake metrics or experiences.
          </p>
        </div>

        <div className="p-6 md:p-8">
          {activeTab === "compiled" ? (
            /* Compiled Resume view */
            isEditing ? (
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">
                  Edit Compiled Markdown Resume
                </label>
                <textarea
                  value={editedResume.rawFullMarkdown}
                  onChange={(e) =>
                    setEditedResume({ ...editedResume, rawFullMarkdown: e.target.value })
                  }
                  className="w-full h-[600px] p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono text-sm leading-relaxed"
                />
              </div>
            ) : (
              <div className="prose prose-sm max-w-none text-gray-800 prose-slate prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-gray-900 prose-ul:list-disc prose-ul:pl-5 space-y-4">
                <div className="bg-gray-50/50 p-6 rounded-xl border border-gray-100 shadow-inner font-sans leading-relaxed text-sm">
                  <ReactMarkdown>{editedResume.rawFullMarkdown}</ReactMarkdown>
                </div>
              </div>
            )
          ) : (
            /* Section Breakdown view */
            <div className="space-y-8">
              {sectionsList.map(({ key, name }) => (
                <div key={key} className="space-y-3" id={`resume-section-container-${key}`}>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 pb-2">
                    {name}
                  </h4>

                  {isEditing ? (
                    <textarea
                      value={editedResume[key]}
                      onChange={(e) =>
                        setEditedResume({ ...editedResume, [key]: e.target.value })
                      }
                      className="w-full h-36 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 font-sans text-sm leading-relaxed"
                    />
                  ) : (
                    <div className="bg-gray-50/45 p-4 rounded-lg border border-gray-100 font-sans text-sm leading-relaxed text-gray-700">
                      <ReactMarkdown>{editedResume[key] || "_No information provided for this section._"}</ReactMarkdown>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
