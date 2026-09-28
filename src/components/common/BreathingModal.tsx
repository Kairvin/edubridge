import React, { useState, useEffect } from 'react';
import { useClassroom } from '../../context/ClassroomContext';
import { X, Heart, Wind, CheckCircle2 } from 'lucide-react';

export const BreathingModal: React.FC = () => {
  const { breathingModalActive, setBreathingModalActive, breathingTargetStudentName } = useClassroom();
  const [phase, setPhase] = useState<'Inhale' | 'Hold' | 'Exhale'>('Inhale');
  const [countdown, setCountdown] = useState<number>(4);
  const [cyclesCompleted, setCyclesCompleted] = useState<number>(0);

  useEffect(() => {
    if (!breathingModalActive) {
      setCyclesCompleted(0);
      setPhase('Inhale');
      setCountdown(4);
      return;
    }

    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev > 1) {
          return prev - 1;
        }

        // transition phase
        if (phase === 'Inhale') {
          setPhase('Hold');
          return 7;
        } else if (phase === 'Hold') {
          setPhase('Exhale');
          return 8;
        } else {
          setPhase('Inhale');
          setCyclesCompleted(c => c + 1);
          return 4;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [breathingModalActive, phase]);

  if (!breathingModalActive) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#FAF9F5] border border-[#CBD5E1] rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative text-center overflow-hidden">
        {/* Decorative ambient gradient */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#CBDBD0] rounded-full blur-3xl opacity-60"></div>
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-[#C1DEE8] rounded-full blur-3xl opacity-60"></div>

        {/* Close Button */}
        <button
          onClick={() => setBreathingModalActive(false)}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title & Target */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E5ECE7] text-[#2D4E38] text-xs font-semibold uppercase tracking-wider mb-2">
          <Wind className="w-3.5 h-3.5" />
          Mindful Neuro-Reset Break
        </div>
        <h3 className="text-xl font-serif font-bold text-slate-800">
          Calm Reset for {breathingTargetStudentName}
        </h3>
        <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
          Deep diaphragmatic breathing normalizes blink rates and reduces autonomic cognitive overload.
        </p>

        {/* Animated Breathing Orb */}
        <div className="my-8 flex flex-col items-center justify-center">
          <div className="relative w-48 h-48 flex items-center justify-center">
            {/* Outer pulsating ring */}
            <div
              className={`absolute inset-0 rounded-full transition-all duration-1000 ${
                phase === 'Inhale'
                  ? 'scale-110 bg-[#387893]/15'
                  : phase === 'Hold'
                  ? 'scale-110 bg-[#4A7758]/20'
                  : 'scale-90 bg-slate-200/40'
              }`}
            ></div>

            {/* Inner Glowing Orb */}
            <div
              className={`w-36 h-36 rounded-full flex flex-col items-center justify-center text-white shadow-xl transition-all duration-1000 ${
                phase === 'Inhale'
                  ? 'scale-110 bg-gradient-to-tr from-[#387893] to-[#4A7758] shadow-[#4A7758]/30'
                  : phase === 'Hold'
                  ? 'scale-110 bg-gradient-to-tr from-[#4A7758] to-[#2D4E38] shadow-[#2D4E38]/30'
                  : 'scale-90 bg-gradient-to-tr from-slate-500 to-[#387893] shadow-slate-400/20'
              }`}
            >
              <span className="text-sm font-semibold tracking-wider uppercase opacity-90">
                {phase}
              </span>
              <span className="text-4xl font-extrabold my-0.5 font-mono">{countdown}</span>
              <span className="text-[10px] opacity-80">Seconds</span>
            </div>
          </div>

          {/* Phase instruction */}
          <div className="mt-4 text-xs font-medium text-slate-600">
            {phase === 'Inhale' && 'Breathe in slowly through your nose... expanding chest.'}
            {phase === 'Hold' && 'Hold gently. Let your heart rate synchronize.'}
            {phase === 'Exhale' && 'Release through your mouth softly... relaxing shoulders.'}
          </div>
        </div>

        {/* Cycles done & Completion CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-200/80 text-xs">
          <span className="text-slate-500 flex items-center gap-1">
            <Heart className="w-3.5 h-3.5 text-rose-500" />
            Cycles completed: <strong className="text-slate-700">{cyclesCompleted}</strong>
          </span>

          <button
            onClick={() => setBreathingModalActive(false)}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-[#2D4E38] text-white font-medium hover:bg-[#1E3326] transition-colors cursor-pointer"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>I feel refreshed</span>
          </button>
        </div>
      </div>
    </div>
  );
};
