import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface ClassCardProps {
  id: string;
  name: string;
  code: string;
  instructor: string;
  credits: number;
  priority?: number;
  onPress?: () => void;
}

const ClassCard: React.FC<ClassCardProps> = ({
  name,
  code,
  instructor,
  credits,
  priority,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.className}>{name}</Text>
        <Text style={styles.classCode}>{code}</Text>
      </View>
      <Text style={styles.instructor}>{instructor}</Text>
      <View style={styles.footer}>
        <Text style={styles.credits}>{credits} Credits</Text>
        {priority && <Text style={styles.priority}>Priority: {priority}</Text>}
      </View>
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
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  credits: {
    fontSize: 12,
    color: '#999',
  },
  priority: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '600',
  },
});

export default ClassCard;
