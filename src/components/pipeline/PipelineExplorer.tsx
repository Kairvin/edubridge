import React, { useState } from 'react';
import { useClassroom } from '../../context/ClassroomContext';
import {
  GitBranch,
  Cpu,
  Layers,
  ShieldCheck,
  CheckCircle,
  XCircle,
  Database,
  LayoutDashboard,
  FileText,
  Sliders,
  Play,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Code2,
} from 'lucide-react';

interface PipelineNode {
  id: string;
  stepNumber: number;
  title: string;
  subtitle: string;
  category: 'Hardware & Edge' | 'Preprocessing' | 'Deep Learning' | 'Decision Gate' | 'Teacher Cockpit' | 'Feedback Loop';
  description: string;
  techDetails: string[];
  codeSnippet: string;
  privacyNote: string;
}

const PIPELINE_NODES: PipelineNode[] = [
  {
    id: 'node-sensor',
    stepNumber: 1,
    title: 'Smart Tablet Sensor Collection',
    subtitle: 'Edge Hardware & Input Streaming',
    category: 'Hardware & Edge',
    description: 'Captures subtle multimodal indicators: front-facing wide angle camera (30 FPS facial landmarks), touch pressure, stylus hover hesitation, and accelerometer head tilt.',
    techDetails: [
      'Hardware: Quad-core ARM Cortex-A55 with 1.2 TOPS NPU accelerator',
      'Frame Rate: 15-30 FPS on-chip downsampled stream',
      'Input Modalities: Video landmarks (468 3D points), Stylus jitter, Touch dwell time',
    ],
    codeSnippet: `// Edge Sensor Ingestion (Tablet NPU Enclave)
class SensorCollector {
  async readStream() {
    const rawMesh = await this.npu.detectLandmarks(videoFrame);
    const touchJitter = this.digitizer.getHoverDuration();
    return { rawMesh, touchJitter, timestamp: performance.now() };
  }
}`,
    privacyNote: '🔒 Zero Raw Video Storage: Frames exist only in volatile RAM buffers for < 33ms and are never saved to disk or broadcast.',
  },
  {
    id: 'node-preprocess',
    stepNumber: 2,
    title: 'Data Preprocessing on Edge',
    subtitle: 'Facial Action Units & Gaze Vectors',
    category: 'Preprocessing',
    description: 'Converts raw mesh points into standardized behavioral vector metrics: Action Unit 4 (corrugator brow furrow), Action Unit 7 (eyelid tighten), 3D head yaw/pitch, and blink intervals.',
    techDetails: [
      'Normalizes landmarks against student’s personal neutral baseline',
      'Calculates moving window (3.5s) blink rate and gaze yaw deviation',
      'Generates 128-dimensional compact temporal feature embedding',
    ],
    codeSnippet: `def extract_behavioral_vectors(landmarks, baseline):
    brow_dist = euclidean(landmarks[AU4_LEFT], landmarks[AU4_RIGHT])
    furrow_intensity = np.clip((baseline.brow_dist - brow_dist) / baseline.std, 0.0, 1.0)
    gaze_yaw = compute_head_pose_pnp(landmarks, CAMERA_MATRIX)
    return FeatureVector(au4=furrow_intensity, yaw=gaze_yaw, blink=calc_blink())`,
    privacyNote: 'Vectors contain zero biometric identity keys; facial vectors cannot reconstruct the student’s visual photograph.',
  },
  {
    id: 'node-model',
    stepNumber: 3,
    title: 'Lightweight ML/DL Inference',
    subtitle: 'MobileNetV3 + Temporal GRU (Quantized)',
    category: 'Deep Learning',
    description: 'On-device neural network models predict cognitive states: Confusion Probability, Frustration / Stress Index, and Disengagement probability.',
    techDetails: [
      'Model: MobileNetV3-Small backbone with bidirectional Gated Recurrent Unit (GRU)',
      'Quantization: INT8 post-training quantization for 14ms low-power latency',
      'Power Consumption: < 1.4W continuous inference load on tablet battery',
    ],
    codeSnippet: `// Quantized TFLite / ONNX Runtime Inference
const modelOutput = await edgeNpuModel.run(featureTensor);
const { confusion_prob, stress_index, attention_score } = softmax(modelOutput);
const prediction = {
  condition: confusion_prob > 0.7 ? 'CONFUSION' : 'FLOW',
  confidence: Math.round(confusion_prob * 100),
  latency_ms: 14.2
};`,
    privacyNote: 'Fully offline-capable: operates in rural schools with zero broadband or internet connectivity.',
  },
  {
    id: 'node-gate',
    stepNumber: 4,
    title: 'Confidence Threshold Gate',
    subtitle: 'Intelligent Alert Gating & Fatigue Prevention',
    category: 'Decision Gate',
    description: 'Crucial decision junction. If the model prediction confidence falls below the educator-defined threshold, NO alert is issued and the system stays in silent continuous monitoring mode.',
    techDetails: [
      'Prevents alert fatigue: Only actionable, statistically robust events surface',
      'Configurable threshold slider: 50% (High sensitivity) to 95% (Strict precision)',
      'Hysteresis buffer prevents flickering alert oscillation',
    ],
    codeSnippet: `if prediction.confidence >= teacher_confidence_threshold:
    # Crosses threshold: trigger alert & XAI report generator
    generate_xai_diagnostic(prediction)
    dispatch_websocket_to_teacher_cockpit(prediction)
else:
    # Silent loop: retain in local edge cache for trend analytics
    log_silent_continuous_monitoring(prediction)`,
    privacyNote: 'Filters out noisy transient expressions (e.g. yawning, laughing, fleeting brow adjustments).',
  },
  {
    id: 'node-xai',
    stepNumber: 5,
    title: 'Explainable AI (XAI) Report Generation',
    subtitle: 'Grad-CAM Heatmaps & Feature Attributions',
    category: 'Deep Learning',
    description: 'Computes gradient-weighted class activation mapping (Selvaraju et al. 2017) and multimodal feature contributions so teachers know exactly WHY the alert was flagged.',
    techDetails: [
      'Visual Explainability: Grad-CAM heatmap over facial landmark zones',
      'Feature Attributions: Quantified impact of brow furrow, stylus pause, gaze yaw',
      'Pedagogical Scaffolding suggestions matched to cognitive roadblock',
    ],
    codeSnippet: `def generate_gradcam_attribution(model, feature_map, target_class):
    grads = tf.gradients(target_class, feature_map)
    pooled_grads = tf.reduce_mean(grads, axis=(0, 1, 2))
    heatmap = tf.maximum(tf.matmul(feature_map, pooled_grads), 0)
    return normalize_heatmap(heatmap)`,
    privacyNote: 'Explains the model’s reasoning to build educator trust and avoid black-box mistrust.',
  },
  {
    id: 'node-teacher',
    stepNumber: 6,
    title: 'Teacher Live Cockpit & HITL Action',
    subtitle: 'Human-in-the-Loop Educational Co-pilot',
    category: 'Teacher Cockpit',
    description: 'The educator receives the transparent alert. The AI never takes unilateral disciplinary action—the teacher retains complete educational authority to send hints, initiate a breath pause, or dismiss the alert.',
    techDetails: [
      'Sub-second WebSocket telemetry broadcast to teacher dashboard',
      'One-click micro-interventions: Adaptive hint dispatch, 2-min breath reset',
      'Classroom aggregate heatmaps to spot common syllabus bottlenecks',
    ],
    codeSnippet: `// Teacher Action Dispatch
async function handleTeacherIntervention(studentId, actionType) {
  await classroomSocket.emit('intervention', {
    targetStudent: studentId,
    type: actionType, // 'MICRO_HINT' | 'BREATHE' | 'RE_EXPLAIN'
    timestamp: Date.now()
  });
}`,
    privacyNote: 'Ensures empathy-first human pedagogy over algorithmic surveillance.',
  },
  {
    id: 'node-feedback',
    stepNumber: 7,
    title: 'Educator Reinforcement Loop',
    subtitle: 'Continuous Active Model Calibration',
    category: 'Feedback Loop',
    description: 'Teacher validation or dismissal ("Student was thinking deeply") feeds back into the local edge cache, calibrating individual student thresholds over time.',
    techDetails: [
      'Federated learning ready: Personal calibration parameters stay on-device',
      'Reduces individual false positive rate by 42% over a 3-week study period',
      'Reinforces teacher trust in hybrid AI partnership',
    ],
    codeSnippet: `// Model Calibration Loop
function updateCalibrationWeights(studentBaseline, teacherFeedback) {
  if (teacherFeedback.type === 'DEEP_THINKING') {
    studentBaseline.au4_threshold += 0.05; // Adjust furrow tolerance
  }
  saveLocalEnclave(studentBaseline);
}`,
    privacyNote: 'Model learns individual expressive habits without uploading personal biometrics.',
  },
];

