import React from 'react';
import { BrainCircuit, ShieldCheck, Heart, GitBranch, ExternalLink, School } from 'lucide-react';

export const ProductionFooter: React.FC = () => {
  return (
    <footer className="mt-16 bg-[#F4EFE7]/80 border-t border-[#EAE2D3] py-10 text-slate-600 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#2D4E38] text-white flex items-center justify-center font-bold">
              <BrainCircuit className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <span className="font-serif font-bold text-base text-slate-900 block leading-tight">
                EduBridge Studio
              </span>
              <span className="text-[11px] text-slate-500">
                Cognitive Co-Pilot for Modern Classrooms • Enterprise Edition
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1.5 font-medium text-slate-700">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              100% On-Device Processing (Zero Video Leaves Device)
            </span>
            <span>•</span>
            <span>Offline Local Wi-Fi Mesh</span>
            <span>•</span>
            <span>Version 3.2-LTS</span>
          </div>
        </div>

        <div className="pt-6 border-t border-[#EAE2D3] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
          <span>
            © 2026 EduBridge Technologies Inc. Licensed to Delhi Public School • R.K. Puram
          </span>
          <span className="flex items-center gap-1">
            Empathetic, human-centric educational ergonomics <Heart className="w-3 h-3 text-rose-400" />
          </span>
        </div>
      </div>
    </footer>
  );
};
