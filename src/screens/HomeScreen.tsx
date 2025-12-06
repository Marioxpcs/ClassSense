import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import ClassCard from '../components/ClassCard';

const HomeScreen: React.FC = () => {
  const mockClasses = [
    {
      id: '1',
      name: 'Introduction to Computer Science',
      code: 'CS101',
      instructor: 'Dr. Smith',
      credits: 3,
      priority: 75,
    },
    {
      id: '2',
      name: 'Calculus I',
      code: 'MATH201',
      instructor: 'Prof. Johnson',
      credits: 4,
      priority: 60,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Classes</Text>
        <Text style={styles.subtitle}>Spring 2024</Text>
      </View>
      <FlatList
        data={mockClasses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ClassCard
            id={item.id}
            name={item.name}
            code={item.code}
            instructor={item.instructor}
            credits={item.credits}
            priority={item.priority}
            onPress={() => console.log('Class pressed:', item.name)}
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
  subtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
  },
  list: {
    padding: 16,
  },
});

export default HomeScreen;
