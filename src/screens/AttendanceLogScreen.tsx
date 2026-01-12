import React, { useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import AttendanceToggle from '../components/AttendanceToggle';
import { attendanceRecords, courses } from '../utils/seedData';

const AttendanceLogScreen: React.FC = () => {
  const attendanceWithCourse = useMemo(() => {
    return attendanceRecords.map((record) => {
      const course = courses.find((item) => item.id === record.courseId);
      return {
        ...record,
        className: course?.code ?? course?.name ?? 'Course',
      };
    });
  }, []);

  const stats = useMemo(() => {
    const total = attendanceRecords.length;
    const attended = attendanceRecords.filter((record) => record.status === 'attended').length;
    const missed = attendanceRecords.filter((record) => record.status === 'missed').length;
    const rate = total > 0 ? Math.round((attended / total) * 100) : 100;
    return { total, attended, missed, rate };
  }, []);

  const handleStatusChange = (
    id: string,
    status: 'attended' | 'missed' | 'late' | 'recording'
  ) => {
    console.log(`Attendance ${id} changed to ${status}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Attendance Log</Text>
      </View>
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{stats.rate}%</Text>
          <Text style={styles.statLabel}>Overall Rate</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{stats.attended}</Text>
          <Text style={styles.statLabel}>Attended</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{stats.missed}</Text>
          <Text style={styles.statLabel}>Missed</Text>
        </View>
      </View>
      <FlatList
        data={attendanceWithCourse}
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
