export type TopicType = 'NEW' | 'EXTENSIVE' | 'LIGHT' | 'CONTINUATION';

export interface CoursePolicy {
  attendanceMandatory?: boolean;
  participationWeight?: number;
  latePenaltyRules?: string;
}

export interface Course {
  id: string;
  name: string;
  code?: string;
  professor?: string;
  meetingDays: number[];
  startTime: string;
  endTime: string;
  location?: string;
  baselineDifficulty: number;
  courseImportanceOverride?: number;
  policies?: CoursePolicy;
}

export interface TopicPlanEntry {
  topicTitle: string;
  topicDescription?: string;
  topicType: TopicType;
  estimatedDifficulty: number;
  estimatedWorkloadMinutes?: number;
  tags?: string[];
}

export interface ClassSession {
  id: string;
  courseId: string;
  date: Date;
  startTime: string;
  endTime: string;
  location?: string;
  topic: TopicPlanEntry;
}

export type AttendanceStatus = 'attended' | 'missed' | 'late' | 'recording';

export interface AttendanceRecord {
  id: string;
  courseId: string;
  sessionId: string;
  date: Date;
  status: AttendanceStatus;
  reason?: string;
  note?: string;
}

export type EvaluationType =
  | 'assignment'
  | 'lab'
  | 'quiz'
  | 'midterm'
  | 'exam'
  | 'project'
  | 'participation';

export type EvaluationStatus = 'pending' | 'completed' | 'missed' | 'late';

export interface Evaluation {
  id: string;
  courseId: string;
  title: string;
  type: EvaluationType;
  weightPercent: number;
  dueDate: Date;
  status: EvaluationStatus;
  estimatedStudyTime?: number;
  gradeReceived?: number;
  notes?: string;
}

export interface PriorityBreakdown {
  topicImportance: number;
  difficulty: number;
  evaluationProximity: number;
  evaluationWeightDensity: number;
  attendanceRisk: number;
  overrideMultiplier: number;
  finalScore: number;
}

export interface PriorityResult {
  score: number;
  breakdown: PriorityBreakdown;
  reasons: string[];
}
