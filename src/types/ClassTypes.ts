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
  color?: string;
  semester?: string;
  year?: number;
}

export interface ClassSchedule {
  id: string;
  classId: string;
  dayOfWeek: DayOfWeek;
  startTime: string;
  endTime: string;
  room?: string;
  building?: string;
}

export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

export interface Instructor {
  id: string;
  name: string;
  email?: string;
  officeHours?: string;
  officeLocation?: string;
}

export interface ClassStatistics {
  classId: string;
  attendanceRate: number;
  currentGrade: number;
  missedClasses: number;
  upcomingEvaluations: number;
  lastUpdated: Date;
}

export interface Semester {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  year: number;
}
