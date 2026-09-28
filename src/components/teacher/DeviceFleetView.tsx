import React from 'react';
import { useProductionClassroom } from '../../context/ProductionClassroomContext';
import {
  Tablet,
  Battery,
  Wifi,
  ShieldCheck,
  RefreshCw,
  Lock,
  Moon,
  Power,
  CheckCircle2,
} from 'lucide-react';

export const DeviceFleetView: React.FC = () => {
  const { session, fleetDevices, toggleLockdownMode, playChime } = useProductionClassroom();

  const handleSyncAll = () => {
    playChime('bell');
    alert('Synchronizing local offline mesh cache across all 16 student tablets...');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E5ECE7] text-[#2D4E38] text-xs font-semibold uppercase tracking-wider mb-1">
            <Tablet className="w-3.5 h-3.5" />
            Classroom Tablet Fleet
          </div>
          <h1 className="text-xl sm:text-2xl font-bold font-serif text-slate-900">
            {session.className} Hardware & Device Management
          </h1>
          <p className="text-xs text-slate-500">
            16 EduBridge Smart Tablets connected via low-latency local ad-hoc Wi-Fi mesh. Fully operational with zero cloud dependency.
          </p>
        </div>

        {/* Fleet actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleSyncAll}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5 text-slate-600" />
            <span>Sync Cache</span>
          </button>

          <button
            onClick={toggleLockdownMode}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              session.isLockdownActive
                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                : 'bg-[#2D4E38] hover:bg-[#1E3326] text-white'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>{session.isLockdownActive ? 'Focus Lock Active' : 'Lock to Lesson'}</span>
          </button>
        </div>
      </div>

      {/* Fleet Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Fleet Connectivity</span>
          <span className="text-lg font-bold text-slate-900 font-mono mt-0.5 block">16 / 16 Tablets</span>
          <span className="text-[10px] text-emerald-600 font-medium flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            All nodes responsive
          </span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Average Battery</span>
          <span className="text-lg font-bold text-emerald-700 font-mono mt-0.5 block">88.4%</span>
          <span className="text-[10px] text-slate-500 font-medium">Over 5.5 hours remaining</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Network Protocol</span>
          <span className="text-lg font-bold text-slate-900 font-mono mt-0.5 block">BLE / Mesh Wi-Fi</span>
          <span className="text-[10px] text-sky-700 font-medium">Sub-10ms packet latency</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Privacy Guarantee</span>
          <span className="text-lg font-bold text-emerald-800 font-mono mt-0.5 block">On-Device INT8</span>
          <span className="text-[10px] text-emerald-600 font-medium">Zero optical transmission</span>
        </div>
      </div>

      {/* Fleet Devices Grid Table */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
          Connected Student Tablets (16)
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-semibold">
                <th className="py-2.5">Roll No</th>
                <th className="py-2.5">Assigned Student</th>
                <th className="py-2.5">Device Hardware</th>
                <th className="py-2.5">Battery %</th>
                <th className="py-2.5">OS Firmware</th>
                <th className="py-2.5">Telemetry Link</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              {fleetDevices.map(dev => (
                <tr key={dev.id} className="hover:bg-slate-50/50">
                  <td className="py-3 font-bold text-slate-900">#{dev.rollNo}</td>
                  <td className="py-3 font-sans font-medium text-slate-800">{dev.studentName}</td>
                  <td className="py-3 text-slate-500 font-sans">{dev.model}</td>
                  <td className="py-3">
                    <span className="flex items-center gap-1 font-bold text-slate-800">
                      <Battery className="w-3.5 h-3.5 text-emerald-600" />
                      {dev.battery}%
                    </span>
                  </td>
                  <td className="py-3 text-slate-500">{dev.osVersion}</td>
                  <td className="py-3 font-sans">
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      Local Mesh Active
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
