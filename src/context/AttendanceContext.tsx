import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface AttendanceRecord {
  id: string;
  classId: string;
  date: Date;
  status: 'present' | 'absent' | 'excused';
  notes?: string;
}

interface AttendanceContextType {
  records: AttendanceRecord[];
  addRecord: (record: AttendanceRecord) => void;
  updateRecord: (id: string, record: Partial<AttendanceRecord>) => void;
  deleteRecord: (id: string) => void;
  getRecordsByClass: (classId: string) => AttendanceRecord[];
  getAttendanceRate: (classId: string) => number;
}

const AttendanceContext = createContext<AttendanceContextType | undefined>(undefined);

export const useAttendance = () => {
  const context = useContext(AttendanceContext);
  if (!context) {
    throw new Error('useAttendance must be used within an AttendanceProvider');
  }
  return context;
};

interface AttendanceProviderProps {
  children: ReactNode;
}

export const AttendanceProvider: React.FC<AttendanceProviderProps> = ({ children }) => {
  const [records, setRecords] = useState<AttendanceRecord[]>([]);

  const addRecord = (record: AttendanceRecord) => {
    setRecords((prev) => [...prev, record]);
  };

  const updateRecord = (id: string, record: Partial<AttendanceRecord>) => {
    setRecords((prev) =>
      prev.map((rec) => (rec.id === id ? { ...rec, ...record } : rec))
    );
  };

  const deleteRecord = (id: string) => {
    setRecords((prev) => prev.filter((rec) => rec.id !== id));
  };

  const getRecordsByClass = (classId: string): AttendanceRecord[] => {
    return records.filter((rec) => rec.classId === classId);
  };

  const getAttendanceRate = (classId: string): number => {
    const classRecords = getRecordsByClass(classId);
    if (classRecords.length === 0) return 100;

    const presentCount = classRecords.filter(
      (rec) => rec.status === 'present' || rec.status === 'excused'
    ).length;

    return Math.round((presentCount / classRecords.length) * 100);
  };

  const value: AttendanceContextType = {
    records,
    addRecord,
    updateRecord,
    deleteRecord,
    getRecordsByClass,
    getAttendanceRate,
  };

  return (
    <AttendanceContext.Provider value={value}>
      {children}
    </AttendanceContext.Provider>
  );
};

export default AttendanceContext;
