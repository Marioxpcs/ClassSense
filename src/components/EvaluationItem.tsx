import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface EvaluationItemProps {
  id: string;
  title: string;
  type: 'exam' | 'assignment' | 'project' | 'quiz' | 'lab' | 'midterm' | 'participation';
  dueDate: Date;
  weightPercent: number;
  status: 'pending' | 'completed' | 'missed' | 'late';
  gradeReceived?: number;
}

const EvaluationItem: React.FC<EvaluationItemProps> = ({
  title,
  type,
  dueDate,
  weightPercent,
  status,
  gradeReceived,
}) => {
  const formattedDate = dueDate.toLocaleDateString();
  const scoreText = gradeReceived !== undefined ? `${gradeReceived}%` : 'Not graded';

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Text style={[styles.type, styles[type]]}>{type.toUpperCase()}</Text>
      </View>
      <View style={styles.details}>
        <Text style={styles.date}>{formattedDate}</Text>
        <Text style={styles.weight}>Weight: {weightPercent}%</Text>
      </View>
      <View style={styles.statusRow}>
        <Text style={styles.score}>{scoreText}</Text>
        <Text style={[styles.status, styles[status]]}>{status.toUpperCase()}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginVertical: 6,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  type: {
    fontSize: 10,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  exam: {
    backgroundColor: '#FF3B30',
    color: '#fff',
  },
  assignment: {
    backgroundColor: '#34C759',
    color: '#fff',
  },
  lab: {
    backgroundColor: '#0A84FF',
    color: '#fff',
  },
  midterm: {
    backgroundColor: '#FF2D55',
    color: '#fff',
  },
  project: {
    backgroundColor: '#FF9500',
    color: '#fff',
  },
  quiz: {
    backgroundColor: '#5856D6',
    color: '#fff',
  },
  participation: {
    backgroundColor: '#AF52DE',
    color: '#fff',
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: '#666',
  },
  weight: {
    fontSize: 12,
    color: '#666',
  },
  score: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF',
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  status: {
    fontSize: 10,
    fontWeight: '700',
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 4,
    color: '#fff',
  },
  pending: {
    backgroundColor: '#FF9500',
  },
  completed: {
    backgroundColor: '#34C759',
  },
  missed: {
    backgroundColor: '#FF3B30',
  },
  late: {
    backgroundColor: '#5856D6',
  },
});

export default EvaluationItem;
