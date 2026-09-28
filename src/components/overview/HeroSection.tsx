import React, { useState } from 'react';
import { useClassroom } from '../../context/ClassroomContext';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  BrainCircuit,
  LayoutDashboard,
  Tablet,
  CheckCircle2,
  XCircle,
  Eye,
  Sliders,
  Cpu,
  GraduationCap,
  Heart,
  Wind,
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { setActiveTab, playChime } = useClassroom();
  const [comparisonMode, setComparisonMode] = useState<'edubridge' | 'traditional'>('edubridge');

  const handleModeChange = (mode: 'edubridge' | 'traditional') => {
    setComparisonMode(mode);
    playChime('calm_bell');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Hero Banner */}
      <div className="relative rounded-3xl bg-gradient-to-b from-[#F2F7F4] via-[#FAF9F5] to-white p-6 sm:p-12 border border-[#CBD5E1] shadow-xs overflow-hidden text-center max-w-5xl mx-auto">
        {/* Soft background ambient rings */}
        <div className="absolute -top-32 -left-32 w-80 h-80 bg-[#CBDBD0]/50 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-[#C1DEE8]/50 rounded-full blur-3xl pointer-events-none"></div>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E5ECE7] border border-[#CBDBD0] text-xs font-semibold text-[#2D4E38] uppercase tracking-wider mb-4 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-[#396145]" />
          Next-Generation Classroom Intelligence • Hybrid AI Architecture
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-slate-900 tracking-tight leading-tight max-w-4xl mx-auto">
          Bridging the Gap Between <span className="text-[#2D4E38] italic">Student Behaviour</span> & <span className="text-[#234F62] italic">Teacher Awareness</span>
        </h1>

        <p className="mt-4 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          EduBridge is a smart tablet and hybrid AI architecture that translates real-time pupil cognitive cues—confusion, stress, attention—into non-intrusive awareness for educators.
        </p>

        {/* Quick CTA Actions */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => setActiveTab('teacher')}
            className="px-6 py-3 rounded-2xl bg-[#2D4E38] hover:bg-[#1E3326] text-white font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer group"
          >
            <LayoutDashboard className="w-4 h-4 text-emerald-300" />
            <span>Launch Teacher Live Cockpit</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>

          <button
            onClick={() => setActiveTab('student')}
            className="px-6 py-3 rounded-2xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-xs transition-all cursor-pointer"
          >
            <Tablet className="w-4 h-4 text-[#396145]" />
            <span>Test "EduBridge Pad" Tablet</span>
          </button>
        </div>

        {/* Trust Badges Bar */}
        <div className="mt-10 pt-6 border-t border-slate-200/70 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500">
          <span className="flex items-center gap-1.5 font-medium text-slate-700">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            100% On-Device Edge AI (No Cloud Video)
          </span>
          <span className="flex items-center gap-1.5 font-medium text-slate-700">
            <Heart className="w-4 h-4 text-rose-500" />
            Human-in-the-Loop (HITL) Pedagogy
          </span>
          <span className="flex items-center gap-1.5 font-medium text-slate-700">
            <BrainCircuit className="w-4 h-4 text-[#387893]" />
            Grad-CAM Explainable AI (XAI)
          </span>
        </div>
      </div>

      {/* Interactive Problem vs Solution Comparison */}
      <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#396145]">
            Classroom Transformation • The Modern Paradigm Shift
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900">
            Isolated Study Desks vs The Connected Classroom
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Toggle between the current isolated digital classroom reality and the EduBridge hybrid AI experience.
          </p>

          {/* Toggle pill */}
          <div className="inline-flex items-center bg-[#FAF9F5] p-1 rounded-2xl border border-slate-200 mt-2">
            <button
              onClick={() => handleModeChange('traditional')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                comparisonMode === 'traditional'
                  ? 'bg-rose-100 text-rose-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              The Problem: Traditional Digital Study
            </button>
            <button
              onClick={() => handleModeChange('edubridge')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                comparisonMode === 'edubridge'
                  ? 'bg-[#2D4E38] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              The Solution: EduBridge Hybrid AI
            </button>
          </div>
        </div>

        {/* Comparison Cards Content */}
        {comparisonMode === 'traditional' ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 animate-in fade-in duration-300">
            <div className="p-5 rounded-2xl bg-rose-50/50 border border-rose-200 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
                <XCircle className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-rose-950">
                1. Silent Confusion Blind Spots
              </h3>
              <p className="text-xs text-rose-800 leading-relaxed">
                After lockdowns, students study behind isolated screens. Teachers cannot easily tell whether a student has understood a concept or has been silently stuck for 20 minutes.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-rose-50/50 border border-rose-200 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
                <XCircle className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-rose-950">
                2. Zero Engagement Visibility
              </h3>
              <p className="text-xs text-rose-800 leading-relaxed">
                Teachers have zero visibility into student focus during digital learning. Disengaged students zone out without the teacher knowing until quiz scores plummet weeks later.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-rose-50/50 border border-rose-200 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
                <XCircle className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-rose-950">
                3. Heavy or Invasive Proctoring
              </h3>
              <p className="text-xs text-rose-800 leading-relaxed">
                Traditional exam surveillance requires invasive video streams that violate privacy, drain bandwidth, and produce anxiety-inducing false accusations.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 animate-in fade-in duration-300">
            <div className="p-5 rounded-2xl bg-[#F2F7F4] border border-[#CBDBD0] space-y-2">
              <div className="w-8 h-8 rounded-xl bg-[#E5ECE7] text-[#2D4E38] flex items-center justify-center font-bold">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-[#1E3326]">
                1. Real-Time Confusion Detection
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                On-device sensors detect eyebrow furrowing (AU4) and touch hesitation in milliseconds, alerting the teacher right at Step 3 before frustration sets in.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#F2F7F4] border border-[#CBDBD0] space-y-2">
              <div className="w-8 h-8 rounded-xl bg-[#E5ECE7] text-[#2D4E38] flex items-center justify-center font-bold">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-[#1E3326]">
                2. Human-in-the-Loop Awareness
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                AI acts as a non-punitive assistant while the teacher maintains complete educational authority to send adaptive hints, trigger breath breaks, or calibrate pace.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#F2F7F4] border border-[#CBDBD0] space-y-2">
              <div className="w-8 h-8 rounded-xl bg-[#E5ECE7] text-[#2D4E38] flex items-center justify-center font-bold">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-[#1E3326]">
                3. Privacy by Design Assessment
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Gaze vectors and head poses are computed strictly on-device on the tablet's NPU. Suspicious activity is flagged with Explainable AI proof without streaming raw video.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* 4 Pillars of EduBridge Architecture */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold font-serif text-slate-900 text-center">
          The 4 Pillars of the EduBridge Architecture
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Hybrid Intelligence</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              AI handles repetitive monitoring cues while keeping the teacher in the loop for empathetic pedagogical decisions.
            </p>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-2xl bg-sky-50 text-sky-700 flex items-center justify-center">
              <Eye className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Explainable AI (XAI)</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Grad-CAM attention heatmaps and multimodal feature attributions explain exactly WHY an alert was triggered.
            </p>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <Sliders className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Confidence Threshold Gate</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Dynamically eliminates false alarms. Only high-confidence events reach the educator's live dashboard.
            </p>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Edge & Hardware Privacy</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Quantized MobileNetV3 runs on local ARM NPUs with sub-15ms latency, operating seamlessly even without internet.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
