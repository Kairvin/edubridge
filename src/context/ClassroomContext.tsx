import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { Student, AlertNotification, XaiReport, ClassroomScenario, StudentState } from '../types';
import { INITIAL_STUDENTS, INITIAL_ALERTS, CLASSROOM_SCENARIOS } from '../data/studentsData';

interface ClassroomContextType {
  students: Student[];
  selectedStudent: Student | null;
  selectStudent: (id: string | null) => void;
  alerts: AlertNotification[];
  inspectingXai: XaiReport | null;
  openXaiInspector: (report: XaiReport) => void;
  closeXaiInspector: () => void;
  confidenceThreshold: number; // e.g. 75
  setConfidenceThreshold: (val: number) => void;
  currentScenario: ClassroomScenario;
  switchScenario: (scenarioId: string) => void;
  isSimulating: boolean;
  toggleSimulation: () => void;
  activeTab: 'overview' | 'teacher' | 'student' | 'pipeline' | 'vision' | 'impact';
  setActiveTab: (tab: 'overview' | 'teacher' | 'student' | 'pipeline' | 'vision' | 'impact') => void;
  activeStudentPadId: string;
  setActiveStudentPadId: (id: string) => void;
  // Intervention methods
  sendHintToStudent: (studentId: string, customHint?: string) => void;
  triggerBreathingBreak: (studentId: string | 'all') => void;
  validateXaiAlert: (alertId: string, feedback: 'validated_helpful' | 'dismissed_deep_thinking' | 'dismissed_transient', note?: string) => void;
  dismissAlert: (alertId: string) => void;
  // Aggregates
  classAverageEngagement: number;
  classAverageConfusion: number;
  classAverageStress: number;
  activeFilteredAlerts: AlertNotification[];
  // Soothing Audio Chime
  soundEnabled: boolean;
  setSoundEnabled: (val: boolean) => void;
  playChime: (type: 'calm_bell' | 'soft_alert' | 'success') => void;
  // Breathing modal trigger
  breathingModalActive: boolean;
  setBreathingModalActive: (val: boolean) => void;
  breathingTargetStudentName: string;
}

const ClassroomContext = createContext<ClassroomContextType | undefined>(undefined);

