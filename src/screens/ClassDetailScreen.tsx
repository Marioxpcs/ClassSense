import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import PriorityBadge from '../components/PriorityBadge';
import scoringService from '../services/scoringService';
import { attendanceRecords, courses, evaluations, sessions } from '../utils/seedData';
import { getLetterGrade } from '../types/EvaluationTypes';

interface ClassDetailScreenProps {
  route?: {
    params?: {
      classId: string;
    };
  };
}

const ClassDetailScreen: React.FC<ClassDetailScreenProps> = ({ route }) => {
  const classId = route?.params?.classId || courses[0]?.id;

  const classData = useMemo(() => {
    const course = courses.find((item) => item.id === classId) ?? courses[0];
    if (!course) return null;

    const courseAttendance = attendanceRecords.filter(
      (record) => record.courseId === course.id
    );
    const attended = courseAttendance.filter(
      (record) => record.status === 'attended'
    ).length;
    const attendanceRate =
      courseAttendance.length > 0
        ? Math.round((attended / courseAttendance.length) * 100)
        : 100;

    const courseEvaluations = evaluations.filter(
      (evaluation) => evaluation.courseId === course.id
    );
    const completed = courseEvaluations.filter(
      (evaluation) => evaluation.status === 'completed'
    );
    const totalWeight = completed.reduce(
      (total, evaluation) => total + evaluation.weightPercent,
      0
    );
    const weightedScore = completed.reduce(
      (total, evaluation) =>
        total + (evaluation.gradeReceived ?? 0) * evaluation.weightPercent,
      0
    );
    const currentGrade = totalWeight > 0 ? weightedScore / totalWeight : 0;

    const upcomingEvaluations = courseEvaluations
      .filter((evaluation) => evaluation.dueDate >= new Date())
      .sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime())
      .slice(0, 3);

    const nextSession = sessions
      .filter((session) => session.courseId === course.id)
      .sort((a, b) => a.date.getTime() - b.date.getTime())
      .find((session) => session.date >= new Date());

    const nextSessionScore = nextSession
      ? scoringService.calculatePriorityScore(
          nextSession,
          course,
          courseEvaluations,
          courseAttendance
        )
      : null;

    const meetingDays = course.meetingDays.map((day) =>
      ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][day] ?? `${day}`
    );

    return {
      course,
      meetingDays,
      attendanceRate,
      currentGrade: Math.round(currentGrade * 10) / 10,
      letterGrade: getLetterGrade(currentGrade),
      upcomingEvaluations,
      nextSession,
      nextSessionScore,
    };
  }, [classId]);

  if (!classData) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.emptyState}>No class selected.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <Text style={styles.className}>{classData.course.name}</Text>
            {classData.nextSessionScore && (
              <PriorityBadge priority={classData.nextSessionScore.score} size="medium" />
            )}
          </View>
          <Text style={styles.classCode}>
            {classData.course.code ?? classData.course.name}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Class Information</Text>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Instructor:</Text>
            <Text style={styles.value}>{classData.course.professor ?? 'TBD'}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Meeting Days:</Text>
            <Text style={styles.value}>{classData.meetingDays.join(', ')}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Room:</Text>
            <Text style={styles.value}>{classData.course.location ?? 'TBD'}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Schedule:</Text>
            <Text style={styles.value}>
              {classData.course.startTime} - {classData.course.endTime}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Performance</Text>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Current Grade:</Text>
            <Text style={styles.value}>
              {classData.currentGrade}% ({classData.letterGrade})
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Attendance:</Text>
            <Text style={styles.value}>{classData.attendanceRate}%</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upcoming Evaluations</Text>
          {classData.upcomingEvaluations.length === 0 ? (
            <Text style={styles.description}>No upcoming evaluations.</Text>
          ) : (
            classData.upcomingEvaluations.map((evaluation) => (
              <View key={evaluation.id} style={styles.infoRow}>
                <Text style={styles.label}>{evaluation.title}</Text>
                <Text style={styles.value}>{evaluation.weightPercent}%</Text>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#007AFF',
    padding: 16,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  className: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
  },
  classCode: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
  },
  section: {
    backgroundColor: '#fff',
    padding: 16,
    marginTop: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  label: {
    fontSize: 14,
    color: '#666',
  },
  value: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  emptyState: {
    padding: 24,
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
  },
});

export default ClassDetailScreen;
