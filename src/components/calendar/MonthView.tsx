import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, subMonths, addMonths, startOfWeek, endOfWeek } from 'date-fns';
import { fr } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CalendarEvent, eventTypes } from '@/hooks/useCalendarEvents';
import { useState } from 'react';
import EventPopup from './EventPopup';

interface MonthViewProps {
  currentDate: Date;
  onDateChange: (date: Date) => void;
  events: CalendarEvent[];
}

export default function MonthView({ currentDate, onDateChange, events }: MonthViewProps) {
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarStart = startOfWeek(monthStart, { locale: fr });
  const calendarEnd = endOfWeek(monthEnd, { locale: fr });
  
  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const handlePreviousMonth = () => onDateChange(subMonths(currentDate, 1));
  const handleNextMonth = () => onDateChange(addMonths(currentDate, 1));

  const handleEventClick = (event: CalendarEvent, e: React.MouseEvent) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    setPopupPosition({
      x: rect.left + rect.width / 2,
      y: rect.top,
    });
    setSelectedEvent(event);
  };

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setSelectedEvent(null);
    }
  };

  // Créer une grille de semaines
  const weeks: Date[][] = [];
  let currentWeek: Date[] = [];

  days.forEach(day => {
    if (currentWeek.length === 0 || currentWeek.length < 7) {
      currentWeek.push(day);
    }
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-sm overflow-hidden">
      {/* En-tête du mois */}
      <div className="p-4 border-b flex items-center justify-between bg-white sticky top-0 z-10">
        <button
          onClick={handlePreviousMonth}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ChevronLeft className="h-5 w-5 text-gray-600" />
        </button>
        
        <div className="text-center">
          <h3 className="text-lg font-medium capitalize">
            {format(currentDate, 'MMMM yyyy', { locale: fr })}
          </h3>
        </div>

        <button
          onClick={handleNextMonth}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ChevronRight className="h-5 w-5 text-gray-600" />
        </button>
      </div>

      <div className="flex-1 grid grid-cols-7 grid-rows-[auto_1fr] h-full" onClick={handleBackgroundClick}>
        {/* Jours de la semaine */}
        {['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'].map((day) => (
          <div key={day} className="p-2 text-center border-b bg-gray-50">
            <span className="text-sm font-medium text-gray-500">{day}</span>
          </div>
        ))}

        {/* Jours du mois */}
        {weeks.map((week, weekIndex) => (
          week.map((day, dayIndex) => {
            const dayEvents = events.filter(event => 
              isSameDay(new Date(event.date), day)
            ).slice(0, 3);

            const hasMoreEvents = events.filter(event => 
              isSameDay(new Date(event.date), day)
            ).length > 3;

            return (
              <div
                key={day.toString()}
                className={cn(
                  'border-b border-r p-1 min-h-[100px] relative group',
                  !isSameMonth(day, currentDate) && 'bg-gray-50',
                  'hover:bg-gray-50/50 transition-colors'
                )}
              >
                <div className={cn(
                  'font-medium text-sm mb-1 p-1',
                  !isSameMonth(day, currentDate) && 'text-gray-400',
                  isSameDay(day, new Date()) && 'bg-blue-100 text-blue-700 rounded-full w-7 h-7 flex items-center justify-center'
                )}>
                  {format(day, 'd')}
                </div>
                <div className="space-y-1">
                  {dayEvents.map((event) => {
                    const eventStyle = eventTypes[event.type];
                    return (
                      <div
                        key={event.id}
                        className={cn(
                          "text-xs px-2 py-1 rounded-sm truncate cursor-pointer hover:opacity-75 transition-opacity",
                          eventStyle.color,
                          eventStyle.textColor,
                          `border-l-2 ${eventStyle.borderColor}`
                        )}
                        onClick={(e) => handleEventClick(event, e)}
                      >
                        <div className="flex items-center space-x-1">
                          <span className="font-medium truncate flex-1">
                            {eventStyle.emoji} {event.title}
                          </span>
                          <span className="flex-shrink-0">{event.startTime}</span>
                        </div>
                      </div>
                    );
                  })}
                  {hasMoreEvents && (
                    <div className="text-xs text-gray-500 px-2">
                      + autres événements
                    </div>
                  )}
                </div>
              </div>
            );
          })
        ))}
      </div>

      {/* Popup de détails */}
      {selectedEvent && (
        <EventPopup
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          position={popupPosition}
        />
      )}
    </div>
  );
}