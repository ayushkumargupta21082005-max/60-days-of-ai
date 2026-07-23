import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  DollarSign,
  Download,
  Share2,
  CheckCircle2,
  XCircle,
  Building2,
  Clock,
  Sparkles,
  RefreshCw,
  Trophy,
  ArrowUpRight,
  Handshake,
  MessageSquare,
} from 'lucide-react';
import {
  StartupPitch,
  InvestmentDecision,
  JUDGES,
  JudgeId,
  DecisionOutcome,
} from '../types';
import { downloadPdfReport, saveToLeaderboard } from '../utils/aiEngine';
import { sounds } from '../utils/soundEffects';

interface DealRoomViewProps {
  pitch: StartupPitch;
  decision: InvestmentDecision;
  onResetPitch: () => void;
  onOpenLeaderboard: () => void;
}

export const DealRoomView: React.FC<DealRoomViewProps> = ({
  pitch,
  decision,
  onResetPitch,
  onOpenLeaderboard,
}) => {
  const [copiedShare, setCopiedShare] = useState<boolean>(false);
  const [showCounterModal, setShowCounterModal] = useState<boolean>(false);
  const [counterValuation, setCounterValuation] = useState<number>(decision.suggestedValuation);
  const [counterEquity, setCounterEquity] = useState<number>(pitch.equityOffered);
  const [counterResponse, setCounterResponse] = useState<string | null>(null);

  const { overallOutcome, suggestedValuation, finalFundingAmount, finalEquityPercent } = decision;

  // Trigger Confetti on Invest or Acquire
  useEffect(() => {
    if (overallOutcome === 'invest' || overallOutcome === 'acquire') {
      sounds.playCashRegister();
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#06b6d4', '#10b981', '#f59e0b', '#a855f7'],
      });
    } else if (overallOutcome === 'reject') {
      sounds.playBuzzer();
    } else {
      sounds.playGavel();
    }

    // Auto save to leaderboard
    saveToLeaderboard({
      startupName: pitch.startupName,
      founderName: pitch.founderName || 'Anonymous Founder',
      score: decision.overallScore,
      outcome: decision.overallOutcome,
      fundingAmount: finalFundingAmount,
      equityPercent: finalEquityPercent,
      valuation: suggestedValuation,
      summary: pitch.problemStatement,
    });
  }, [overallOutcome]);

  const getOutcomeBanner = () => {
    switch (overallOutcome) {
      case 'invest':
        return {
          title: '🚀 WE HAVE A DEAL!',
          badge: 'INVESTMENT OFFER ACCEPTED',
          bg: 'bg-slate-900 border-emerald-500/60',
          textColor: 'text-emerald-400',
          icon: CheckCircle2,
          iconColor: 'text-emerald-400',
        };
      case 'acquire':
        return {
          title: '🏢 OUTRIGHT ACQUISITION OFFER!',
          badge: 'FULL BUYOUT OFFERED',
          bg: 'bg-slate-900 border-purple-500/60',
          textColor: 'text-purple-300',
          icon: Building2,
          iconColor: 'text-purple-400',
        };
      case 'come_back_later':
        return {
          title: '⏳ COME BACK LATER',
          badge: 'TRACTION MILESTONE NEEDED',
          bg: 'bg-slate-900 border-amber-500/60',
          textColor: 'text-amber-300',
          icon: Clock,
          iconColor: 'text-amber-400',
        };
      default:
        return {
          title: '❌ REJECTED - NO DEAL',
          badge: "AND FOR THAT REASON, I'M OUT",
          bg: 'bg-slate-900 border-rose-500/60',
          textColor: 'text-rose-400',
          icon: XCircle,
          iconColor: 'text-rose-400',
        };
    }
  };

  const banner = getOutcomeBanner();
  const IconComponent = banner.icon;

  const handleShare = () => {
    sounds.playChime();
    const text = `🦈 AI Shark Tank Pitch Result for "${pitch.startupName}":\n` +
      `Verdict: ${overallOutcome.toUpperCase()}\n` +
      `Score: ${decision.overallScore}/100\n` +
      `Valuation: $${suggestedValuation.toLocaleString()}\n` +
      `Try the AI Shark Tank Simulator now!`;

    navigator.clipboard.writeText(text);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 3000);
  };

  const handleCounterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sounds.playGavel();

    // Heuristic counter offer evaluation
    if (counterValuation > pitch.valuation * 1.5) {
      setCounterResponse(`Mark Sterling: "That valuation counter is way too high! You are pushing your luck. I'm standing firm at $${suggestedValuation.toLocaleString()} or I'm out!"`);
    } else {
      setCounterResponse(`Victoria Chen: "Fair counter-offer! We agree to $${counterValuation.toLocaleString()} valuation for ${counterEquity}% equity. Shake on it! 🤝"`);
      confetti({ particleCount: 80, spread: 60 });
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Decision Banner */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={`border p-6 sm:p-8 shadow-2xl relative text-center rounded-sm ${banner.bg}`}
      >
        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-slate-950 border border-slate-700 text-[10px] font-mono text-slate-300 uppercase tracking-[0.2em] mb-4">
          <IconComponent className={`w-3.5 h-3.5 ${banner.iconColor}`} />
          <span>{banner.badge}</span>
        </div>

        <h2 className={`text-2xl sm:text-4xl font-black tracking-tight ${banner.textColor} mb-3 uppercase`}>
          {banner.title}
        </h2>

        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed font-sans">
          {decision.primaryReasoning}
        </p>

        {/* Deal Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-6 border-t border-slate-800 font-mono">
          <div className="bg-slate-950 p-4 border border-slate-800 rounded-sm">
            <span className="text-[10px] uppercase tracking-widest text-slate-400 block mb-1">
              SUGGESTED VALUATION
            </span>
            <span className="text-xl font-bold text-amber-300">
              ${suggestedValuation.toLocaleString()}
            </span>
          </div>

          <div className="bg-slate-950 p-4 border border-slate-800 rounded-sm">
            <span className="text-[10px] uppercase tracking-widest text-slate-400 block mb-1">
              FUNDING OFFERED
            </span>
            <span className="text-xl font-bold text-emerald-400">
              ${finalFundingAmount.toLocaleString()}
            </span>
          </div>

          <div className="bg-slate-950 p-4 border border-slate-800 rounded-sm">
            <span className="text-[10px] uppercase tracking-widest text-slate-400 block mb-1">
              EQUITY DEMANDED
            </span>
            <span className="text-xl font-bold text-cyan-300">
              {finalEquityPercent}% EQUITY
            </span>
          </div>
        </div>
      </motion.div>

      {/* Individual Sharks' Offers & Comments */}
      <div className="bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-2xl space-y-6">
        <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-slate-400 border-b border-slate-800 pb-3">
          INDIVIDUAL_SHARK_OFFER_LOGS
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {JUDGES.map((judge) => {
            const offer = decision.judgeOffers[judge.id];
            if (!offer) return null;

            const isDeal = offer.outcome === 'invest' || offer.outcome === 'acquire';

            return (
              <div
                key={judge.id}
                className={`p-4 border transition rounded-sm ${
                  isDeal
                    ? 'bg-slate-950 border-emerald-500/50 shadow-md'
                    : 'bg-slate-950/60 border-slate-800'
                }`}
              >
                <div className="flex items-center space-x-3 mb-3">
                  <img
                    src={judge.avatar}
                    alt={judge.name}
                    className="w-10 h-10 rounded-none bg-slate-800 border border-slate-700 object-cover"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-tight">{judge.name}</h4>
                    <span className={`text-[10px] font-mono font-bold uppercase ${isDeal ? 'text-emerald-400' : 'text-slate-400'}`}>
                      {offer.offerText}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 italic mb-2 font-mono">
                  "{offer.sharkQuote}"
                </p>
                <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                  {offer.reasoning}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Actions Toolbar */}
      <div className="bg-slate-900 border border-slate-800 p-5 shadow-2xl flex flex-wrap items-center justify-between gap-4 font-mono">
        {/* Left Actions */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => {
              sounds.playChime();
              downloadPdfReport(pitch, decision);
            }}
            className="px-3.5 py-2 bg-slate-950 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold rounded-sm text-xs transition flex items-center space-x-2 uppercase tracking-wider"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            <span>PDF REPORT</span>
          </button>

          <button
            onClick={handleShare}
            className="px-3.5 py-2 bg-slate-950 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold rounded-sm text-xs transition flex items-center space-x-2 uppercase tracking-wider"
          >
            <Share2 className="w-3.5 h-3.5 text-amber-400" />
            <span>{copiedShare ? 'COPIED! ✓' : 'SHARE RESULT'}</span>
          </button>

          {(overallOutcome === 'invest' || overallOutcome === 'come_back_later') && (
            <button
              onClick={() => {
                sounds.playChime();
                setShowCounterModal(true);
              }}
              className="px-3.5 py-2 bg-cyan-950 hover:bg-cyan-900 border border-cyan-500/50 text-cyan-300 font-bold rounded-sm text-xs transition flex items-center space-x-2 uppercase tracking-wider"
            >
              <Handshake className="w-3.5 h-3.5 text-cyan-400" />
              <span>COUNTER OFFER</span>
            </button>
          )}
        </div>

        {/* Right Action */}
        <div className="flex items-center space-x-2">
          <button
            onClick={onOpenLeaderboard}
            className="px-3.5 py-2 bg-slate-950 hover:bg-slate-800 border border-slate-700 text-amber-300 font-bold rounded-sm text-xs transition flex items-center space-x-1.5 uppercase tracking-wider"
          >
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>LEADERBOARD</span>
          </button>

          <button
            onClick={() => {
              sounds.playGavel();
              onResetPitch();
            }}
            className="px-4 py-2 bg-white text-slate-950 hover:bg-cyan-400 font-bold rounded-sm text-xs transition flex items-center space-x-1.5 uppercase tracking-widest"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>NEW PITCH</span>
          </button>
        </div>
      </div>

      {/* Counter Offer Modal */}
      {showCounterModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-slate-900 border border-cyan-500/50 rounded-sm p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-5"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                <Handshake className="w-4 h-4 text-cyan-400" /> COUNTER-OFFER NEGOTIATION
              </h3>
              <button
                onClick={() => setShowCounterModal(false)}
                className="text-slate-400 hover:text-white text-xs font-mono"
              >
                [ESC]
              </button>
            </div>

            <p className="text-xs text-slate-400 font-sans leading-relaxed">
              Propose counter-terms to the Sharks. Push too hard and they may withdraw their offer.
            </p>

            <form onSubmit={handleCounterSubmit} className="space-y-4 font-mono">
              <div>
                <label className="block text-[10px] uppercase text-slate-300 mb-1">
                  COUNTER VALUATION ($)
                </label>
                <input
                  type="number"
                  step={250000}
                  value={counterValuation}
                  onChange={(e) => setCounterValuation(Number(e.target.value))}
                  className="w-full px-4 py-2 bg-slate-950 border border-slate-700 rounded-sm text-xs font-mono text-cyan-300"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase text-slate-300 mb-1">
                  COUNTER EQUITY OFFERED (%)
                </label>
                <input
                  type="number"
                  min={1}
                  max={50}
                  value={counterEquity}
                  onChange={(e) => setCounterEquity(Number(e.target.value))}
                  className="w-full px-4 py-2 bg-slate-950 border border-slate-700 rounded-sm text-xs font-mono text-cyan-300"
                />
              </div>

              {counterResponse && (
                <div className="p-3 bg-slate-950 border border-cyan-500/40 text-xs text-cyan-200 italic">
                  {counterResponse}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-white text-slate-950 hover:bg-cyan-400 font-bold text-xs uppercase tracking-widest rounded-sm"
              >
                SUBMIT COUNTER OFFER
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};
