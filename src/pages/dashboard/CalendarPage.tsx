import { useState } from 'react';
import { Plus, Search, Settings, Bell } from 'lucide-react';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import DayView from '@/components/calendar/DayView';
import WeekView from '@/components/calendar/WeekView';
import MonthView from '@/components/calendar/MonthView';
import EventModal from '@/components/calendar/EventModal';
import { useCalendarEvents } from '@/hooks/useCalendarEvents';

const viewOptions = [
  { id: 'daily', label: 'Quotidien' },
  { id: 'weekly', label: 'Hebdomadaire' },
  { id: 'monthly', label: 'Mensuel' }
];

export default function CalendarPage() {
  const [currentView, setCurrentView] = useState('weekly');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState('');
  const [showEventModal, setShowEventModal] = useState(false);
  const { events, addEvent } = useCalendarEvents();

  // Filtrer les événements en fonction de la recherche
  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddEvent = (eventData: any) => {
    addEvent(eventData);
    setShowEventModal(false);
  };

  return (
    <div className="h-full bg-[#f5f5f7]">
      {/* Header */}
      <div className="bg-white px-6 py-4 shadow-sm">
        <div className="flex flex-col items-center space-y-4">
          <h2 className="text-2xl font-medium text-gray-900 text-center">Calendrier</h2>
          
          <div className="flex items-center justify-center space-x-6">
            <div className="relative">
              <Search className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Rechercher un événement..."
                className="pl-9 pr-4 py-1.5 bg-gray-100 border-0 rounded-full w-64 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex rounded-lg bg-gray-100 p-0.5">
              {viewOptions.map((option) => (
                <button
                  key={option.id}
                  className={cn(
                    "px-4 py-1.5 rounded-md text-sm font-medium transition-colors",
                    currentView === option.id
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  )}
                  onClick={() => setCurrentView(option.id)}
                >
                  {option.label}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-3">
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Bell className="h-5 w-5 text-gray-600" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Settings className="h-5 w-5 text-gray-600" />
              </button>
              <Button onClick={() => setShowEventModal(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Nouvel événement
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar View */}
      <div className="mx-6 mt-6 h-[calc(100vh-8rem)]">
        {currentView === 'daily' && (
          <DayView
            currentDate={currentDate}
            onDateChange={setCurrentDate}
            events={filteredEvents}
          />
        )}
        {currentView === 'weekly' && (
          <WeekView
            currentDate={currentDate}
            onDateChange={setCurrentDate}
            events={filteredEvents}
          />
        )}
        {currentView === 'monthly' && (
          <MonthView
            currentDate={currentDate}
            onDateChange={setCurrentDate}
            events={filteredEvents}
          />
        )}
      </div>

      <EventModal
        isOpen={showEventModal}
        onClose={() => setShowEventModal(false)}
        onSave={handleAddEvent}
      />
    </div>
  );
}