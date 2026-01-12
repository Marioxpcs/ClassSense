import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { courses, sessions } from '../utils/seedData';

const ScheduleScreen: React.FC = () => {
  const groupedSchedule = useMemo(() => {
    return sessions.reduce((acc, session) => {
      const day = session.date.toLocaleDateString('en-US', { weekday: 'long' });
      const course = courses.find((item) => item.id === session.courseId);
      const label = course?.code ?? course?.name ?? 'Course';
      const entry = {
        id: session.id,
        day,
        time: `${session.startTime} - ${session.endTime}`,
        className: label,
        room: session.location ?? course?.location ?? 'TBD',
      };

      if (!acc[day]) {
        acc[day] = [];
      }
      acc[day].push(entry);
      return acc;
    }, {} as Record<string, { id: string; day: string; time: string; className: string; room: string }[]>);
  }, []);

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Class Schedule</Text>
      </View>
      <ScrollView style={styles.content}>
        {daysOfWeek.map((day) => (
          <View key={day} style={styles.daySection}>
            <Text style={styles.dayTitle}>{day}</Text>
            {groupedSchedule[day] ? (
              groupedSchedule[day].map((item) => (
                <View key={item.id} style={styles.scheduleItem}>
                  <View style={styles.timeContainer}>
                    <Text style={styles.time}>{item.time}</Text>
                  </View>
                  <View style={styles.classInfo}>
                    <Text style={styles.className}>{item.className}</Text>
                    <Text style={styles.room}>{item.room}</Text>
                  </View>
                </View>
              ))
            ) : (
              <Text style={styles.noClasses}>No classes scheduled</Text>
            )}
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
  content: {
    flex: 1,
  },
  daySection: {
    marginBottom: 16,
    backgroundColor: '#fff',
    padding: 16,
  },
  dayTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  scheduleItem: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  timeContainer: {
    width: 120,
  },
  time: {
    fontSize: 12,
    color: '#666',
  },
  classInfo: {
    flex: 1,
  },
  className: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  room: {
    fontSize: 14,
    color: '#666',
  },
  noClasses: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
  },
});

export default ScheduleScreen;
