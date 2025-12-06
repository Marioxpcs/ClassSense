import { Class } from '../context/ClassContext';
import { AttendanceRecord } from '../context/AttendanceContext';
import { Evaluation } from '../context/EvaluationContext';

interface PriorityFactors {
  attendanceWeight: number;
  gradeWeight: number;
  deadlineWeight: number;
  creditWeight: number;
}

class ScoringService {
  private defaultWeights: PriorityFactors = {
    attendanceWeight: 0.25,
    gradeWeight: 0.4,
    deadlineWeight: 0.25,
    creditWeight: 0.1,
  };

  calculatePriorityScore(
    classItem: Class,
    attendance: AttendanceRecord[],
    evaluations: Evaluation[]
  ): number {
    const attendanceScore = this.calculateAttendanceScore(classItem.id, attendance);
    const gradeScore = this.calculateGradeScore(classItem.id, evaluations);
    const deadlineScore = this.calculateDeadlineScore(classItem.id, evaluations);
    const creditScore = this.calculateCreditScore(classItem.credits);

    const totalScore =
      attendanceScore * this.defaultWeights.attendanceWeight +
      gradeScore * this.defaultWeights.gradeWeight +
      deadlineScore * this.defaultWeights.deadlineWeight +
      creditScore * this.defaultWeights.creditWeight;

    return Math.round(totalScore);
  }

  private calculateAttendanceScore(
    classId: string,
    attendance: AttendanceRecord[]
  ): number {
    const classAttendance = attendance.filter((record) => record.classId === classId);
    if (classAttendance.length === 0) return 50;

    const presentCount = classAttendance.filter(
      (record) => record.status === 'present' || record.status === 'excused'
    ).length;
    const rate = (presentCount / classAttendance.length) * 100;

    // Lower attendance = higher priority
    return 100 - rate;
  }

  private calculateGradeScore(classId: string, evaluations: Evaluation[]): number {
    const classEvals = evaluations.filter((eval) => eval.classId === classId);
    const gradedEvals = classEvals.filter(
      (eval) => eval.score !== undefined && eval.maxScore !== undefined
    );

    if (gradedEvals.length === 0) return 50;

    let totalWeightedScore = 0;
    let totalWeight = 0;

    gradedEvals.forEach((eval) => {
      const percentage = ((eval.score ?? 0) / (eval.maxScore ?? 1)) * 100;
      totalWeightedScore += percentage * eval.weight;
      totalWeight += eval.weight;
    });

    const currentGrade = totalWeight > 0 ? totalWeightedScore / totalWeight : 0;

    // Lower grade = higher priority
    return 100 - currentGrade;
  }

  private calculateDeadlineScore(classId: string, evaluations: Evaluation[]): number {
    const classEvals = evaluations.filter((eval) => eval.classId === classId);
    const upcomingEvals = classEvals.filter((eval) => eval.date > new Date());

    if (upcomingEvals.length === 0) return 0;

    // Find nearest deadline
    const nearestDeadline = upcomingEvals.reduce((nearest, eval) =>
      eval.date < nearest.date ? eval : nearest
    );

    const daysUntilDeadline = Math.ceil(
      (nearestDeadline.date.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
    );

    // Closer deadline = higher priority
    if (daysUntilDeadline <= 3) return 100;
    if (daysUntilDeadline <= 7) return 75;
    if (daysUntilDeadline <= 14) return 50;
    return 25;
  }

  private calculateCreditScore(credits: number): number {
    // More credits = slightly higher priority
    return Math.min((credits / 4) * 100, 100);
  }

  updateWeights(newWeights: Partial<PriorityFactors>): void {
    this.defaultWeights = { ...this.defaultWeights, ...newWeights };
  }

  getWeights(): PriorityFactors {
    return { ...this.defaultWeights };
  }
}

export default new ScoringService();
