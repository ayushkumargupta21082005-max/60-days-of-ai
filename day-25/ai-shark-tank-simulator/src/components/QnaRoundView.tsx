import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle2, MessageSquare, ArrowRight, Sparkles, AlertCircle } from 'lucide-react';
import { StartupPitch, QnAItem, JUDGES, JudgeId, JudgeEmotion } from '../types';
import { generateJudgeQuestions, generateJudgeReaction } from '../utils/aiEngine';
import { sounds } from '../utils/soundEffects';

interface QnaRoundViewProps {
  pitch: StartupPitch;
  onCompleteQna: (qnaHistory: QnAItem[]) => void;
  onJudgeEmotionChange: (emotions: Record<JudgeId, JudgeEmotion>, activeJudgeId?: JudgeId, reactionText?: { judgeId: JudgeId; text: string } | null) => void;
}

export const QnaRoundView: React.FC<QnaRoundViewProps> = ({
  pitch,
  onCompleteQna,
  onJudgeEmotionChange,
}) => {
  const [round, setRound] = useState<number>(1);
  const [qnaList, setQnaList] = useState<QnAItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [allHistory, setAllHistory] = useState<QnAItem[]>([]);

  // Load questions for current round
  useEffect(() => {
    let isMounted = true;
    async function loadQuestions() {
      setIsLoading(true);
      try {
        const questions = await generateJudgeQuestions(pitch, round);
        if (isMounted) {
          setQnaList(questions);
          setCurrentIndex(0);
          setUserAnswer('');
          setIsLoading(false);

          // Set active judge
          if (questions.length > 0) {
            onJudgeEmotionChange(
              { vc: 'neutral', founder: 'neutral', customer: 'neutral', angel: 'neutral' },
              questions[0].judgeId,
              null
            );
          }
        }
      } catch (e) {
        console.error('Failed loading questions:', e);
        if (isMounted) setIsLoading(false);
      }
    }
    loadQuestions();
    return () => {
      isMounted = false;
    };
  }, [round, pitch]);

  const currentQ = qnaList[currentIndex];
  const activeJudge = JUDGES.find((j) => j.id === currentQ?.judgeId);

  const handleAnswerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userAnswer.trim() || !currentQ) return;

    sounds.playChime();

    // Generate dynamic judge reaction
    const updatedItem: QnAItem = {
      ...currentQ,
      userAnswer: userAnswer.trim(),
      isAnswered: true,
    };

    const reaction = generateJudgeReaction(updatedItem, pitch);
    updatedItem.judgeReactionText = reaction.reactionText;
    updatedItem.judgeReactionEmotion = reaction.emotion;

    // Update emotions state
    onJudgeEmotionChange(
      { [currentQ.judgeId]: reaction.emotion } as any,
      currentQ.judgeId,
      { judgeId: currentQ.judgeId, text: reaction.reactionText }
    );

    const newQnaList = [...qnaList];
    newQnaList[currentIndex] = updatedItem;
    setQnaList(newQnaList);

    const newAllHistory = [...allHistory, updatedItem];
    setAllHistory(newAllHistory);

    // Advance to next question or next round
    if (currentIndex + 1 < qnaList.length) {
      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
        setUserAnswer('');
        const nextQ = qnaList[currentIndex + 1];
        if (nextQ) {
          onJudgeEmotionChange({}, nextQ.judgeId, null);
        }
      }, 1200);
    } else {
      // End of this round
      if (round === 1) {
        setTimeout(() => {
          sounds.playGavel();
          setRound(2);
        }, 1500);
      } else {
        // Complete Q&A
        setTimeout(() => {
          sounds.playCashRegister();
          onCompleteQna(newAllHistory);
        }, 1500);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-3xl mx-auto text-center py-16 space-y-4">
        <div className="w-10 h-10 border-2 border-cyan-400 border-t-transparent rounded-none animate-spin mx-auto" />
        <p className="text-white font-bold text-base uppercase tracking-wider font-mono">
          THE SHARKS ARE REVIEWING YOUR DOSSIER FOR ROUND {round}...
        </p>
        <p className="text-[10px] text-cyan-500 font-mono uppercase tracking-widest">
          GENERATING_TARGETED_INTERROGATION_QUESTIONS
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Pitch Summary Bar */}
      <div className="bg-slate-900 border border-slate-800 p-4 sm:p-5 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 bg-cyan-950 text-cyan-400 border border-cyan-500/40 rounded-sm text-[9px] font-mono uppercase tracking-widest">
              ROUND {round} OF 2
            </span>
            <h3 className="text-base font-bold text-white tracking-tight uppercase">
              {pitch.startupName}
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1 line-clamp-1 font-sans">
            <span className="text-slate-300 font-mono uppercase">PROBLEM:</span> {pitch.problemStatement}
          </p>
        </div>

        <div className="bg-slate-950 px-4 py-2 border border-slate-800 text-right font-mono">
          <span className="text-[9px] text-slate-500 uppercase tracking-widest block">THE ASK</span>
          <span className="text-xs font-bold text-amber-300">
            ${pitch.fundingAskAmount.toLocaleString()} for {pitch.equityOffered}%
          </span>
        </div>
      </div>

      {/* Geometric Progress Tracker */}
      <div className="flex items-center space-x-2 px-1">
        {qnaList.map((q, idx) => (
          <div
            key={q.id}
            className={`h-1 flex-1 transition-all duration-300 ${
              idx < currentIndex
                ? 'bg-emerald-400'
                : idx === currentIndex
                ? 'bg-cyan-400'
                : 'bg-slate-800'
            }`}
          />
        ))}
      </div>

      {/* Main Q&A Card */}
      <AnimatePresence mode="wait">
        {currentQ && (
          <motion.div
            key={currentQ.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-2xl space-y-6"
          >
            {/* Judge Question Header */}
            <div className="flex items-start space-x-4 border-b border-slate-800 pb-5">
              <img
                src={activeJudge?.avatar}
                alt={activeJudge?.name}
                className="w-12 h-12 rounded-none bg-slate-800 border border-slate-700 object-cover shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest">
                    {activeJudge?.roleTitle}
                  </span>
                  <span className="text-slate-600">•</span>
                  <span className="text-xs text-slate-400 font-mono">{activeJudge?.name}</span>
                </div>
                <h4 className="text-base sm:text-lg font-bold text-white mt-1 leading-relaxed">
                  "{currentQ.question}"
                </h4>
              </div>
            </div>

            {/* Answer Input */}
            {!currentQ.isAnswered ? (
              <form onSubmit={handleAnswerSubmit} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-[0.15em] text-slate-300 mb-2">
                    YOUR RESPONSE TO {activeJudge?.name.toUpperCase()} *
                  </label>
                  <textarea
                    rows={4}
                    autoFocus
                    placeholder="Provide a sharp, data-backed answer highlighting unit economics, defensibility, or traction..."
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-sm text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition font-sans"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-400 uppercase">
                    QUESTION {currentIndex + 1} OF {qnaList.length}
                  </span>
                  <button
                    type="submit"
                    disabled={!userAnswer.trim()}
                    className="px-6 py-3 bg-white text-slate-950 hover:bg-cyan-400 disabled:opacity-50 font-bold text-xs rounded-sm transition-colors uppercase tracking-widest flex items-center space-x-2"
                  >
                    <span>SEND RESPONSE</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            ) : (
              /* Reaction Display */
              <div className="p-5 bg-slate-950 border border-cyan-500/40 rounded-sm space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> ANSWER_LOGGED
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 uppercase">
                    EMOTION: {currentQ.judgeReactionEmotion?.toUpperCase()}
                  </span>
                </div>
                <p className="text-sm text-slate-200 italic font-mono">
                  "{currentQ.judgeReactionText}"
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
