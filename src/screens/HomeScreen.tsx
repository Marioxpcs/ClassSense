import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import ClassCard from '../components/ClassCard';
import ScoreBreakdownModal from '../components/ScoreBreakdownModal';
import scoringService from '../services/scoringService';
import { attendanceRecords, courses, evaluations, sessions } from '../utils/seedData';
import { PriorityBreakdown } from '../types/DomainTypes';

const HomeScreen: React.FC = () => {
  const [selectedBreakdown, setSelectedBreakdown] = useState<{
    courseName: string;
    breakdown: PriorityBreakdown;
    reasons: string[];
  } | null>(null);

  const todaySessions = useMemo(() => {
    const today = new Date();
    return sessions.filter(
      (session) => session.date.toDateString() === today.toDateString()
    );
  }, []);

  const scoredSessions = useMemo(() => {
    return todaySessions
      .map((session) => {
        const course = courses.find((item) => item.id === session.courseId);
        if (!course) return null;

        const courseEvaluations = evaluations.filter(
          (evaluation) => evaluation.courseId === course.id
        );
        const courseAttendance = attendanceRecords.filter(
          (record) => record.courseId === course.id
        );

        const scoring = scoringService.calculatePriorityScore(
          session,
          course,
          courseEvaluations,
          courseAttendance
        );

        return { session, course, scoring };
      })
      .filter((item): item is NonNullable<typeof item> => item !== null)
      .sort((a, b) => b.scoring.score - a.scoring.score);
  }, [todaySessions]);

  const comparison = scoredSessions.length >= 2 ? scoredSessions.slice(0, 2) : [];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Today&apos;s Priority</Text>
        <Text style={styles.subtitle}>Risk-informed attendance ranking</Text>
      </View>
      {comparison.length === 2 && (
        <View style={styles.comparisonCard}>
          <Text style={styles.sectionTitle}>Compare Today</Text>
          <Text style={styles.comparisonText}>
            Attend {comparison[0].course.code ?? comparison[0].course.name} over{' '}
            {comparison[1].course.code ?? comparison[1].course.name} because{' '}
            {comparison[0].scoring.reasons[0]?.toLowerCase() ?? 'it ranks higher today'}.
          </Text>
          <Text style={styles.comparisonHint}>
            If you must miss {comparison[1].course.code ?? comparison[1].course.name},
            review the recording and summarize the key slides within 24 hours.
          </Text>
        </View>
      )}
      <FlatList
        data={scoredSessions}
        keyExtractor={(item) => item.session.id}
        renderItem={({ item }) => (
          <ClassCard
            id={item.session.id}
            name={item.course.name}
            code={item.course.code ?? 'Course'}
            instructor={item.course.professor ?? 'Instructor TBD'}
            timeLabel={`${item.session.startTime} - ${item.session.endTime}`}
            location={item.session.location ?? item.course.location ?? 'Location TBD'}
            priority={item.scoring.score}
            reasons={item.scoring.reasons.slice(0, 2)}
            onPressBreakdown={() =>
              setSelectedBreakdown({
                courseName: item.course.name,
                breakdown: item.scoring.breakdown,
                reasons: item.scoring.reasons,
              })
            }
          />
        )}
        contentContainerStyle={styles.list}
      />
      <ScoreBreakdownModal
        visible={selectedBreakdown !== null}
        onClose={() => setSelectedBreakdown(null)}
        courseName={selectedBreakdown?.courseName ?? ''}
        breakdown={selectedBreakdown?.breakdown ?? null}
        reasons={selectedBreakdown?.reasons ?? []}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 16,
    backgroundColor: '#007AFF',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
  },
  list: {
    padding: 16,
  },
  comparisonCard: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  comparisonText: {
    fontSize: 14,
    color: '#444',
    marginBottom: 8,
  },
  comparisonHint: {
    fontSize: 12,
    color: '#666',
  },
});

export default HomeScreen;
