import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface PriorityBadgeProps {
  priority: number;
  size?: 'small' | 'medium' | 'large';
}

const PriorityBadge: React.FC<PriorityBadgeProps> = ({
  priority,
  size = 'medium'
}) => {
  const getPriorityColor = (priority: number): string => {
    if (priority >= 80) return '#FF3B30';
    if (priority >= 60) return '#FF9500';
    if (priority >= 40) return '#FFCC00';
    return '#34C759';
  };

  const getPriorityLabel = (priority: number): string => {
    if (priority >= 80) return 'Critical';
    if (priority >= 60) return 'High';
    if (priority >= 40) return 'Medium';
    return 'Low';
  };

  const color = getPriorityColor(priority);
  const label = getPriorityLabel(priority);

  return (
    <View style={[styles.container, styles[size], { backgroundColor: color }]}>
      <Text style={[styles.text, styles[`${size}Text`]]}>{label}</Text>
      <Text style={[styles.score, styles[`${size}Score`]]}>{priority}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  small: {
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  medium: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  large: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    marginRight: 4,
  },
  smallText: {
    fontSize: 10,
  },
  mediumText: {
    fontSize: 12,
  },
  largeText: {
    fontSize: 14,
  },
  score: {
    color: '#fff',
    fontWeight: '600',
  },
  smallScore: {
    fontSize: 10,
  },
  mediumScore: {
    fontSize: 12,
  },
  largeScore: {
    fontSize: 14,
  },
});

export default PriorityBadge;
