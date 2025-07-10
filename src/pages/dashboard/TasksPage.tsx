import { useState } from 'react';
import { Plus, CheckSquare, Calendar, BarChart, Clock, Repeat, Filter } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { useTask } from '@/contexts/TaskContext';

const categoryColors = {
  'Visualisation': 'bg-purple-100 text-purple-800 border-purple-200',
  'Respiration': 'bg-blue-100 text-blue-800 border-blue-200',
  'Discours Intérieur': 'bg-green-100 text-green-800 border-green-200',
  'Objectifs': 'bg-orange-100 text-orange-800 border-orange-200',
};

const typeColors = {
  'daily': 'bg-indigo-100 text-indigo-800 border-indigo-200',
  'weekly': 'bg-rose-100 text-rose-800 border-rose-200'
};

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: Omit<Task, 'id' | 'completedDates' | 'createdAt'>) => void;
}

function TaskModal({ isOpen, onClose, onSave }: TaskModalProps) {
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    type: 'daily' as const,
    category: 'Visualisation' as const,
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(taskData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Nouvelle tâche</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Titre
            </label>
            <input
              type="text"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={taskData.title}
              onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description (optionnelle)
            </label>
            <textarea
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={taskData.description}
              onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type
            </label>
            <select
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={taskData.type}
              onChange={(e) => setTaskData({ ...taskData, type: e.target.value as 'daily' | 'weekly' })}
            >
              <option value="daily">Quotidienne</option>
              <option value="weekly">Hebdomadaire</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Catégorie
            </label>
            <select
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={taskData.category}
              onChange={(e) => setTaskData({ ...taskData, category: e.target.value as Task['category'] })}
            >
              <option value="Visualisation">Visualisation</option>
              <option value="Respiration">Respiration</option>
              <option value="Discours Intérieur">Discours Intérieur</option>
              <option value="Objectifs">Objectifs</option>
            </select>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit">
              Créer la tâche
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function TasksPage() {
  const navigate = useNavigate();
  const { tasks, addTask } = useTask();
  const [showModal, setShowModal] = useState(false);
  const [filterType, setFilterType] = useState<'all' | 'daily' | 'weekly'>('all');
  const [filterCategory, setFilterCategory] = useState<'all' | Task['category']>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTasks = tasks.filter(task => {
    const matchesType = filterType === 'all' || task.type === filterType;
    const matchesCategory = filterCategory === 'all' || task.category === filterCategory;
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesCategory && matchesSearch;
  });

  const handleAddTask = (taskData: Omit<Task, 'id' | 'completedDates' | 'createdAt'>) => {
    addTask(taskData);
    setShowModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Tâches & Habitudes</h2>
          <p className="mt-1 text-sm text-gray-500">
            Gérez vos routines quotidiennes et hebdomadaires
          </p>
        </div>
        <Button onClick={() => setShowModal(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nouvelle tâche
        </Button>
      </div>

      {/* Filtres */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher une tâche..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>
          <div className="flex gap-4">
            <select
              className="rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as typeof filterType)}
            >
              <option value="all">Tous les types</option>
              <option value="daily">Quotidiennes</option>
              <option value="weekly">Hebdomadaires</option>
            </select>
            <select
              className="rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value as typeof filterCategory)}
            >
              <option value="all">Toutes les catégories</option>
              <option value="Visualisation">Visualisation</option>
              <option value="Respiration">Respiration</option>
              <option value="Discours Intérieur">Discours Intérieur</option>
              <option value="Objectifs">Objectifs</option>
            </select>
          </div>
        </div>
      </div>

      {/* Liste des tâches */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="divide-y">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <div
                key={task.id}
                className="p-6 hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => navigate(`/dashboard/tasks/${task.id}`)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center">
                      <div className={cn(
                        'w-2 h-2 rounded-full mr-3',
                        task.type === 'daily' ? 'bg-indigo-500' : 'bg-rose-500'
                      )} />
                      <h3 className="text-lg font-medium text-gray-900">{task.title}</h3>
                      <span className={cn(
                        'ml-3 px-2.5 py-0.5 rounded-full text-xs font-medium',
                        categoryColors[task.category]
                      )}>
                        {task.category}
                      </span>
                      <span className={cn(
                        'ml-3 px-2.5 py-0.5 rounded-full text-xs font-medium',
                        typeColors[task.type]
                      )}>
                        {task.type === 'daily' ? 'Quotidienne' : 'Hebdomadaire'}
                      </span>
                    </div>
                    {task.description && (
                      <p className="mt-1 text-sm text-gray-500 ml-5">{task.description}</p>
                    )}
                    <div className="mt-2 ml-5">
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        Créée le {task.createdAt.toLocaleDateString()}
                        <span className="mx-2">•</span>
                        <CheckSquare className="h-4 w-4 mr-1" />
                        {task.completedDates.length} fois complétée
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center">
              <CheckSquare className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">Aucune tâche trouvée</h3>
              <p className="mt-1 text-sm text-gray-500">
                Commencez par créer une nouvelle tâche pour établir votre routine.
              </p>
              <div className="mt-6">
                <Button onClick={() => setShowModal(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Nouvelle tâche
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      <TaskModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleAddTask}
      />
    </div>
  );
}