import { format, addDays, isSameDay, parseISO, isAfter, isBefore } from 'date-fns';

export const formatDate = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, 'MMMM d, yyyy');
};

export const formatTime = (time: string): string => {
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minutes} ${ampm}`;
};

export const generateTimeSlots = (
  startTime: string = '09:00',
  endTime: string = '17:00',
  interval: number = 30
): string[] => {
  const slots: string[] = [];
  const [startHour, startMin] = startTime.split(':').map(Number);
  const [endHour, endMin] = endTime.split(':').map(Number);
  
  let currentHour = startHour;
  let currentMin = startMin;
  
  while (currentHour < endHour || (currentHour === endHour && currentMin < endMin)) {
    const timeString = `${currentHour.toString().padStart(2, '0')}:${currentMin.toString().padStart(2, '0')}`;
    slots.push(timeString);
    
    currentMin += interval;
    if (currentMin >= 60) {
      currentHour += Math.floor(currentMin / 60);
      currentMin = currentMin % 60;
    }
  }
  
  return slots;
};

export const getNextWeekDays = (excludeWeekends: boolean = true): Date[] => {
  const days: Date[] = [];
  const today = new Date();
  
  for (let i = 1; i <= 14; i++) {
    const date = addDays(today, i);
    if (!excludeWeekends || (date.getDay() !== 0 && date.getDay() !== 6)) {
      days.push(date);
    }
  }
  
  return days;
};