import React from 'react';
import { ProductionClassroomProvider, useProductionClassroom } from './context/ProductionClassroomContext';
import { ProductionHeader } from './components/layout/ProductionHeader';
import { ProductionFooter } from './components/layout/ProductionFooter';
import { LiveClassroomView } from './components/teacher/LiveClassroomView';
import { LessonModulesView } from './components/teacher/LessonModulesView';
import { AnalyticsView } from './components/teacher/AnalyticsView';
import { DeviceFleetView } from './components/teacher/DeviceFleetView';
import { StudentTabletPortal } from './components/student/StudentTabletPortal';
import { MindfulBreakModal } from './components/modals/MindfulBreakModal';

const AppContent: React.FC = () => {
  const { userRole, teacherTab } = useProductionClassroom();

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F5] text-slate-800">
      <ProductionHeader />

      <main className="flex-1">
        {userRole === 'teacher' ? (
          <>
            {teacherTab === 'live' && <LiveClassroomView />}
            {teacherTab === 'lessons' && <LessonModulesView />}
            {teacherTab === 'analytics' && <AnalyticsView />}
            {teacherTab === 'fleet' && <DeviceFleetView />}
          </>
        ) : (
          <StudentTabletPortal />
        )}
      </main>

      <ProductionFooter />

      {/* Global Interactive Overlays */}
      <MindfulBreakModal />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ProductionClassroomProvider>
      <AppContent />
    </ProductionClassroomProvider>
  );
};

export default App;
