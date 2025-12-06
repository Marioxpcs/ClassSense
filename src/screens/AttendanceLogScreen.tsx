import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import AttendanceToggle from '../components/AttendanceToggle';

interface AttendanceRecord {
  id: string;
  classId: string;
  className: string;
  date: Date;
  status: 'present' | 'absent' | 'excused';
}

const AttendanceLogScreen: React.FC = () => {
  const mockAttendance: AttendanceRecord[] = [
    {
      id: '1',
      classId: '1',
      className: 'CS101',
      date: new Date(2024, 0, 15),
      status: 'present',
    },
    {
      id: '2',
      classId: '1',
      className: 'CS101',
      date: new Date(2024, 0, 17),
      status: 'present',
    },
    {
      id: '3',
      classId: '2',
      className: 'MATH201',
      date: new Date(2024, 0, 16),
      status: 'absent',
    },
  ];

  const handleStatusChange = (id: string, status: 'present' | 'absent' | 'excused') => {
    console.log(`Attendance ${id} changed to ${status}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Attendance Log</Text>
      </View>
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>95%</Text>
          <Text style={styles.statLabel}>Overall Rate</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>38</Text>
          <Text style={styles.statLabel}>Present</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>2</Text>
          <Text style={styles.statLabel}>Absent</Text>
        </View>
      </View>
      <FlatList
        data={mockAttendance}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.attendanceItem}>
            <Text style={styles.className}>{item.className}</Text>
            <AttendanceToggle
              date={item.date}
              initialStatus={item.status}
              onStatusChange={(status) => handleStatusChange(item.id, status)}
            />
          </View>
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
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    backgroundColor: '#fff',
    marginBottom: 8,
  },
  statBox: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  list: {
    padding: 16,
  },
  attendanceItem: {
    marginBottom: 12,
  },
  className: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
});

export default AttendanceLogScreen;
