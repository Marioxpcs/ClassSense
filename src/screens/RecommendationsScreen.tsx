import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import PriorityBadge from '../components/PriorityBadge';

interface Recommendation {
  id: string;
  title: string;
  description: string;
  priority: number;
  category: 'attendance' | 'grades' | 'schedule' | 'general';
}

const RecommendationsScreen: React.FC = () => {
  const mockRecommendations: Recommendation[] = [
    {
      id: '1',
      title: 'Attend CS101 this week',
      description: 'Your attendance in CS101 has dropped to 85%. Consider attending all remaining sessions to maintain a good standing.',
      priority: 75,
      category: 'attendance',
    },
    {
      id: '2',
      title: 'Study for MATH201 Midterm',
      description: 'The midterm is approaching in 5 days. Based on your current performance, dedicate extra study time.',
      priority: 90,
      category: 'grades',
    },
    {
      id: '3',
      title: 'Start Final Project Early',
      description: 'The final project is worth 40% of your grade. Starting early will help you achieve better results.',
      priority: 60,
      category: 'schedule',
    },
  ];

  const getCategoryColor = (category: string): string => {
    switch (category) {
      case 'attendance': return '#5856D6';
      case 'grades': return '#FF3B30';
      case 'schedule': return '#FF9500';
      default: return '#007AFF';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>AI Recommendations</Text>
        <Text style={styles.subtitle}>Personalized insights for success</Text>
      </View>
      <ScrollView style={styles.content}>
        {mockRecommendations.map((rec) => (
          <View key={rec.id} style={styles.recommendationCard}>
            <View style={styles.cardHeader}>
              <View style={styles.headerLeft}>
                <View
                  style={[
                    styles.categoryBadge,
                    { backgroundColor: getCategoryColor(rec.category) }
                  ]}
                >
                  <Text style={styles.categoryText}>
                    {rec.category.toUpperCase()}
                  </Text>
                </View>
              </View>
              <PriorityBadge priority={rec.priority} size="small" />
            </View>
            <Text style={styles.cardTitle}>{rec.title}</Text>
            <Text style={styles.cardDescription}>{rec.description}</Text>
          </View>
        ))}
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
    padding: 16,
    backgroundColor: '#007AFF',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
    marginTop: 4,
  },
  content: {
    flex: 1,
  },
  recommendationCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    margin: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerLeft: {
    flex: 1,
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  categoryText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#fff',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});

export default RecommendationsScreen;
