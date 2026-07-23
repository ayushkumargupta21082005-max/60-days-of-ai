import React from 'react';
import { motion } from 'motion/react';
import { Award, TrendingUp, Zap, PieChart, ShieldCheck, DollarSign, ArrowRight } from 'lucide-react';
import { InvestmentDecision, JUDGES, StartupPitch } from '../types';
import { sounds } from '../utils/soundEffects';

interface ScoringOverviewProps {
  pitch: StartupPitch;
  decision: InvestmentDecision;
  onProceedToDealRoom: () => void;
}

export const ScoringOverview: React.FC<ScoringOverviewProps> = ({
  pitch,
  decision,
  onProceedToDealRoom,
}) => {
  const { categoryScores, overallScore } = decision;

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-emerald-400 border-emerald-500/50 bg-emerald-950/40';
    if (score >= 70) return 'text-cyan-400 border-cyan-500/50 bg-cyan-950/40';
    if (score >= 60) return 'text-amber-400 border-amber-500/50 bg-amber-950/40';
    return 'text-rose-400 border-rose-500/50 bg-rose-950/40';
  };

  const categories = [
    { name: 'Market Potential', score: categoryScores.marketPotential, icon: TrendingUp },
    { name: 'Innovation & Product', score: categoryScores.innovation, icon: Zap },
    { name: 'Business Model', score: categoryScores.businessModel, icon: PieChart },
    { name: 'Execution & Grit', score: categoryScores.execution, icon: ShieldCheck },
    { name: 'Investment Worthiness', score: categoryScores.investmentWorthiness, icon: DollarSign },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Total Score Header */}
      <div className="bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-2xl text-center relative overflow-hidden">
        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-cyan-950 border border-cyan-500/40 rounded-sm text-[10px] font-mono text-cyan-400 uppercase tracking-[0.2em] mb-4">
          <Award className="w-3.5 h-3.5 text-cyan-400" />
          <span>SCORECARD_EVALUATION</span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight uppercase mb-2">
          {pitch.startupName} DOSSIER METRICS
        </h2>
        <p className="text-xs text-slate-400 max-w-xl mx-auto font-sans leading-relaxed">
          Aggregated evaluation across 5 core startup pillars from all 4 Shark Tank panel judges.
        </p>

        {/* Geometric Score Box */}
        <div className="my-8 flex justify-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className={`w-36 h-36 sm:w-40 sm:h-40 rounded-none border-2 flex flex-col items-center justify-center shadow-xl font-mono ${getScoreColor(
              overallScore
            )}`}
          >
            <span className="text-4xl sm:text-5xl font-black tracking-tight">
              {overallScore}
            </span>
            <span className="text-[10px] uppercase tracking-widest text-slate-400 mt-1">
              / 100 POINTS
            </span>
          </motion.div>
        </div>
      </div>

      {/* 5 Criteria Metric Bars */}
      <div className="bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-2xl space-y-5">
        <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-slate-400 border-b border-slate-800 pb-3">
          PILLAR_BREAKDOWN_SCOREBOARD
        </div>

        <div className="space-y-4 font-mono">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const pct = (cat.score / 20) * 100;

            return (
              <div key={cat.name} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-200 flex items-center space-x-2">
                    <Icon className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="uppercase tracking-wider">{cat.name}</span>
                  </span>
                  <span className="font-bold text-cyan-400">
                    {cat.score} / 20
                  </span>
                </div>

                <div className="w-full h-1 bg-slate-800 rounded-none">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="h-full bg-cyan-500 rounded-none"
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Proceed to Deal Room Button */}
        <div className="pt-6 border-t border-slate-800 text-center">
          <button
            onClick={() => {
              sounds.playCashRegister();
              onProceedToDealRoom();
            }}
            className="w-full sm:w-auto px-8 py-3.5 bg-white text-slate-950 hover:bg-cyan-400 font-bold text-xs rounded-sm transition-colors uppercase tracking-widest flex items-center justify-center space-x-2 mx-auto"
          >
            <span>REVEAL SHARK VERDICT & DEAL OFFERS</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
