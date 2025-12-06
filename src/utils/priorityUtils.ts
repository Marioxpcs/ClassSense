export const getPriorityColor = (priority: number): string => {
  if (priority >= 80) return '#FF3B30'; // Critical - Red
  if (priority >= 60) return '#FF9500'; // High - Orange
  if (priority >= 40) return '#FFCC00'; // Medium - Yellow
  return '#34C759'; // Low - Green
};

export const getPriorityLabel = (priority: number): string => {
  if (priority >= 80) return 'Critical';
  if (priority >= 60) return 'High';
  if (priority >= 40) return 'Medium';
  return 'Low';
};

export const getPriorityLevel = (priority: number): 1 | 2 | 3 | 4 => {
  if (priority >= 80) return 4; // Critical
  if (priority >= 60) return 3; // High
  if (priority >= 40) return 2; // Medium
  return 1; // Low
};

export const sortByPriority = <T extends { priority?: number }>(
  items: T[],
  descending: boolean = true
): T[] => {
  return [...items].sort((a, b) => {
    const priorityA = a.priority ?? 0;
    const priorityB = b.priority ?? 0;
    return descending ? priorityB - priorityA : priorityA - priorityB;
  });
};

export const filterByPriorityLevel = <T extends { priority?: number }>(
  items: T[],
  minLevel: 1 | 2 | 3 | 4
): T[] => {
  const minPriority = {
    1: 0,
    2: 40,
    3: 60,
    4: 80,
  }[minLevel];

  return items.filter((item) => (item.priority ?? 0) >= minPriority);
};

export const getHighPriorityCount = <T extends { priority?: number }>(
  items: T[]
): number => {
  return items.filter((item) => (item.priority ?? 0) >= 60).length;
};

export const getCriticalPriorityCount = <T extends { priority?: number }>(
  items: T[]
): number => {
  return items.filter((item) => (item.priority ?? 0) >= 80).length;
};

export const calculateAveragePriority = <T extends { priority?: number }>(
  items: T[]
): number => {
  if (items.length === 0) return 0;

  const total = items.reduce((sum, item) => sum + (item.priority ?? 0), 0);
  return Math.round(total / items.length);
};

export const priorityToPercentage = (priority: number): string => {
  return `${Math.min(Math.max(priority, 0), 100)}%`;
};

export const percentageToPriority = (percentage: string): number => {
  const value = parseInt(percentage.replace('%', ''), 10);
  return Math.min(Math.max(value, 0), 100);
};
