import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import EvaluationItem from '../components/EvaluationItem';

interface Evaluation {
  id: string;
  title: string;
  type: 'exam' | 'assignment' | 'project' | 'quiz';
  date: Date;
  weight: number;
  score?: number;
  maxScore?: number;
}

const EvaluationsScreen: React.FC = () => {
  const mockEvaluations: Evaluation[] = [
    {
      id: '1',
      title: 'Midterm Exam',
      type: 'exam',
      date: new Date(2024, 2, 15),
      weight: 30,
      score: 85,
      maxScore: 100,
    },
    {
      id: '2',
      title: 'Homework 1',
      type: 'assignment',
      date: new Date(2024, 1, 10),
      weight: 10,
      score: 95,
      maxScore: 100,
    },
    {
      id: '3',
      title: 'Final Project',
      type: 'project',
      date: new Date(2024, 4, 1),
      weight: 40,
    },
    {
      id: '4',
      title: 'Quiz 1',
      type: 'quiz',
      date: new Date(2024, 1, 20),
      weight: 5,
      score: 18,
      maxScore: 20,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Evaluations</Text>
      </View>
      <View style={styles.summary}>
        <Text style={styles.summaryTitle}>Current Grade</Text>
        <Text style={styles.currentGrade}>88.5%</Text>
        <Text style={styles.letterGrade}>B+</Text>
      </View>
      <FlatList
        data={mockEvaluations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <EvaluationItem
            id={item.id}
            title={item.title}
            type={item.type}
            date={item.date}
            weight={item.weight}
            score={item.score}
            maxScore={item.maxScore}
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
});

export default EvaluationsScreen;
