export interface Evaluation {
  id: string;
  classId: string;
  title: string;
  type: EvaluationType;
  date: Date;
  weight: number;
  score?: number;
  maxScore?: number;
  notes?: string;
  status: EvaluationStatus;
}

export type EvaluationType = 'exam' | 'assignment' | 'project' | 'quiz' | 'presentation' | 'lab' | 'participation';

export type EvaluationStatus = 'upcoming' | 'in-progress' | 'submitted' | 'graded';

export interface GradeBreakdown {
  classId: string;
  evaluations: Evaluation[];
  currentGrade: number;
  projectedGrade: number;
  letterGrade: string;
  totalWeight: number;
  completedWeight: number;
}

export interface GradeRequirement {
  letterGrade: string;
  minPercentage: number;
  maxPercentage: number;
}

export const GRADE_SCALE: GradeRequirement[] = [
  { letterGrade: 'A+', minPercentage: 97, maxPercentage: 100 },
  { letterGrade: 'A', minPercentage: 93, maxPercentage: 96.99 },
  { letterGrade: 'A-', minPercentage: 90, maxPercentage: 92.99 },
  { letterGrade: 'B+', minPercentage: 87, maxPercentage: 89.99 },
  { letterGrade: 'B', minPercentage: 83, maxPercentage: 86.99 },
  { letterGrade: 'B-', minPercentage: 80, maxPercentage: 82.99 },
  { letterGrade: 'C+', minPercentage: 77, maxPercentage: 79.99 },
  { letterGrade: 'C', minPercentage: 73, maxPercentage: 76.99 },
  { letterGrade: 'C-', minPercentage: 70, maxPercentage: 72.99 },
  { letterGrade: 'D+', minPercentage: 67, maxPercentage: 69.99 },
  { letterGrade: 'D', minPercentage: 63, maxPercentage: 66.99 },
  { letterGrade: 'D-', minPercentage: 60, maxPercentage: 62.99 },
  { letterGrade: 'F', minPercentage: 0, maxPercentage: 59.99 },
];

export const getLetterGrade = (percentage: number): string => {
  const grade = GRADE_SCALE.find(
    (g) => percentage >= g.minPercentage && percentage <= g.maxPercentage
  );
  return grade?.letterGrade || 'N/A';
};
