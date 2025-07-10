import { useState } from 'react';
import { Plus } from 'lucide-react';
import Button from '@/components/ui/Button';
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

interface SelectedAthlete {
  id: string;
  name: string;
}

export default function CoachPlanning() {
  const [currentView, setCurrentView] = useState('weekly');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedAthlete, setSelectedAthlete] = useState<SelectedAthlete>({
    id: '1',
    name: 'Sophie Martin'
  });
  const { events, addEvent } = useCalendarEvents();

  // Filtrer les événements pour n'afficher que les séances de coaching avec l'athlète sélectionné
  const filteredEvents = events.filter(event => 
    event.type === 'coaching' && 
    event.athleteId === selectedAthlete.id
  );

  const handleAddEvent = (eventData: any) => {
    addEvent({
      ...eventData,
      type: 'coaching', // Forcer le type à 'coaching'
      athleteId: selectedAthlete.id
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Planning</h2>
          <p className="mt-1 text-sm text-gray-500">
            Séances de coaching avec {selectedAthlete.name}
          </p>
        </div>
        <Button onClick={() => setShowEventModal(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nouvelle séance
        </Button>
      </div>

      <div className="flex justify-center space-x-4 bg-white p-4 rounded-lg shadow">
        {viewOptions.map((option) => (
          <button
            key={option.id}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              currentView === option.id
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:text-gray-900'
            }`}
            onClick={() => setCurrentView(option.id)}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {currentView === 'daily' && (
          <DayView
            currentDate={currentDate}
            onDateChange={setCurrentDate}
            events={filteredEvents} // Passer les événements filtrés
          />
        )}
        {currentView === 'weekly' && (
          <WeekView
            currentDate={currentDate}
            onDateChange={setCurrentDate}
            events={filteredEvents} // Passer les événements filtrés
          />
        )}
        {currentView === 'monthly' && (
          <MonthView
            currentDate={currentDate}
            onDateChange={setCurrentDate}
            events={filteredEvents} // Passer les événements filtrés
          />
        )}
      </div>

      <EventModal
        isOpen={showEventModal}
        onClose={() => setShowEventModal(false)}
        onSave={handleAddEvent}
        selectedAthlete={selectedAthlete}
        isCoach={true}
        defaultEventType="coaching" // Forcer le type à 'coaching'
      />
    </div>
  );
}