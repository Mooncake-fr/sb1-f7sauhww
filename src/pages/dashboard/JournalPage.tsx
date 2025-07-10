import { useState } from 'react';
import { Save, Sun, Battery, Moon, Target } from 'lucide-react';
import Button from '@/components/ui/Button';
import { useDailyMetrics } from '@/hooks/useDailyMetrics';
import { cn } from '@/lib/utils';

interface JournalEntry {
  date: Date;
  personalNotes: string;
  dailyGoal: string;
}

const moodOptions = [
  { value: 1, emoji: '😢', label: 'Très bas', color: 'text-red-500' },
  { value: 2, emoji: '😕', label: 'Bas', color: 'text-orange-500' },
  { value: 3, emoji: '😐', label: 'Neutre', color: 'text-yellow-500' },
  { value: 4, emoji: '😊', label: 'Bon', color: 'text-green-500' },
  { value: 5, emoji: '🤩', label: 'Top', color: 'text-blue-500' },
];

const energyOptions = [
  { value: 1, emoji: '🔋', label: 'Bas', color: 'text-red-500' },
  { value: 2, emoji: '⚡', label: 'Moyen', color: 'text-orange-500' },
  { value: 3, emoji: '💪', label: 'OK', color: 'text-yellow-500' },
  { value: 4, emoji: '✨', label: 'Bien', color: 'text-green-500' },
  { value: 5, emoji: '⭐', label: 'Top', color: 'text-blue-500' },
];

const sleepOptions = [
  { value: 1, emoji: '😴', label: 'Mauvais', color: 'text-red-500' },
  { value: 2, emoji: '😴', label: 'Moyen', color: 'text-orange-500' },
  { value: 3, emoji: '😴', label: 'OK', color: 'text-yellow-500' },
  { value: 4, emoji: '😴', label: 'Bien', color: 'text-green-500' },
  { value: 5, emoji: '💤', label: 'Top', color: 'text-blue-500' },
];

export default function JournalPage() {
  const { metrics } = useDailyMetrics();
  const [entry, setEntry] = useState<JournalEntry>({
    date: new Date(),
    personalNotes: '',
    dailyGoal: ''
  });

  const handleSave = () => {
    console.log('Saving entry:', entry);
  };

  const getMetricDisplay = (type: 'mood' | 'energy' | 'sleep') => {
    const value = metrics[type];
    if (!value) return null;

    const options = {
      mood: moodOptions,
      energy: energyOptions,
      sleep: sleepOptions
    }[type];

    const option = options.find(opt => opt.value === value);
    if (!option) return null;

    return {
      emoji: option.emoji,
      label: option.label,
      color: option.color
    };
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Journal</h2>
          <p className="mt-1 text-sm text-gray-500">
            Notez vos réflexions et suivez votre progression
          </p>
        </div>
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Sauvegarder
        </Button>
      </div>

      {/* Métriques du jour */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500">Humeur</h3>
            <Sun className="h-5 w-5 text-gray-400" />
          </div>
          {getMetricDisplay('mood') ? (
            <div className="text-center">
              <span className="text-4xl block mb-2">{getMetricDisplay('mood')?.emoji}</span>
              <span className={cn("text-sm font-medium", getMetricDisplay('mood')?.color)}>
                {getMetricDisplay('mood')?.label}
              </span>
            </div>
          ) : (
            <p className="text-center text-gray-500 text-sm">Non renseigné</p>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500">Énergie</h3>
            <Battery className="h-5 w-5 text-gray-400" />
          </div>
          {getMetricDisplay('energy') ? (
            <div className="text-center">
              <span className="text-4xl block mb-2">{getMetricDisplay('energy')?.emoji}</span>
              <span className={cn("text-sm font-medium", getMetricDisplay('energy')?.color)}>
                {getMetricDisplay('energy')?.label}
              </span>
            </div>
          ) : (
            <p className="text-center text-gray-500 text-sm">Non renseigné</p>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500">Sommeil</h3>
            <Moon className="h-5 w-5 text-gray-400" />
          </div>
          {getMetricDisplay('sleep') ? (
            <div className="text-center">
              <span className="text-4xl block mb-2">{getMetricDisplay('sleep')?.emoji}</span>
              <span className={cn("text-sm font-medium", getMetricDisplay('sleep')?.color)}>
                {getMetricDisplay('sleep')?.label}
              </span>
            </div>
          ) : (
            <p className="text-center text-gray-500 text-sm">Non renseigné</p>
          )}
        </div>
      </div>

      {/* Objectif du jour */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Objectif du jour</h3>
          <Target className="h-5 w-5 text-gray-400" />
        </div>
        <textarea
          className="w-full p-4 border rounded-lg resize-none focus:ring-2 focus:ring-blue-500 h-24"
          placeholder="Définissez votre objectif principal pour aujourd'hui..."
          value={entry.dailyGoal}
          onChange={(e) => setEntry({ ...entry, dailyGoal: e.target.value })}
        />
      </div>

      {/* Notes personnelles */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Notes personnelles</h3>
        <textarea
          className="w-full h-64 p-4 border rounded-lg resize-none focus:ring-2 focus:ring-blue-500"
          placeholder="Écrivez vos pensées, réflexions et ressentis..."
          value={entry.personalNotes}
          onChange={(e) => setEntry({ ...entry, personalNotes: e.target.value })}
        />
      </div>
    </div>
  );
}