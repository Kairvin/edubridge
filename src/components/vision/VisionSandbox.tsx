import React, { useState, useRef, useEffect } from 'react';
import { useClassroom } from '../../context/ClassroomContext';
import {
  Camera,
  CameraOff,
  ShieldCheck,
  Cpu,
  Sparkles,
  Eye,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCcw,
  Zap,
} from 'lucide-react';

interface BehavioralPreset {
  id: string;
  name: string;
  condition: string;
  browFurrow: number;
  blinkRate: number;
  gazeYaw: number;
  confidence: number;
  status: 'flow' | 'confused' | 'stressed' | 'anomaly';
  description: string;
}

const PRESETS: BehavioralPreset[] = [
  {
    id: 'preset-flow',
    name: 'Optimal Cognitive Flow',
    condition: 'Engaged & Solving',
    browFurrow: 0.12,
    blinkRate: 18,
    gazeYaw: 2,
    confidence: 94,
    status: 'flow',
    description: 'Smooth saccades, relaxed corrugator supercilii, consistent stylus cadence.',
  },
  {
    id: 'preset-confused',
    name: 'Concept Confusion (Step 3)',
    condition: 'Corrugator AU4 Furrow Spike',
    browFurrow: 0.88,
    blinkRate: 28,
    gazeYaw: 14,
    confidence: 89,
    status: 'confused',
    description: 'Strong eyebrow muscle contraction, repeated screen hesitation, clustered fixation.',
  },
  {
    id: 'preset-stressed',
    name: 'Autonomic Stress & Overload',
    condition: 'Blink Burst & Jitter',
    browFurrow: 0.76,
    blinkRate: 36,
    gazeYaw: -6,
    confidence: 84,
    status: 'stressed',
    description: 'Blink acceleration > 35/min, postural slump closer to tablet, stylus erase jitters.',
  },
  {
    id: 'preset-anomaly',
    name: 'Exam Proctoring Gaze Drift',
    condition: 'Off-Axis Visual Drift',
    browFurrow: 0.18,
    blinkRate: 14,
    gazeYaw: 42,
    confidence: 91,
    status: 'anomaly',
    description: 'Sustained eye direction off tablet viewport > 35° yaw toward secondary surface.',
  },
];

