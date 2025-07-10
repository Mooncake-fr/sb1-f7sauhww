import React, { useState } from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Sun, Battery, Moon, Target, Book, Lock, Play, Calendar, ChevronRight, MessageSquare, Clock } from 'lucide-react';
import Button from '../ui/Button';
import { cn } from '@/lib/utils';
import { useDailyMetrics } from '@/hooks/useDailyMetrics';
import { useAuth } from '@/contexts/AuthContext';
import { useCalendarEvents } from '@/hooks/useCalendarEvents';
import { useChat } from '@/contexts/ChatContext';
import { Link } from 'react-router-dom';
import mockPhases from '@/pages/dashboard/mockPhases';

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

const userProgress = {
  currentPhase: 'phase1',
  currentModule: 'module1',
  completedModules: [],
  progress: 15
};

export default function DashboardHome() {
  const { metrics, loading, saveMetrics } = useDailyMetrics();
  const { currentUser } = useAuth();
  const { events } = useCalendarEvents();
  const { messages } = useChat();
  const [dailyGoal, setDailyGoal] = useState('');
  const [isEditingGoal, setIsEditingGoal] = useState(true);

  const userName = currentUser?.user_metadata?.name || currentUser?.email?.split('@')[0] || '';
  const formattedName = userName.charAt(0).toUpperCase() + userName.slice(1);

  const unreadMessages = messages.filter(msg => 
    msg.receiverId === currentUser?.id && !msg.read
  ).length;

  const today = new Date().toISOString().split('T')[0];
  const todayExercises = events.filter(event => {
    const eventDate = new Date(event.date);
    return format(eventDate, 'yyyy-MM-dd') === today && event.type === 'exercise';
  });

  const handleMetricUpdate = async (type: 'mood' | 'energy' | 'sleep', value: number) => {
    try {
      await saveMetrics({
        ...metrics,
        [type]: value
      });
    } catch (error) {
      console.error('Erreur lors de la mise à jour des métriques:', error);
    }
  };

  const handleSaveGoal = () => {
    if (dailyGoal.trim()) {
      setIsEditingGoal(false);
    }
  };

  const getMetricDisplay = (type: 'mood' | 'energy' | 'sleep', value: number) => {
    const options = {
      mood: moodOptions,
      energy: energyOptions,
      sleep: sleepOptions
    }[type];

    const option = options.find(opt => opt.value === value);
    return option || null;
  };

  const currentPhase = mockPhases[userProgress.currentPhase];
  const currentModule = currentPhase?.modules.find(m => m.id === userProgress.currentModule);
  
  const currentModuleIndex = currentPhase?.modules.findIndex(m => m.id === userProgress.currentModule) ?? -1;
  const nextModule = currentPhase?.modules[currentModuleIndex + 1];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-500">Chargement de vos données...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Bonjour {formattedName} 👋
            </h1>
            <p className="mt-1 text-gray-500">
              {format(new Date(), "EEEE d MMMM yyyy", { locale: fr })}
            </p>
          </div>
          {unreadMessages > 0 && (
            <Link 
              to="/dashboard/messages"
              className="flex items-center px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <MessageSquare className="h-5 w-5 mr-2" />
              <span className="font-medium">{unreadMessages} message{unreadMessages > 1 ? 's' : ''} non lu{unreadMessages > 1 ? 's' : ''}</span>
            </Link>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500">Humeur</h3>
            <Sun className="h-5 w-5 text-gray-400" />
          </div>
          {metrics.mood ? (
            <div className="text-center">
              <span className="text-4xl block mb-2">{getMetricDisplay('mood', metrics.mood)?.emoji}</span>
              <span className={cn("text-sm font-medium", getMetricDisplay('mood', metrics.mood)?.color)}>
                {getMetricDisplay('mood', metrics.mood)?.label}
              </span>
            </div>
          ) : (
            <div className="flex justify-between items-center">
              {moodOptions.map(option => (
                <button
                  key={option.value}
                  onClick={() => handleMetricUpdate('mood', option.value)}
                  className={cn(
                    "flex flex-col items-center p-2 rounded-lg transition-all",
                    metrics.mood === option.value ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                  )}
                >
                  <span className="text-2xl mb-1">{option.emoji}</span>
                  <span className={cn("text-xs font-medium", option.color)}>
                    {option.label}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500">Niveau d'énergie</h3>
            <Battery className="h-5 w-5 text-gray-400" />
          </div>
          {metrics.energy ? (
            <div className="text-center">
              <span className="text-4xl block mb-2">{getMetricDisplay('energy', metrics.energy)?.emoji}</span>
              <span className={cn("text-sm font-medium", getMetricDisplay('energy', metrics.energy)?.color)}>
                {getMetricDisplay('energy', metrics.energy)?.label}
              </span>
            </div>
          ) : (
            <div className="flex justify-between items-center">
              {energyOptions.map(option => (
                <button
                  key={option.value}
                  onClick={() => handleMetricUpdate('energy', option.value)}
                  className={cn(
                    "flex flex-col items-center p-2 rounded-lg transition-all",
                    metrics.energy === option.value ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                  )}
                >
                  <span className="text-2xl mb-1">{option.emoji}</span>
                  <span className={cn("text-xs font-medium", option.color)}>
                    {option.label}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500">Qualité du sommeil</h3>
            <Moon className="h-5 w-5 text-gray-400" />
          </div>
          {metrics.sleep ? (
            <div className="text-center">
              <span className="text-4xl block mb-2">{getMetricDisplay('sleep', metrics.sleep)?.emoji}</span>
              <span className={cn("text-sm font-medium", getMetricDisplay('sleep', metrics.sleep)?.color)}>
                {getMetricDisplay('sleep', metrics.sleep)?.label}
              </span>
            </div>
          ) : (
            <div className="flex justify-between items-center">
              {sleepOptions.map(option => (
                <button
                  key={option.value}
                  onClick={() => handleMetricUpdate('sleep', option.value)}
                  className={cn(
                    "flex flex-col items-center p-2 rounded-lg transition-all",
                    metrics.sleep === option.value ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                  )}
                >
                  <span className="text-2xl mb-1">{option.emoji}</span>
                  <span className={cn("text-xs font-medium", option.color)}>
                    {option.label}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Book className="h-6 w-6 text-blue-500 mr-2" />
            <h2 className="text-xl font-bold text-gray-900">Programme Mental</h2>
          </div>
          <Link to="/dashboard/exercises">
            <Button variant="outline" size="sm">
              Voir tout le programme
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {currentModule && (
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Module en cours</h3>
                <div className="px-3 py-1 bg-white/20 rounded-full text-sm">
                  Phase {userProgress.currentPhase.replace('phase', '')}
                </div>
              </div>
              <h4 className="text-xl font-bold mb-2">{currentModule.title}</h4>
              <p className="text-blue-100 mb-4">{currentModule.description}</p>
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span className="text-sm">{currentModule.duration}</span>
                </div>
              </div>
              <div className="flex space-x-3">
                <Link to={`/dashboard/exercises/module/${currentModule.id}`}>
                  <Button className="bg-white text-blue-600 hover:bg-blue-50">
                    <Play className="h-4 w-4 mr-2" />
                    Continuer
                  </Button>
                </Link>
                <Link to="/dashboard/calendar">
                  <Button variant="outline" className="border-white text-white hover:bg-white/10">
                    <Calendar className="h-4 w-4 mr-2" />
                    Planifier
                  </Button>
                </Link>
              </div>
            </div>
          )}

          {nextModule && (
            <div className="bg-gray-100 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Prochain module</h3>
                <div className="flex items-center text-gray-500">
                  <Lock className="h-4 w-4 mr-1" />
                  <span className="text-sm">À débloquer</span>
                </div>
              </div>
              <h4 className="text-xl font-bold text-gray-700 mb-2">{nextModule.title}</h4>
              <p className="text-gray-500 mb-4">{nextModule.description}</p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-gray-500">
                  <Clock className="h-4 w-4 mr-1" />
                  <span className="text-sm">{nextModule.duration}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progression globale</span>
            <span>{userProgress.progress}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-500 rounded-full transition-all duration-300"
              style={{ width: `${userProgress.progress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Target className="h-5 w-5 text-blue-500 mr-2" />
            <h3 className="text-lg font-medium text-gray-900">Mon objectif du jour</h3>
          </div>
          {!isEditingGoal && dailyGoal && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditingGoal(true)}
            >
              Modifier
            </Button>
          )}
        </div>
        {isEditingGoal ? (
          <div className="space-y-4">
            <textarea
              value={dailyGoal}
              onChange={(e) => setDailyGoal(e.target.value)}
              placeholder="Définissez votre objectif principal pour aujourd'hui..."
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none h-24"
            />
            <div className="flex justify-end">
              <Button onClick={handleSaveGoal} disabled={!dailyGoal.trim()}>
                Valider mon objectif
              </Button>
            </div>
          </div>
        ) : dailyGoal ? (
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-gray-700">{dailyGoal}</p>
          </div>
        ) : (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <Target className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600">Aucun objectif défini pour aujourd'hui</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditingGoal(true)}
              className="mt-4"
            >
              Définir un objectif
            </Button>
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Exercices du jour</h3>
            <p className="text-sm text-gray-500">
              {todayExercises.length > 0 
                ? `${todayExercises.length} exercice${todayExercises.length > 1 ? 's' : ''} programmé${todayExercises.length > 1 ? 's' : ''}`
                : 'Aucun exercice programmé aujourd\'hui'
              }
            </p>
          </div>
          <Link to="/dashboard/calendar">
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Voir le calendrier
            </Button>
          </Link>
        </div>

        {todayExercises.length > 0 ? (
          <div className="space-y-4">
            {todayExercises.map((exercise) => (
              <div
                key={exercise.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div>
                  <h4 className="font-medium text-gray-900">{exercise.title}</h4>
                  {exercise.description && (
                    <p className="text-sm text-gray-500 mt-1">{exercise.description}</p>
                  )}
                  <p className="text-sm text-blue-600 mt-1">
                    {exercise.startTime} - {exercise.endTime}
                  </p>
                </div>
                <Link to={`/dashboard/exercises/${exercise.id}`}>
                  <Button size="sm">
                    Commencer
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600">Aucun exercice programmé pour aujourd'hui</p>
            <Link to="/dashboard/exercises" className="mt-4 inline-block">
              <Button variant="outline" size="sm">
                Explorer les exercices
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}