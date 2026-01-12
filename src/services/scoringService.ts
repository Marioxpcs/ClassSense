import {
  AttendanceRecord,
  ClassSession,
  Course,
  Evaluation,
  PriorityResult,
  TopicType,
} from '../types/DomainTypes';

class ScoringService {
  private topicBaseScores: Record<TopicType, number> = {
    NEW: 8,
    EXTENSIVE: 9,
    LIGHT: 4,
    CONTINUATION: 5,
  };

  calculatePriorityScore(
    session: ClassSession,
    course: Course,
    evaluations: Evaluation[],
    attendance: AttendanceRecord[]
  ): PriorityResult {
    const topicImportance = this.topicBaseScores[session.topic.topicType];
    const difficulty = session.topic.estimatedDifficulty * 1.2;
    const evaluationProximity = this.calculateEvaluationProximity(
      session.date,
      evaluations
    );
    const evaluationWeightDensity = this.calculateEvaluationWeightDensity(evaluations);
    const attendanceRisk = this.calculateAttendanceRisk(attendance);
    const overrideMultiplier = course.courseImportanceOverride ?? 1;

    const rawScore =
      topicImportance +
      difficulty +
      evaluationProximity +
      evaluationWeightDensity +
      attendanceRisk;
    const finalScore = Math.round(rawScore * overrideMultiplier);

    const reasons = this.buildReasons({
      session,
      evaluationProximity,
      evaluationWeightDensity,
      attendanceRisk,
      overrideMultiplier,
    });

    return {
      score: finalScore,
      breakdown: {
        topicImportance,
        difficulty,
        evaluationProximity,
        evaluationWeightDensity,
        attendanceRisk,
        overrideMultiplier,
        finalScore,
      },
      reasons,
    };
  }

  private calculateEvaluationProximity(
    sessionDate: Date,
    evaluations: Evaluation[]
  ): number {
    const upcoming = evaluations.filter((evaluation) => evaluation.dueDate >= sessionDate);
    if (upcoming.length === 0) return 0;

    const nearest = upcoming.reduce((closest, evaluation) =>
      evaluation.dueDate < closest.dueDate ? evaluation : closest
    );
    const daysUntil = Math.ceil(
      (nearest.dueDate.getTime() - sessionDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysUntil <= 2) return 8;
    if (daysUntil <= 7) return 6;
    if (daysUntil <= 14) return 3;
    return 0;
  }

  private calculateEvaluationWeightDensity(evaluations: Evaluation[]): number {
    if (evaluations.length === 0) return 0;

    const maxWeight = Math.max(...evaluations.map((evaluation) => evaluation.weightPercent));
    const remainingWeight = evaluations
      .filter((evaluation) => evaluation.status !== 'completed')
      .reduce((total, evaluation) => total + evaluation.weightPercent, 0);

    if (maxWeight >= 30) return 4;
    if (remainingWeight >= 50) return 2;
    return 0;
  }

  private calculateAttendanceRisk(attendance: AttendanceRecord[]): number {
    if (attendance.length === 0) return 0;

    const recent = [...attendance]
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .slice(0, 5);

    const missedCount = recent.filter((record) => record.status === 'missed').length;

    if (missedCount >= 3) return 6;
    if (missedCount >= 2) return 4;
    if (missedCount >= 1) return 2;
    return 0;
  }

  private buildReasons({
    session,
    evaluationProximity,
    evaluationWeightDensity,
    attendanceRisk,
    overrideMultiplier,
  }: {
    session: ClassSession;
    evaluationProximity: number;
    evaluationWeightDensity: number;
    attendanceRisk: number;
    overrideMultiplier: number;
  }): string[] {
    const reasons: string[] = [];

    reasons.push(
      `${session.topic.topicType} topic: ${this.topicBaseScores[session.topic.topicType]} pts`
    );
    reasons.push(
      `Difficulty ${session.topic.estimatedDifficulty}/5 → ${(
        session.topic.estimatedDifficulty * 1.2
      ).toFixed(1)} pts`
    );

    if (evaluationProximity > 0) {
      reasons.push(`Evaluation due soon (+${evaluationProximity})`);
    }

    if (evaluationWeightDensity > 0) {
      reasons.push(`High weight density (+${evaluationWeightDensity})`);
    }

    if (attendanceRisk > 0) {
      reasons.push(`Recent misses raise risk (+${attendanceRisk})`);
    }

    if (overrideMultiplier !== 1) {
      reasons.push(`Course priority override ×${overrideMultiplier.toFixed(2)}`);
    }

    return reasons;
  }
}

export default new ScoringService();
