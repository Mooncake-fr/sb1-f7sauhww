import { useState } from 'react';
import { Target, Plus, CheckCircle } from 'lucide-react';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface Goal {
  id: string;
  title: string;
  description: string;
  deadline?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
}

const mockGoals: Goal[] = [
  {
    id: '1',
    title: 'Améliorer ma concentration en compétition',
    description: 'Maintenir le focus pendant toute la durée de l\'épreuve',
    deadline: '2024-03-01',
    completed: false,
    priority: 'high'
  },
  {
    id: '2',
    title: 'Développer ma routine pré-compétition',
    description: 'Créer et maîtriser une routine de préparation mentale efficace',
    deadline: '2024-02-15',
    completed: false,
    priority: 'medium'
  },
  {
    id: '3',
    title: 'Gérer le stress avant les compétitions',
    description: 'Apprendre à transformer le stress en énergie positive',
    deadline: '2024-02-28',
    completed: false,
    priority: 'high'
  }
];

const priorityColors = {
  low: 'bg-gray-100 text-gray-800 border-gray-200',
  medium: 'bg-blue-100 text-blue-800 border-blue-200',
  high: 'bg-orange-100 text-orange-800 border-orange-200'
};

const priorityLabels = {
  low: 'Basse',
  medium: 'Moyenne',
  high: 'Haute'
};

export default function GoalsPage() {
  const [goals, setGoals] = useState<Goal[]>(mockGoals);

  const toggleGoalCompletion = (goalId: string) => {
    setGoals(prevGoals =>
      prevGoals.map(goal =>
        goal.id === goalId ? { ...goal, completed: !goal.completed } : goal
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Mes Objectifs</h2>
          <p className="mt-1 text-sm text-gray-500">
            Définissez et suivez vos objectifs de performance
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nouvel objectif
        </Button>
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <Target className="h-6 w-6 text-blue-500" />
            <span className="ml-2 text-sm font-medium text-gray-500">Objectifs en cours</span>
          </div>
          <p className="mt-2 text-3xl font-bold text-gray-900">
            {goals.filter(goal => !goal.completed).length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <CheckCircle className="h-6 w-6 text-green-500" />
            <span className="ml-2 text-sm font-medium text-gray-500">Objectifs atteints</span>
          </div>
          <p className="mt-2 text-3xl font-bold text-gray-900">
            {goals.filter(goal => goal.completed).length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <Target className="h-6 w-6 text-orange-500" />
            <span className="ml-2 text-sm font-medium text-gray-500">Priorité haute</span>
          </div>
          <p className="mt-2 text-3xl font-bold text-gray-900">
            {goals.filter(goal => goal.priority === 'high').length}
          </p>
        </div>
      </div>

      {/* Liste des objectifs */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="divide-y">
          {goals.map((goal) => (
            <div key={goal.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center">
                    <h3 className="text-lg font-medium text-gray-900">{goal.title}</h3>
                    <span className={cn(
                      'ml-3 px-2.5 py-0.5 rounded-full text-xs font-medium',
                      priorityColors[goal.priority]
                    )}>
                      Priorité {priorityLabels[goal.priority]}
                    </span>
                    {goal.deadline && (
                      <span className="ml-3 text-sm text-gray-500">
                        Échéance : {new Date(goal.deadline).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-gray-500">{goal.description}</p>
                </div>
                <Button
                  variant={goal.completed ? 'outline' : 'primary'}
                  onClick={() => toggleGoalCompletion(goal.id)}
                  className="ml-4"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  {goal.completed ? 'Complété' : 'Marquer comme atteint'}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}