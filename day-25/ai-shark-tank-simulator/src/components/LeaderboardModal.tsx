import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Trophy, Award, Trash2, X, DollarSign, ArrowUpRight } from 'lucide-react';
import { LeaderboardEntry } from '../types';
import { getLeaderboard } from '../utils/aiEngine';
import { sounds } from '../utils/soundEffects';

interface LeaderboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LeaderboardModal: React.FC<LeaderboardModalProps> = ({ isOpen, onClose }) => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    if (isOpen) {
      setEntries(getLeaderboard());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClear = () => {
    sounds.playBuzzer();
    localStorage.removeItem('shark_tank_leaderboard_v1');
    setEntries(getLeaderboard());
  };

  const getOutcomeBadge = (outcome: string) => {
    switch (outcome) {
      case 'invest':
        return <span className="px-2 py-0.5 bg-emerald-950 text-emerald-300 border border-emerald-500/40 rounded-sm text-[9px] font-mono uppercase tracking-widest">Invest 🚀</span>;
      case 'acquire':
        return <span className="px-2 py-0.5 bg-purple-950 text-purple-300 border border-purple-500/40 rounded-sm text-[9px] font-mono uppercase tracking-widest">Acquire 🏢</span>;
      case 'come_back_later':
        return <span className="px-2 py-0.5 bg-amber-950 text-amber-300 border border-amber-500/40 rounded-sm text-[9px] font-mono uppercase tracking-widest">Traction Needed ⏳</span>;
      default:
        return <span className="px-2 py-0.5 bg-rose-950 text-rose-300 border border-rose-500/40 rounded-sm text-[9px] font-mono uppercase tracking-widest">Rejected ❌</span>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-slate-900 border border-slate-800 rounded-sm p-6 sm:p-8 max-w-2xl w-full shadow-2xl space-y-6 max-h-[90vh] flex flex-col font-mono"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-amber-500/20 border border-amber-500/40 rounded-sm text-amber-300">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white uppercase tracking-wider">
                HALL_OF_FAME_LEADERBOARD
              </h2>
              <p className="text-xs text-slate-400 font-sans">
                Top rated startup pitches evaluated by the AI Sharks
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sounds.playChime();
              onClose();
            }}
            className="p-1.5 text-slate-400 hover:text-white rounded-sm bg-slate-950 border border-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Entries List */}
        <div className="overflow-y-auto flex-1 space-y-3 pr-1">
          {entries.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-xs font-mono">
              NO_PITCH_ENTRIES_LOGGED_YET
            </div>
          ) : (
            entries.map((entry, idx) => (
              <div
                key={entry.id}
                className="bg-slate-950 border border-slate-800 rounded-sm p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:border-slate-700 transition"
              >
                <div className="flex items-center space-x-3.5">
                  <div className={`w-7 h-7 rounded-sm font-bold text-xs flex items-center justify-center font-mono ${
                    idx === 0
                      ? 'bg-amber-400 text-slate-950'
                      : idx === 1
                      ? 'bg-slate-300 text-slate-950'
                      : idx === 2
                      ? 'bg-amber-700 text-white'
                      : 'bg-slate-800 text-slate-400'
                  }`}>
                    #{idx + 1}
                  </div>

                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-xs font-bold text-white uppercase">
                        {entry.startupName}
                      </h3>
                      {getOutcomeBadge(entry.outcome)}
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5 font-sans">
                      Founder: {entry.founderName} • {entry.date}
                    </p>
                  </div>
                </div>

                <div className="text-left sm:text-right w-full sm:w-auto border-t sm:border-0 border-slate-800 pt-2 sm:pt-0">
                  <div className="text-xs font-bold text-cyan-400 font-mono">
                    SCORE: {entry.score} / 100
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">
                    VALUATION: ${entry.valuation.toLocaleString()}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
          <button
            onClick={handleClear}
            className="px-3 py-2 text-rose-400 hover:text-rose-300 text-xs font-mono uppercase tracking-wider flex items-center space-x-1.5 transition"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>PURGE LEADERBOARD</span>
          </button>

          <button
            onClick={onClose}
            className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-sm transition uppercase tracking-widest"
          >
            CLOSE
          </button>
        </div>
      </motion.div>
    </div>
  );
};
