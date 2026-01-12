import React, { useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import EvaluationItem from '../components/EvaluationItem';
import { evaluations } from '../utils/seedData';
import { getLetterGrade } from '../types/EvaluationTypes';

const EvaluationsScreen: React.FC = () => {
  const summary = useMemo(() => {
    const completed = evaluations.filter((evaluation) => evaluation.status === 'completed');
    if (completed.length === 0) {
      return { currentGrade: 0, letterGrade: 'N/A' };
    }

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

    return {
      currentGrade: Math.round(currentGrade * 10) / 10,
      letterGrade: getLetterGrade(currentGrade),
    };
  }, []);

  const highImpact = evaluations.filter((evaluation) => evaluation.weightPercent >= 20);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Evaluations</Text>
      </View>
      <View style={styles.summary}>
        <Text style={styles.summaryTitle}>Current Grade</Text>
        <Text style={styles.currentGrade}>{summary.currentGrade}%</Text>
        <Text style={styles.letterGrade}>{summary.letterGrade}</Text>
      </View>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>High Impact</Text>
      </View>
      <FlatList
        data={highImpact}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <EvaluationItem
            id={item.id}
            title={item.title}
            type={item.type}
            dueDate={item.dueDate}
            weightPercent={item.weightPercent}
            status={item.status}
            gradeReceived={item.gradeReceived}
          />
        )}
        contentContainerStyle={styles.list}
      />
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>All Evaluations</Text>
      </View>
      <FlatList
        data={evaluations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <EvaluationItem
            id={item.id}
            title={item.title}
            type={item.type}
            dueDate={item.dueDate}
            weightPercent={item.weightPercent}
            status={item.status}
            gradeReceived={item.gradeReceived}
          />
        )}
        contentContainerStyle={styles.list}
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
  summary: {
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  currentGrade: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  letterGrade: {
    fontSize: 24,
    color: '#666',
    marginTop: 4,
  },
  list: {
    padding: 16,
  },
  sectionHeader: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
  },
});

export default EvaluationsScreen;
