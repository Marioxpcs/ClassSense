import {
  AttendanceRecord,
  ClassSession,
  Course,
  Evaluation,
} from '../types/DomainTypes';

const today = new Date();
const baseDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

const addDays = (date: Date, days: number): Date =>
  new Date(date.getTime() + days * 24 * 60 * 60 * 1000);

export const courses: Course[] = [
  {
    id: 'course-1',
    name: 'Software Engineering Fundamentals',
    code: 'SE101',
    professor: 'Dr. Riley',
    meetingDays: [1, 3, 5],
    startTime: '9:30 AM',
    endTime: '10:45 AM',
    location: 'Engineering 204',
    baselineDifficulty: 4,
    courseImportanceOverride: 1.1,
    policies: {
      attendanceMandatory: true,
      participationWeight: 10,
      latePenaltyRules: '5% per day',
    },
  },
  {
    id: 'course-2',
    name: 'Calculus II',
    code: 'MATH202',
    professor: 'Prof. Chen',
    meetingDays: [2, 4],
    startTime: '11:00 AM',
    endTime: '12:15 PM',
    location: 'Science 101',
    baselineDifficulty: 3,
    courseImportanceOverride: 1.0,
  },
  {
    id: 'course-3',
    name: 'Intro to Cellular Biology',
    code: 'BIO150',
    professor: 'Dr. Alvarez',
    meetingDays: [1, 4],
    startTime: '2:00 PM',
    endTime: '3:15 PM',
    location: 'Life Sciences 12',
    baselineDifficulty: 2,
    courseImportanceOverride: 0.95,
  },
];

export const sessions: ClassSession[] = [
  {
    id: 'session-1',
    courseId: 'course-1',
    date: baseDate,
    startTime: '9:30 AM',
    endTime: '10:45 AM',
    location: 'Engineering 204',
    topic: {
      topicTitle: 'User Stories + Backlog Grooming',
      topicType: 'NEW',
      estimatedDifficulty: 4,
      tags: ['midterm review'],
    },
  },
  {
    id: 'session-2',
    courseId: 'course-2',
    date: baseDate,
    startTime: '11:00 AM',
    endTime: '12:15 PM',
    location: 'Science 101',
    topic: {
      topicTitle: 'Integration Techniques Workshop',
      topicType: 'EXTENSIVE',
      estimatedDifficulty: 3,
      tags: ['assignment walkthrough'],
    },
  },
  {
    id: 'session-3',
    courseId: 'course-3',
    date: baseDate,
    startTime: '2:00 PM',
    endTime: '3:15 PM',
    location: 'Life Sciences 12',
    topic: {
      topicTitle: 'Cell Transport Review',
      topicType: 'CONTINUATION',
      estimatedDifficulty: 2,
    },
  },
  {
    id: 'session-4',
    courseId: 'course-1',
    date: addDays(baseDate, 2),
    startTime: '9:30 AM',
    endTime: '10:45 AM',
    location: 'Engineering 204',
    topic: {
      topicTitle: 'Agile Estimation',
      topicType: 'LIGHT',
      estimatedDifficulty: 3,
    },
  },
  {
    id: 'session-5',
    courseId: 'course-2',
    date: addDays(baseDate, 1),
    startTime: '11:00 AM',
    endTime: '12:15 PM',
    location: 'Science 101',
    topic: {
      topicTitle: 'Series Applications',
      topicType: 'NEW',
      estimatedDifficulty: 4,
    },
  },
];

export const evaluations: Evaluation[] = [
  {
    id: 'eval-1',
    courseId: 'course-1',
    title: 'Midterm Exam',
    type: 'midterm',
    weightPercent: 25,
    dueDate: addDays(baseDate, 5),
    status: 'pending',
  },
  {
    id: 'eval-2',
    courseId: 'course-1',
    title: 'Sprint Plan Write-up',
    type: 'assignment',
    weightPercent: 10,
    dueDate: addDays(baseDate, 2),
    status: 'pending',
  },
  {
    id: 'eval-3',
    courseId: 'course-2',
    title: 'Problem Set 4',
    type: 'assignment',
    weightPercent: 15,
    dueDate: addDays(baseDate, 3),
    status: 'pending',
  },
  {
    id: 'eval-4',
    courseId: 'course-3',
    title: 'Lab Report 2',
    type: 'lab',
    weightPercent: 20,
    dueDate: addDays(baseDate, 7),
    status: 'pending',
  },
  {
    id: 'eval-5',
    courseId: 'course-2',
    title: 'Quiz 2',
    type: 'quiz',
    weightPercent: 5,
    dueDate: addDays(baseDate, -2),
    status: 'completed',
    gradeReceived: 92,
  },
];

export const attendanceRecords: AttendanceRecord[] = [
  {
    id: 'att-1',
    courseId: 'course-1',
    sessionId: 'session-1',
    date: addDays(baseDate, -2),
    status: 'attended',
  },
  {
    id: 'att-2',
    courseId: 'course-1',
    sessionId: 'session-1',
    date: addDays(baseDate, -4),
    status: 'missed',
    reason: 'Sick',
  },
  {
    id: 'att-3',
    courseId: 'course-2',
    sessionId: 'session-2',
    date: addDays(baseDate, -1),
    status: 'late',
  },
  {
    id: 'att-4',
    courseId: 'course-2',
    sessionId: 'session-2',
    date: addDays(baseDate, -3),
    status: 'missed',
    reason: 'Conflict',
  },
  {
    id: 'att-5',
    courseId: 'course-3',
    sessionId: 'session-3',
    date: addDays(baseDate, -2),
    status: 'recording',
  },
];
