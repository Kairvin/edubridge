import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { StudentRecord, ClassSession, LessonModule, FrictionAlert, FleetDevice } from '../types';
import { DEFAULT_SESSION, INITIAL_STUDENTS, INITIAL_FRICTION_ALERTS, FLEET_DEVICES, LESSON_CATALOG } from '../data/productionData';

interface ProductionClassroomContextType {
  // Global Role Switcher
  userRole: 'teacher' | 'student';
  setUserRole: (role: 'teacher' | 'student') => void;

  // Teacher Workspace
  teacherTab: 'live' | 'lessons' | 'analytics' | 'fleet';
  setTeacherTab: (tab: 'live' | 'lessons' | 'analytics' | 'fleet') => void;
  session: ClassSession;
  students: StudentRecord[];
  selectedStudent: StudentRecord | null;
  selectStudent: (id: string | null) => void;
  frictionAlerts: FrictionAlert[];
  fleetDevices: FleetDevice[];
  lessonCatalog: LessonModule[];

  // Teacher Actions
  sendHintToStudent: (studentId: string, hintText?: string) => void;
  broadcastHintToClass: (hintText: string) => void;
  triggerMindfulBreak: (target: string | 'all') => void;
  syncClassToStep: (stepNumber: number) => void;
  toggleLockdownMode: () => void;
  dismissFrictionAlert: (alertId: string) => void;
  addStudentNote: (studentId: string, note: string) => void;

  // Student Tablet Workspace
  activeStudentId: string;
  setActiveStudentId: (id: string) => void;
  activeStudent: StudentRecord;
  submitStudentAnswer: (optionId: string) => boolean;
  clearStudentAttempt: () => void;
  requestStudentHelp: () => void;

  // Mindful Reset Break Modal
  breakModalActive: boolean;
  setBreakModalActive: (open: boolean) => void;
  breakTargetName: string;

  // Sound & Acoustics
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  playChime: (type: 'bell' | 'alert' | 'success') => void;

  // Real-time aggregates
  activeStudentCount: number;
  averageFocusScore: number;
  stuckCount: number;
  completedCount: number;
}

const ProductionClassroomContext = createContext<ProductionClassroomContextType | undefined>(undefined);

