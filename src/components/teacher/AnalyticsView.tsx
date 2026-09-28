import React from 'react';
import { useProductionClassroom } from '../../context/ProductionClassroomContext';
import {
  BarChart3,
  TrendingUp,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Download,
  Calendar,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  FileSpreadsheet,
} from 'lucide-react';

export const AnalyticsView: React.FC = () => {
  const { session, playChime } = useProductionClassroom();

  const handleExport = () => {
    playChime('bell');
    alert('Exporting Grade 11-A Calculus Performance Log (CSV / PDF)...');
  };

  const conceptMastery = [
    { concept: 'Inner/Outer Decomposition (Step 1)', mastery: 94, avgTime: '22s', status: 'Mastered' },
    { concept: 'Outer Shell Power Differentiation (Step 2)', mastery: 88, avgTime: '28s', status: 'Proficient' },
    { concept: 'Inner Core Chain Multiplication (Step 3)', mastery: 68, avgTime: '84s', status: 'Friction Hotspot' },
    { concept: 'Point Evaluation & Slope Calculation (Step 4)', mastery: 82, avgTime: '31s', status: 'Proficient' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E5ECE7] text-[#2D4E38] text-xs font-semibold uppercase tracking-wider mb-1">
            <BarChart3 className="w-3.5 h-3.5" />
            Classroom Insights & Analytics
          </div>
          <h1 className="text-xl sm:text-2xl font-bold font-serif text-slate-900">
            Grade 11-A Learning & Attention Metrics
          </h1>
          <p className="text-xs text-slate-500">
            Real-time concept resolution curves, cognitive friction hotspots, and individual student learning trends for {session.subject}.
          </p>
        </div>

        <button
          onClick={handleExport}
          className="px-4 py-2 rounded-xl bg-[#2D4E38] hover:bg-[#1E3326] text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer self-start md:self-auto"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Class Summary (CSV)</span>
        </button>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>Average Resolution Speed</span>
            <Clock className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900">41.2s</div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-medium mt-1">
            <ArrowUpRight className="w-3 h-3" />
            <span>14% faster than last period</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>Overall Concept Mastery</span>
            <TrendingUp className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900">83.0%</div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-medium mt-1">
            <ArrowUpRight className="w-3 h-3" />
            <span>Exceeds departmental baseline (75%)</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>Friction Checkpoints Resolved</span>
            <CheckCircle2 className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900">3 of 3</div>
          <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium mt-1">
            <span>All educator scaffold hints acknowledged</span>
          </div>
        </div>
      </div>

      {/* Concept Difficulty Heatmap Table */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
            Concept Difficulty Breakdown: The Chain Rule
          </h2>
          <span className="text-xs text-slate-400">16 Students Analyzed</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-semibold">
                <th className="py-2.5">Syllabus Checkpoint</th>
                <th className="py-2.5">Mastery Index</th>
                <th className="py-2.5">Average Solve Time</th>
                <th className="py-2.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {conceptMastery.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50">
                  <td className="py-3 font-medium text-slate-900">{row.concept}</td>
                  <td className="py-3 font-mono font-bold">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            row.mastery > 80 ? 'bg-emerald-500' : 'bg-amber-500'
                          }`}
                          style={{ width: `${row.mastery}%` }}
                        ></div>
                      </div>
                      <span>{row.mastery}%</span>
                    </div>
                  </td>
                  <td className="py-3 font-mono text-slate-600">{row.avgTime}</td>
                  <td className="py-3">
                    <span
                      className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        row.status === 'Friction Hotspot'
                          ? 'bg-amber-100 text-amber-900 border border-amber-200'
                          : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