export const ClassroomProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>('s-1');
  const [alerts, setAlerts] = useState<AlertNotification[]>(INITIAL_ALERTS);
  const [inspectingXai, setInspectingXai] = useState<XaiReport | null>(null);
  const [confidenceThreshold, setConfidenceThreshold] = useState<number>(75);
  const [currentScenario, setCurrentScenario] = useState<ClassroomScenario>(CLASSROOM_SCENARIOS[0]);
  const [isSimulating, setIsSimulating] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'teacher' | 'student' | 'pipeline' | 'vision' | 'impact'>('overview');
  const [activeStudentPadId, setActiveStudentPadId] = useState<string>('s-1');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [breathingModalActive, setBreathingModalActive] = useState<boolean>(false);
  const [breathingTargetStudentName, setBreathingTargetStudentName] = useState<string>('Aarav Sharma');

  // Web Audio soothing synthesized sound
  const playChime = useCallback((type: 'calm_bell' | 'soft_alert' | 'success') => {
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
      if (type === 'calm_bell') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(528, now); // 528Hz Solfeggio Love/Healing frequency
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);
        osc.start(now);
        osc.stop(now + 1.8);
      } else if (type === 'soft_alert') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(396, now);
        osc.frequency.exponentialRampToValueAtTime(440, now + 0.3);
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.9);
        osc.start(now);
        osc.stop(now + 0.9);
      } else if (type === 'success') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(660, now + 0.2);
        gain.gain.setValueAtTime(0.07, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);
        osc.start(now);
        osc.stop(now + 1.2);
      }
    } catch {
      // Audio context might be restricted before user gesture
    }
  }, [soundEnabled]);

  // Subtle real-time telemetry fluctuations to make the classroom feel alive
  useEffect(() => {
    if (!isSimulating) return;

    const interval = setInterval(() => {
      setStudents(prev =>
        prev.map(st => {
          // slight fluctuation in blink rate and micro-engagement
          const deltaEngagement = Math.floor(Math.random() * 3) - 1;
          const newEngagement = Math.min(100, Math.max(30, st.engagement + deltaEngagement));

          // If student is confused, jitter hesitation
          const hesitationDelta = st.state === 'confused' ? 300 : (Math.random() > 0.6 ? 100 : -100);
          const newHesitation = Math.max(500, st.telemetry.screenHesitationMs + hesitationDelta);

          return {
            ...st,
            engagement: newEngagement,
            telemetry: {
              ...st.telemetry,
              screenHesitationMs: newHesitation,
            }
          };
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [isSimulating]);

  // Calculate dynamic classroom aggregates
  const classAverageEngagement = Math.round(
    students.reduce((acc, curr) => acc + curr.engagement, 0) / (students.length || 1)
  );

  const classAverageConfusion = Math.round(
    students.reduce((acc, curr) => acc + curr.confusionScore, 0) / (students.length || 1)
  );

  const classAverageStress = Math.round(
    students.reduce((acc, curr) => acc + curr.stressLevel, 0) / (students.length || 1)
  );

  // Filter alerts based on confidence threshold gate
  const activeFilteredAlerts = alerts.filter(
    a => a.status === 'pending' && a.confidence >= confidenceThreshold
  );

  const selectedStudent = students.find(s => s.id === selectedStudentId) || null;

  const selectStudent = (id: string | null) => {
    setSelectedStudentId(id);
  };

  const openXaiInspector = (report: XaiReport) => {
    setInspectingXai(report);
  };

  const closeXaiInspector = () => {
    setInspectingXai(null);
  };

  // Switch scenario preset
  const switchScenario = (scenarioId: string) => {
    const sc = CLASSROOM_SCENARIOS.find(s => s.id === scenarioId) || CLASSROOM_SCENARIOS[0];
    setCurrentScenario(sc);

    // Apply overrides
    setStudents(prev =>
      prev.map(st => {
        const override = sc.studentStateOverrides[st.id];
        if (override) {
          return { ...st, ...override };
        }
        return {
          ...st,
          state: 'flow' as StudentState,
          confusionScore: Math.floor(Math.random() * 20) + 10,
          stressLevel: Math.floor(Math.random() * 20) + 15,
          engagement: Math.floor(Math.random() * 15) + 82,
        };
      })
    );

    playChime('calm_bell');
  };

  // Teacher HITL Action 1: Send scaffold hint
  const sendHintToStudent = (studentId: string, customHint?: string) => {
    setStudents(prev =>
      prev.map(st => {
        if (st.id === studentId) {
          return {
            ...st,
            state: 'flow',
            confusionScore: Math.max(15, st.confusionScore - 45),
            engagement: Math.min(95, st.engagement + 20),
            notes: customHint ? `Teacher Hint Sent: "${customHint}"` : 'Teacher sent scaffolded hint: Chain rule step breakdown.',
            telemetry: {
              ...st.telemetry,
              eyebrowFurrowIntensity: 0.18,
              screenHesitationMs: 1200,
            }
          };
        }
        return st;
      })
    );

    // Resolve corresponding alert
    setAlerts(prev =>
      prev.map(al => {
        if (al.studentId === studentId) {
          return { ...al, status: 'addressed' };
        }
        return al;
      })
    );

    playChime('success');
  };

  // Teacher HITL Action 2: Trigger calming breathing session
  const triggerBreathingBreak = (target: string | 'all') => {
    if (target === 'all') {
      setBreathingTargetStudentName('Whole Classroom');
      setStudents(prev =>
        prev.map(st => ({
          ...st,
          stressLevel: Math.max(15, st.stressLevel - 35),
          engagement: Math.min(95, st.engagement + 15),
        }))
      );
    } else {
      const targetStudent = students.find(s => s.id === target);
      setBreathingTargetStudentName(targetStudent ? targetStudent.name : 'Student');
      setStudents(prev =>
        prev.map(st => {
          if (st.id === target) {
            return {
              ...st,
              stressLevel: Math.max(18, st.stressLevel - 40),
              state: st.state === 'stressed' ? 'flow' : st.state,
              telemetry: {
                ...st.telemetry,
                blinkRate: 18,
              }
            };
          }
          return st;
        })
      );
    }

    setBreathingModalActive(true);
    playChime('calm_bell');
  };

  // Teacher HITL Action 3: Human validation of XAI report (Reinforcement loop)
  const validateXaiAlert = (
    alertId: string,
    feedback: 'validated_helpful' | 'dismissed_deep_thinking' | 'dismissed_transient',
    note?: string
  ) => {
    setAlerts(prev =>
      prev.map(al => {
        if (al.id === alertId) {
          return {
            ...al,
            status: feedback === 'validated_helpful' ? 'addressed' : 'dismissed',
            xaiReport: {
              ...al.xaiReport,
              teacherValidation: {
                actionTaken: feedback,
                feedbackType: feedback,
                feedbackNote: note || (feedback === 'validated_helpful' ? 'Teacher confirmed alert was highly timely.' : 'Teacher flagged as healthy deliberation.'),
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              }
            }
          };
        }
        return al;
      })
    );

    playChime('success');
    if (inspectingXai && inspectingXai.alertId === alertId) {
      setInspectingXai(null);
    }
  };

  const dismissAlert = (alertId: string) => {
    setAlerts(prev =>
      prev.map(al => (al.id === alertId ? { ...al, status: 'dismissed' } : al))
    );
  };

  const toggleSimulation = () => {
    setIsSimulating(prev => !prev);
  };

  return (
    <ClassroomContext.Provider
      value={{
        students,
        selectedStudent,
        selectStudent,
        alerts,
        inspectingXai,
        openXaiInspector,
        closeXaiInspector,
        confidenceThreshold,
        setConfidenceThreshold,
        currentScenario,
        switchScenario,
        isSimulating,
        toggleSimulation,
        activeTab,
        setActiveTab,
        activeStudentPadId,
        setActiveStudentPadId,
        sendHintToStudent,
        triggerBreathingBreak,
        validateXaiAlert,
        dismissAlert,
        classAverageEngagement,
        classAverageConfusion,
        classAverageStress,
        activeFilteredAlerts,
        soundEnabled,
        setSoundEnabled,
        playChime,
        breathingModalActive,
        setBreathingModalActive,
        breathingTargetStudentName,
      }}
    >
      {children}
    </ClassroomContext.Provider>
  );
};

export const useClassroom = () => {
  const context = useContext(ClassroomContext);
  if (!context) {
    throw new Error('useClassroom must be used within a ClassroomProvider');
  }
  return context;
};
