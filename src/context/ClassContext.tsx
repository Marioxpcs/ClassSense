import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Course } from '../types/DomainTypes';

interface ClassContextType {
  classes: Course[];
  addClass: (classData: Course) => void;
  updateClass: (id: string, classData: Partial<Course>) => void;
  deleteClass: (id: string) => void;
  getClassById: (id: string) => Course | undefined;
}

const ClassContext = createContext<ClassContextType | undefined>(undefined);

export const useClasses = () => {
  const context = useContext(ClassContext);
  if (!context) {
    throw new Error('useClasses must be used within a ClassProvider');
  }
  return context;
};

interface ClassProviderProps {
  children: ReactNode;
}

export const ClassProvider: React.FC<ClassProviderProps> = ({ children }) => {
  const [classes, setClasses] = useState<Course[]>([]);

  const addClass = (classData: Course) => {
    setClasses((prev) => [...prev, classData]);
  };

  const updateClass = (id: string, classData: Partial<Course>) => {
    setClasses((prev) =>
      prev.map((cls) => (cls.id === id ? { ...cls, ...classData } : cls))
    );
  };

  const deleteClass = (id: string) => {
    setClasses((prev) => prev.filter((cls) => cls.id !== id));
  };

  const getClassById = (id: string): Course | undefined => {
    return classes.find((cls) => cls.id === id);
  };

  const value: ClassContextType = {
    classes,
    addClass,
    updateClass,
    deleteClass,
    getClassById,
  };

  return <ClassContext.Provider value={value}>{children}</ClassContext.Provider>;
};

export default ClassContext;
