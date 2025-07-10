import { useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowLeft, CheckSquare, Square, Pencil, Trash2, X } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';
import { fr } from 'date-fns/locale';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { useTask } from '@/contexts/TaskContext';

const categoryColors = {
  'Visualisation': 'bg-purple-100 text-purple-800 border-purple-200',
  'Respiration': 'bg-blue-100 text-blue-800 border-blue-200',
  'Discours Intérieur': 'bg-green-100 text-green-800 border-green-200',
  'Objectifs': 'bg-orange-100 text-orange-800 border-orange-200',
};

interface EditModalProps {
  task: Task;
  onClose: () => void;
  onSave: (updates: Partial<Task>) => void;
}

function EditModal({ task, onClose, onSave }: EditModalProps) {
  const [formData, setFormData] = useState({
    title: task.title,
    description: task.description || '',
    type: task.type,
    category: task.category,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Modifier la tâche</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Titre
            </label>
            <input
              type="text"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type
            </label>
            <select
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as 'daily' | 'weekly' })}
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
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value as Task['category'] })}
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
              Enregistrer
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function TaskDetailPage() {
  const { taskId } = useParams<{ taskId: string }>();
  const navigate = useNavigate();
  const { getTask, toggleTaskCompletion, updateTask, deleteTask } = useTask();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const task = getTask(taskId || '');

  if (!task) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Tâche non trouvée</h2>
        <p className="mt-2 text-gray-500">La tâche demandée n'existe pas.</p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => navigate('/dashboard/tasks')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour aux tâches
        </Button>
      </div>
    );
  }

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const handlePreviousMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  const handleToggleDate = useCallback((date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    toggleTaskCompletion(task.id, dateStr);
  }, [task.id, toggleTaskCompletion]);

  const handleDelete = () => {
    deleteTask(task.id);
    navigate('/dashboard/tasks');
  };

  const getCompletionRate = useCallback(() => {
    const daysInMonth = days.length;
    const completedInMonth = task.completedDates.filter(date => 
      date.startsWith(format(currentDate, 'yyyy-MM'))
    ).length;
    return Math.round((completedInMonth / daysInMonth) * 100);
  }, [task.completedDates, currentDate, days.length]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/dashboard/tasks')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Button>
          <div className="ml-4">
            <h2 className="text-2xl font-bold text-gray-900">{task.title}</h2>
            <p className="text-sm text-gray-500">{task.description}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={cn(
            'px-3 py-1 rounded-full text-sm font-medium',
            categoryColors[task.category]
          )}>
            {task.category}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowEditModal(true)}
          >
            <Pencil className="h-4 w-4 mr-2" />
            Modifier
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-red-600 hover:text-red-700"
            onClick={() => setShowDeleteConfirm(true)}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Supprimer
          </Button>
        </div>
      </div>

      {/* Statistiques du mois */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">
            Progression du mois
          </h3>
          <span className="text-sm text-gray-500">
            {format(currentDate, 'MMMM yyyy', { locale: fr })}
          </span>
        </div>
        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                Taux de complétion
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold inline-block text-blue-600">
                {getCompletionRate()}%
              </span>
            </div>
          </div>
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
            <div
              style={{ width: `${getCompletionRate()}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 transition-all duration-300"
            />
          </div>
        </div>
      </div>

      {/* Calendrier */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {/* En-tête du calendrier */}
        <div className="p-4 border-b flex items-center justify-between">
          <button
            onClick={handlePreviousMonth}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          </button>
          
          <h3 className="text-lg font-medium text-gray-900 capitalize">
            {format(currentDate, 'MMMM yyyy', { locale: fr })}
          </h3>

          <button
            onClick={handleNextMonth}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ChevronRight className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        {/* Grille des jours */}
        <div className="grid grid-cols-7 gap-px bg-gray-200">
          {/* En-têtes des jours */}
          {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((day) => (
            <div
              key={day}
              className="bg-gray-50 py-2 text-center text-sm font-medium text-gray-500"
            >
              {day}
            </div>
          ))}

          {/* Cases des jours */}
          {days.map((day, dayIdx) => {
            const dateStr = format(day, 'yyyy-MM-dd');
            const isCompleted = task.completedDates.includes(dateStr);
            const isToday = isSameDay(day, new Date());
            const isCurrentMonth = isSameMonth(day, currentDate);

            return (
              <div
                key={day.toString()}
                className={cn(
                  'min-h-[100px] bg-white relative flex flex-col',
                  !isCurrentMonth && 'bg-gray-50',
                  isToday && 'bg-blue-50'
                )}
              >
                {/* Numéro du jour */}
                <div className={cn(
                  'absolute top-2 right-2 text-sm font-medium',
                  !isCurrentMonth && 'text-gray-400',
                  isToday && 'text-blue-600 font-bold'
                )}>
                  {format(day, 'd')}
                </div>

                {/* Zone cliquable avec case à cocher */}
                <button
                  onClick={() => handleToggleDate(day)}
                  className="absolute inset-0 flex items-center justify-center hover:bg-gray-50 transition-colors group"
                >
                  <div
                    className={cn(
                      'w-10 h-10 rounded-lg border-2 flex items-center justify-center transition-all duration-200',
                      isCompleted
                        ? 'bg-green-100 border-green-500 text-green-600 scale-110'
                        : 'border-gray-300 group-hover:border-gray-400 group-hover:scale-105'
                    )}
                  >
                    {isCompleted ? (
                      <CheckSquare className="h-6 w-6" />
                    ) : (
                      <Square className="h-6 w-6" />
                    )}
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal de modification */}
      {showEditModal && (
        <EditModal
          task={task}
          onClose={() => setShowEditModal(false)}
          onSave={(updates) => {
            updateTask(task.id, updates);
            setShowEditModal(false);
          }}
        />
      )}

      {/* Modal de confirmation de suppression */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Confirmer la suppression</h2>
            <p className="text-gray-600 mb-6">
              Êtes-vous sûr de vouloir supprimer cette tâche ? Cette action est irréversible.
            </p>
            <div className="flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Annuler
              </Button>
              <Button
                className="bg-red-600 hover:bg-red-700"
                onClick={handleDelete}
              >
                Supprimer
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}