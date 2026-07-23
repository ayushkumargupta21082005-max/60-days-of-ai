import React, { useState } from 'react';
import { Trophy, Volume2, VolumeX, Download, RefreshCw, Sparkles } from 'lucide-react';
import { sounds } from '../utils/soundEffects';
import { downloadStandaloneHtml } from '../utils/aiEngine';

interface HeaderProps {
  onOpenLeaderboard: () => void;
  onResetPitch: () => void;
  currentStep: 'input' | 'qna' | 'scoring' | 'deal';
}

export const Header: React.FC<HeaderProps> = ({
  onOpenLeaderboard,
  onResetPitch,
  currentStep,
}) => {
  const [isMuted, setIsMuted] = useState<boolean>(sounds.getMuted());

  const handleToggleSound = () => {
    const muted = sounds.toggleMute();
    setIsMuted(muted);
    if (!muted) {
      sounds.playChime();
    }
  };

  const handleExportHtml = () => {
    sounds.playChime();
    downloadStandaloneHtml();
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0f172a] border-b border-cyan-900/50 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
        {/* Brand Logo with Geometric Diamond */}
        <div className="flex items-center space-x-3.5 cursor-pointer" onClick={onResetPitch}>
          <div className="w-9 h-9 bg-cyan-500 rounded-sm flex items-center justify-center transform rotate-45 shadow-md shadow-cyan-500/20 shrink-0">
            <div className="w-4 h-4 bg-slate-950 flex items-center justify-center -rotate-45">
              <span className="text-xs">🦈</span>
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-lg font-black tracking-tighter text-white">
                AI SHARK TANK <span className="text-cyan-400 font-normal">SIMULATOR</span>
              </h1>
              <span className="px-2 py-0.5 text-[9px] font-mono uppercase tracking-[0.15em] text-cyan-400 bg-cyan-950 border border-cyan-500/40 rounded-sm">
                V4.2.0 CORE
              </span>
            </div>
            <p className="text-[11px] font-mono text-slate-400 hidden sm:block tracking-wide">
              SYSTEM_STATUS: <span className="text-emerald-400">ONLINE</span> • 4 AI SHARK COUNCILS
            </p>
          </div>
        </div>

        {/* Action Controls with Geometric Precision */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Audio Toggle */}
          <button
            onClick={handleToggleSound}
            className={`px-3 py-1.5 rounded-sm border transition flex items-center space-x-1.5 text-xs font-mono tracking-wider uppercase ${
              isMuted
                ? 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300'
                : 'bg-cyan-950/80 border-cyan-500/40 text-cyan-300 hover:bg-cyan-900/80'
            }`}
            title={isMuted ? 'Unmute Arena Sounds' : 'Mute Arena Sounds'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            <span className="hidden md:inline">{isMuted ? 'MUTE' : 'SOUND'}</span>
          </button>

          {/* Leaderboard */}
          <button
            onClick={() => {
              sounds.playChime();
              onOpenLeaderboard();
            }}
            className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-amber-500/50 text-amber-300 rounded-sm text-xs font-mono uppercase tracking-wider transition flex items-center space-x-1.5"
          >
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>Leaderboard</span>
          </button>

          {/* Export HTML */}
          <button
            onClick={handleExportHtml}
            className="px-3.5 py-1.5 bg-cyan-950 hover:bg-cyan-900 border border-cyan-500/50 text-cyan-300 rounded-sm text-xs font-mono uppercase tracking-wider transition flex items-center space-x-1.5"
            title="Download complete standalone single HTML file"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Export HTML</span>
          </button>

          {/* New Pitch Reset */}
          {currentStep !== 'input' && (
            <button
              onClick={() => {
                sounds.playGavel();
                onResetPitch();
              }}
              className="px-4 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-sm border border-cyan-400 text-xs tracking-wider uppercase transition flex items-center space-x-1.5 shadow-md shadow-cyan-600/30"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>New Pitch</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
