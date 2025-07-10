import { LineChart, BarChart, Calendar, CheckSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format, startOfWeek, addDays } from 'date-fns';
import { fr } from 'date-fns/locale';

const mockData = {
  weeklyMetrics: Array.from({ length: 7 }, (_, i) => {
    const date = addDays(startOfWeek(new Date(), { locale: fr }), i);
    return {
      date,
      sleep: Math.floor(Math.random() * 5) + 1,
      energy: Math.floor(Math.random() * 5) + 1,
      mood: Math.floor(Math.random() * 5) + 1,
    };
  }),
  monthlyAchievements: [
    { name: 'Exercices complétés', value: 45 },
    { name: 'Objectifs atteints', value: 12 },
    { name: 'Jours consécutifs', value: 21 },
  ],
  habitStats: {
    completion: {
      visualisation: 85,
      respiration: 70,
      'discours-interieur': 90,
      objectifs: 65,
    },
    streak: {
      current: 7,
      best: 14,
    },
    daily: {
      total: 45,
      completed: 38,
    },
  },
};

const metricLabels = {
  sleep: { label: 'Sommeil', color: 'bg-purple-400', icon: '😴', description: 'Qualité du sommeil' },
  energy: { label: 'Énergie', color: 'bg-blue-400', icon: '⚡', description: 'Niveau d\'énergie' },
  mood: { label: 'Humeur', color: 'bg-green-400', icon: '😊', description: 'État d\'esprit' },
};

export default function StatsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Statistiques</h2>
        <p className="mt-1 text-sm text-gray-500">
          Visualisez vos progrès et performances
        </p>
      </div>

      {/* Statistiques des habitudes */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-6">
          Suivi des habitudes
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center">
              <CheckSquare className="h-5 w-5 text-blue-500" />
              <span className="ml-2 text-sm font-medium text-blue-900">
                Taux de complétion
              </span>
            </div>
            <p className="mt-2 text-2xl font-bold text-blue-900">
              {mockData.habitStats.daily.completed}/{mockData.habitStats.daily.total}
            </p>
            <p className="text-sm text-blue-700">
              {Math.round((mockData.habitStats.daily.completed / mockData.habitStats.daily.total) * 100)}% de réussite
            </p>
          </div>

          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-green-500" />
              <span className="ml-2 text-sm font-medium text-green-900">
                Séquence actuelle
              </span>
            </div>
            <p className="mt-2 text-2xl font-bold text-green-900">
              {mockData.habitStats.streak.current} jours
            </p>
            <p className="text-sm text-green-700">
              Record : {mockData.habitStats.streak.best} jours
            </p>
          </div>

          <div className="col-span-2 bg-gray-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-700 mb-4">
              Taux de complétion par catégorie
            </h4>
            <div className="space-y-4">
              {Object.entries(mockData.habitStats.completion).map(([category, rate]) => (
                <div key={category}>
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span className="capitalize">{category === 'discours-interieur' ? 'Discours Intérieur' : category}</span>
                    <span>{rate}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div
                      className={cn(
                        'h-full rounded-full',
                        category === 'visualisation' && 'bg-purple-500',
                        category === 'respiration' && 'bg-blue-500',
                        category === 'discours-interieur' && 'bg-green-500',
                        category === 'objectifs' && 'bg-orange-500'
                      )}
                      style={{ width: `${rate}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-900">
              Suivi hebdomadaire des métriques
            </h3>
            <LineChart className="h-5 w-5 text-gray-400" />
          </div>
          
          {/* Légende des métriques */}
          <div className="flex justify-center space-x-4 mb-4">
            {Object.entries(metricLabels).map(([key, { label, color, icon }]) => (
              <div key={key} className="flex items-center">
                <div className={cn('w-3 h-3 rounded mr-2', color)} />
                <span className="text-sm text-gray-600">{label} {icon}</span>
              </div>
            ))}
          </div>

          {/* Grille des jours */}
          <div className="grid grid-cols-7 gap-2">
            {/* En-têtes des jours */}
            {mockData.weeklyMetrics.map((day) => (
              <div key={day.date.toString()} className="text-center">
                <div className="text-xs font-medium text-gray-500 mb-2">
                  {format(day.date, 'EEE', { locale: fr })}
                </div>
                <div className="text-xs text-gray-400">
                  {format(day.date, 'd MMM')}
                </div>
              </div>
            ))}

            {/* Métriques par jour */}
            {mockData.weeklyMetrics.map((day) => (
              <div key={day.date.toString()} className="space-y-2">
                {Object.entries(metricLabels).map(([metric, { color, icon }]) => (
                  <div
                    key={metric}
                    className={cn(
                      'rounded-lg p-2 text-center text-white text-xs font-medium transition-all hover:opacity-90',
                      color
                    )}
                    title={`${metricLabels[metric as keyof typeof metricLabels].description}: ${day[metric as keyof typeof day]}/5`}
                  >
                    {icon}
                    <div className="mt-1">{day[metric as keyof typeof day]}/5</div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-900">
              Réalisations mensuelles
            </h3>
            <BarChart className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {mockData.monthlyAchievements.map((achievement, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>{achievement.name}</span>
                  <span>{achievement.value}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full">
                  <div
                    className={cn(
                      'h-full rounded-full',
                      index === 0 && 'bg-purple-500',
                      index === 1 && 'bg-blue-500',
                      index === 2 && 'bg-green-500'
                    )}
                    style={{ width: `${(achievement.value / 50) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}