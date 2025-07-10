import { useState } from 'react';

export interface CalendarEvent {
  id: string;
  title: string;
  type: 'training' | 'competition' | 'webinar' | 'coaching' | 'exercise' | 'module' | 'other';
  date: Date;
  startTime: string;
  endTime: string;
  description?: string;
  athleteId?: string;
  moduleId?: string;
  phaseId?: string;
}

export const eventTypes = {
  training: { label: 'Entraînement', color: 'bg-blue-50', borderColor: 'border-blue-500', textColor: 'text-blue-700', emoji: '🏋️' },
  competition: { label: 'Compétition', color: 'bg-red-50', borderColor: 'border-red-500', textColor: 'text-red-700', emoji: '🏆' },
  webinar: { label: 'Webinaire', color: 'bg-green-50', borderColor: 'border-green-500', textColor: 'text-green-700', emoji: '💻' },
  coaching: { label: 'Coaching', color: 'bg-purple-50', borderColor: 'border-purple-500', textColor: 'text-purple-700', emoji: '🎯' },
  exercise: { label: 'Exercice Mental', color: 'bg-indigo-50', borderColor: 'border-indigo-500', textColor: 'text-indigo-700', emoji: '🧠' },
  module: { label: 'Module Programme', color: 'bg-amber-50', borderColor: 'border-amber-500', textColor: 'text-amber-700', emoji: '📚' },
  other: { label: 'Autre', color: 'bg-gray-50', borderColor: 'border-gray-500', textColor: 'text-gray-700', emoji: '📝' },
};

const today = new Date();

const initialEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'Séance de préparation mentale',
    type: 'coaching',
    date: today,
    startTime: '09:00',
    endTime: '11:00',
    athleteId: '1'
  },
  {
    id: '2',
    title: 'Compétition régionale',
    type: 'competition',
    date: today,
    startTime: '13:00',
    endTime: '15:00',
    athleteId: '1'
  },
  {
    id: '3',
    title: 'Entraînement technique',
    type: 'training',
    date: today,
    startTime: '15:30',
    endTime: '17:30',
    athleteId: '1'
  }
];

export function useCalendarEvents() {
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);

  const addEvent = (eventData: Omit<CalendarEvent, 'id'>) => {
    const date = eventData.date instanceof Date ? eventData.date : new Date(eventData.date);
    
    const newEvent: CalendarEvent = {
      ...eventData,
      id: Date.now().toString(),
      date,
    };

    setEvents(prevEvents => [...prevEvents, newEvent]);
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getFullYear() === date.getFullYear() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getDate() === date.getDate()
      );
    });
  };

  const getEventsForWeek = (startDate: Date) => {
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 7);

    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate >= startDate && eventDate < endDate;
    });
  };

  const getEventsForMonth = (date: Date) => {
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getFullYear() === date.getFullYear() &&
        eventDate.getMonth() === date.getMonth()
      );
    });
  };

  return {
    events,
    addEvent,
    getEventsForDate,
    getEventsForWeek,
    getEventsForMonth,
  };
}