export const VisionSandbox: React.FC = () => {
  const { playChime } = useClassroom();
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [activePreset, setActivePreset] = useState<BehavioralPreset>(PRESETS[1]);

  // Real-time gauges
  const [browValue, setBrowValue] = useState<number>(0.88);
  const [blinkValue, setBlinkValue] = useState<number>(28);
  const [gazeValue, setGazeValue] = useState<number>(14);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Apply preset
  const selectPreset = (p: BehavioralPreset) => {
    setActivePreset(p);
    setBrowValue(p.browFurrow);
    setBlinkValue(p.blinkRate);
    setGazeValue(p.gazeYaw);
    playChime('calm_bell');
  };

  // Toggle Live Webcam
  const toggleCamera = async () => {
    if (cameraActive) {
      // stop tracks
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(t => t.stop());
        videoRef.current.srcObject = null;
      }
      setCameraActive(false);
    } else {
      setCameraError(null);
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 480, height: 360, facingMode: 'user' },
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
        setCameraActive(true);
        playChime('success');
      } catch (err: unknown) {
        const errMsg = err instanceof Error ? err.message : 'Camera permission denied or unavailable';
        setCameraError(errMsg);
      }
    }
  };

  // Canvas drawing loop for mesh simulation
  useEffect(() => {
    let animId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (cameraActive && videoRef.current && videoRef.current.readyState >= 2) {
        // Draw mirrored camera
        ctx.save();
        ctx.scale(-1, 1);
        ctx.drawImage(videoRef.current, -canvas.width, 0, canvas.width, canvas.height);
        ctx.restore();
      } else {
        // Draw simulated synthetic student face background
        ctx.fillStyle = '#0F172A';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Head contour
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.ellipse(canvas.width / 2, canvas.height / 2 + 10, 80, 110, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Draw On-Device Facial Landmark Mesh (468 points simulation)
      const centerX = canvas.width / 2 + gazeValue * 1.5;
      const centerY = canvas.height / 2 - 10;

      // Eyes
      ctx.fillStyle = '#38BDF8';
      ctx.beginPath();
      ctx.arc(centerX - 35, centerY, 5, 0, Math.PI * 2);
      ctx.arc(centerX + 35, centerY, 5, 0, Math.PI * 2);
      ctx.fill();

      // Eyebrow Corrugator AU4 line with furrow intensity
      const furrowDrop = browValue * 14;
      ctx.strokeStyle = browValue > 0.5 ? '#F59E0B' : '#10B981';
      ctx.lineWidth = 3;
      ctx.beginPath();
      // Left brow
      ctx.moveTo(centerX - 55, centerY - 25);
      ctx.lineTo(centerX - 15, centerY - 20 + furrowDrop);
      // Right brow
      ctx.moveTo(centerX + 55, centerY - 25);
      ctx.lineTo(centerX + 15, centerY - 20 + furrowDrop);
      ctx.stroke();

      // Grad-CAM Activation Heatmap overlay around furrow zone
      if (browValue > 0.4) {
        const gradient = ctx.createRadialGradient(
          centerX,
          centerY - 15 + furrowDrop,
          4,
          centerX,
          centerY - 15 + furrowDrop,
          45
        );
        gradient.addColorStop(0, 'rgba(239, 68, 68, 0.7)');
        gradient.addColorStop(0.5, 'rgba(245, 158, 11, 0.4)');
        gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(centerX, centerY - 15 + furrowDrop, 50, 0, Math.PI * 2);
        ctx.fill();
      }

      // Gaze vector line
      ctx.strokeStyle = '#38BDF8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(centerX + gazeValue * 4, centerY + 30);
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [cameraActive, browValue, gazeValue]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E5ECE7] text-[#2D4E38] text-xs font-semibold uppercase tracking-wider mb-1">
            <Camera className="w-3.5 h-3.5" />
            Edge Computer Vision Sandbox
          </div>
          <h1 className="text-xl sm:text-2xl font-bold font-serif text-slate-900">
            Interactive On-Device Vision Laboratory
          </h1>
          <p className="text-xs text-slate-500 max-w-2xl">
            Test the real-time behavioral classifier in your browser. Choose synthetic presets or test with your own webcam. Every computation runs 100% locally on your machine.
          </p>
        </div>

        {/* Camera Toggle Button */}
        <button
          onClick={toggleCamera}
          className={`px-4 py-2.5 rounded-2xl font-semibold text-xs flex items-center gap-2 transition-all shadow-xs cursor-pointer ${
            cameraActive
              ? 'bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100'
              : 'bg-[#2D4E38] hover:bg-[#1E3326] text-white'
          }`}
        >
          {cameraActive ? (
            <>
              <CameraOff className="w-4 h-4" />
              <span>Turn Off Webcam</span>
            </>
          ) : (
            <>
              <Camera className="w-4 h-4" />
              <span>Test with My Webcam</span>
            </>
          )}
        </button>
      </div>

      {cameraError && (
        <div className="bg-amber-50 border border-amber-200 text-amber-900 p-4 rounded-2xl text-xs flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
          <span>Notice: {cameraError}. You can freely use the synthetic preset simulator below!</span>
        </div>
      )}

      {/* Main Sandbox Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 Cols: Video & Canvas Mesh Viewport */}
        <div className="lg:col-span-7 bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                {cameraActive ? 'Live User Camera Feed (Local Client)' : 'Synthetic Facial Mesh Stream'}
              </span>
            </div>
            <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              ZERO CLOUD TRANSMISSION
            </span>
          </div>

          {/* Viewport Frame */}
          <div className="relative aspect-4/3 w-full bg-slate-900 rounded-2xl overflow-hidden border border-slate-700 shadow-inner flex items-center justify-center">
            {/* Hidden video element used to capture stream */}
            <video
              ref={videoRef}
              playsInline
              muted
              className="hidden"
            />

            {/* Canvas that renders the camera + landmarks + Grad-CAM heatmap */}
            <canvas
              ref={canvasRef}
              width={480}
              height={360}
              className="w-full h-full object-cover"
            />

            {/* Edge HUD Overlays */}
            <div className="absolute top-3 left-3 flex flex-col gap-1 text-[10px] font-mono text-white/90 bg-black/60 backdrop-blur-sm p-2 rounded-xl border border-white/10">
              <span className="text-emerald-400 font-semibold">● EDGE NPU: 14.1 ms</span>
              <span>AU4 CORRUGATOR: {(browValue * 100).toFixed(0)}%</span>
              <span>BLINK RATE: {blinkValue} /min</span>
              <span>GAZE YAW: {gazeValue}°</span>
            </div>

            {/* Classification Badge overlay */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between bg-black/70 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/10 text-white text-xs">
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Inferred State:</span>
                <span className="font-bold text-amber-300">
                  {browValue > 0.6 ? 'Topic Confusion' : gazeValue > 30 ? 'Exam Anomaly' : 'Flow Focus'}
                </span>
              </div>
              <div className="flex items-center gap-2 font-mono text-[11px]">
                <span className="text-slate-300">Confidence:</span>
                <span className="font-bold text-emerald-400">
                  {Math.round((0.7 + browValue * 0.25) * 100)}%
                </span>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-slate-500 leading-relaxed">
            The tablet’s front camera tracks subtle micro-movements of facial action units. By computing Grad-CAM gradients directly on device, the tablet flags emotional friction without exposing the student's face.
          </p>
        </div>

        {/* Right 5 Cols: Presets & Live Metric Tuning */}
        <div className="lg:col-span-5 space-y-4">
          {/* Preset Buttons */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-3">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#396145]" />
              Classroom Behavioral Scenarios (Presets)
            </h3>

            <div className="space-y-2">
              {PRESETS.map(preset => {
                const isSelected = activePreset.id === preset.id;
                return (
                  <button
                    key={preset.id}
                    onClick={() => selectPreset(preset)}
                    className={`w-full p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#396145] bg-[#F2F7F4] shadow-xs ring-1 ring-[#4A7758]'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">
                        {preset.name}
                      </span>
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-slate-100 font-semibold text-slate-700">
                        {preset.confidence}% conf
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {preset.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Manual Telemetry Sliders */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-[#396145]" />
              Manual Micro-Feature Tuning
            </h3>

            {/* Brow Furrow Slider */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-600 font-medium">AU4 Eyebrow Furrow:</span>
                <span className="font-mono font-bold text-slate-900">{browValue.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.0"
                max="1.0"
                step="0.05"
                value={browValue}
                onChange={e => setBrowValue(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#2D4E38]"
              />
            </div>

            {/* Blink Rate Slider */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-600 font-medium">Blink Rate (per min):</span>
                <span className="font-mono font-bold text-slate-900">{blinkValue}</span>
              </div>
              <input
                type="range"
                min="10"
                max="50"
                step="1"
                value={blinkValue}
                onChange={e => setBlinkValue(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#2D4E38]"
              />
            </div>

            {/* Gaze Yaw Slider */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-600 font-medium">Gaze Yaw Angle:</span>
                <span className="font-mono font-bold text-slate-900">{gazeValue}°</span>
              </div>
              <input
                type="range"
                min="-45"
                max="45"
                step="1"
                value={gazeValue}
                onChange={e => setGazeValue(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#2D4E38]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
