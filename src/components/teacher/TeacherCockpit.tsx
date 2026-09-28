import React, { useState } from 'react';
import { useClassroom } from '../../context/ClassroomContext';
import { Student, StudentState } from '../../types';
import {
  Users,
  Activity,
  AlertTriangle,
  HeartPulse,
  Brain,
  Search,
  Filter,
  Lightbulb,
  Wind,
  Sparkles,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Sliders,
  ShieldCheck,
  CheckCircle,
  HelpCircle,
} from 'lucide-react';

export const TeacherCockpit: React.FC = () => {
  const {
    students,
    selectedStudent,
    selectStudent,
    activeFilteredAlerts,
    openXaiInspector,
    sendHintToStudent,
    triggerBreathingBreak,
    confidenceThreshold,
    setConfidenceThreshold,
    classAverageEngagement,
    classAverageConfusion,
    classAverageStress,
    currentScenario,
    setActiveTab,
    setActiveStudentPadId,
  } = useClassroom();

  const [filterState, setFilterState] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredStudents = students.filter(st => {
    const matchesFilter = filterState === 'all' || st.state === filterState;
    const matchesSearch =
      st.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      st.rollNo.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusBadge = (state: StudentState) => {
    switch (state) {
      case 'flow':
        return {
          label: 'In Flow',
          bg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
          dot: 'bg-emerald-500',
        };
      case 'confused':
        return {
          label: 'Topic Confusion',
          bg: 'bg-amber-50 text-amber-800 border-amber-200',
          dot: 'bg-amber-500 animate-pulse',
        };
      case 'stressed':
        return {
          label: 'High Stress',
          bg: 'bg-rose-50 text-rose-800 border-rose-200',
          dot: 'bg-rose-500 animate-ping',
        };
      case 'distracted':
        return {
          label: 'Mind Wandering',
          bg: 'bg-purple-50 text-purple-800 border-purple-200',
          dot: 'bg-purple-500',
        };
      case 'anomaly':
        return {
          label: 'Exam Anomaly',
          bg: 'bg-red-50 text-red-800 border-red-300',
          dot: 'bg-red-500 animate-bounce',
        };
      default:
        return {
          label: 'Active',
          bg: 'bg-slate-50 text-slate-700 border-slate-200',
          dot: 'bg-slate-400',
        };
    }
  };

  const handleInspectStudentPad = (studentId: string) => {
    setActiveStudentPadId(studentId);
    setActiveTab('student');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Top Banner: Scenario & Subject Context */}
      <div className="bg-gradient-to-r from-[#2D4E38] via-[#234F62] to-[#1E3845] rounded-3xl p-6 text-white shadow-md relative overflow-hidden">
        {/* Subtle decorative curves */}
        <div className="absolute right-0 top-0 w-96 h-96 bg-white/5 rounded-full blur-2xl"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-xs text-[#CBDBD0] font-medium border border-white/10 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Live Session: {currentScenario.activeSubject}
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-serif tracking-tight">
              Teacher Awareness Cockpit
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              Non-invasive real-time cognitive awareness. On-device edge models detect confusion and stress cues without recording or transmitting raw video.
            </p>
          </div>

          {/* Quick Confidence Threshold Control Slider */}
          <div className="bg-black/30 backdrop-blur-md p-4 rounded-2xl border border-white/15 min-w-[280px]">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-emerald-400" />
                Confidence Alert Gate
              </span>
              <span className="font-mono text-emerald-300 font-bold">
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
              className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#4A7758]"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>50% (Permissive)</span>
              <span>75% (Balanced)</span>
              <span>95% (Strict)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Aggregate Pulse Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Class Engagement
            </div>
            <div className="text-xl font-bold text-slate-900 font-mono mt-0.5">
              {classAverageEngagement}%
            </div>
            <span className="text-[10px] text-emerald-600 font-medium">
              +4% vs last period
            </span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
            <Brain className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Confusion Index
            </div>
            <div className="text-xl font-bold text-slate-900 font-mono mt-0.5">
              {classAverageConfusion}%
            </div>
            <span className="text-[10px] text-amber-600 font-medium">
              Step 3 friction hotspot
            </span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center">
            <HeartPulse className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Stress / Overload
            </div>
            <div className="text-xl font-bold text-slate-900 font-mono mt-0.5">
              {classAverageStress}%
            </div>
            <span className="text-[10px] text-slate-500 font-medium">
              Within calm envelope
            </span>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Active Tablets
            </div>
            <div className="text-xl font-bold text-slate-900 font-mono mt-0.5">
              16 / 16
            </div>
            <span className="text-[10px] text-emerald-600 font-medium flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              Edge AI Syncing
            </span>
          </div>
        </div>
      </div>

      {/* Real-time Alert Ticker Strip */}
      {activeFilteredAlerts.length > 0 && (
        <div className="bg-[#FAF9F5] border border-amber-200/90 rounded-2xl p-4 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping"></span>
              <h3 className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                Real-Time Attention & Behaviour Alerts (≥ {confidenceThreshold}% Confidence)
              </h3>
            </div>
            <span className="text-xs text-amber-700 font-medium">
              {activeFilteredAlerts.length} actionable cues
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {activeFilteredAlerts.map(alert => (
              <div
                key={alert.id}
                className="bg-white p-3.5 rounded-xl border border-amber-200 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <img
                        src={alert.avatar}
                        alt={alert.studentName}
                        className="w-7 h-7 rounded-full object-cover border border-slate-200"
                      />
                      <span className="text-xs font-bold text-slate-800">
                        {alert.studentName}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 font-bold">
                      {alert.confidence}% conf
                    </span>
                  </div>
                  <h4 className="text-xs font-semibold text-slate-900 leading-tight">
                    {alert.headline}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                    {alert.snippet}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
                  <button
                    onClick={() => openXaiInspector(alert.xaiReport)}
                    className="text-[#2D4E38] hover:text-[#1E3326] font-semibold text-xs flex items-center gap-1 cursor-pointer"
                  >
                    <span>Inspect XAI Reasoning</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>

                  <button
                    onClick={() => sendHintToStudent(alert.studentId)}
                    className="p-1 rounded bg-[#E5ECE7] hover:bg-[#CBDBD0] text-[#2D4E38] transition-colors cursor-pointer"
                    title="Send Scaffold Hint"
                  >
                    <Lightbulb className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Grid & Student Detail Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 8 Cols: Classroom Seating Grid */}
        <div className="lg:col-span-8 bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-slate-900 font-serif">
                Classroom Seating Grid (4 × 4)
              </h2>
              <p className="text-xs text-slate-500">
                Click any student desk to review telemetry or dispatch gentle interventions.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1 text-xs">
              {['all', 'confused', 'stressed', 'distracted', 'flow'].map(f => (
                <button
                  key={f}
                  onClick={() => setFilterState(f)}
                  className={`px-2.5 py-1 rounded-lg capitalize transition-colors cursor-pointer ${
                    filterState === f
                      ? 'bg-[#2D4E38] text-white font-medium shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Search input */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by student name or roll number..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-[#FAF9F5] border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-1 focus:ring-[#396145]"
            />
          </div>

          {/* Desk Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {filteredStudents.map(student => {
              const badge = getStatusBadge(student.state);
              const isSelected = selectedStudent?.id === student.id;

              return (
                <div
                  key={student.id}
                  onClick={() => selectStudent(student.id)}
                  className={`p-3.5 rounded-2xl border transition-all duration-200 flex flex-col justify-between cursor-pointer ${
                    isSelected
                      ? 'border-[#396145] bg-[#F2F7F4] shadow-md ring-2 ring-[#4A7758]/20'
                      : 'border-slate-200/80 bg-white hover:border-slate-300 hover:shadow-xs'
                  }`}
                >
                  <div>
                    {/* Top Row: Avatar & Status Dot */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="relative">
                        <img
                          src={student.avatar}
                          alt={student.name}
                          className="w-9 h-9 rounded-full object-cover border border-slate-200"
                        />
                        <span
                          className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${badge.dot}`}
                        ></span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">
                        R{student.seatRow}C{student.seatCol}
                      </span>
                    </div>

                    {/* Student Info */}
                    <h3 className="text-xs font-bold text-slate-900 truncate">
                      {student.name}
                    </h3>
                    <div className="flex items-center gap-1 text-[10px] text-slate-400">
                      <span>Roll {student.rollNo}</span>
                    </div>

                    {/* Status Pill */}
                    <div className="mt-2">
                      <span
                        className={`inline-flex items-center text-[10px] px-2 py-0.5 rounded-md font-semibold border ${badge.bg}`}
                      >
                        {badge.label}
                      </span>
                    </div>
                  </div>

                  {/* Micro metric bar */}
                  <div className="mt-3 pt-2 border-t border-slate-100 space-y-1 text-[10px]">
                    <div className="flex justify-between text-slate-500">
                      <span>Engagement</span>
                      <span className="font-mono font-bold text-slate-700">
                        {student.engagement}%
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          student.engagement > 75
                            ? 'bg-emerald-500'
                            : student.engagement > 50
                            ? 'bg-amber-500'
                            : 'bg-rose-400'
                        }`}
                        style={{ width: `${student.engagement}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 4 Cols: Selected Student Telemetry & Interventions */}
        <div className="lg:col-span-4 space-y-4">
          {selectedStudent ? (
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-5">
              {/* Card Header */}
              <div className="flex items-center gap-3">
                <img
                  src={selectedStudent.avatar}
                  alt={selectedStudent.name}
                  className="w-14 h-14 rounded-2xl object-cover border border-slate-200 shadow-xs"
                />
                <div>
                  <h3 className="text-base font-bold text-slate-900 font-serif">
                    {selectedStudent.name}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Seat Row {selectedStudent.seatRow}, Col {selectedStudent.seatCol} • Roll #{selectedStudent.rollNo}
                  </p>
                  <span
                    className={`inline-block mt-1 text-[10px] px-2 py-0.5 rounded-md font-semibold border ${
                      getStatusBadge(selectedStudent.state).bg
                    }`}
                  >
                    {getStatusBadge(selectedStudent.state).label}
                  </span>
                </div>
              </div>

              {/* Current Topic & Lesson Context */}
              <div className="p-3 bg-[#FAF9F5] border border-[#EAE2D3] rounded-2xl text-xs space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400">
                  Current Tablet Activity
                </span>
                <p className="font-medium text-slate-800 leading-snug">
                  {selectedStudent.currentTopic}
                </p>
                {selectedStudent.notes && (
                  <p className="text-[11px] text-amber-700 italic pt-1">
                    ℹ️ {selectedStudent.notes}
                  </p>
                )}
              </div>

              {/* Live Biometric Telemetry Grid */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-[#396145]" />
                  Edge Sensor Telemetry (Local Inferred)
                </span>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] text-slate-400 block">Blink Rate</span>
                    <span className="font-mono font-bold text-slate-800">
                      {selectedStudent.telemetry.blinkRate} /min
                    </span>
                    <span className="text-[9px] text-slate-400 block">Baseline: 16-20</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] text-slate-400 block">Brow Furrow (AU4)</span>
                    <span className="font-mono font-bold text-slate-800">
                      {selectedStudent.telemetry.eyebrowFurrowIntensity}
                    </span>
                    <span className="text-[9px] text-slate-400 block">&lt; 0.25 normal</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] text-slate-400 block">Screen Hesitation</span>
                    <span className="font-mono font-bold text-slate-800">
                      {(selectedStudent.telemetry.screenHesitationMs / 1000).toFixed(1)}s
                    </span>
                    <span className="text-[9px] text-slate-400 block">Step 3 pause</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] text-slate-400 block">Gaze Deviation</span>
                    <span className="font-mono font-bold text-slate-800">
                      {selectedStudent.telemetry.gazeDeviationSeconds}s
                    </span>
                    <span className="text-[9px] text-slate-400 block">Off-screen</span>
                  </div>
                </div>
              </div>

              {/* Teacher HITL Actions */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <span className="text-xs font-bold text-slate-800 block">
                  Educator Micro-Interventions (HITL)
                </span>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    onClick={() => sendHintToStudent(selectedStudent.id)}
                    className="p-2.5 rounded-xl bg-[#E5ECE7] hover:bg-[#CBDBD0] text-[#2D4E38] font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Lightbulb className="w-4 h-4 text-[#396145]" />
                    <span>Send Hint</span>
                  </button>

                  <button
                    onClick={() => triggerBreathingBreak(selectedStudent.id)}
                    className="p-2.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-800 font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Wind className="w-4 h-4 text-sky-600" />
                    <span>Breath Reset</span>
                  </button>
                </div>

                {/* Inspect Student Pad View button */}
                <button
                  onClick={() => handleInspectStudentPad(selectedStudent.id)}
                  className="w-full py-2.5 px-3 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                  <span>Preview What {selectedStudent.name} Sees on Tablet</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white p-8 rounded-3xl border border-dashed border-slate-300 text-center text-slate-400 text-xs">
              Select a student desk in the classroom to inspect telemetry.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
