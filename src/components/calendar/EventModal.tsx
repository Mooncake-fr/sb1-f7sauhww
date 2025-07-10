import { useState } from 'react';
import { X } from 'lucide-react';
import Button from '@/components/ui/Button';
import { eventTypes } from '@/hooks/useCalendarEvents';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: {
    title: string;
    type: string;
    date: Date;
    startTime: string;
    endTime: string;
    description?: string;
    athleteId?: string;
  }) => void;
  selectedAthlete?: { id: string; name: string } | null;
  isCoach?: boolean;
}

export default function EventModal({ isOpen, onClose, onSave, selectedAthlete, isCoach = false }: EventModalProps) {
  const [eventData, setEventData] = useState({
    title: '',
    type: 'training',
    date: new Date(),
    startTime: '09:00',
    endTime: '10:00',
    description: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventData.title || !eventData.date || !eventData.startTime || !eventData.type) return;

    // Créer une copie de la date pour éviter les problèmes de référence
    const eventDate = new Date(eventData.date);
    
    onSave({
      ...eventData,
      date: eventDate,
      athleteId: selectedAthlete?.id,
    });

    // Réinitialiser le formulaire
    setEventData({
      title: '',
      type: 'training',
      date: new Date(),
      startTime: '09:00',
      endTime: '10:00',
      description: '',
    });
    
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {isCoach && selectedAthlete 
              ? `Nouvel événement pour ${selectedAthlete.name}`
              : 'Nouvel événement'
            }
          </h2>
          <Button variant="outline" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Titre
            </label>
            <input
              type="text"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={eventData.title}
              onChange={(e) => setEventData({ ...eventData, title: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type
            </label>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(eventTypes).map(([type, { label, color }]) => (
                <button
                  key={type}
                  type="button"
                  className={`p-2 rounded-md text-sm font-medium ${
                    eventData.type === type
                      ? 'ring-2 ring-blue-500'
                      : ''
                  } ${color}`}
                  onClick={() => setEventData({ ...eventData, type })}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                type="date"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={eventData.date instanceof Date ? eventData.date.toISOString().split('T')[0] : ''}
                onChange={(e) => setEventData({ ...eventData, date: new Date(e.target.value) })}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Heure de début
              </label>
              <input
                type="time"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={eventData.startTime}
                onChange={(e) => setEventData({ ...eventData, startTime: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Heure de fin
              </label>
              <input
                type="time"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={eventData.endTime}
                onChange={(e) => setEventData({ ...eventData, endTime: e.target.value })}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description (optionnel)
            </label>
            <textarea
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              rows={3}
              value={eventData.description}
              onChange={(e) => setEventData({ ...eventData, description: e.target.value })}
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit">
              Ajouter l'événement
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}