export const ProductionClassroomProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userRole, setUserRole] = useState<'teacher' | 'student'>('teacher');
  const [teacherTab, setTeacherTab] = useState<'live' | 'lessons' | 'analytics' | 'fleet'>('live');
  const [session, setSession] = useState<ClassSession>(DEFAULT_SESSION);
  const [students, setStudents] = useState<StudentRecord[]>(INITIAL_STUDENTS);
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>('st-01');
  const [frictionAlerts, setFrictionAlerts] = useState<FrictionAlert[]>(INITIAL_FRICTION_ALERTS);
  const [fleetDevices] = useState<FleetDevice[]>(FLEET_DEVICES);
  const [lessonCatalog] = useState<LessonModule[]>(LESSON_CATALOG);

  // Student View state
  const [activeStudentId, setActiveStudentId] = useState<string>('st-01');

  // Mindful Break state
  const [breakModalActive, setBreakModalActive] = useState<boolean>(false);
  const [breakTargetName, setBreakTargetName] = useState<string>('Classroom');

  // Sound state
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Soothing synthesized Web Audio chimes
  const playChime = useCallback((type: 'bell' | 'alert' | 'success') => {
    if (!soundEnabled || typeof window === 'undefined') return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;
      if (type === 'bell') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(528, now); // Solfeggio soothing frequency
        gain.gain.setValueAtTime(0.09, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);
        osc.start(now);
        osc.stop(now + 1.8);
      } else if (type === 'alert') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(396, now + 0.3);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);
        osc.start(now);
        osc.stop(now + 0.8);
      } else if (type === 'success') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.setValueAtTime(659.25, now + 0.1); // E5
        gain.gain.setValueAtTime(0.07, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);
        osc.start(now);
        osc.stop(now + 1.2);
      }
    } catch {
      // AudioContext could be silenced before interaction
    }
  }, [soundEnabled]);

  // Subtle real-time heartbeats to simulate an active classroom
  useEffect(() => {
    const interval = setInterval(() => {
      setStudents(prev =>
        prev.map(st => {
          if (st.status === 'completed') return st;

          // Slight fluctuation in screen hesitation
          const delta = st.status === 'stuck' ? 1.5 : (Math.random() > 0.5 ? 0.3 : -0.2);
          const newHesitation = Math.max(0.5, +(st.telemetry.screenHesitationSeconds + delta).toFixed(1));

          return {
            ...st,
            telemetry: {
              ...st.telemetry,
              screenHesitationSeconds: newHesitation,
            },
          };
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const selectedStudent = students.find(s => s.id === selectedStudentId) || null;
  const activeStudent = students.find(s => s.id === activeStudentId) || students[0];

  const selectStudent = (id: string | null) => {
    setSelectedStudentId(id);
  };

  // Teacher Action: Send scaffold hint
  const sendHintToStudent = (studentId: string, customHint?: string) => {
    const hint = customHint || session.activeLesson.steps[2].scaffoldHint;
    setStudents(prev =>
      prev.map(st => {
        if (st.id === studentId) {
          return {
            ...st,
            status: 'in_flow',
            teacherHintReceived: hint,
            personalNote: `Teacher sent scaffold hint at ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
            telemetry: {
              ...st.telemetry,
              facialTensionIndex: 0.22,
              screenHesitationSeconds: 1.4,
              blinkCadence: 'normal',
            },
          };
        }
        return st;
      })
    );

    // Resolve alert if exists
    setFrictionAlerts(prev =>
      prev.map(a => (a.studentId === studentId ? { ...a, isResolved: true } : a))
    );

    playChime('success');
  };

  // Teacher Action: Broadcast hint to entire class
  const broadcastHintToClass = (hintText: string) => {
    setStudents(prev =>
      prev.map(st => ({
        ...st,
        teacherHintReceived: hintText,
        status: st.status === 'stuck' ? 'in_flow' : st.status,
      }))
    );
    setFrictionAlerts(prev => prev.map(a => ({ ...a, isResolved: true })));
    playChime('bell');
  };

  // Teacher Action: Trigger mindful 2-min break
  const triggerMindfulBreak = (target: string | 'all') => {
    if (target === 'all') {
      setBreakTargetName('Entire Classroom (Grade 11-A)');
      setStudents(prev =>
        prev.map(st => ({
          ...st,
          status: st.status === 'stuck' || st.status === 'fatigued' ? 'in_flow' : st.status,
          telemetry: {
            ...st.telemetry,
            facialTensionIndex: 0.15,
            blinkCadence: 'normal',
          },
        }))
      );
    } else {
      const studentObj = students.find(s => s.id === target);
      setBreakTargetName(studentObj ? studentObj.name : 'Student');
      setStudents(prev =>
        prev.map(st => {
          if (st.id === target) {
            return {
              ...st,
              status: 'in_flow',
              telemetry: {
                ...st.telemetry,
                facialTensionIndex: 0.18,
                blinkCadence: 'normal',
              },
            };
          }
          return st;
        })
      );
    }
    setBreakModalActive(true);
    playChime('bell');
  };

  // Teacher Action: Sync all tablets to specific step
  const syncClassToStep = (stepNumber: number) => {
    setStudents(prev =>
      prev.map(st => ({
        ...st,
        currentStep: stepNumber,
        selectedAnswer: null,
        hasAttempted: false,
        isCorrect: false,
        status: 'in_flow',
      }))
    );
    playChime('bell');
  };

  // Teacher Action: Toggle Exam Lockdown Mode
  const toggleLockdownMode = () => {
    setSession(prev => ({
      ...prev,
      isLockdownActive: !prev.isLockdownActive,
    }));
    playChime('bell');
  };

  // Teacher Action: Dismiss Friction Alert
  const dismissFrictionAlert = (alertId: string) => {
    setFrictionAlerts(prev => prev.filter(a => a.id !== alertId));
  };

  // Teacher Action: Add private teacher note on student
  const addStudentNote = (studentId: string, note: string) => {
    setStudents(prev =>
      prev.map(st => (st.id === studentId ? { ...st, personalNote: note } : st))
    );
  };

  // Student Action: Submit answer on tablet
  const submitStudentAnswer = (optionId: string): boolean => {
    const currentStep = session.activeLesson.steps[activeStudent.currentStep - 1] || session.activeLesson.steps[2];
    const chosenOption = currentStep.options.find(o => o.id === optionId);
    const correct = !!chosenOption?.isCorrect;

    setStudents(prev =>
      prev.map(st => {
        if (st.id === activeStudentId) {
          return {
            ...st,
            selectedAnswer: optionId,
            hasAttempted: true,
            isCorrect: correct,
            status: correct ? 'completed' : 'stuck',
            telemetry: {
              ...st.telemetry,
              facialTensionIndex: correct ? 0.12 : 0.82,
              screenHesitationSeconds: correct ? 0.9 : 8.4,
            },
          };
        }
        return st;
      })
    );

    if (correct) {
      playChime('success');
    } else {
      playChime('alert');
    }

    return correct;
  };

  const clearStudentAttempt = () => {
    setStudents(prev =>
      prev.map(st =>
        st.id === activeStudentId
          ? { ...st, selectedAnswer: null, hasAttempted: false, isCorrect: false }
          : st
      )
    );
  };

  const requestStudentHelp = () => {
    sendHintToStudent(activeStudentId);
  };

  // Compute live aggregates
  const activeStudentCount = students.length;
  const stuckCount = students.filter(s => s.status === 'stuck').length;
  const completedCount = students.filter(s => s.status === 'completed').length;
  const averageFocusScore = Math.round(
    100 - (students.reduce((acc, s) => acc + s.telemetry.facialTensionIndex * 35, 0) / (students.length || 1))
  );

  return (
    <ProductionClassroomContext.Provider
      value={{
        userRole,
        setUserRole,
        teacherTab,
        setTeacherTab,
        session,
        students,
        selectedStudent,
        selectStudent,
        frictionAlerts,
        fleetDevices,
        lessonCatalog,
        sendHintToStudent,
        broadcastHintToClass,
        triggerMindfulBreak,
        syncClassToStep,
        toggleLockdownMode,
        dismissFrictionAlert,
        addStudentNote,
        activeStudentId,
        setActiveStudentId,
        activeStudent,
        submitStudentAnswer,
        clearStudentAttempt,
        requestStudentHelp,
        breakModalActive,
        setBreakModalActive,
        breakTargetName,
        soundEnabled,
        setSoundEnabled,
        playChime,
        activeStudentCount,
        averageFocusScore,
        stuckCount,
        completedCount,
      }}
    >
      {children}
    </ProductionClassroomContext.Provider>
  );
};

export const useProductionClassroom = () => {
  const context = useContext(ProductionClassroomContext);
  if (!context) {
    throw new Error('useProductionClassroom must be used within ProductionClassroomProvider');
  }
  return context;
};
