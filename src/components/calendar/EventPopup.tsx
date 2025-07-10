import { X } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { CalendarEvent, eventTypes } from '@/hooks/useCalendarEvents';

interface EventPopupProps {
  event: CalendarEvent;
  onClose: () => void;
  position: { x: number; y: number };
}

export default function EventPopup({ event, onClose, position }: EventPopupProps) {
  const eventStyle = eventTypes[event.type];

  return (
    <div 
      className="fixed z-50 bg-white rounded-lg shadow-xl border border-gray-200 w-80"
      style={{
        top: `${position.y}px`,
        left: `${position.x}px`,
        transform: 'translate(-50%, -100%)',
      }}
    >
      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div>
            <div className="flex items-center">
              <span className="text-xl mr-2">{eventStyle.emoji}</span>
              <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
            </div>
            <span className={cn(
              "text-xs font-medium px-2 py-1 rounded-full",
              eventStyle.color,
              eventStyle.textColor
            )}>
              {eventStyle.label}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-4 w-4 text-gray-500" />
          </button>
        </div>

        <div className="space-y-3">
          <div>
            <p className="text-sm text-gray-600">
              {format(new Date(event.date), 'EEEE d MMMM yyyy', { locale: fr })}
            </p>
            <p className="text-sm font-medium text-gray-900">
              {event.startTime} - {event.endTime}
            </p>
          </div>

          {event.description && (
            <div>
              <p className="text-sm text-gray-600">{event.description}</p>
            </div>
          )}

          {event.moduleId && (
            <div className="pt-2 border-t">
              <p className="text-xs text-gray-500">Module du programme mental</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}