import React from 'react';
import { ClassroomProvider, useClassroom } from './context/ClassroomContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/overview/HeroSection';
import { TeacherCockpit } from './components/teacher/TeacherCockpit';
import { StudentPadSimulator } from './components/student/StudentPadSimulator';
import { PipelineExplorer } from './components/pipeline/PipelineExplorer';
import { VisionSandbox } from './components/vision/VisionSandbox';
import { FeasibilityImpact } from './components/feasibility/FeasibilityImpact';
import { ExplainableAiModal } from './components/teacher/ExplainableAiModal';
import { BreathingModal } from './components/common/BreathingModal';

const AppContent: React.FC = () => {
  const { activeTab } = useClassroom();

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F5] text-slate-800">
      <Navbar />

      <main className="flex-1">
        {activeTab === 'overview' && <HeroSection />}
        {activeTab === 'teacher' && <TeacherCockpit />}
        {activeTab === 'student' && <StudentPadSimulator />}
        {activeTab === 'pipeline' && <PipelineExplorer />}
        {activeTab === 'vision' && <VisionSandbox />}
        {activeTab === 'impact' && <FeasibilityImpact />}
      </main>

      <Footer />

      {/* Global Interactive Overlays */}
      <ExplainableAiModal />
      <BreathingModal />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ClassroomProvider>
      <AppContent />
    </ClassroomProvider>
  );
};

export default App;
