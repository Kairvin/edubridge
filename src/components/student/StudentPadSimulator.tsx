import React, { useState } from 'react';
import { useClassroom } from '../../context/ClassroomContext';
import { SAMPLE_CURRICULUM_PROBLEM } from '../../data/studentsData';
import confetti from 'canvas-confetti';
import {
  Tablet,
  ShieldCheck,
  Cpu,
  Sparkles,
  Lightbulb,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Smile,
  Meh,
  Frown,
  Wind,
  Wifi,
  Battery,
  ArrowRight,
  BookOpen,
} from 'lucide-react';

export const StudentPadSimulator: React.FC = () => {
  const {
    students,
    activeStudentPadId,
    setActiveStudentPadId,
    sendHintToStudent,
    triggerBreathingBreak,
    playChime,
    currentScenario,
  } = useClassroom();

  const student = students.find(s => s.id === activeStudentPadId) || students[0];
  const problem = SAMPLE_CURRICULUM_PROBLEM;

  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [studentMood, setStudentMood] = useState<'focused' | 'confused' | 'calm'>('confused');
  const [showSimulatedEdgeCues, setShowSimulatedEdgeCues] = useState<boolean>(true);

  const handleSelectOption = (optId: string) => {
    setSelectedOption(optId);
  };

  const handleCheckAnswer = () => {
    if (!selectedOption) return;
    const optionObj = problem.options.find(o => o.id === selectedOption);
    const correct = !!optionObj?.isCorrect;
    setIsCorrect(correct);
    setSubmitted(true);

    if (correct) {
      playChime('success');
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#4A7758', '#387893', '#F59E0B', '#10B981'],
      });
      setStudentMood('focused');
    } else {
      playChime('soft_alert');
      setStudentMood('confused');
    }
  };

  const handleReset = () => {
    setSelectedOption(null);
    setSubmitted(false);
    setIsCorrect(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header & Student Switcher */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E5ECE7] text-[#2D4E38] text-xs font-semibold uppercase tracking-wider mb-1">
            <Tablet className="w-3.5 h-3.5" />
            Hardware Prototype Preview
          </div>
          <h1 className="text-xl sm:text-2xl font-bold font-serif text-slate-900">
            EduBridge Smart Tablet ("EduBridge Pad")
          </h1>
          <p className="text-xs text-slate-500">
            Interactive student device powered by on-device edge AI. Students receive non-intrusive micro-scaffolds without feeling surveilled.
          </p>
        </div>

        {/* Student Switcher dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-medium">Viewing as:</span>
          <select
            value={activeStudentPadId}
            onChange={e => {
              setActiveStudentPadId(e.target.value);
              handleReset();
            }}
            className="text-xs bg-[#FAF9F5] border border-slate-300 rounded-xl px-3 py-2 font-semibold text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-[#396145] cursor-pointer"
          >
            {students.map(st => (
              <option key={st.id} value={st.id}>
                {st.name} ({st.state.toUpperCase()})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Realistic Simulated Tablet Viewport */}
      <div className="relative mx-auto max-w-4xl bg-slate-800 rounded-[2.5rem] p-3 sm:p-4 shadow-2xl border-4 border-slate-700">
        {/* Tablet Bezel Elements */}
        <div className="flex items-center justify-between px-6 py-2 text-slate-400 text-xs">
          {/* Front camera & Edge AI LED */}
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-slate-900 border border-slate-600 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
            </div>
            <span className="text-[10px] text-emerald-400 font-mono tracking-wide flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              EDGE NPU ACTIVE • 100% PRIVATE
            </span>
          </div>

          {/* Tablet Status Icons */}
          <div className="flex items-center gap-3 font-mono text-[11px]">
            <span>10:24 AM</span>
            <Wifi className="w-3.5 h-3.5 text-slate-300" />
            <div className="flex items-center gap-1">
              <span>94%</span>
              <Battery className="w-3.5 h-3.5 text-slate-300" />
            </div>
          </div>
        </div>

        {/* Tablet Screen Surface */}
        <div className="bg-[#FAF9F5] rounded-3xl overflow-hidden border border-slate-300 shadow-inner flex flex-col min-h-[560px]">
          {/* Tablet Navigation Bar */}
          <div className="bg-white px-6 py-3 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#396145]" />
              <span className="text-xs font-bold text-slate-800">
                {problem.subject}
              </span>
              <span className="text-slate-300">/</span>
              <span className="text-xs text-slate-500 font-medium">
                {problem.topic}
              </span>
            </div>

            {/* Step Indicator */}
            <div className="flex items-center gap-1.5 text-xs text-slate-600">
              <span className="font-semibold text-slate-800">
                Step {problem.stepNumber} of {problem.totalSteps}
              </span>
              <div className="flex gap-1 ml-1">
                {[1, 2, 3, 4].map(step => (
                  <span
                    key={step}
                    className={`w-2 h-2 rounded-full ${
                      step === 3
                        ? 'bg-[#396145]'
                        : step < 3
                        ? 'bg-emerald-400'
                        : 'bg-slate-200'
                    }`}
                  ></span>
                ))}
              </div>
            </div>
          </div>

          {/* Teacher Hint Notification Banner (If Sent) */}
          {student.notes && (
            <div className="bg-emerald-50 border-b border-emerald-200 px-6 py-2.5 flex items-center justify-between animate-in slide-in-from-top duration-300">
              <div className="flex items-center gap-2 text-xs text-emerald-900 font-medium">
                <Lightbulb className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <span>{student.notes}</span>
              </div>
              <span className="text-[10px] text-emerald-700 bg-white px-2 py-0.5 rounded-full border border-emerald-300 font-mono font-semibold">
                Educator Scaffold
              </span>
            </div>
          )}

          {/* Main Quiz / Problem Area */}
          <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
            <div>
              {/* Question Prompt */}
              <div className="space-y-3">
                <span className="text-xs font-bold tracking-wider uppercase text-slate-400">
                  Concept Challenge #{problem.stepNumber}
                </span>
                <h2 className="text-base sm:text-lg font-bold text-slate-900">
                  {problem.prompt}
                </h2>

                {/* Math Formula Card */}
                {problem.mathFormula && (
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs font-mono text-sm sm:text-base text-slate-800 text-center tracking-wide overflow-x-auto">
                    {problem.mathFormula}
                  </div>
                )}
              </div>

              {/* Multiple Choice Options */}
              <div className="mt-6 space-y-3">
                {problem.options.map(opt => {
                  const isSelected = selectedOption === opt.id;
                  const showResult = submitted;

                  let optStyle = 'border-slate-200 bg-white hover:border-[#396145] text-slate-800';
                  if (isSelected && !showResult) {
                    optStyle = 'border-[#396145] bg-[#F2F7F4] text-[#1E3326] ring-2 ring-[#4A7758]/20 font-semibold';
                  } else if (showResult) {
                    if (opt.isCorrect) {
                      optStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-semibold';
                    } else if (isSelected && !opt.isCorrect) {
                      optStyle = 'border-rose-400 bg-rose-50 text-rose-900';
                    }
                  }

                  return (
                    <div
                      key={opt.id}
                      onClick={() => !submitted && handleSelectOption(opt.id)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${optStyle}`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-mono font-bold ${
                            isSelected
                              ? 'bg-[#2D4E38] text-white'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {opt.id.split('-')[1].toUpperCase()}
                        </span>
                        <span className="text-sm font-medium">{opt.text}</span>
                      </div>

                      {showResult && opt.isCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                      )}
                      {showResult && isSelected && !opt.isCorrect && (
                        <AlertCircle className="w-5 h-5 text-rose-500 flex-shrink-0" />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Feedback box on submission */}
              {submitted && (
                <div
                  className={`mt-4 p-4 rounded-2xl border text-xs sm:text-sm animate-in fade-in duration-200 ${
                    isCorrect
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                      : 'bg-amber-50 border-amber-200 text-amber-900'
                  }`}
                >
                  <div className="font-bold flex items-center gap-1.5 mb-1">
                    {isCorrect ? (
                      <>
                        <Sparkles className="w-4 h-4 text-emerald-600" />
                        Brilliant step execution!
                      </>
                    ) : (
                      <>
                        <HelpCircle className="w-4 h-4 text-amber-600" />
                        Gentle Hint from EduBridge
                      </>
                    )}
                  </div>
                  <p>
                    {problem.options.find(o => o.id === selectedOption)?.feedback}
                  </p>
                  {!isCorrect && (
                    <p className="mt-2 text-xs font-medium text-amber-800 italic">
                      {problem.hintText}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Bottom Controls inside Tablet */}
            <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
              {/* Student Self-Reflection / Agency */}
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-400 font-medium">How do you feel?</span>
                <button
                  onClick={() => setStudentMood('focused')}
                  className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                    studentMood === 'focused' ? 'bg-emerald-100 border-emerald-300 text-emerald-800' : 'bg-white border-slate-200'
                  }`}
                  title="Focused / Flow"
                >
                  <Smile className="w-4 h-4 text-emerald-600" />
                </button>
                <button
                  onClick={() => setStudentMood('confused')}
                  className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                    studentMood === 'confused' ? 'bg-amber-100 border-amber-300 text-amber-800' : 'bg-white border-slate-200'
                  }`}
                  title="A bit confused"
                >
                  <Meh className="w-4 h-4 text-amber-600" />
                </button>
                <button
                  onClick={() => triggerBreathingBreak(student.id)}
                  className="px-2.5 py-1 rounded-lg bg-sky-50 border border-sky-200 text-sky-800 text-[11px] font-semibold flex items-center gap-1 hover:bg-sky-100 cursor-pointer"
                  title="Take a 2-minute breath break"
                >
                  <Wind className="w-3.5 h-3.5 text-sky-600" />
                  <span>Calm Pause</span>
                </button>
              </div>

              {/* Submit or Reset button */}
              <div className="flex items-center gap-2">
                {!submitted ? (
                  <button
                    onClick={handleCheckAnswer}
                    disabled={!selectedOption}
                    className={`px-5 py-2.5 rounded-xl font-semibold text-xs transition-all shadow-xs flex items-center gap-1.5 cursor-pointer ${
                      selectedOption
                        ? 'bg-[#2D4E38] hover:bg-[#1E3326] text-white'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    <span>Verify Derivative</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={handleReset}
                    className="px-4 py-2 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold cursor-pointer"
                  >
                    Try Another Attempt
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Companion Telemetry Feed for Reviewers / Evaluators */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-[#396145]" />
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Evaluator's Eye: On-Device Edge Sensing Telemetry for {student.name}
            </h3>
          </div>
          <button
            onClick={() => setShowSimulatedEdgeCues(!showSimulatedEdgeCues)}
            className="text-xs text-[#2D4E38] font-semibold hover:underline cursor-pointer"
          >
            {showSimulatedEdgeCues ? 'Collapse' : 'Expand'}
          </button>
        </div>

        {showSimulatedEdgeCues && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-1">
            <div className="p-3 rounded-2xl bg-[#FAF9F5] border border-slate-200">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                Corrugator Furrow (AU4)
              </span>
              <span className="font-mono font-bold text-slate-800 text-sm">
                {student.telemetry.eyebrowFurrowIntensity}
              </span>
              <span className="text-[10px] text-amber-700 block mt-0.5">
                {student.telemetry.eyebrowFurrowIntensity > 0.5 ? 'High Concentration / Furrow' : 'Relaxed Facial Posture'}
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-[#FAF9F5] border border-slate-200">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                Stylus Hesitation
              </span>
              <span className="font-mono font-bold text-slate-800 text-sm">
                {(student.telemetry.screenHesitationMs / 1000).toFixed(1)}s
              </span>
              <span className="text-[10px] text-slate-500 block mt-0.5">
                Pause on Step 3
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-[#FAF9F5] border border-slate-200">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                Gaze Vector Yaw
              </span>
              <span className="font-mono font-bold text-slate-800 text-sm">
                {student.telemetry.headTilt}°
              </span>
              <span className="text-[10px] text-slate-500 block mt-0.5">
                Centered on equation
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-[#FAF9F5] border border-slate-200">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                Privacy Enclave Status
              </span>
              <span className="font-mono font-bold text-emerald-700 text-sm flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Zero Cloud Bytes
              </span>
              <span className="text-[10px] text-slate-400 block mt-0.5">
                MobileNetV3 on Edge
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
