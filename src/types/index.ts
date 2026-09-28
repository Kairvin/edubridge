export type StudentStatus = 'in_flow' | 'stuck' | 'fatigued' | 'distracted' | 'completed';

export interface StudentTelemetry {
  screenHesitationSeconds: number;
  stylusActive: boolean;
  blinkCadence: 'normal' | 'rapid' | 'sluggish';
  facialTensionIndex: number; // 0.0 - 1.0 (subtle cognitive friction cue)
  gazeAlignment: 'on_task' | 'slight_drift' | 'away';
  batteryPercent: number;
  tabletConnection: 'mesh_active' | 'cloud_sync' | 'offline_buffered';
}

export interface StudentRecord {
  id: string;
  name: string;
  avatar: string;
  rollNo: string;
  seatRow: number;
  seatCol: number;
  status: StudentStatus;
  currentStep: number;
  totalSteps: number;
  selectedAnswer: string | null;
  hasAttempted: boolean;
  isCorrect: boolean;
  teacherHintReceived?: string;
  personalNote?: string;
  telemetry: StudentTelemetry;
  history: {
    step: number;
    timeSpentSeconds: number;
    attempts: number;
    outcome: 'success' | 'stuck_resolved' | 'assisted';
  }[];
}

export interface LessonStep {
  stepNumber: number;
  title: string;
  instruction: string;
  formulaPrompt?: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
  scaffoldHint: string;
  pedagogicalContext: string;
}

export interface LessonModule {
  id: string;
  title: string;
  subject: string;
  grade: string;
  estimatedMinutes: number;
  status: 'active_live' | 'upcoming' | 'completed';
  totalEnrolled: number;
  steps: LessonStep[];
}

export interface ClassSession {
  id: string;
  schoolName: string;
  className: string;
  subject: string;
  period: string;
  teacherName: string;
  teacherTitle: string;
  activeLesson: LessonModule;
  isLockdownActive: boolean;
  isMeshNetworkActive: boolean;
}

export interface FrictionAlert {
  id: string;
  studentId: string;
  studentName: string;
  stepNumber: number;
  severity: 'moderate' | 'high';
  title: string;
  description: string;
  suggestedAction: string;
  timestamp: string;
  isResolved: boolean;
}

export interface FleetDevice {
  id: string;
  studentName: string;
  rollNo: string;
  model: string;
  battery: number;
  status: 'online' | 'mesh_node' | 'sleep' | 'maintenance';
  osVersion: string;
  storageAvailableGb: number;
  lastSync: string;
}
