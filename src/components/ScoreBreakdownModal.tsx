import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { PriorityBreakdown } from '../types/DomainTypes';

interface ScoreBreakdownModalProps {
  visible: boolean;
  onClose: () => void;
  courseName: string;
  breakdown: PriorityBreakdown | null;
  reasons: string[];
}

const ScoreBreakdownModal: React.FC<ScoreBreakdownModalProps> = ({
  visible,
  onClose,
  courseName,
  breakdown,
  reasons,
}) => {
  if (!breakdown) {
    return null;
  }

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.backdrop}>
        <View style={styles.modal}>
          <Text style={styles.title}>{courseName} priority breakdown</Text>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Reasons</Text>
            {reasons.map((reason) => (
              <Text key={reason} style={styles.reasonItem}>
                • {reason}
              </Text>
            ))}
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Score components</Text>
            <Text style={styles.detail}>Topic importance: {breakdown.topicImportance}</Text>
            <Text style={styles.detail}>Difficulty: {breakdown.difficulty.toFixed(1)}</Text>
            <Text style={styles.detail}>Evaluation proximity: {breakdown.evaluationProximity}</Text>
            <Text style={styles.detail}>
              Evaluation weight density: {breakdown.evaluationWeightDensity}
            </Text>
            <Text style={styles.detail}>Attendance risk: {breakdown.attendanceRisk}</Text>
            <Text style={styles.detail}>
              Override multiplier: ×{breakdown.overrideMultiplier.toFixed(2)}
            </Text>
            <Text style={styles.total}>Final score: {breakdown.finalScore}</Text>
          </View>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    padding: 24,
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
    color: '#333',
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#444',
    marginBottom: 8,
  },
  reasonItem: {
    fontSize: 12,
    color: '#555',
    marginBottom: 4,
  },
  detail: {
    fontSize: 12,
    color: '#555',
    marginBottom: 4,
  },
  total: {
    fontSize: 14,
    fontWeight: '700',
    color: '#007AFF',
    marginTop: 8,
  },
  closeButton: {
    alignSelf: 'flex-end',
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  closeText: {
    color: '#007AFF',
    fontWeight: '600',
  },
});

export default ScoreBreakdownModal;
