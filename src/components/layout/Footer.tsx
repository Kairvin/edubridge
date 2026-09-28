import React from 'react';
import { BrainCircuit, ShieldCheck, Heart, GitBranch, ExternalLink, Lock, Cpu, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 bg-[#F4EFE7]/80 border-t border-[#EAE2D3] py-12 text-slate-600 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#2D4E38] text-white flex items-center justify-center font-bold">
                <BrainCircuit className="w-5 h-5 text-emerald-300" />
              </div>
              <span className="font-serif font-bold text-lg text-slate-900">
                EduBridge
              </span>
              <span className="text-[10px] bg-[#E5ECE7] text-[#2D4E38] font-bold px-2 py-0.5 rounded-full border border-[#CBDBD0]">
                Enterprise Edition
              </span>
            </div>
            <p className="text-xs text-slate-500 max-w-md leading-relaxed">
              Bridging the gap between student behaviour and educator awareness through an empathetic, on-device hybrid intelligence architecture. Engineered to preserve dignity, enhance focus, and eliminate learning friction.
            </p>
            <div className="flex items-center gap-3 text-slate-500 text-[11px] pt-1">
              <span>Privacy Enclave: <strong className="text-slate-800 font-medium">Active (Zero Cloud Video)</strong></span>
              <span>•</span>
              <span>Inference Engine: <strong className="text-slate-800 font-medium">Edge NPU INT8</strong></span>
            </div>
          </div>

          {/* Core Technologies */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Architecture & Stack
            </h4>
            <ul className="space-y-1 text-slate-500">
              <li>• Computer Vision & Deep Learning</li>
              <li>• Quantized MobileNetV3 (INT8)</li>
              <li>• Explainable AI (Grad-CAM Attributions)</li>
              <li>• On-Device ARM Cortex NPU Acceleration</li>
              <li>• Real-Time WebSocket Telemetry</li>
              <li>• React, TypeScript & Tailwind CSS</li>
            </ul>
          </div>

          {/* Privacy & Compliance */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Privacy-by-Design Standards
            </h4>
            <p className="text-slate-500 text-[11px] leading-relaxed">
              Raw optical frames never leave the device. Multi-frame behavioral tensors are computed on-chip in volatile RAM and immediately discarded. Only anonymized engagement vectors reach the educator.
            </p>
            <div className="pt-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-700 hover:text-slate-900 text-xs font-medium hover:bg-slate-50 transition-colors"
              >
                <GitBranch className="w-3.5 h-3.5" />
                <span>Source Repository</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-[#EAE2D3] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
          <span>
            © 2026 EduBridge Systems Inc. All rights reserved.
          </span>
          <span className="flex items-center gap-1">
            Engineered with soothing, human-centric educational ergonomics <Heart className="w-3 h-3 text-rose-400" />
          </span>
        </div>
      </div>
    </footer>
  );
};
