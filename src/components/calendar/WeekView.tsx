import { format, addDays, startOfWeek } from 'date-fns';
import { fr } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { CalendarEvent, eventTypes } from '@/hooks/useCalendarEvents';
import { useState } from 'react';
import EventPopup from './EventPopup';

interface WeekViewProps {
  currentDate: Date;
  onDateChange: (date: Date) => void;
  events: CalendarEvent[];
}

export default function WeekView({ currentDate, onDateChange, events }: WeekViewProps) {
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });

  const weekStart = startOfWeek(currentDate, { locale: fr });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  
  const timeSlots = Array.from({ length: 12 }, (_, i) => {
    const hour = i + 9;
    return `${hour.toString().padStart(2, '0')}:00`;
  });

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

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-sm overflow-hidden">
      {/* En-tête avec les jours */}
      <div className="grid grid-cols-[6rem_repeat(7,1fr)] border-b">
        <div className="border-r bg-gray-50" />
        
        {weekDays.map((day, index) => (
          <div 
            key={day.toString()} 
            className={cn(
              "p-4 text-center border-r last:border-r-0",
              format(day, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd') && "bg-blue-50"
            )}
          >
            <div className="text-sm font-medium capitalize">
              {format(day, 'EEEE', { locale: fr })}
            </div>
            <div className="text-sm text-gray-500">
              {format(day, 'd MMM', { locale: fr })}
            </div>
          </div>
        ))}
      </div>

      {/* Conteneur de la grille avec défilement */}
      <div className="flex-1 overflow-y-auto" onClick={handleBackgroundClick}>
        {timeSlots.map((time) => (
          <div key={time} className="grid grid-cols-[6rem_repeat(7,1fr)]">
            <div className="border-r bg-gray-50 p-2 flex items-center justify-center">
              <span className="text-sm font-medium text-gray-500">{time}</span>
            </div>

            {weekDays.map((day, dayIndex) => {
              const [hour] = time.split(':').map(Number);
              const slotEvents = events.filter(event => {
                const eventDate = new Date(event.date);
                const [eventHour] = event.startTime.split(':').map(Number);
                return format(eventDate, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd') && 
                       eventHour === hour;
              });

              return (
                <div 
                  key={`${day}-${time}`} 
                  className={cn(
                    "h-20 border-b border-r relative group",
                    dayIndex === 6 && "border-r-0",
                    format(day, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd') && "bg-blue-50/30"
                  )}
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gray-50/50 transition-opacity" />

                  {slotEvents.map((event, index) => {
                    const [startHour, startMinute] = event.startTime.split(':').map(Number);
                    const [endHour, endMinute] = event.endTime.split(':').map(Number);
                    const duration = (endHour - startHour) * 60 + (endMinute - startMinute);
                    const height = Math.min((duration / 60) * 5, 4.5);
                    const width = `${Math.min(95 / Math.max(slotEvents.length, 1), 90)}%`;
                    const left = `${2.5 + (index * 95) / Math.max(slotEvents.length, 1)}%`;

                    const eventStyle = eventTypes[event.type];

                    return (
                      <div
                        key={event.id}
                        className={cn(
                          'absolute rounded-md p-2 cursor-pointer transition-all hover:shadow-md hover:z-10',
                          'border-l-4',
                          eventStyle.borderColor,
                          eventStyle.color,
                          eventStyle.textColor
                        )}
                        style={{
                          height: `${height}rem`,
                          width,
                          left,
                          top: '0.25rem'
                        }}
                        onClick={(e) => handleEventClick(event, e)}
                      >
                        <div className="font-medium text-xs truncate">
                          {eventStyle.emoji} {event.title}
                        </div>
                        <div className="text-xs opacity-75 truncate">
                          {event.startTime} - {event.endTime}
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
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