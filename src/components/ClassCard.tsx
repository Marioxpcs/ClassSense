import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import PriorityBadge from './PriorityBadge';

interface ClassCardProps {
  id: string;
  name: string;
  code: string;
  instructor: string;
  timeLabel: string;
  location: string;
  priority?: number;
  reasons?: string[];
  onPress?: () => void;
  onPressBreakdown?: () => void;
}

const ClassCard: React.FC<ClassCardProps> = ({
  name,
  code,
  instructor,
  timeLabel,
  location,
  priority,
  reasons,
  onPress,
  onPressBreakdown,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.header}>
        <View style={styles.titleGroup}>
          <Text style={styles.className}>{name}</Text>
          <Text style={styles.classCode}>{code}</Text>
        </View>
        {priority !== undefined && <PriorityBadge priority={priority} size="small" />}
      </View>
      <Text style={styles.instructor}>{instructor}</Text>
      <Text style={styles.meta}>{timeLabel}</Text>
      <Text style={styles.meta}>{location}</Text>
      {reasons && reasons.length > 0 && (
        <View style={styles.reasonList}>
          {reasons.map((reason) => (
            <Text key={reason} style={styles.reasonItem}>
              • {reason}
            </Text>
          ))}
        </View>
      )}
      {onPressBreakdown && (
        <TouchableOpacity style={styles.breakdownButton} onPress={onPressBreakdown}>
          <Text style={styles.breakdownText}>View score breakdown</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  titleGroup: {
    flex: 1,
    marginRight: 12,
  },
  className: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  classCode: {
    fontSize: 14,
    color: '#666',
  },
  instructor: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  meta: {
    fontSize: 12,
    color: '#999',
  },
  reasonList: {
    marginTop: 8,
  },
  reasonItem: {
    fontSize: 12,
    color: '#444',
    marginBottom: 4,
  },
  breakdownButton: {
    marginTop: 8,
    alignSelf: 'flex-start',
  },
  breakdownText: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '600',
  },
});

export default ClassCard;
