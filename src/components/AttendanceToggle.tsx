import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface AttendanceToggleProps {
  date: Date;
  initialStatus?: 'present' | 'absent' | 'excused';
  onStatusChange?: (status: 'present' | 'absent' | 'excused') => void;
}

const AttendanceToggle: React.FC<AttendanceToggleProps> = ({
  date,
  initialStatus = 'present',
  onStatusChange,
}) => {
  const [status, setStatus] = useState<'present' | 'absent' | 'excused'>(initialStatus);

  const handlePress = (newStatus: 'present' | 'absent' | 'excused') => {
    setStatus(newStatus);
    onStatusChange?.(newStatus);
  };

  const formattedDate = date.toLocaleDateString();

  return (
    <View style={styles.container}>
      <Text style={styles.date}>{formattedDate}</Text>
      <View style={styles.buttonGroup}>
        <TouchableOpacity
          style={[
            styles.button,
            status === 'present' && styles.presentButton,
          ]}
          onPress={() => handlePress('present')}
        >
          <Text style={[
            styles.buttonText,
            status === 'present' && styles.activeText,
          ]}>
            Present
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            status === 'absent' && styles.absentButton,
          ]}
          onPress={() => handlePress('absent')}
        >
          <Text style={[
            styles.buttonText,
            status === 'absent' && styles.activeText,
          ]}>
            Absent
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            status === 'excused' && styles.excusedButton,
          ]}
          onPress={() => handlePress('excused')}
        >
          <Text style={[
            styles.buttonText,
            status === 'excused' && styles.activeText,
          ]}>
            Excused
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 4,
  },
  date: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 8,
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f5f5f5',
  },
  presentButton: {
    backgroundColor: '#34C759',
    borderColor: '#34C759',
  },
  absentButton: {
    backgroundColor: '#FF3B30',
    borderColor: '#FF3B30',
  },
  excusedButton: {
    backgroundColor: '#FF9500',
    borderColor: '#FF9500',
  },
  buttonText: {
    fontSize: 12,
    color: '#666',
  },
  activeText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default AttendanceToggle;
