import { addWeeks, subWeeks, addMonths, subMonths } from 'date-fns';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import Button from '@/components/ui/Button';

interface CalendarHeaderProps {
  currentDate: Date;
  view: 'today' | 'week' | 'month';
  onViewChange: (view: 'today' | 'week' | 'month') => void;
  onDateChange: (date: Date) => void;
  onCreateEvent?: () => void;
}

const viewLabels = {
  today: 'Aujourd\'hui',
  week: 'Semaine',
  month: 'Mois'
};

export default function CalendarHeader({ 
  currentDate, 
  view, 
  onViewChange, 
  onDateChange,
  onCreateEvent
}: CalendarHeaderProps) {
  const handlePrevious = () => {
    if (view === 'week') {
      onDateChange(subWeeks(currentDate, 1));
    } else if (view === 'month') {
      onDateChange(subMonths(currentDate, 1));
    }
  };

  const handleNext = () => {
    if (view === 'week') {
      onDateChange(addWeeks(currentDate, 1));
    } else if (view === 'month') {
      onDateChange(addMonths(currentDate, 1));
    }
  };

  const handleToday = () => {
    onDateChange(new Date());
    onViewChange('today');
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white border-b">
      <div className="flex items-center space-x-4">
        <Button
          variant={view === 'today' ? 'primary' : 'outline'}
          size="sm"
          onClick={handleToday}
        >
          {viewLabels.today}
        </Button>
        <Button
          variant={view === 'week' ? 'primary' : 'outline'}
          size="sm"
          onClick={() => onViewChange('week')}
        >
          {viewLabels.week}
        </Button>
        <Button
          variant={view === 'month' ? 'primary' : 'outline'}
          size="sm"
          onClick={() => onViewChange('month')}
        >
          {viewLabels.month}
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        {view !== 'today' ? (
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrevious}
            >
              <span className="flex items-center">
                <ChevronLeft className="h-4 w-4 mr-1" />
                {view === 'week' ? 'Semaine précédente' : 'Mois précédent'}
              </span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleNext}
            >
              <span className="flex items-center">
                {view === 'week' ? 'Semaine suivante' : 'Mois suivant'}
                <ChevronRight className="h-4 w-4 ml-1" />
              </span>
            </Button>
          </>
        ) : onCreateEvent && (
          <Button
            size="sm"
            onClick={onCreateEvent}
          >
            <Plus className="h-4 w-4 mr-1" />
            Créer un événement
          </Button>
        )}
      </div>
    </div>
  );
}