import React, { useState } from 'react';
import { useProductionClassroom } from '../../context/ProductionClassroomContext';
import { LessonModule, LessonStep } from '../../types';
import {
  BookOpen,
  CheckCircle2,
  Clock,
  Play,
  ArrowRight,
  Layers,
  Sparkles,
  HelpCircle,
  Plus,
  FileText,
  ChevronRight,
} from 'lucide-react';

export const LessonModulesView: React.FC = () => {
  const { session, lessonCatalog, syncClassToStep, playChime } = useProductionClassroom();
  const [selectedLesson, setSelectedLesson] = useState<LessonModule>(lessonCatalog[0]);
  const [activeStepTab, setActiveStepTab] = useState<number>(3);

  const currentStep = selectedLesson.steps.find(s => s.stepNumber === activeStepTab) || selectedLesson.steps[0];

  const handleBroadcastStep = (stepNum: number) => {
    syncClassToStep(stepNum);
    setActiveStepTab(stepNum);
    playChime('bell');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E5ECE7] text-[#2D4E38] text-xs font-semibold uppercase tracking-wider mb-1">
            <BookOpen className="w-3.5 h-3.5" />
            Curriculum & Lesson Studio
          </div>
          <h1 className="text-xl sm:text-2xl font-bold font-serif text-slate-900">
            Interactive Classroom Lesson Modules
          </h1>
          <p className="text-xs text-slate-500">
            Manage interactive concept sequences, difficulty checkpoints, and real-time step broadcasts for Grade 11-A.
          </p>
        </div>

        <button
          onClick={() => playChime('bell')}
          className="px-4 py-2 rounded-xl bg-[#2D4E38] hover:bg-[#1E3326] text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Lesson Module</span>
        </button>
      </div>

      {/* Lesson Catalog & Step Inspector Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 4 Cols: Lesson Module List */}
        <div className="lg:col-span-4 space-y-3">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Lesson Catalog
          </h3>

          <div className="space-y-2.5">
            {lessonCatalog.map(lesson => {
              const isCurrent = lesson.id === selectedLesson.id;
              const isLive = lesson.status === 'active_live';

              return (
                <div
                  key={lesson.id}
                  onClick={() => setSelectedLesson(lesson)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isCurrent
                      ? 'border-[#2D4E38] bg-[#F2F7F4] shadow-xs ring-1 ring-[#4A7758]'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] uppercase font-bold text-slate-400">
                      {lesson.subject}
                    </span>
                    {isLive ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        Active Session
                      </span>
                    ) : (
                      <span className="text-[10px] text-slate-400 font-medium capitalize">
                        {lesson.status}
                      </span>
                    )}
                  </div>

                  <h4 className="text-xs font-bold text-slate-900 leading-snug">
                    {lesson.title}
                  </h4>

                  <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {lesson.estimatedMinutes} mins
                    </span>
                    <span>{lesson.steps.length || 4} Checkpoints</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 8 Cols: Selected Lesson Step-by-Step Inspector */}
        <div className="lg:col-span-8 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">
                {selectedLesson.subject} • {selectedLesson.grade}
              </span>
              <h2 className="text-lg font-bold font-serif text-slate-900 mt-0.5">
                {selectedLesson.title}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-500">
                Enrolled: 16 Students
              </span>
            </div>
          </div>

          {/* Step Selector Tabs */}
          {selectedLesson.steps.length > 0 ? (
            <div className="space-y-5">
              <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
                {selectedLesson.steps.map(step => (
                  <button
                    key={step.stepNumber}
                    onClick={() => setActiveStepTab(step.stepNumber)}
                    className={`px-3 py-2 rounded-xl font-medium transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                      activeStepTab === step.stepNumber
                        ? 'bg-[#2D4E38] text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <span>Step {step.stepNumber}</span>
                    <span className="text-[10px] opacity-75 truncate max-w-[120px]">
                      {step.title.split(' ')[0]}
                    </span>
                  </button>
                ))}
              </div>

              {/* Active Step Details */}
              {currentStep && (
                <div className="p-5 rounded-2xl bg-[#FAF9F5] border border-[#EAE2D3] space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#2D4E38] uppercase tracking-wider">
                      Step {currentStep.stepNumber}: {currentStep.title}
                    </span>
                    <button
                      onClick={() => handleBroadcastStep(currentStep.stepNumber)}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <Play className="w-3 h-3" />
                      <span>Sync All Tablets to This Step</span>
                    </button>
                  </div>

                  <p className="text-sm font-medium text-slate-800">
                    {currentStep.instruction}
                  </p>

                  {/* Formula prompt */}
                  {currentStep.formulaPrompt && (
                    <div className="bg-white p-3 rounded-xl border border-slate-200 font-mono text-sm text-slate-800 text-center">
                      {currentStep.formulaPrompt}
                    </div>
                  )}

                  {/* Options */}
                  <div className="space-y-2 pt-2">
                    <span className="text-xs font-bold text-slate-700 block">
                      Multiple Choice Options & Feedback Explanations:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {currentStep.options.map(opt => (
                        <div
                          key={opt.id}
                          className={`p-3 rounded-xl border text-xs ${
                            opt.isCorrect
                              ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950 font-medium'
                              : 'bg-white border-slate-200 text-slate-700'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-semibold">{opt.text}</span>
                            {opt.isCorrect && (
                              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                                Correct Answer
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-500">{opt.explanation}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Scaffold hint */}
                  <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs">
                    <span className="font-bold text-[#2D4E38] block mb-1">
                      💡 Built-in Pedagogical Scaffold Hint:
                    </span>
                    <p className="text-slate-600 text-xs">{currentStep.scaffoldHint}</p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="p-12 text-center text-slate-400 text-xs">
              This module is scheduled for upcoming periods.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
