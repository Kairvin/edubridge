import React from 'react';
import { useProductionClassroom } from '../../context/ProductionClassroomContext';
import {
  BrainCircuit,
  LayoutDashboard,
  BookOpen,
  BarChart3,
  Tablet,
  Wind,
  Lock,
  Unlock,
  Volume2,
  VolumeX,
} from 'lucide-react';

export const ProductionHeader: React.FC = () => {
  const {
    userRole,
    setUserRole,
    teacherTab,
    setTeacherTab,
    session,
    toggleLockdownMode,
    triggerMindfulBreak,
    soundEnabled,
    setSoundEnabled,
    activeStudent,
    stuckCount,
  } = useProductionClassroom();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2 sm:gap-4">
          
          {/* Left: Brand & Class Indicator */}
          <div className="flex items-center gap-2.5 flex-shrink-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#2D4E38] text-white flex items-center justify-center shadow-xs flex-shrink-0">
              <BrainCircuit className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-300" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-serif font-bold text-base sm:text-lg text-slate-900 tracking-tight leading-none">
                  EduBridge
                </span>
                <span className="text-[10px] font-semibold bg-emerald-50 text-[#2D4E38] px-1.5 py-0.5 rounded-full border border-emerald-200/80 whitespace-nowrap">
                  {session.className}
                </span>
              </div>
              <span className="text-[10px] text-slate-400 hidden xl:block truncate max-w-[160px] leading-tight mt-0.5">
                {session.schoolName}
              </span>
            </div>
          </div>

          {/* Center: Teacher Navigation Tabs (when in Teacher Mode) */}
          {userRole === 'teacher' ? (
            <nav className="hidden md:flex items-center bg-[#F4EFE7]/80 p-1 rounded-xl border border-[#EAE2D3] flex-shrink-0">
              <button
                onClick={() => setTeacherTab('live')}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                  teacherTab === 'live'
                    ? 'bg-white text-[#1E3326] shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <LayoutDashboard className={`w-3.5 h-3.5 flex-shrink-0 ${teacherTab === 'live' ? 'text-[#2D4E38]' : 'text-slate-400'}`} />
                <span>Live Class</span>
                {stuckCount > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full bg-amber-500 text-white text-[9px] font-bold leading-none">
                    {stuckCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setTeacherTab('lessons')}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                  teacherTab === 'lessons'
                    ? 'bg-white text-[#1E3326] shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <BookOpen className={`w-3.5 h-3.5 flex-shrink-0 ${teacherTab === 'lessons' ? 'text-[#2D4E38]' : 'text-slate-400'}`} />
                <span>Curriculum</span>
              </button>

              <button
                onClick={() => setTeacherTab('analytics')}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                  teacherTab === 'analytics'
                    ? 'bg-white text-[#1E3326] shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <BarChart3 className={`w-3.5 h-3.5 flex-shrink-0 ${teacherTab === 'analytics' ? 'text-[#2D4E38]' : 'text-slate-400'}`} />
                <span>Analytics</span>
              </button>

              <button
                onClick={() => setTeacherTab('fleet')}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                  teacherTab === 'fleet'
                    ? 'bg-white text-[#1E3326] shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <Tablet className={`w-3.5 h-3.5 flex-shrink-0 ${teacherTab === 'fleet' ? 'text-[#2D4E38]' : 'text-slate-400'}`} />
                <span>Fleet (16)</span>
              </button>
            </nav>
          ) : (
            <div className="hidden md:flex items-center gap-2 bg-[#E5ECE7] px-3 py-1.5 rounded-xl border border-[#CBDBD0] text-xs text-[#2D4E38] font-medium whitespace-nowrap flex-shrink-0">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse flex-shrink-0"></span>
              <span>Tablet Active: <strong>{activeStudent.name}</strong></span>
            </div>
          )}

          {/* Right Action Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            {/* Master Role Switcher */}
            <div className="bg-[#FAF9F5] p-0.5 sm:p-1 rounded-xl border border-slate-200 shadow-2xs flex items-center text-xs flex-shrink-0">
              <button
                onClick={() => setUserRole('teacher')}
                className={`flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer whitespace-nowrap ${
                  userRole === 'teacher'
                    ? 'bg-[#2D4E38] text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <LayoutDashboard className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span className="text-[11px] sm:text-xs">Teacher</span>
              </button>

              <button
                onClick={() => setUserRole('student')}
                className={`flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer whitespace-nowrap ${
                  userRole === 'student'
                    ? 'bg-[#2D4E38] text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Tablet className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span className="text-[11px] sm:text-xs">Student View</span>
              </button>
            </div>

            {/* Quick Mindful Break (Icon Button with tooltip on medium, compact text on large) */}
            {userRole === 'teacher' && (
              <button
                onClick={() => triggerMindfulBreak('all')}
                className="hidden xl:inline-flex items-center gap-1 text-xs bg-[#E5ECE7] hover:bg-[#CBDBD0] text-[#2D4E38] px-2.5 py-1.5 rounded-xl font-medium border border-[#CBDBD0] transition-colors cursor-pointer whitespace-nowrap flex-shrink-0"
                title="Send a 2-minute breath break to all tablets"
              >
                <Wind className="w-3.5 h-3.5 text-[#396145] flex-shrink-0" />
                <span>Reset Break</span>
              </button>
            )}

            {/* Focus Lockdown Toggle */}
            {userRole === 'teacher' && (
              <button
                onClick={toggleLockdownMode}
                className={`hidden lg:inline-flex items-center gap-1 text-xs px-2 py-1.5 rounded-xl border font-medium transition-colors cursor-pointer whitespace-nowrap flex-shrink-0 ${
                  session.isLockdownActive
                    ? 'bg-amber-50 border-amber-200 text-amber-800'
                    : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}
                title={session.isLockdownActive ? 'Focus Lock active' : 'Lock tablets'}
              >
                {session.isLockdownActive ? (
                  <>
                    <Lock className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                    <span>Locked</span>
                  </>
                ) : (
                  <>
                    <Unlock className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                    <span>Unlocked</span>
                  </>
                )}
              </button>
            )}

            {/* Audio Toggle */}
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-1.5 sm:p-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer flex-shrink-0"
              title={soundEnabled ? 'Acoustic chimes active' : 'Audio muted'}
            >
              {soundEnabled ? (
                <Volume2 className="w-3.5 h-3.5 text-emerald-700" />
              ) : (
                <VolumeX className="w-3.5 h-3.5 text-slate-400" />
              )}
            </button>

            {/* Teacher Avatar Initials (Compact badge that never overflows) */}
            <div
              className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-slate-700 text-xs flex-shrink-0"
              title="Dr. Vikram Seth (Head of Mathematics)"
            >
              VS
            </div>
          </div>
        </div>

        {/* Mobile / Tablet Horizontal Scrollable Sub-Navigation */}
        {userRole === 'teacher' && (
          <div className="flex md:hidden items-center overflow-x-auto py-2 border-t border-slate-100 gap-1 text-xs no-scrollbar">
            <button
              onClick={() => setTeacherTab('live')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap text-xs transition-colors flex items-center gap-1.5 flex-shrink-0 ${
                teacherTab === 'live' ? 'bg-[#2D4E38] text-white font-medium' : 'text-slate-600'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Live Class</span>
              {stuckCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-amber-500 text-white text-[9px] font-bold">
                  {stuckCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setTeacherTab('lessons')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap text-xs transition-colors flex items-center gap-1.5 flex-shrink-0 ${
                teacherTab === 'lessons' ? 'bg-[#2D4E38] text-white font-medium' : 'text-slate-600'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Curriculum</span>
            </button>

            <button
              onClick={() => setTeacherTab('analytics')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap text-xs transition-colors flex items-center gap-1.5 flex-shrink-0 ${
                teacherTab === 'analytics' ? 'bg-[#2D4E38] text-white font-medium' : 'text-slate-600'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Analytics</span>
            </button>

            <button
              onClick={() => setTeacherTab('fleet')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap text-xs transition-colors flex items-center gap-1.5 flex-shrink-0 ${
                teacherTab === 'fleet' ? 'bg-[#2D4E38] text-white font-medium' : 'text-slate-600'
              }`}
            >
              <Tablet className="w-3.5 h-3.5" />
              <span>Fleet (16)</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
