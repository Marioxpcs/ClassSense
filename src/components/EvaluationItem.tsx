import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface EvaluationItemProps {
  id: string;
  title: string;
  type: 'exam' | 'assignment' | 'project' | 'quiz';
  date: Date;
  weight: number;
  score?: number;
  maxScore?: number;
}

const EvaluationItem: React.FC<EvaluationItemProps> = ({
  title,
  type,
  date,
  weight,
  score,
  maxScore,
}) => {
  const formattedDate = date.toLocaleDateString();
  const scoreText = score !== undefined && maxScore
    ? `${score}/${maxScore}`
    : 'Not graded';

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Text style={[styles.type, styles[type]]}>{type.toUpperCase()}</Text>
      </View>
      <View style={styles.details}>
        <Text style={styles.date}>{formattedDate}</Text>
        <Text style={styles.weight}>Weight: {weight}%</Text>
      </View>
      <Text style={styles.score}>{scoreText}</Text>
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
  project: {
    backgroundColor: '#FF9500',
    color: '#fff',
  },
  quiz: {
    backgroundColor: '#5856D6',
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
});

export default EvaluationItem;
