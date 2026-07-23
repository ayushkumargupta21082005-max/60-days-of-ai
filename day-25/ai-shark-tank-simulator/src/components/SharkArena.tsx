import React from 'react';
import { motion } from 'motion/react';
import { JUDGES, JudgeId, JudgeEmotion } from '../types';

interface SharkArenaProps {
  activeJudgeId?: JudgeId;
  judgeEmotions?: Record<JudgeId, JudgeEmotion>;
  activeReactionText?: { judgeId: JudgeId; text: string } | null;
}

export const SharkArena: React.FC<SharkArenaProps> = ({
  activeJudgeId,
  judgeEmotions = {
    vc: 'neutral',
    founder: 'neutral',
    customer: 'neutral',
    angel: 'neutral',
  },
  activeReactionText,
}) => {
  const getEmotionBadge = (emotion: JudgeEmotion = 'neutral') => {
    switch (emotion) {
      case 'excited':
        return { label: 'Excited 🤩', bg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' };
      case 'curious':
        return { label: 'Curious 🤔', bg: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' };
      case 'skeptical':
        return { label: 'Skeptical 🤨', bg: 'bg-amber-500/20 text-amber-300 border-amber-500/40' };
      case 'impressed':
        return { label: 'Impressed 💡', bg: 'bg-teal-500/20 text-teal-300 border-teal-500/40' };
      case 'tough':
        return { label: 'Pressuring 😠', bg: 'bg-rose-500/20 text-rose-300 border-rose-500/40' };
      case 'cash_ready':
        return { label: 'Ready to Deal 💸', bg: 'bg-emerald-400/20 text-emerald-300 border-emerald-400/50' };
      default:
        return { label: 'Listening 😐', bg: 'bg-slate-800/80 text-slate-400 border-slate-700' };
    }
  };

  const getBorderColor = (id: JudgeId, isActive: boolean) => {
    if (isActive) return 'border-cyan-400 shadow-cyan-500/20';
    switch (id) {
      case 'vc':
        return 'border-l-cyan-500';
      case 'founder':
        return 'border-l-emerald-500';
      case 'customer':
        return 'border-l-blue-500';
      case 'angel':
        return 'border-l-amber-500';
      default:
        return 'border-l-cyan-500';
    }
  };

  return (
    <div className="w-full bg-slate-900/80 border border-slate-800 p-4 sm:p-6 shadow-2xl relative overflow-hidden">
      {/* Geometric Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-cyan-400 rounded-none transform rotate-45 animate-pulse" />
          <h2 className="text-[11px] uppercase tracking-[0.2em] font-mono text-slate-400">
            THE COUNCIL OF SHARKS
          </h2>
        </div>
        <span className="text-[10px] font-mono text-cyan-500 uppercase tracking-widest">
          SECURE_AI_LINK_CONNECTED
        </span>
      </div>

      {/* 4 Sharks Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {JUDGES.map((judge) => {
          const isActive = activeJudgeId === judge.id;
          const emotion: JudgeEmotion = (judgeEmotions[judge.id] as JudgeEmotion) || 'neutral';
          const badge = getEmotionBadge(emotion);
          const hasSpeechBubble = activeReactionText && activeReactionText.judgeId === judge.id;
          const borderColorClass = getBorderColor(judge.id, isActive);

          return (
            <motion.div
              key={judge.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className={`relative bg-slate-900/60 p-4 border-l-4 border-y border-r border-y-slate-800/80 border-r-slate-800/80 transition-all duration-300 flex flex-col justify-between ${borderColorClass} ${
                isActive ? 'bg-slate-900 shadow-lg border-y-cyan-500/50 border-r-cyan-500/50' : 'opacity-90 hover:opacity-100'
              }`}
            >
              {/* Active Indicator Tag */}
              {isActive && (
                <div className="absolute -top-2.5 right-3 px-2 py-0.5 bg-cyan-500 text-slate-950 font-mono font-bold text-[9px] uppercase tracking-widest rounded-sm">
                  INTERROGATING
                </div>
              )}

              {/* Avatar & Header */}
              <div>
                <div className="flex items-center gap-3 mb-2.5">
                  <div className="relative shrink-0">
                    <img
                      src={judge.avatar}
                      alt={judge.name}
                      className="w-10 h-10 rounded-none bg-slate-800 border border-slate-700 object-cover"
                    />
                  </div>

                  <div className="min-w-0">
                    <div className="text-xs font-bold text-white uppercase tracking-tight truncate">
                      {judge.name}
                    </div>
                    <div className="text-[10px] font-mono text-cyan-400 tracking-wider truncate uppercase">
                      {judge.roleTitle}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className={`inline-block px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider border rounded-sm ${badge.bg}`}>
                    {badge.label}
                  </span>
                </div>

                <p className="text-[11px] leading-relaxed text-slate-400 italic line-clamp-2">
                  "{judge.focusArea}"
                </p>
              </div>

              {/* Speech Reaction Bubble */}
              {hasSpeechBubble && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 p-2.5 bg-cyan-950/90 border border-cyan-800/60 text-[11px] text-cyan-200 font-mono leading-tight"
                >
                  <span className="block text-[9px] font-bold text-cyan-400 uppercase tracking-widest mb-1">
                    {judge.name}
                  </span>
                  {activeReactionText.text}
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
