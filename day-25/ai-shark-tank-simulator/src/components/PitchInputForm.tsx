import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, DollarSign, Percent, Zap, Building2, User, HelpCircle, ArrowRight } from 'lucide-react';
import { StartupPitch, SAMPLE_PITCHES } from '../types';
import { sounds } from '../utils/soundEffects';

interface PitchInputFormProps {
  onSubmitPitch: (pitch: StartupPitch) => void;
}

export const PitchInputForm: React.FC<PitchInputFormProps> = ({ onSubmitPitch }) => {
  const [pitch, setPitch] = useState<StartupPitch>({
    startupName: '',
    founderName: '',
    problemStatement: '',
    solution: '',
    revenueModel: '',
    targetAudience: '',
    fundingAskAmount: 500000,
    equityOffered: 10,
    valuation: 5000000,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const calculateValuation = (ask: number, equity: number) => {
    if (equity <= 0) return 0;
    return Math.round(ask / (equity / 100));
  };

  const handleAskChange = (ask: number) => {
    const val = calculateValuation(ask, pitch.equityOffered);
    setPitch((prev) => ({ ...prev, fundingAskAmount: ask, valuation: val }));
  };

  const handleEquityChange = (equity: number) => {
    const val = calculateValuation(pitch.fundingAskAmount, equity);
    setPitch((prev) => ({ ...prev, equityOffered: equity, valuation: val }));
  };

  const loadSample = (sample: StartupPitch) => {
    sounds.playChime();
    setPitch({ ...sample });
    setErrors({});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!pitch.startupName.trim()) newErrors.startupName = 'Startup Name is required';
    if (!pitch.problemStatement.trim()) newErrors.problemStatement = 'Problem Statement is required';
    if (!pitch.solution.trim()) newErrors.solution = 'Solution description is required';
    if (!pitch.revenueModel.trim()) newErrors.revenueModel = 'Revenue Model is required';
    if (!pitch.targetAudience.trim()) newErrors.targetAudience = 'Target Audience is required';
    if (pitch.fundingAskAmount <= 0) newErrors.fundingAskAmount = 'Enter a valid funding ask';
    if (pitch.equityOffered <= 0 || pitch.equityOffered > 80) newErrors.equityOffered = 'Equity must be between 1% and 80%';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      sounds.playBuzzer();
      return;
    }

    sounds.playGavel();
    onSubmitPitch(pitch);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Sample Startups Banner */}
      <div className="bg-slate-900 border border-slate-800 p-4 sm:p-5 shadow-xl">
        <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-slate-300">
              PRE-CONFIGURED STARTUP TEMPLATES
            </span>
          </div>
          <span className="text-[10px] font-mono text-cyan-500 uppercase tracking-widest hidden sm:inline">
            1-CLICK_LOAD
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {SAMPLE_PITCHES.map((sample) => (
            <button
              key={sample.startupName}
              type="button"
              onClick={() => loadSample(sample)}
              className={`p-3 border text-left transition flex flex-col justify-between rounded-sm ${
                pitch.startupName === sample.startupName
                  ? 'bg-cyan-950/90 border-cyan-500 text-cyan-200'
                  : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
              }`}
            >
              <span className="text-xs font-bold uppercase tracking-tight truncate">{sample.startupName}</span>
              <span className="text-[10px] text-cyan-400 font-mono mt-1">
                ${(sample.fundingAskAmount / 1000).toFixed(0)}k for {sample.equityOffered}%
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <div className="text-[10px] font-mono text-cyan-500 uppercase tracking-[0.2em] mb-1">
            DOSSIER_INITIALIZATION
          </div>
          <h2 className="text-xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
            <span>🚀</span> PREPARE YOUR PITCH DOSSIER
          </h2>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            Specify your startup parameters. The Sharks will interrogate every number and thesis.
          </p>
        </div>

        {/* Startup & Founder Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-[0.15em] text-slate-300 mb-2">
              STARTUP NAME *
            </label>
            <div className="relative">
              <Building2 className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder="e.g. Oceanic CleanTech"
                value={pitch.startupName}
                onChange={(e) => setPitch({ ...pitch, startupName: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-700 rounded-sm text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition font-sans"
              />
            </div>
            {errors.startupName && <p className="text-xs text-rose-400 mt-1 font-mono">{errors.startupName}</p>}
          </div>

          <div>
            <label className="block text-[11px] font-mono uppercase tracking-[0.15em] text-slate-300 mb-2">
              FOUNDER NAME (OPTIONAL)
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder="e.g. Alex Rivera"
                value={pitch.founderName}
                onChange={(e) => setPitch({ ...pitch, founderName: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-700 rounded-sm text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition font-sans"
              />
            </div>
          </div>
        </div>

        {/* Problem Statement */}
        <div>
          <label className="block text-[11px] font-mono uppercase tracking-[0.15em] text-slate-300 mb-2">
            PROBLEM STATEMENT *
          </label>
          <textarea
            rows={2}
            placeholder="What massive pain point or market inefficiency does your product solve?"
            value={pitch.problemStatement}
            onChange={(e) => setPitch({ ...pitch, problemStatement: e.target.value })}
            className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-sm text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition font-sans"
          />
          {errors.problemStatement && <p className="text-xs text-rose-400 mt-1 font-mono">{errors.problemStatement}</p>}
        </div>

        {/* Solution */}
        <div>
          <label className="block text-[11px] font-mono uppercase tracking-[0.15em] text-slate-300 mb-2">
            SOLUTION & DEFENSIBILITY *
          </label>
          <textarea
            rows={2}
            placeholder="Describe your solution and what proprietary moat makes it hard to replicate."
            value={pitch.solution}
            onChange={(e) => setPitch({ ...pitch, solution: e.target.value })}
            className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-sm text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition font-sans"
          />
          {errors.solution && <p className="text-xs text-rose-400 mt-1 font-mono">{errors.solution}</p>}
        </div>

        {/* Revenue Model & Target Audience */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-[0.15em] text-slate-300 mb-2">
              REVENUE MODEL *
            </label>
            <input
              type="text"
              placeholder="e.g. $49/mo SaaS subscription + 2% transaction fee"
              value={pitch.revenueModel}
              onChange={(e) => setPitch({ ...pitch, revenueModel: e.target.value })}
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-sm text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition font-sans"
            />
            {errors.revenueModel && <p className="text-xs text-rose-400 mt-1 font-mono">{errors.revenueModel}</p>}
          </div>

          <div>
            <label className="block text-[11px] font-mono uppercase tracking-[0.15em] text-slate-300 mb-2">
              TARGET AUDIENCE / TAM *
            </label>
            <input
              type="text"
              placeholder="e.g. 70M EV drivers and highway operators"
              value={pitch.targetAudience}
              onChange={(e) => setPitch({ ...pitch, targetAudience: e.target.value })}
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-sm text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition font-sans"
            />
            {errors.targetAudience && <p className="text-xs text-rose-400 mt-1 font-mono">{errors.targetAudience}</p>}
          </div>
        </div>

        {/* Funding Ask & Equity */}
        <div className="p-5 bg-slate-950 border border-slate-800 rounded-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-cyan-400 flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5" /> THE ASK & VALUATION
            </span>
            <div className="text-right font-mono">
              <span className="text-[10px] uppercase text-slate-500 tracking-wider">VALUATION: </span>
              <span className="text-sm font-bold text-amber-300">
                ${pitch.valuation.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-mono uppercase text-slate-300 mb-1.5">
                FUNDING ASK ($)
              </label>
              <input
                type="number"
                step={25000}
                min={10000}
                value={pitch.fundingAskAmount}
                onChange={(e) => handleAskChange(Number(e.target.value))}
                className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-sm text-sm font-mono text-cyan-300 focus:outline-none focus:border-cyan-500 transition"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase text-slate-300 mb-1.5">
                EQUITY OFFERED (%)
              </label>
              <input
                type="number"
                min={1}
                max={50}
                value={pitch.equityOffered}
                onChange={(e) => handleEquityChange(Number(e.target.value))}
                className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-sm text-sm font-mono text-cyan-300 focus:outline-none focus:border-cyan-500 transition"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3.5 bg-white text-slate-950 hover:bg-cyan-400 font-black text-xs sm:text-sm rounded-sm transition-colors uppercase tracking-widest flex items-center justify-center space-x-2"
        >
          <span>ENTER THE SHARK TANK ARENA</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
