import { format, addDays, subDays } from 'date-fns';
import { fr } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CalendarEvent, eventTypes } from '@/hooks/useCalendarEvents';
import { useState } from 'react';
import EventPopup from './EventPopup';

interface DayViewProps {
  currentDate: Date;
  onDateChange: (date: Date) => void;
  events: CalendarEvent[];
}

export default function DayView({ currentDate, onDateChange, events }: DayViewProps) {
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });

  const timeSlots = Array.from({ length: 12 }, (_, i) => {
    const hour = i + 9; // 9h à 20h
    return `${hour.toString().padStart(2, '0')}:00`;
  });

  const handlePreviousDay = () => onDateChange(subDays(currentDate, 1));
  const handleNextDay = () => onDateChange(addDays(currentDate, 1));

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
    <div className="flex flex-col h-full bg-white rounded-xl shadow-sm">
      {/* En-tête du jour */}
      <div className="p-4 border-b flex items-center justify-between">
        <button
          onClick={handlePreviousDay}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <ChevronLeft className="h-5 w-5 text-gray-600" />
        </button>
        
        <div className="text-center">
          <h3 className="text-lg font-medium capitalize">
            {format(currentDate, 'EEEE d MMMM yyyy', { locale: fr })}
          </h3>
        </div>

        <button
          onClick={handleNextDay}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <ChevronRight className="h-5 w-5 text-gray-600" />
        </button>
      </div>

      {/* Grille horaire */}
      <div className="flex-1 overflow-y-auto" onClick={handleBackgroundClick}>
        {timeSlots.map((time) => {
          const [hour] = time.split(':').map(Number);
          const slotEvents = events.filter(event => {
            const eventDate = new Date(event.date);
            const [eventHour] = event.startTime.split(':').map(Number);
            return format(eventDate, 'yyyy-MM-dd') === format(currentDate, 'yyyy-MM-dd') && 
                   eventHour === hour;
          });

          return (
            <div key={time} className="flex border-b min-h-[6rem]">
              <div className="w-20 p-2 border-r bg-gray-50">
                <span className="text-sm font-medium text-gray-500">{time}</span>
              </div>
              <div className="flex-1 p-2 relative">
                {slotEvents.map((event, index) => {
                  const [startHour, startMinute] = event.startTime.split(':').map(Number);
                  const [endHour, endMinute] = event.endTime.split(':').map(Number);
                  const duration = (endHour - startHour) * 60 + (endMinute - startMinute);
                  const height = Math.min((duration / 60) * 6, 5);
                  const width = `${Math.min(95 / Math.max(slotEvents.length, 1), 90)}%`;
                  const left = `${(index * 95) / Math.max(slotEvents.length, 1)}%`;

                  const eventStyle = eventTypes[event.type];

                  return (
                    <div
                      key={event.id}
                      className={cn(
                        'absolute rounded-lg p-2 cursor-pointer transition-all hover:shadow-md hover:z-10',
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
                      <div className="font-medium text-sm truncate">
                        {eventStyle.emoji} {event.title}
                      </div>
                      <div className="text-xs mt-0.5 truncate">
                        {event.startTime} - {event.endTime}
                      </div>
                      {event.description && height > 3 && (
                        <div className="text-xs mt-0.5 truncate opacity-75">
                          {event.description}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
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