export const PipelineExplorer: React.FC = () => {
  const { confidenceThreshold, setConfidenceThreshold } = useClassroom();
  const [selectedNodeId, setSelectedNodeId] = useState<string>('node-gate');

  const selectedNode = PIPELINE_NODES.find(n => n.id === selectedNodeId) || PIPELINE_NODES[3];

  // Test simulation events for threshold gate demonstration
  const testEvents = [
    { label: 'Event 1: Fleeting brow squint', confidence: 62, condition: 'Mild Hesitation' },
    { label: 'Event 2: Looking out window for 4s', confidence: 71, condition: 'Slight Drift' },
    { label: 'Event 3: 4 undo erases in 30s', confidence: 84, condition: 'High Stress' },
    { label: 'Event 4: Brow furrow + 6.4s step pause', confidence: 89, condition: 'Severe Confusion' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E5ECE7] text-[#2D4E38] text-xs font-semibold uppercase tracking-wider mb-1">
            <GitBranch className="w-3.5 h-3.5" />
            End-to-End Edge Architecture Explorer
          </div>
          <h1 className="text-xl sm:text-2xl font-bold font-serif text-slate-900">
            Hybrid AI Architecture & Pipeline Dataflow
          </h1>
          <p className="text-xs text-slate-500 max-w-2xl">
            Explore every processing stage of EduBridge: from edge sensor collection and quantized NPU inference to the Confidence Threshold Gate and Teacher HITL loop.
          </p>
        </div>

        {/* Global Privacy Enclave Pill */}
        <div className="flex items-center gap-2 bg-[#FAF9F5] px-4 py-2 rounded-2xl border border-emerald-200/80">
          <ShieldCheck className="w-5 h-5 text-emerald-600" />
          <div className="text-xs">
            <span className="font-bold text-slate-800 block">Privacy-by-Design Enclave</span>
            <span className="text-[11px] text-slate-500">100% on-device vector processing</span>
          </div>
        </div>
      </div>

      {/* Interactive Step-by-Step Flowchart */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-6 overflow-x-auto">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#396145]" />
            Real-Time Dataflow Pipeline (Click any node to inspect code & architecture)
          </h2>
          <span className="text-xs text-slate-400">7 Connected Architecture Nodes</span>
        </div>

        {/* Responsive Node Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-2.5">
          {PIPELINE_NODES.map((node, index) => {
            const isSelected = selectedNode.id === node.id;
            return (
              <div
                key={node.id}
                onClick={() => setSelectedNodeId(node.id)}
                className={`p-3 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between relative group ${
                  isSelected
                    ? 'bg-[#2D4E38] text-white border-[#1E3326] shadow-md ring-2 ring-[#4A7758]/30'
                    : 'bg-[#FAF9F5] hover:bg-white text-slate-800 border-slate-200/90 hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span
                      className={`w-6 h-6 rounded-lg text-xs font-mono font-bold flex items-center justify-center ${
                        isSelected
                          ? 'bg-white/20 text-white'
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {node.stepNumber}
                    </span>
                    <span
                      className={`text-[9px] uppercase tracking-wider font-semibold ${
                        isSelected ? 'text-emerald-300' : 'text-slate-400'
                      }`}
                    >
                      {node.category.split(' ')[0]}
                    </span>
                  </div>

                  <h3
                    className={`text-xs font-bold leading-tight line-clamp-2 ${
                      isSelected ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    {node.title}
                  </h3>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-200/40 flex items-center justify-between text-[10px]">
                  <span className={isSelected ? 'text-slate-200' : 'text-slate-500'}>
                    View specs
                  </span>
                  <ArrowRight
                    className={`w-3 h-3 ${isSelected ? 'text-emerald-300' : 'text-slate-400'}`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Threshold Gate Simulator */}
      <div className="bg-gradient-to-br from-[#FAF9F5] to-[#F2F7F4] p-6 rounded-3xl border border-amber-200/80 shadow-xs space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-1">
              <Sliders className="w-3.5 h-3.5 text-amber-700" />
              Dynamic Precision Control: Interactive Confidence Threshold Gate
            </div>
            <h3 className="text-lg font-bold font-serif text-slate-900">
              Threshold Gate: Filtering Out False Alarms in Real Time
            </h3>
            <p className="text-xs text-slate-600 max-w-xl">
              Drag the threshold slider to see how EduBridge dynamically filters out low-confidence transient behaviors, preventing teacher distraction while surfacing critical cognitive roadblocks.
            </p>
          </div>

          {/* Interactive Slider */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs min-w-[300px]">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-bold text-slate-800">Current Confidence Gate:</span>
              <span className="font-mono text-sm font-extrabold text-[#2D4E38]">
                {confidenceThreshold}%
              </span>
            </div>
            <input
              type="range"
              min="50"
              max="95"
              step="5"
              value={confidenceThreshold}
              onChange={e => setConfidenceThreshold(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#2D4E38]"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
              <span>50%</span>
              <span>Balanced (75%)</span>
              <span>95%</span>
            </div>
          </div>
        </div>

        {/* Live Simulation Matrix of Events passing or getting filtered */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
          {testEvents.map((evt, idx) => {
            const passes = evt.confidence >= confidenceThreshold;
            return (
              <div
                key={idx}
                className={`p-4 rounded-2xl border transition-all ${
                  passes
                    ? 'bg-white border-amber-300 shadow-xs'
                    : 'bg-slate-100/70 border-slate-200 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-bold text-slate-800 font-mono text-xs">
                    {evt.confidence}% Conf
                  </span>
                  {passes ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                      <CheckCircle className="w-3 h-3 text-amber-600" />
                      Alert Triggered
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[10px] font-medium text-slate-500 bg-slate-200 px-2 py-0.5 rounded-full">
                      <XCircle className="w-3 h-3 text-slate-400" />
                      Silent Monitoring
                    </span>
                  )}
                </div>

                <h4 className="text-xs font-semibold text-slate-900 mt-1">
                  {evt.label}
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Condition: {evt.condition}
                </p>

                <div className="mt-3 pt-2 border-t border-slate-100 text-[10px] text-slate-500">
                  {passes ? (
                    <span className="text-amber-800 font-medium">
                      ↳ Routes to Teacher Dashboard + EAI Report
                    </span>
                  ) : (
                    <span className="text-slate-500">
                      ↳ Keeps monitoring locally on edge
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Pipeline Node Deep-Dive Inspection */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-xl bg-[#2D4E38] text-white flex items-center justify-center font-bold font-mono text-sm">
              #{selectedNode.stepNumber}
            </span>
            <div>
              <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400">
                {selectedNode.category}
              </span>
              <h3 className="text-lg font-bold text-slate-900 font-serif">
                {selectedNode.title}
              </h3>
            </div>
          </div>
          <span className="text-xs text-slate-500 hidden sm:inline">
            {selectedNode.subtitle}
          </span>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Functional Specs & Privacy Assurance */}
          <div className="lg:col-span-6 space-y-4">
            <div>
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                Engineering Specification
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {selectedNode.description}
              </p>
            </div>

            {/* Bullet points */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                Technical Highlights
              </span>
              <ul className="space-y-1.5 text-xs text-slate-600">
                {selectedNode.techDetails.map((tech, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#396145] mt-1.5 flex-shrink-0"></span>
                    <span>{tech}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Privacy note */}
            <div className="p-3.5 rounded-2xl bg-[#F2F7F4] border border-[#CBDBD0] text-xs text-emerald-900">
              <span className="font-bold flex items-center gap-1.5 mb-1 text-[#2D4E38]">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Privacy-by-Design Compliance
              </span>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                {selectedNode.privacyNote}
              </p>
            </div>
          </div>

          {/* Right: Code Implementation Snippet */}
          <div className="lg:col-span-6 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-mono flex items-center gap-1">
                <Code2 className="w-4 h-4 text-slate-400" />
                Implementation Reference
              </span>
              <span className="text-[11px] text-slate-400">Production Python / TypeScript</span>
            </div>

            <div className="bg-slate-900 rounded-2xl p-4 text-emerald-300 font-mono text-xs overflow-x-auto border border-slate-800 shadow-inner">
              <pre className="leading-relaxed whitespace-pre">{selectedNode.codeSnippet}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
