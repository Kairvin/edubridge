import React, { useState, useRef, useEffect } from 'react';
import { useProductionClassroom } from '../../context/ProductionClassroomContext';
import confetti from 'canvas-confetti';
import {
  Tablet,
  ShieldCheck,
  Lightbulb,
  CheckCircle2,
  AlertCircle,
  Wind,
  Wifi,
  Battery,
  ArrowRight,
  BookOpen,
  PenTool,
  Eraser,
  RotateCcw,
  Sparkles,
  HelpCircle,
  Smile,
  Meh,
} from 'lucide-react';

export const StudentTabletPortal: React.FC = () => {
  const {
    session,
    students,
    activeStudentId,
    setActiveStudentId,
    activeStudent,
    submitStudentAnswer,
    clearStudentAttempt,
    triggerMindfulBreak,
    requestStudentHelp,
  } = useProductionClassroom();

  const currentStep = session.activeLesson.steps[activeStudent.currentStep - 1] || session.activeLesson.steps[2];
  const [selectedOpt, setSelectedOpt] = useState<string | null>(activeStudent.selectedAnswer);
  const [scratchColor, setScratchColor] = useState<string>('#2D4E38');
  const [scratchMode, setScratchMode] = useState<'pen' | 'eraser'>('pen');

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawing = useRef<boolean>(false);

  // Synchronize local selection with student state
  useEffect(() => {
    setSelectedOpt(activeStudent.selectedAnswer);
  }, [activeStudent]);

  // Canvas drawing handlers
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    isDrawing.current = true;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    ctx.beginPath();
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    ctx.strokeStyle = scratchMode === 'eraser' ? '#FAF9F5' : scratchColor;
    ctx.lineWidth = scratchMode === 'eraser' ? 16 : 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    isDrawing.current = false;
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleSelectOption = (optId: string) => {
    if (activeStudent.hasAttempted && activeStudent.isCorrect) return;
    setSelectedOpt(optId);
  };

  const handleSubmit = () => {
    if (!selectedOpt) return;
    const isCorrect = submitStudentAnswer(selectedOpt);
    if (isCorrect) {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#2D4E38', '#387893', '#F59E0B'],
      });
    }
  };

  const handleRetry = () => {
    clearStudentAttempt();
    setSelectedOpt(null);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Student Selector & Header */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E5ECE7] text-[#2D4E38] text-xs font-semibold uppercase tracking-wider mb-1">
            <Tablet className="w-3.5 h-3.5" />
            Live Student Tablet Interface
          </div>
          <h1 className="text-xl sm:text-2xl font-bold font-serif text-slate-900">
            EduBridge Student Workspace
          </h1>
          <p className="text-xs text-slate-500">
            This is the student's personal tablet viewport in the classroom. Any action taken here instantly reflects back on the teacher's cockpit.
          </p>
        </div>

        {/* Pick active student dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-medium">Viewing Student:</span>
          <select
            value={activeStudentId}
            onChange={e => setActiveStudentId(e.target.value)}
            className="text-xs bg-[#FAF9F5] border border-slate-300 rounded-xl px-3 py-2 font-semibold text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-[#2D4E38] cursor-pointer"
          >
            {students.map(st => (
              <option key={st.id} value={st.id}>
                {st.name} (Roll #{st.rollNo})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Realistic Simulated Tablet Bezel */}
      <div className="relative mx-auto max-w-4xl bg-slate-900 rounded-[2.5rem] p-3 sm:p-4 shadow-2xl border-4 border-slate-800">
        {/* Hardware Status Strip */}
        <div className="flex items-center justify-between px-6 py-2 text-slate-400 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-950 border border-slate-700 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
            </div>
            <span className="text-[10px] text-emerald-400 font-mono tracking-wide flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              EDGE ENCLAVE ACTIVE • PRIVATE
            </span>
          </div>

          <div className="flex items-center gap-3 font-mono text-[11px]">
            <span>10:32 AM</span>
            <Wifi className="w-3.5 h-3.5 text-slate-300" />
            <div className="flex items-center gap-1">
              <span>{activeStudent.telemetry.batteryPercent}%</span>
              <Battery className="w-3.5 h-3.5 text-slate-300" />
            </div>
          </div>
        </div>

        {/* Tablet Glass Screen */}
        <div className="bg-[#FAF9F5] rounded-3xl overflow-hidden border border-slate-300 shadow-inner flex flex-col min-h-[580px]">
          {/* Top Class Sync Bar */}
          <div className="bg-white px-6 py-3 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#2D4E38]" />
              <span className="text-xs font-bold text-slate-900">
                {session.subject}
              </span>
              <span className="text-slate-300">/</span>
              <span className="text-xs text-slate-500 font-medium">
                {session.activeLesson.title}
              </span>
            </div>

            {/* Step Checkpoints */}
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <span className="font-semibold text-slate-800">
                Step {currentStep.stepNumber} of {session.activeLesson.steps.length}
              </span>
              <div className="flex gap-1 ml-1">
                {session.activeLesson.steps.map(step => (
                  <span
                    key={step.stepNumber}
                    className={`w-2.5 h-2.5 rounded-full ${
                      step.stepNumber === currentStep.stepNumber
                        ? 'bg-[#2D4E38]'
                        : step.stepNumber < currentStep.stepNumber
                        ? 'bg-emerald-400'
                        : 'bg-slate-200'
                    }`}
                  ></span>
                ))}
              </div>
            </div>
          </div>

          {/* Teacher Hint Notification Banner (If Received) */}
          {activeStudent.teacherHintReceived && (
            <div className="bg-emerald-50 border-b border-emerald-200 px-6 py-3 flex items-center justify-between animate-in slide-in-from-top duration-300">
              <div className="flex items-center gap-2.5 text-xs text-emerald-950 font-medium">
                <Lightbulb className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <span>
                  <strong>Dr. Vikram Seth:</strong> {activeStudent.teacherHintReceived}
                </span>
              </div>
              <span className="text-[10px] text-emerald-800 bg-white px-2 py-0.5 rounded-full border border-emerald-300 font-mono font-bold">
                Teacher Scaffold
              </span>
            </div>
          )}

          {/* Main Problem & Scratchpad Workspace */}
          <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
            <div>
              {/* Problem Prompt */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Concept Step {currentStep.stepNumber}
                </span>
                <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                  {currentStep.instruction}
                </h2>

                {/* Math Formula Card */}
                {currentStep.formulaPrompt && (
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs font-mono text-sm sm:text-base text-slate-800 text-center tracking-wide overflow-x-auto">
                    {currentStep.formulaPrompt}
                  </div>
                )}
              </div>

              {/* Grid: Multiple Choice Options (Left) & Handwriting Scratchpad (Right) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mt-6">
                {/* Options (7 cols) */}
                <div className="lg:col-span-7 space-y-2.5">
                  <span className="text-xs font-bold text-slate-700 block">
                    Select the derivative solution:
                  </span>

                  {currentStep.options.map(opt => {
                    const isSelected = selectedOpt === opt.id;
                    const showResult = activeStudent.hasAttempted;

                    let style = 'border-slate-200 bg-white hover:border-[#2D4E38] text-slate-800';
                    if (isSelected && !showResult) {
                      style = 'border-[#2D4E38] bg-[#F2F7F4] text-[#1E3326] ring-2 ring-[#4A7758]/20 font-semibold';
                    } else if (showResult) {
                      if (opt.isCorrect) {
                        style = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-semibold';
                      } else if (isSelected && !opt.isCorrect) {
                        style = 'border-rose-400 bg-rose-50 text-rose-900';
                      }
                    }

                    return (
                      <div
                        key={opt.id}
                        onClick={() => handleSelectOption(opt.id)}
                        className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${style}`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-mono font-bold ${
                              isSelected ? 'bg-[#2D4E38] text-white' : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {opt.id.split('-')[1].toUpperCase()}
                          </span>
                          <span className="text-xs sm:text-sm font-medium">{opt.text}</span>
                        </div>

                        {showResult && opt.isCorrect && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        )}
                        {showResult && isSelected && !opt.isCorrect && (
                          <AlertCircle className="w-4 h-4 text-rose-500 flex-shrink-0" />
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Interactive Scratchpad Canvas (5 cols) */}
                <div className="lg:col-span-5 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col justify-between space-y-2">
                  <div className="flex items-center justify-between text-xs pb-1 border-b border-slate-100">
                    <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                      <PenTool className="w-3.5 h-3.5 text-[#2D4E38]" />
                      Stylus Scratchpad
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setScratchMode('pen')}
                        className={`p-1 rounded cursor-pointer ${scratchMode === 'pen' ? 'bg-[#2D4E38] text-white' : 'text-slate-400'}`}
                        title="Pen mode"
                      >
                        <PenTool className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => setScratchMode('eraser')}
                        className={`p-1 rounded cursor-pointer ${scratchMode === 'eraser' ? 'bg-[#2D4E38] text-white' : 'text-slate-400'}`}
                        title="Eraser mode"
                      >
                        <Eraser className="w-3 h-3" />
                      </button>
                      <button
                        onClick={clearCanvas}
                        className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer"
                        title="Clear scratchpad"
                      >
                        <RotateCcw className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Canvas */}
                  <div className="relative w-full h-36 bg-[#FAF9F5] rounded-xl border border-dashed border-slate-200 overflow-hidden cursor-crosshair">
                    <canvas
                      ref={canvasRef}
                      width={320}
                      height={144}
                      onMouseDown={startDrawing}
                      onMouseMove={draw}
                      onMouseUp={stopDrawing}
                      onMouseLeave={stopDrawing}
                      onTouchStart={startDrawing}
                      onTouchMove={draw}
                      onTouchEnd={stopDrawing}
                      className="w-full h-full"
                    />
                    <span className="absolute bottom-1 right-2 text-[9px] text-slate-300 font-mono pointer-events-none">
                      Write calculations here
                    </span>
                  </div>
                </div>
              </div>

              {/* Feedback box on submission */}
              {activeStudent.hasAttempted && (
                <div
                  className={`mt-4 p-4 rounded-2xl border text-xs animate-in fade-in duration-200 ${
                    activeStudent.isCorrect
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                      : 'bg-amber-50 border-amber-200 text-amber-950'
                  }`}
                >
                  <div className="font-bold flex items-center gap-1.5 mb-1">
                    {activeStudent.isCorrect ? (
                      <>
                        <Sparkles className="w-4 h-4 text-emerald-600" />
                        Correct Step Differentiation!
                      </>
                    ) : (
                      <>
                        <HelpCircle className="w-4 h-4 text-amber-600" />
                        Check Your Multiplication Factor
                      </>
                    )}
                  </div>
                  <p>
                    {currentStep.options.find(o => o.id === selectedOpt)?.explanation}
                  </p>
                  {!activeStudent.isCorrect && (
                    <p className="mt-2 text-xs font-semibold text-amber-900">
                      💡 Scaffold: {currentStep.scaffoldHint}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Bottom Tablet Controls */}
            <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
              {/* Metacognitive self-check & Mindful Break */}
              <div className="flex items-center gap-2 text-xs">
                <button
                  onClick={requestStudentHelp}
                  className="px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-semibold border border-amber-200 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
                  <span>Request Hint</span>
                </button>

                <button
                  onClick={() => triggerMindfulBreak(activeStudent.id)}
                  className="px-3 py-1.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-900 text-xs font-semibold border border-sky-200 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Wind className="w-3.5 h-3.5 text-sky-600" />
                  <span>Calm Pause</span>
                </button>
              </div>

              {/* Submit or Reset button */}
              <div className="flex items-center gap-2">
                {!activeStudent.hasAttempted ? (
                  <button
                    onClick={handleSubmit}
                    disabled={!selectedOpt}
                    className={`px-5 py-2.5 rounded-xl font-semibold text-xs transition-all shadow-xs flex items-center gap-1.5 cursor-pointer ${
                      selectedOpt
                        ? 'bg-[#2D4E38] hover:bg-[#1E3326] text-white'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    <span>Submit Step Solution</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={handleRetry}
                    className="px-4 py-2 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold cursor-pointer"
                  >
                    Retry Step
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
