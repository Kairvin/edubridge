import React from 'react';
import { useClassroom } from '../../context/ClassroomContext';
import { CLASSROOM_SCENARIOS } from '../../data/studentsData';
import {
  BrainCircuit,
  LayoutDashboard,
  Tablet,
  GitBranch,
  Camera,
  BarChart3,
  Sparkles,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Wind,
  ShieldCheck,
  Layers,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    isSimulating,
    toggleSimulation,
    soundEnabled,
    setSoundEnabled,
    currentScenario,
    switchScenario,
    triggerBreathingBreak,
    activeFilteredAlerts,
  } = useClassroom();

  const navItems = [
    { id: 'overview', label: 'Overview', icon: Sparkles },
    { id: 'teacher', label: 'Teacher Cockpit', icon: LayoutDashboard, badge: activeFilteredAlerts.length },
    { id: 'student', label: 'Student Pad', icon: Tablet },
    { id: 'pipeline', label: 'AI Pipeline', icon: GitBranch },
    { id: 'vision', label: 'Vision Lab', icon: Camera },
    { id: 'impact', label: 'Impact & ROI', icon: BarChart3 },
  ] as const;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          
          {/* Brand Logo & Title */}
          <div
            onClick={() => setActiveTab('overview')}
            className="flex items-center gap-3 cursor-pointer group flex-shrink-0"
          >
            <div className="w-9 h-9 rounded-xl bg-[#2D4E38] text-white flex items-center justify-center shadow-xs transition-transform group-hover:scale-105">
              <BrainCircuit className="w-5 h-5 text-emerald-300" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-lg text-slate-900 tracking-tight leading-none">
                  EduBridge
                </span>
                <span className="text-[10px] uppercase font-semibold tracking-wider bg-emerald-50 text-[#2D4E38] px-2 py-0.5 rounded-full border border-emerald-200/80">
                  Hybrid AI
                </span>
              </div>
              <span className="text-[11px] text-slate-500 font-normal leading-tight mt-0.5 hidden xl:block">
                Cognitive Co-Pilot for Modern Classrooms
              </span>
            </div>
          </div>

          {/* Desktop Navigation Tabs - Segmented Pill Control */}
          <nav className="hidden lg:flex items-center bg-[#F4EFE7]/70 p-1 rounded-xl border border-[#EAE2D3] flex-shrink-0">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-150 cursor-pointer ${
                    isActive
                      ? 'bg-white text-[#1E3326] shadow-xs font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 flex-shrink-0 ${isActive ? 'text-[#2D4E38]' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {'badge' in item && typeof item.badge === 'number' && item.badge > 0 && (
                    <span className="ml-0.5 px-1.5 py-0.2 rounded-full bg-amber-500 text-white text-[9px] font-bold leading-tight">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Scenario Selector Dropdown */}
            <div className="relative hidden md:flex items-center">
              <div className="flex items-center gap-1.5 bg-[#FAF9F5] border border-slate-200 text-slate-700 px-2.5 py-1.5 rounded-xl text-xs font-medium shadow-2xs hover:border-slate-300 transition-colors">
                <Layers className="w-3.5 h-3.5 text-[#396145] flex-shrink-0" />
                <select
                  value={currentScenario.id}
                  onChange={e => switchScenario(e.target.value)}
                  className="bg-transparent text-xs font-medium text-slate-800 pr-2 focus:outline-hidden cursor-pointer"
                  title="Switch classroom simulation scenario"
                >
                  {CLASSROOM_SCENARIOS.map(sc => (
                    <option key={sc.id} value={sc.id}>
                      {sc.badge}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Mindful Breath Break Action */}
            <button
              onClick={() => triggerBreathingBreak('all')}
              className="hidden sm:inline-flex items-center gap-1.5 text-xs bg-[#E5ECE7] hover:bg-[#CBDBD0] text-[#2D4E38] px-2.5 py-1.5 rounded-xl font-medium border border-[#CBDBD0] transition-colors cursor-pointer"
              title="Trigger a soothing 2-minute breath break for the classroom"
            >
              <Wind className="w-3.5 h-3.5 text-[#396145] flex-shrink-0" />
              <span>Breath Pause</span>
            </button>

            {/* Simulation Status Toggle */}
            <button
              onClick={toggleSimulation}
              className={`p-1.5 px-2 rounded-xl border text-xs flex items-center gap-1.5 transition-colors cursor-pointer ${
                isSimulating
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-800 hover:bg-emerald-100'
                  : 'bg-amber-50 border-amber-200 text-amber-800 hover:bg-amber-100'
              }`}
              title={isSimulating ? 'Pause live telemetry simulation' : 'Resume live simulation'}
            >
              <span className={`w-2 h-2 rounded-full ${isSimulating ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`}></span>
              {isSimulating ? <Pause className="w-3 h-3 text-emerald-700" /> : <Play className="w-3 h-3 text-amber-700" />}
              <span className="hidden md:inline text-[11px] font-semibold">
                {isSimulating ? 'Live' : 'Paused'}
              </span>
            </button>

            {/* Audio Chime Mute/Unmute */}
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer"
              title={soundEnabled ? 'Calming sound chimes active' : 'Audio muted'}
            >
              {soundEnabled ? (
                <Volume2 className="w-3.5 h-3.5 text-emerald-700" />
              ) : (
                <VolumeX className="w-3.5 h-3.5 text-slate-400" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile / Tablet Horizontal Navigation Scrollbar */}
        <div className="flex lg:hidden items-center overflow-x-auto py-2 border-t border-slate-100 gap-1 text-xs no-scrollbar">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap text-xs transition-colors flex-shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-[#2D4E38] text-white font-medium shadow-2xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
                {'badge' in item && typeof item.badge === 'number' && item.badge > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full bg-amber-500 text-white text-[9px] font-bold">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
