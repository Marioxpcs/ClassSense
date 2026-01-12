import React, { createContext, useContext, useState, ReactNode } from 'react';
import { EvaluationStatus, EvaluationType } from '../types/DomainTypes';

export interface Evaluation {
  id: string;
  classId: string;
  title: string;
  type: EvaluationType;
  dueDate: Date;
  weightPercent: number;
  status: EvaluationStatus;
  gradeReceived?: number;
  notes?: string;
}

interface EvaluationContextType {
  evaluations: Evaluation[];
  addEvaluation: (evaluation: Evaluation) => void;
  updateEvaluation: (id: string, evaluation: Partial<Evaluation>) => void;
  deleteEvaluation: (id: string) => void;
  getEvaluationsByClass: (classId: string) => Evaluation[];
  calculateClassGrade: (classId: string) => number | null;
}

const EvaluationContext = createContext<EvaluationContextType | undefined>(undefined);

export const useEvaluations = () => {
  const context = useContext(EvaluationContext);
  if (!context) {
    throw new Error('useEvaluations must be used within an EvaluationProvider');
  }
  return context;
};

interface EvaluationProviderProps {
  children: ReactNode;
}

export const EvaluationProvider: React.FC<EvaluationProviderProps> = ({ children }) => {
  const [evaluations, setEvaluations] = useState<Evaluation[]>([]);

  const addEvaluation = (evaluation: Evaluation) => {
    setEvaluations((prev) => [...prev, evaluation]);
  };

  const updateEvaluation = (id: string, evaluation: Partial<Evaluation>) => {
    setEvaluations((prev) =>
      prev.map((eval) => (eval.id === id ? { ...eval, ...evaluation } : eval))
    );
  };

  const deleteEvaluation = (id: string) => {
    setEvaluations((prev) => prev.filter((eval) => eval.id !== id));
  };

  const getEvaluationsByClass = (classId: string): Evaluation[] => {
    return evaluations.filter((eval) => eval.classId === classId);
  };

  const calculateClassGrade = (classId: string): number | null => {
    const classEvals = getEvaluationsByClass(classId);
    const gradedEvals = classEvals.filter(
      (eval) => eval.gradeReceived !== undefined
    );

    if (gradedEvals.length === 0) return null;

    let totalWeightedScore = 0;
    let totalWeight = 0;

    gradedEvals.forEach((eval) => {
      const percentage = eval.gradeReceived ?? 0;
      totalWeightedScore += percentage * eval.weightPercent;
      totalWeight += eval.weightPercent;
    });

    if (totalWeight === 0) return null;

    return Math.round((totalWeightedScore / totalWeight) * 100) / 100;
  };

  const value: EvaluationContextType = {
    evaluations,
    addEvaluation,
    updateEvaluation,
    deleteEvaluation,
    getEvaluationsByClass,
    calculateClassGrade,
  };

  return (
    <EvaluationContext.Provider value={value}>
      {children}
    </EvaluationContext.Provider>
  );
};

export default EvaluationContext;
