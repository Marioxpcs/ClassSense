import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface AttendanceToggleProps {
  date: Date;
  initialStatus?: 'attended' | 'missed' | 'late' | 'recording';
  onStatusChange?: (status: 'attended' | 'missed' | 'late' | 'recording') => void;
}

const AttendanceToggle: React.FC<AttendanceToggleProps> = ({
  date,
  initialStatus = 'attended',
  onStatusChange,
}) => {
  const [status, setStatus] = useState<'attended' | 'missed' | 'late' | 'recording'>(
    initialStatus
  );

  const handlePress = (newStatus: 'attended' | 'missed' | 'late' | 'recording') => {
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
            status === 'attended' && styles.attendedButton,
          ]}
          onPress={() => handlePress('attended')}
        >
          <Text style={[
            styles.buttonText,
            status === 'attended' && styles.activeText,
          ]}>
            Attended
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            status === 'missed' && styles.missedButton,
          ]}
          onPress={() => handlePress('missed')}
        >
          <Text style={[
            styles.buttonText,
            status === 'missed' && styles.activeText,
          ]}>
            Missed
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            status === 'late' && styles.lateButton,
          ]}
          onPress={() => handlePress('late')}
        >
          <Text style={[
            styles.buttonText,
            status === 'late' && styles.activeText,
          ]}>
            Late
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            status === 'recording' && styles.recordingButton,
          ]}
          onPress={() => handlePress('recording')}
        >
          <Text style={[
            styles.buttonText,
            status === 'recording' && styles.activeText,
          ]}>
            Recording
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
  attendedButton: {
    backgroundColor: '#34C759',
    borderColor: '#34C759',
  },
  missedButton: {
    backgroundColor: '#FF3B30',
    borderColor: '#FF3B30',
  },
  lateButton: {
    backgroundColor: '#FF9500',
    borderColor: '#FF9500',
  },
  recordingButton: {
    backgroundColor: '#5856D6',
    borderColor: '#5856D6',
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
