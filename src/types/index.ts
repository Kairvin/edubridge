export type StudentState = 'flow' | 'confused' | 'stressed' | 'distracted' | 'anomaly' | 'idle';

export interface TelemetryData {
  headTilt: number; // degrees (-20 to +20)
  blinkRate: number; // blinks/min (normal: 15-20)
  gazeDeviationSeconds: number; // seconds looking off-screen
  eyebrowFurrowIntensity: number; // 0.0 to 1.0 (indicates concentration vs perplexity)
  screenHesitationMs: number; // ms spent frozen on step
  cameraPrivacyMode: 'on-device-edge' | 'offline-cache';
}

export interface StudentHistoryPoint {
  time: string;
  state: StudentState;
  engagement: number;
}

export interface Student {
  id: string;
  name: string;
  avatar: string;
  rollNo: string;
  seatRow: number;
  seatCol: number;
  currentSubject: string;
  currentTopic: string;
  state: StudentState;
  engagement: number; // 0 - 100%
  confusionScore: number; // 0 - 100%
  stressLevel: number; // 0 - 100%
  attentionIndex: number; // 0 - 100%
  telemetry: TelemetryData;
  history: StudentHistoryPoint[];
  activeAlertId?: string;
  notes?: string;
}

export interface FeatureAttribution {
  feature: string;
  importance: number; // 0.0 to 1.0
  observedValue: string;
  normalBaseline: string;
  category: 'vision' | 'interaction' | 'temporal';
}

export interface XaiReport {
  id: string;
  alertId: string;
  studentId: string;
  studentName: string;
  detectedCondition: 'Severe Topic Confusion' | 'Cognitive Overload / High Stress' | 'Sustained Disengagement' | 'Assessment Integrity Anomaly';
  confidenceScore: number; // 0.0 to 1.0 (e.g. 0.88)
  modelArchitecture: 'MobileNetV3-Edge + Temporal GRU (Quantized INT8)';
  inferenceLatencyMs: number; // e.g. 14ms on tablet NPU
  evidenceSummary: string;
  featureAttributions: FeatureAttribution[];
  gradCamRegion: 'Upper Face / Brow Furrow' | 'Gaze Off-Axis / Screen Peripheral' | 'Saccadic Eye Movement' | 'Rapid Scroll Reversal';
  recommendedInterventions: {
    id: string;
    label: string;
    description: string;
    icon: 'hint' | 'breathe' | 're-explain' | 'praise';
  }[];
  teacherValidation?: {
    actionTaken: string;
    feedbackType: 'validated_helpful' | 'dismissed_deep_thinking' | 'dismissed_transient';
    feedbackNote?: string;
    timestamp: string;
  };
}

export interface AlertNotification {
  id: string;
  studentId: string;
  studentName: string;
  avatar: string;
  timestamp: string;
  type: 'confusion' | 'stress' | 'disengagement' | 'test_anomaly';
  severity: 'low' | 'medium' | 'high';
  confidence: number; // 0 - 100
  headline: string;
  snippet: string;
  status: 'pending' | 'addressed' | 'dismissed';
  xaiReport: XaiReport;
}

export interface ClassroomScenario {
  id: string;
  title: string;
  badge: string;
  description: string;
  activeSubject: string;
  mode: 'lecture' | 'exam' | 'offline_edge';
  studentStateOverrides: { [studentId: string]: Partial<Student> };
}

export interface CurriculumProblem {
  id: string;
  subject: string;
  topic: string;
  stepNumber: number;
  totalSteps: number;
  prompt: string;
  mathFormula?: string;
  options: { id: string; text: string; isCorrect: boolean; feedback: string }[];
  hintText: string;
  calmNudgeText: string;
}
