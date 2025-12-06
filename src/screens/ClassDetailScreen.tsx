import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import PriorityBadge from '../components/PriorityBadge';

interface ClassDetailScreenProps {
  route?: {
    params?: {
      classId: string;
    };
  };
}

const ClassDetailScreen: React.FC<ClassDetailScreenProps> = ({ route }) => {
  const classId = route?.params?.classId || '1';

  const mockClassData = {
    name: 'Introduction to Computer Science',
    code: 'CS101',
    instructor: 'Dr. Smith',
    credits: 3,
    priority: 75,
    room: 'Engineering 204',
    schedule: 'Mon, Wed, Fri 10:00 AM - 11:00 AM',
    description: 'An introduction to the fundamentals of computer science and programming.',
    attendanceRate: 95,
    currentGrade: 88,
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <Text style={styles.className}>{mockClassData.name}</Text>
            <PriorityBadge priority={mockClassData.priority} size="medium" />
          </View>
          <Text style={styles.classCode}>{mockClassData.code}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Class Information</Text>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Instructor:</Text>
            <Text style={styles.value}>{mockClassData.instructor}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Credits:</Text>
            <Text style={styles.value}>{mockClassData.credits}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Room:</Text>
            <Text style={styles.value}>{mockClassData.room}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Schedule:</Text>
            <Text style={styles.value}>{mockClassData.schedule}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Performance</Text>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Current Grade:</Text>
            <Text style={styles.value}>{mockClassData.currentGrade}%</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Attendance:</Text>
            <Text style={styles.value}>{mockClassData.attendanceRate}%</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{mockClassData.description}</Text>
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
});

export default ClassDetailScreen;
