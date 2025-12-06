import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Class {
  id: string;
  name: string;
  code: string;
  instructor: string;
  credits: number;
  room?: string;
  schedule?: string;
  description?: string;
  priority?: number;
}

interface ClassContextType {
  classes: Class[];
  addClass: (classData: Class) => void;
  updateClass: (id: string, classData: Partial<Class>) => void;
  deleteClass: (id: string) => void;
  getClassById: (id: string) => Class | undefined;
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
  const [classes, setClasses] = useState<Class[]>([]);

  const addClass = (classData: Class) => {
    setClasses((prev) => [...prev, classData]);
  };

  const updateClass = (id: string, classData: Partial<Class>) => {
    setClasses((prev) =>
      prev.map((cls) => (cls.id === id ? { ...cls, ...classData } : cls))
    );
  };

  const deleteClass = (id: string) => {
    setClasses((prev) => prev.filter((cls) => cls.id !== id));
  };

  const getClassById = (id: string): Class | undefined => {
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
