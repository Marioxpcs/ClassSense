import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';

interface ScheduleItem {
  id: string;
  day: string;
  time: string;
  className: string;
  room: string;
}

const ScheduleScreen: React.FC = () => {
  const mockSchedule: ScheduleItem[] = [
    {
      id: '1',
      day: 'Monday',
      time: '10:00 AM - 11:00 AM',
      className: 'CS101',
      room: 'Engineering 204',
    },
    {
      id: '2',
      day: 'Monday',
      time: '2:00 PM - 3:30 PM',
      className: 'MATH201',
      room: 'Science 101',
    },
    {
      id: '3',
      day: 'Wednesday',
      time: '10:00 AM - 11:00 AM',
      className: 'CS101',
      room: 'Engineering 204',
    },
    {
      id: '4',
      day: 'Friday',
      time: '10:00 AM - 11:00 AM',
      className: 'CS101',
      room: 'Engineering 204',
    },
  ];

  const groupedSchedule = mockSchedule.reduce((acc, item) => {
    if (!acc[item.day]) {
      acc[item.day] = [];
    }
    acc[item.day].push(item);
    return acc;
  }, {} as Record<string, ScheduleItem[]>);

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
