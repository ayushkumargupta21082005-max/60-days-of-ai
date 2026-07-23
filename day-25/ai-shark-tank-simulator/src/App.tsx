import React, { useState } from 'react';
import { Header } from './components/Header';
import { SharkArena } from './components/SharkArena';
import { PitchInputForm } from './components/PitchInputForm';
import { QnaRoundView } from './components/QnaRoundView';
import { ScoringOverview } from './components/ScoringOverview';
import { DealRoomView } from './components/DealRoomView';
import { LeaderboardModal } from './components/LeaderboardModal';
import {
  StartupPitch,
  QnAItem,
  InvestmentDecision,
  JudgeId,
  JudgeEmotion,
} from './types';
import { evaluateStartupPitch } from './utils/aiEngine';

export default function App() {
  const [currentStep, setCurrentStep] = useState<'input' | 'qna' | 'scoring' | 'deal'>('input');
  const [pitch, setPitch] = useState<StartupPitch | null>(null);
  const [qnaHistory, setQnaHistory] = useState<QnAItem[]>([]);
  const [decision, setDecision] = useState<InvestmentDecision | null>(null);
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);

  const [activeJudgeId, setActiveJudgeId] = useState<JudgeId | undefined>();
  const [judgeEmotions, setJudgeEmotions] = useState<Record<JudgeId, JudgeEmotion>>({
    vc: 'neutral',
    founder: 'neutral',
    customer: 'neutral',
    angel: 'neutral',
  });
  const [activeReactionText, setActiveReactionText] = useState<{ judgeId: JudgeId; text: string } | null>(null);

  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState<boolean>(false);

  // Submit Initial Pitch
  const handlePitchSubmit = (submittedPitch: StartupPitch) => {
    setPitch(submittedPitch);
    setCurrentStep('qna');
  };

  // Emotion Handler
  const handleJudgeEmotionChange = (
    emotions: Record<JudgeId, JudgeEmotion>,
    activeId?: JudgeId,
    reactionText?: { judgeId: JudgeId; text: string } | null
  ) => {
    setJudgeEmotions((prev) => ({ ...prev, ...emotions }));
    if (activeId !== undefined) setActiveJudgeId(activeId);
    if (reactionText !== undefined) setActiveReactionText(reactionText);
  };

  // Complete Q&A Round
  const handleCompleteQna = async (history: QnAItem[]) => {
    if (!pitch) return;
    setQnaHistory(history);
    setIsEvaluating(true);
    setCurrentStep('scoring');

    try {
      const result = await evaluateStartupPitch(pitch, history);
      setDecision(result);
    } catch (e) {
      console.error('Error evaluating pitch:', e);
    } finally {
      setIsEvaluating(false);
    }
  };

  // Reset Pitch
  const handleReset = () => {
    setCurrentStep('input');
    setPitch(null);
    setQnaHistory([]);
    setDecision(null);
    setActiveJudgeId(undefined);
    setActiveReactionText(null);
    setJudgeEmotions({
      vc: 'neutral',
      founder: 'neutral',
      customer: 'neutral',
      angel: 'neutral',
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Header Bar */}
      <Header
        onOpenLeaderboard={() => setIsLeaderboardOpen(true)}
        onResetPitch={handleReset}
        currentStep={currentStep}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        {/* Shark Panel Desk Arena (Always Visible at Top) */}
        <SharkArena
          activeJudgeId={activeJudgeId}
          judgeEmotions={judgeEmotions}
          activeReactionText={activeReactionText}
        />

        {/* Step Views */}
        {currentStep === 'input' && (
          <PitchInputForm onSubmitPitch={handlePitchSubmit} />
        )}

        {currentStep === 'qna' && pitch && (
          <QnaRoundView
            pitch={pitch}
            onCompleteQna={handleCompleteQna}
            onJudgeEmotionChange={handleJudgeEmotionChange}
          />
        )}

        {currentStep === 'scoring' && pitch && (
          isEvaluating || !decision ? (
            <div className="w-full max-w-2xl mx-auto text-center py-20 space-y-4">
              <div className="w-14 h-14 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-xl font-black text-cyan-300">
                The Sharks are deliberating in executive session...
              </p>
              <p className="text-xs text-slate-400 font-mono">
                Calculating unit economics, market potential & valuation benchmarks
              </p>
            </div>
          ) : (
            <ScoringOverview
              pitch={pitch}
              decision={decision}
              onProceedToDealRoom={() => setCurrentStep('deal')}
            />
          )
        )}

        {currentStep === 'deal' && pitch && decision && (
          <DealRoomView
            pitch={pitch}
            decision={decision}
            onResetPitch={handleReset}
            onOpenLeaderboard={() => setIsLeaderboardOpen(true)}
          />
        )}
      </main>

      {/* Leaderboard Modal */}
      <LeaderboardModal
        isOpen={isLeaderboardOpen}
        onClose={() => setIsLeaderboardOpen(false)}
      />

      {/* Footer */}
      <footer className="mt-16 border-t border-slate-900 py-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 AI Shark Tank Simulator • Powered by Gemini 3.6 Flash & Web Audio Engine</p>
          <div className="flex items-center space-x-4">
            <span className="text-slate-400 font-medium">4 Shark Personas: VC, Founder, Customer, Angel</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
