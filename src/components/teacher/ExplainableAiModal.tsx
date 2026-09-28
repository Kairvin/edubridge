import React, { useState } from 'react';
import { useClassroom } from '../../context/ClassroomContext';
import {
  X,
  ShieldCheck,
  Cpu,
  Brain,
  CheckCircle,
  XCircle,
  HelpCircle,
  Wind,
  Lightbulb,
  Layers,
  Sparkles,
  BarChart,
  Eye,
  Clock,
} from 'lucide-react';

export const ExplainableAiModal: React.FC = () => {
  const { inspectingXai, closeXaiInspector, sendHintToStudent, triggerBreathingBreak, validateXaiAlert } = useClassroom();
  const [viewMode, setViewMode] = useState<'gradcam' | 'landmarks' | 'vectors'>('gradcam');
  const [customNote, setCustomNote] = useState<string>('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState<boolean>(false);

  if (!inspectingXai) return null;

  const handleAction = (actionId: string) => {
    if (actionId.includes('hint')) {
      sendHintToStudent(inspectingXai.studentId);
    } else if (actionId.includes('breathe')) {
      triggerBreathingBreak(inspectingXai.studentId);
    } else {
      validateXaiAlert(inspectingXai.alertId, 'validated_helpful', 'Teacher initiated adaptive intervention.');
    }
    setFeedbackSubmitted(true);
  };

  const handleValidation = (type: 'validated_helpful' | 'dismissed_deep_thinking' | 'dismissed_transient') => {
    validateXaiAlert(inspectingXai.alertId, type, customNote);
    setFeedbackSubmitted(true);
    setTimeout(() => {
      closeXaiInspector();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#FAF9F5] border border-[#CBD5E1] rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-[#F2F7F4] border-b border-[#E2E8F0] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#2D4E38] text-white flex items-center justify-center font-bold">
              <Brain className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-slate-800 font-serif">
                  Explainable AI (XAI) Diagnostic Report
                </h2>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-700" />
                  HITL Gate Active
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Transparent attribution for <strong>{inspectingXai.studentName}</strong> • On-Device Edge Inference
              </p>
            </div>
          </div>

          <button
            onClick={closeXaiInspector}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/50 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-700">
          {/* Top Banner: Detected Condition & Edge Performance */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">
                Flagged Cognitive State
              </div>
              <div className="text-base font-bold text-slate-900 flex items-center gap-2 mt-0.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping"></span>
                <span>{inspectingXai.detectedCondition}</span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs">
              <div className="bg-[#FAF9F5] px-3 py-1.5 rounded-xl border border-slate-200">
                <span className="text-slate-400 block text-[10px]">Edge Model Confidence</span>
                <span className="font-mono font-bold text-slate-800 text-sm">
                  {Math.round(inspectingXai.confidenceScore * 100)}%
                </span>
              </div>
              <div className="bg-[#FAF9F5] px-3 py-1.5 rounded-xl border border-slate-200">
                <span className="text-slate-400 block text-[10px]">NPU Inference Latency</span>
                <span className="font-mono font-semibold text-emerald-700 flex items-center gap-1">
                  <Cpu className="w-3.5 h-3.5" />
                  {inspectingXai.inferenceLatencyMs} ms
                </span>
              </div>
              <div className="bg-[#FAF9F5] px-3 py-1.5 rounded-xl border border-slate-200">
                <span className="text-slate-400 block text-[10px]">Architecture</span>
                <span className="font-mono text-slate-600 text-[11px]">
                  INT8 Quantized MobileNet
                </span>
              </div>
            </div>
          </div>

          {/* Main Visual & Attribution Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Grad-CAM Visual Heatmap Simulation */}
            <div className="lg:col-span-5 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <Eye className="w-4 h-4 text-[#396145]" />
                    Visual Explainability (Grad-CAM)
                  </span>
                  <div className="flex items-center gap-1 text-[10px]">
                    <button
                      onClick={() => setViewMode('gradcam')}
                      className={`px-2 py-0.5 rounded cursor-pointer ${
                        viewMode === 'gradcam' ? 'bg-[#2D4E38] text-white font-medium' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      Heatmap
                    </button>
                    <button
                      onClick={() => setViewMode('landmarks')}
                      className={`px-2 py-0.5 rounded cursor-pointer ${
                        viewMode === 'landmarks' ? 'bg-[#2D4E38] text-white font-medium' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      Mesh
                    </button>
                    <button
                      onClick={() => setViewMode('vectors')}
                      className={`px-2 py-0.5 rounded cursor-pointer ${
                        viewMode === 'vectors' ? 'bg-[#2D4E38] text-white font-medium' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      Privacy Raw
                    </button>
                  </div>
                </div>

                {/* Simulated Tablet Camera & Grad-CAM Canvas */}
                <div className="relative aspect-4/3 w-full bg-slate-900 rounded-xl overflow-hidden flex items-center justify-center border border-slate-700">
                  {/* Subtle privacy watermark */}
                  <div className="absolute top-2 left-2 z-20 flex items-center gap-1 bg-black/60 px-2 py-0.5 rounded text-[9px] text-emerald-400 font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    ON-DEVICE MESH (NO CLOUD TRANSMIT)
                  </div>

                  {/* Stylized Face Vector Silhouette */}
                  <svg className="w-full h-full p-4" viewBox="0 0 200 160">
                    {/* Head contour */}
                    <path
                      d="M60,140 C50,110 50,60 100,50 C150,60 150,110 140,140 Z"
                      fill="#1E293B"
                      stroke="#475569"
                      strokeWidth="1.5"
                    />

                    {/* Landmarks mode */}
                    {viewMode === 'landmarks' && (
                      <g stroke="#38BDF8" strokeWidth="1" fill="#38BDF8">
                        <circle cx="80" cy="85" r="2" />
                        <circle cx="90" cy="84" r="2" />
                        <circle cx="110" cy="84" r="2" />
                        <circle cx="120" cy="85" r="2" />
                        {/* Brow AU4 landmarks */}
                        <circle cx="75" cy="74" r="2.5" fill="#F59E0B" />
                        <circle cx="92" cy="72" r="2.5" fill="#F59E0B" />
                        <circle cx="108" cy="72" r="2.5" fill="#F59E0B" />
                        <circle cx="125" cy="74" r="2.5" fill="#F59E0B" />
                        <line x1="75" y1="74" x2="92" y2="72" stroke="#F59E0B" strokeWidth="1.5" />
                        <line x1="108" y1="72" x2="125" y2="74" stroke="#F59E0B" strokeWidth="1.5" />
                        {/* Nose and mouth */}
                        <line x1="100" y1="88" x2="100" y2="108" stroke="#38BDF8" />
                        <path d="M85,120 Q100,126 115,120" fill="none" stroke="#38BDF8" strokeWidth="1.5" />
                      </g>
                    )}

                    {/* Grad-CAM Heatmap layer (Selvaraju et al. 2017) */}
                    {(viewMode === 'gradcam' || viewMode === 'landmarks') && (
                      <g className="mix-blend-screen opacity-80">
                        {/* Hotspot over brow corrugator AU4 */}
                        <ellipse cx="100" cy="73" rx="35" ry="18" fill="url(#gradCamFire)" />
                        {/* Secondary soft gaze hotspot */}
                        <ellipse cx="85" cy="88" rx="14" ry="10" fill="url(#gradCamSoft)" />
                      </g>
                    )}

                    {viewMode === 'vectors' && (
                      <g fill="none" stroke="#10B981" strokeWidth="1" strokeDasharray="3 3">
                        <rect x="55" y="45" width="90" height="100" rx="10" />
                        <line x1="100" y1="85" x2="135" y2="100" stroke="#EF4444" strokeWidth="2" markerEnd="url(#arrow)" />
                        <text x="60" y="40" fill="#10B981" fontSize="9" fontFamily="monospace">
                          Vector Yaw: +14° AU4: 0.88
                        </text>
                      </g>
                    )}

                    <defs>
                      <radialGradient id="gradCamFire" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#EF4444" stopOpacity="0.95" />
                        <stop offset="45%" stopColor="#F59E0B" stopOpacity="0.7" />
                        <stop offset="80%" stopColor="#10B981" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                      </radialGradient>
                      <radialGradient id="gradCamSoft" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.8" />
                        <stop offset="70%" stopColor="#3B82F6" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#1E293B" stopOpacity="0" />
                      </radialGradient>
                    </defs>
                  </svg>

                  {/* Gradient legend scale */}
                  <div className="absolute bottom-2 right-2 flex items-center gap-1.5 bg-black/70 px-2 py-1 rounded text-[8px] text-white font-mono">
                    <span>Low</span>
                    <div className="w-16 h-2 rounded-xs bg-gradient-to-r from-blue-600 via-yellow-400 to-red-600"></div>
                    <span>High Activation</span>
                  </div>
                </div>
              </div>

              {/* Heatmap Region Note */}
              <div className="mt-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">
                  Primary Salient Region
                </span>
                <span className="font-semibold text-slate-800 flex items-center gap-1 mt-0.5">
                  <Layers className="w-3.5 h-3.5 text-amber-600" />
                  {inspectingXai.gradCamRegion}
                </span>
                <p className="text-[11px] text-slate-500 mt-1">
                  Gradient backpropagation highlighted dense furrowing of corrugator supercilii muscles (Action Unit 4), correlated with cognitive impedance.
                </p>
              </div>
            </div>

            {/* Right: Feature Attribution Breakdown */}
            <div className="lg:col-span-7 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <BarChart className="w-4 h-4 text-[#396145]" />
                    Multimodal Feature Weight Attributions
                  </span>
                  <span className="text-[11px] text-slate-400">Normalized Contribution</span>
                </div>

                {/* Evidence Summary */}
                <div className="p-3 bg-[#FAF9F5] border border-[#EAE2D3] rounded-xl text-xs text-slate-700 mb-4 leading-relaxed">
                  <p>
                    <strong className="text-slate-900">Edge Reasoning Trail:</strong>{' '}
                    {inspectingXai.evidenceSummary}
                  </p>
                </div>

                {/* Feature Bars */}
                <div className="space-y-3">
                  {inspectingXai.featureAttributions.map((feat, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              feat.category === 'vision'
                                ? 'bg-indigo-500'
                                : feat.category === 'interaction'
                                ? 'bg-amber-500'
                                : 'bg-emerald-500'
                            }`}
                          ></span>
                          <span className="font-medium text-slate-800">{feat.feature}</span>
                          <span className="text-[10px] text-slate-400 capitalize">
                            ({feat.category})
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-mono text-slate-600">
                            {feat.observedValue}
                          </span>
                          <span className="font-mono font-bold text-slate-900 text-xs">
                            {Math.round(feat.importance * 100)}%
                          </span>
                        </div>
                      </div>

                      {/* Progress Track */}
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-700 ${
                            feat.importance > 0.35
                              ? 'bg-amber-500'
                              : feat.importance > 0.2
                              ? 'bg-[#396145]'
                              : 'bg-slate-400'
                          }`}
                          style={{ width: `${feat.importance * 100}%` }}
                        ></div>
                      </div>
                      <div className="text-[10px] text-slate-400 text-right">
                        Baseline: {feat.normalBaseline}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Model Confidence Guard Notice */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  Temporal aggregation window: <strong>3.5s moving average</strong>
                </span>
                <span className="text-emerald-700 font-medium">Confidence &gt; Threshold Passed</span>
              </div>
            </div>
          </div>

          {/* Bottom Human-In-The-Loop (HITL) Decision Bar */}
          <div className="bg-[#F2F7F4] p-5 rounded-2xl border border-[#CBDBD0] space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <h4 className="text-sm font-bold text-slate-900 font-serif flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#396145]" />
                  Human-in-the-Loop Educator Interventions
                </h4>
                <p className="text-xs text-slate-600">
                  AI proposes supportive pedagogical micro-actions; you hold full educational control.
                </p>
              </div>

              {feedbackSubmitted && (
                <div className="flex items-center gap-1 text-xs text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full font-medium animate-in fade-in">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  Intervention dispatched to {inspectingXai.studentName}'s tablet!
                </div>
              )}
            </div>

            {/* Quick Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {inspectingXai.recommendedInterventions.map(action => (
                <button
                  key={action.id}
                  onClick={() => handleAction(action.id)}
                  className="p-3 bg-white hover:bg-slate-50 border border-slate-200 hover:border-[#396145] rounded-xl text-left transition-all shadow-xs group cursor-pointer"
                >
                  <div className="flex items-center gap-2 mb-1">
                    {action.icon === 'hint' && <Lightbulb className="w-4 h-4 text-amber-500" />}
                    {action.icon === 'breathe' && <Wind className="w-4 h-4 text-sky-500" />}
                    {action.icon === 're-explain' && <HelpCircle className="w-4 h-4 text-[#396145]" />}
                    {action.icon === 'praise' && <Sparkles className="w-4 h-4 text-purple-500" />}
                    <span className="text-xs font-bold text-slate-800 group-hover:text-[#2D4E38]">
                      {action.label}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-tight">
                    {action.description}
                  </p>
                </button>
              ))}
            </div>

            {/* Teacher Feedback Loop / Model Reinforcement */}
            <div className="pt-3 border-t border-[#CBDBD0]/60 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-slate-600 font-medium">Model Calibration:</span>
                <input
                  type="text"
                  placeholder="Optional observation note..."
                  value={customNote}
                  onChange={e => setCustomNote(e.target.value)}
                  className="bg-white border border-slate-300 rounded-lg px-2.5 py-1 text-xs w-48 sm:w-64 focus:outline-hidden focus:ring-1 focus:ring-[#396145]"
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleValidation('validated_helpful')}
                  className="px-3 py-1.5 rounded-lg bg-[#2D4E38] hover:bg-[#1E3326] text-white font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Confirm Accurate</span>
                </button>
                <button
                  onClick={() => handleValidation('dismissed_deep_thinking')}
                  className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Marks this as healthy productive deliberation, tuning the edge model weights"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                  <span>Productive Struggle (Dismiss)</span>
                </button>
                <button
                  onClick={() => handleValidation('dismissed_transient')}
                  className="px-2.5 py-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                  title="Dismiss false positive"
                >
                  <XCircle className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
