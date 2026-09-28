import React, { useState } from 'react';
import { useProductionClassroom } from '../../context/ProductionClassroomContext';
import { StudentRecord, StudentStatus } from '../../types';
import {
  TrendingUp,
  AlertTriangle,
  Users,
  CheckCircle2,
  Lightbulb,
  Wind,
  Search,
  ChevronRight,
  Eye,
  Activity,
  Battery,
  Wifi,
  Sparkles,
  ArrowRight,
  HelpCircle,
  Clock,
  BookOpen,
  Filter,
} from 'lucide-react';

export const LiveClassroomView: React.FC = () => {
  const {
    session,
    students,
    selectedStudent,
    selectStudent,
    frictionAlerts,
    sendHintToStudent,
    broadcastHintToClass,
    triggerMindfulBreak,
    syncClassToStep,
    averageFocusScore,
    stuckCount,
    completedCount,
    dismissFrictionAlert,
    setUserRole,
    setActiveStudentId,
  } = useProductionClassroom();

  const [filter, setFilter] = useState<string>('all');
  const [search, setSearch] = useState<string>('');
  const [viewLayout, setViewLayout] = useState<'grid' | 'list'>('grid');

  const filteredStudents = students.filter(st => {
    const matchFilter =
      filter === 'all' ||
      (filter === 'stuck' && st.status === 'stuck') ||
      (filter === 'in_flow' && st.status === 'in_flow') ||
      (filter === 'completed' && st.status === 'completed') ||
      (filter === 'distracted' && (st.status === 'distracted' || st.status === 'fatigued'));

    const matchSearch =
      st.name.toLowerCase().includes(search.toLowerCase()) ||
      st.rollNo.toLowerCase().includes(search.toLowerCase());

    return matchFilter && matchSearch;
  });

  const getStatusBadge = (status: StudentStatus) => {
    switch (status) {
      case 'in_flow':
        return { label: 'In Flow', bg: 'bg-emerald-50 text-emerald-800 border-emerald-200', dot: 'bg-emerald-500' };
      case 'stuck':
        return { label: 'Stuck on Step 3', bg: 'bg-amber-50 text-amber-900 border-amber-200', dot: 'bg-amber-500 animate-pulse' };
      case 'fatigued':
        return { label: 'Cognitive Fatigue', bg: 'bg-rose-50 text-rose-800 border-rose-200', dot: 'bg-rose-500' };
      case 'distracted':
        return { label: 'Off-Task / Gaze Drift', bg: 'bg-purple-50 text-purple-800 border-purple-200', dot: 'bg-purple-500' };
      case 'completed':
        return { label: 'Step Complete', bg: 'bg-teal-50 text-teal-800 border-teal-200', dot: 'bg-teal-500' };
    }
  };

  const handleInspectOnTablet = (studentId: string) => {
    setActiveStudentId(studentId);
    setUserRole('student');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Session Hero Banner */}
      <div className="bg-gradient-to-r from-[#2D4E38] via-[#244231] to-[#1E3326] rounded-3xl p-6 sm:p-7 text-white shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-5 relative overflow-hidden">
        <div className="relative z-10 space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#CBDBD0] text-xs font-medium border border-white/10">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Live Session: {session.period}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif tracking-tight">
            {session.activeLesson.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            Active Checkpoint: <strong>Step 3 of 4 — Differentiating Inner Core & Chain Product</strong>. 
            EduBridge tracks student problem cadence and surface friction in real time.
          </p>
        </div>

        {/* Quick Lesson Broadcasting Actions */}
        <div className="relative z-10 flex flex-wrap items-center gap-2">
          <button
            onClick={() => broadcastHintToClass(session.activeLesson.steps[2].scaffoldHint)}
            className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-semibold text-white flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Lightbulb className="w-3.5 h-3.5 text-amber-300" />
            <span>Broadcast Step 3 Hint</span>
          </button>

          <button
            onClick={() => syncClassToStep(4)}
            className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
          >
            <span>Advance to Step 4</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Aggregate Pulse Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
              Classroom Focus Index
            </span>
            <span className="text-xl font-bold font-mono text-slate-900">
              {averageFocusScore}%
            </span>
            <span className="text-[10px] text-emerald-600 font-medium block">
              High focus envelope
            </span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
              Active Friction Point
            </span>
            <span className="text-xl font-bold font-mono text-amber-900">
              {stuckCount} Students
            </span>
            <span className="text-[10px] text-amber-700 font-medium block">
              Pausing on Step 3
            </span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
              Completed Step 3
            </span>
            <span className="text-xl font-bold font-mono text-slate-900">
              {completedCount} Students
            </span>
            <span className="text-[10px] text-teal-700 font-medium block">
              Ready for tangent evaluation
            </span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
              Tablet Mesh Fleet
            </span>
            <span className="text-xl font-bold font-mono text-slate-900">
              16 / 16
            </span>
            <span className="text-[10px] text-sky-700 font-medium block">
              Local offline network active
            </span>
          </div>
        </div>
      </div>

      {/* Real-time Friction Alert Ticker */}
      {frictionAlerts.some(a => !a.isResolved) && (
        <div className="bg-[#FAF9F5] border border-amber-200/90 rounded-2xl p-4 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping"></span>
              <h3 className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                Live Student Friction Checkpoints
              </h3>
            </div>
            <span className="text-xs text-amber-800 font-medium">
              {frictionAlerts.filter(a => !a.isResolved).length} pending interventions
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {frictionAlerts.filter(a => !a.isResolved).map(alert => (
              <div
                key={alert.id}
                className="bg-white p-3.5 rounded-xl border border-amber-200 shadow-2xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-slate-900">
                      {alert.studentName}
                    </span>
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                      Step {alert.stepNumber}
                    </span>
                  </div>
                  <h4 className="text-xs font-semibold text-slate-800">
                    {alert.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {alert.description}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
                  <button
                    onClick={() => sendHintToStudent(alert.studentId)}
                    className="text-[#2D4E38] hover:text-[#1E3326] font-semibold text-xs flex items-center gap-1 cursor-pointer"
                  >
                    <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                    <span>Send Scaffold Hint</span>
                  </button>

                  <button
                    onClick={() => dismissFrictionAlert(alert.id)}
                    className="text-slate-400 hover:text-slate-600 text-[11px] cursor-pointer"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Classroom Workspace Grid & Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 8 Cols: Seating Map Grid */}
        <div className="lg:col-span-8 bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-slate-900 font-serif">
                Classroom Seating Grid (4 × 4)
              </h2>
              <p className="text-xs text-slate-500">
                Click any student desk to review their live scratchpad, hesitation time, or dispatch individual hints.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1 text-xs">
              {[
                { id: 'all', label: 'All (16)' },
                { id: 'stuck', label: `Stuck (${stuckCount})` },
                { id: 'in_flow', label: 'In Flow' },
                { id: 'completed', label: 'Completed' },
                { id: 'distracted', label: 'Off-Task' },
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setFilter(f.id)}
                  className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                    filter === f.id
                      ? 'bg-[#2D4E38] text-white font-medium shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Search bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by student name or roll number..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-[#FAF9F5] border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-1 focus:ring-[#396145]"
            />
          </div>

          {/* 4x4 Grid of Desks */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
            {filteredStudents.map(student => {
              const badge = getStatusBadge(student.status);
              const isSelected = selectedStudent?.id === student.id;

              return (
                <div
                  key={student.id}
                  onClick={() => selectStudent(student.id)}
                  className={`p-3.5 rounded-2xl border transition-all duration-150 flex flex-col justify-between cursor-pointer ${
                    isSelected
                      ? 'border-[#2D4E38] bg-[#F2F7F4] shadow-md ring-2 ring-[#4A7758]/20'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-2xs'
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
                    <span className="text-[10px] text-slate-400 block font-mono">
                      #{student.rollNo}
                    </span>

                    {/* Status Badge */}
                    <div className="mt-2">
                      <span
                        className={`inline-flex items-center text-[10px] px-2 py-0.5 rounded-md font-semibold border ${badge.bg}`}
                      >
                        {badge.label}
                      </span>
                    </div>
                  </div>

                  {/* Micro Progress Bar & Hesitation */}
                  <div className="mt-3 pt-2 border-t border-slate-100 text-[10px] space-y-1">
                    <div className="flex justify-between text-slate-500">
                      <span>Step {student.currentStep} of {student.totalSteps}</span>
                      <span className="font-mono text-slate-700">
                        {student.telemetry.screenHesitationSeconds}s
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          student.status === 'completed'
                            ? 'bg-teal-500'
                            : student.status === 'stuck'
                            ? 'bg-amber-500'
                            : 'bg-emerald-500'
                        }`}
                        style={{ width: `${(student.currentStep / student.totalSteps) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 4 Cols: Live Student Desk Inspector */}
        <div className="lg:col-span-4 space-y-4">
          {selectedStudent ? (
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-5">
              {/* Header */}
              <div className="flex items-center gap-3">
                <img
                  src={selectedStudent.avatar}
                  alt={selectedStudent.name}
                  className="w-13 h-13 rounded-2xl object-cover border border-slate-200 shadow-xs"
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
                      getStatusBadge(selectedStudent.status).bg
                    }`}
                  >
                    {getStatusBadge(selectedStudent.status).label}
                  </span>
                </div>
              </div>

              {/* Student Scratchpad & Live Answer Status */}
              <div className="p-3.5 bg-[#FAF9F5] border border-[#EAE2D3] rounded-2xl text-xs space-y-2">
                <div className="flex items-center justify-between text-[11px] text-slate-500 font-semibold uppercase">
                  <span>Live Tablet Activity</span>
                  <span className="text-emerald-700 font-mono">Step {selectedStudent.currentStep}/4</span>
                </div>

                <div className="bg-white p-2.5 rounded-xl border border-slate-200 text-xs font-mono text-slate-800">
                  {selectedStudent.selectedAnswer ? (
                    <span className="text-slate-900">
                      Selected: <strong>{selectedStudent.selectedAnswer}</strong> ({selectedStudent.isCorrect ? 'Correct' : 'Needs Review'})
                    </span>
                  ) : (
                    <span className="text-slate-400 italic">
                      Stylus active — working on scratchpad...
                    </span>
                  )}
                </div>

                {selectedStudent.personalNote && (
                  <p className="text-[11px] text-amber-800 italic">
                    ℹ️ {selectedStudent.personalNote}
                  </p>
                )}

                {selectedStudent.teacherHintReceived && (
                  <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-900">
                    <strong>Hint Delivered:</strong> {selectedStudent.teacherHintReceived}
                  </div>
                )}
              </div>

              {/* Real-Time Behavioral Cadence (Calm, non-theoretical) */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-[#396145]" />
                  Solving Cadence & Metrics
                </span>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] text-slate-400 block">Step Pause Time</span>
                    <span className="font-mono font-bold text-slate-800">
                      {selectedStudent.telemetry.screenHesitationSeconds}s
                    </span>
                    <span className="text-[9px] text-slate-400 block">Baseline: &lt; 3.0s</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] text-slate-400 block">Stylus State</span>
                    <span className="font-semibold text-slate-800">
                      {selectedStudent.telemetry.stylusActive ? 'Active Writing' : 'Stylus Hover'}
                    </span>
                    <span className="text-[9px] text-slate-400 block">Digitizer tracking</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] text-slate-400 block">Blink Cadence</span>
                    <span className="font-semibold text-slate-800 capitalize">
                      {selectedStudent.telemetry.blinkCadence}
                    </span>
                    <span className="text-[9px] text-slate-400 block">Restorative rhythm</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] text-slate-400 block">Tablet Battery</span>
                    <span className="font-mono font-bold text-emerald-700">
                      {selectedStudent.telemetry.batteryPercent}%
                    </span>
                    <span className="text-[9px] text-slate-400 block">Mesh Online</span>
                  </div>
                </div>
              </div>

              {/* Direct Educator Actions */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <span className="text-xs font-bold text-slate-800 block">
                  Educator Interventions
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
                    onClick={() => triggerMindfulBreak(selectedStudent.id)}
                    className="p-2.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-800 font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Wind className="w-4 h-4 text-sky-600" />
                    <span>2-Min Break</span>
                  </button>
                </div>

                {/* Inspect in Student View */}
                <button
                  onClick={() => handleInspectOnTablet(selectedStudent.id)}
                  className="w-full py-2 px-3 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5 text-slate-500" />
                  <span>Preview What {selectedStudent.name} Sees</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white p-8 rounded-3xl border border-dashed border-slate-300 text-center text-slate-400 text-xs">
              Select a student desk in the classroom to inspect live solving state.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
