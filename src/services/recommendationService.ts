import {
  AttendanceRecord,
  ClassSession,
  Course,
  Evaluation,
} from '../types/DomainTypes';
import scoringService from './scoringService';

export type RecommendationCategory =
  | 'attendance'
  | 'evaluations'
  | 'schedule'
  | 'general';

export interface Recommendation {
  id: string;
  title: string;
  reason: string;
  action: string;
  priority: number;
  category: RecommendationCategory;
}

const daysBetween = (start: Date, end: Date): number =>
  Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

class RecommendationService {
  generateRecommendations({
    courses,
    sessions,
    evaluations,
    attendance,
    goal = 'A',
  }: {
    courses: Course[];
    sessions: ClassSession[];
    evaluations: Evaluation[];
    attendance: AttendanceRecord[];
    goal?: 'Pass' | 'B' | 'A';
  }): Recommendation[] {
    const recommendations: Recommendation[] = [];
    const today = new Date();

    const upcomingEvaluations = evaluations
      .filter((evaluation) => evaluation.status === 'pending')
      .map((evaluation) => ({
        evaluation,
        daysUntil: daysBetween(today, evaluation.dueDate),
      }))
      .filter(({ daysUntil }) => daysUntil >= 0 && daysUntil <= 7)
      .sort((a, b) => a.daysUntil - b.daysUntil);

    upcomingEvaluations.forEach(({ evaluation, daysUntil }) => {
      if (evaluation.weightPercent >= 20) {
        recommendations.push({
          id: `eval-${evaluation.id}`,
          title: `Focus on ${evaluation.title}`,
          reason: `${evaluation.weightPercent}% of the grade is due in ${daysUntil} days.`,
          action: 'Block a study session and draft a checklist for completion.',
          priority: daysUntil <= 2 ? 90 : 75,
          category: 'evaluations',
        });
      }
    });

    courses.forEach((course) => {
      const courseAttendance = attendance.filter(
        (record) => record.courseId === course.id
      );
      const recentMisses = courseAttendance
        .sort((a, b) => b.date.getTime() - a.date.getTime())
        .slice(0, 3)
        .filter((record) => record.status === 'missed').length;

      if (recentMisses >= 2) {
        recommendations.push({
          id: `attendance-${course.id}`,
          title: `Do not miss the next ${course.code ?? course.name} session`,
          reason: `You missed ${recentMisses} of the last 3 meetings.`,
          action: 'Set a reminder and prepare a short pre-read before class.',
          priority: 80,
          category: 'attendance',
        });
      }
    });

    const todaysSessions = sessions.filter(
      (session) => session.date.toDateString() === today.toDateString()
    );

    const scoredSessions = todaysSessions.map((session) => {
      const course = courses.find((item) => item.id === session.courseId);
      if (!course) return null;

      const courseEvaluations = evaluations.filter(
        (evaluation) => evaluation.courseId === course.id
      );
      const courseAttendance = attendance.filter(
        (record) => record.courseId === course.id
      );

      const scoring = scoringService.calculatePriorityScore(
        session,
        course,
        courseEvaluations,
        courseAttendance
      );

      return { session, course, scoring };
    });

    scoredSessions
      .filter((item): item is NonNullable<typeof item> => item !== null)
      .sort((a, b) => b.scoring.score - a.scoring.score)
      .slice(0, 1)
      .forEach(({ course, session, scoring }) => {
        recommendations.push({
          id: `today-${session.id}`,
          title: `Prioritize ${course.code ?? course.name} today`,
          reason: scoring.reasons[0] ?? 'This session has the highest impact today.',
          action: 'Arrive early and capture key notes from the session.',
          priority: scoring.score,
          category: 'schedule',
        });
      });

    if (goal === 'Pass') {
      recommendations.push({
        id: 'goal-pass',
        title: 'Protect passing essentials',
        reason: 'Your goal prioritizes must-pass evaluations and core attendance.',
        action: 'Focus on high-weight assessments and required sessions.',
        priority: 55,
        category: 'general',
      });
    }

    return recommendations.slice(0, 5);
  }
}

export default new RecommendationService();
