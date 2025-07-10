import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Video, FileText, CheckCircle, Calendar, Play, Download, ArrowLeft, Clock, Info, Target, Brain } from 'lucide-react';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { useCalendarEvents } from '@/hooks/useCalendarEvents';

interface Exercise {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  instructions: string;
  completed: boolean;
  duration: number;
  estimatedTime: string;
  requirements: string[];
  objectives: string[];
  documents?: {
    title: string;
    description: string;
    type: string;
    url: string;
    size: string;
  }[];
}

const mockExercises: Record<string, Exercise[]> = {
  module1: [
    {
      id: '1',
      title: 'Comprendre son profil mental',
      description: 'Découvrez vos forces et axes d\'amélioration en préparation mentale à travers une évaluation complète.',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      instructions: 'Suivez la vidéo et complétez les exercices dans votre carnet de travail.',
      completed: false,
      duration: 45,
      estimatedTime: '60 minutes',
      requirements: [
        'Carnet de travail',
        'Stylo',
        'Environnement calme'
      ],
      objectives: [
        'Identifier vos forces mentales',
        'Repérer vos axes d\'amélioration',
        'Établir votre profil mental de base'
      ],
      documents: [
        {
          title: 'Test d\'auto-évaluation mentale',
          description: 'PDF interactif pour évaluer votre profil mental',
          type: 'pdf',
          url: '#',
          size: '1.2 MB'
        },
        {
          title: 'Guide d\'interprétation',
          description: 'Comment interpréter vos résultats',
          type: 'pdf',
          url: '#',
          size: '842 KB'
        }
      ]
    }
  ],
  module2: [
    {
      id: '2',
      title: 'Définir des objectifs SMART',
      description: 'Apprenez à définir des objectifs clairs, mesurables et motivants qui vous guideront vers le succès.',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      instructions: 'Suivez la méthodologie SMART pour définir vos objectifs.',
      completed: false,
      duration: 40,
      estimatedTime: '55 minutes',
      requirements: [
        'Template d\'objectifs SMART',
        'Votre calendrier sportif',
        'Vision claire de vos ambitions'
      ],
      objectives: [
        'Comprendre la méthode SMART',
        'Définir vos objectifs à court et long terme',
        'Créer un plan d\'action concret'
      ],
      documents: [
        {
          title: 'Template Objectifs SMART',
          description: 'Modèle pour structurer vos objectifs',
          type: 'pdf',
          url: '#',
          size: '956 KB'
        }
      ]
    }
  ],
  module3: [
    {
      id: '3',
      title: 'Transformer les pensées limitantes',
      description: 'Identifiez et transformez vos pensées négatives en leviers de performance.',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      instructions: 'Utilisez le journal des pensées pour analyser et transformer vos schémas mentaux.',
      completed: false,
      duration: 35,
      estimatedTime: '50 minutes',
      requirements: [
        'Journal des pensées',
        'Stylo',
        'Expériences récentes à analyser'
      ],
      objectives: [
        'Identifier les pensées limitantes',
        'Apprendre à les transformer',
        'Développer un dialogue interne positif'
      ],
      documents: [
        {
          title: 'Journal des pensées',
          description: 'Outil pour analyser vos pensées',
          type: 'pdf',
          url: '#',
          size: '1.1 MB'
        }
      ]
    }
  ],
  module4: [
    {
      id: '4',
      title: 'Créer sa routine mentale',
      description: 'Développez une routine mentale personnalisée pour optimiser votre préparation.',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      instructions: 'Construisez votre routine étape par étape en suivant le guide.',
      completed: false,
      duration: 50,
      estimatedTime: '65 minutes',
      requirements: [
        'Template de routine',
        'Chronomètre',
        'Journal de bord'
      ],
      objectives: [
        'Comprendre l\'importance des routines',
        'Créer votre routine personnalisée',
        'Tester et ajuster votre routine'
      ],
      documents: [
        {
          title: 'Guide des routines mentales',
          description: 'Construire des routines efficaces',
          type: 'pdf',
          url: '#',
          size: '1.4 MB'
        }
      ]
    }
  ],
  module5: [
    {
      id: '5',
      title: 'Techniques de concentration',
      description: 'Maîtrisez des exercices pratiques pour améliorer votre concentration.',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      instructions: 'Pratiquez les exercices de concentration progressivement.',
      completed: false,
      duration: 30,
      estimatedTime: '45 minutes',
      requirements: [
        'Environnement calme',
        'Chronomètre',
        'Journal de progression'
      ],
      objectives: [
        'Comprendre les mécanismes de la concentration',
        'Maîtriser les exercices de base',
        'Développer une attention soutenue'
      ],
      documents: [
        {
          title: 'Guide des exercices',
          description: 'Collection d\'exercices pratiques',
          type: 'pdf',
          url: '#',
          size: '1.3 MB'
        }
      ]
    }
  ],
  module6: [
    {
      id: '6',
      title: 'Gestion de l\'énergie mentale',
      description: 'Apprenez à gérer votre énergie mentale pour des performances durables.',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      instructions: 'Suivez le programme de gestion énergétique sur 7 jours.',
      completed: false,
      duration: 40,
      estimatedTime: '55 minutes',
      requirements: [
        'Journal énergétique',
        'Planning hebdomadaire',
        'Outils de mesure du stress'
      ],
      objectives: [
        'Comprendre votre cycle énergétique',
        'Identifier vos sources de stress',
        'Développer des stratégies de récupération'
      ],
      documents: [
        {
          title: 'Journal énergétique',
          description: 'Outil de suivi de votre énergie',
          type: 'pdf',
          url: '#',
          size: '1.2 MB'
        }
      ]
    }
  ]
};

interface ScheduleModalProps {
  exercise: Exercise;
  onClose: () => void;
  onSchedule: (date: Date, startTime: string) => void;
}

function ScheduleModal({ exercise, onClose, onSchedule }: ScheduleModalProps) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !time) return;
    
    const scheduledDate = new Date(date);
    onSchedule(scheduledDate, time);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Planifier : {exercise.title}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input
              type="date"
              className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={date}
              onChange={(e) => setDate(e.target.value)}
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
              className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>
          <div className="text-sm text-gray-500">
            Durée estimée : {exercise.duration} minutes
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <Button variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit">
              Planifier
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function ExerciseDetailPage() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const [exercises] = useState(mockExercises[moduleId || ''] || []);
  const [showScheduleModal, setShowScheduleModal] = useState<Exercise | null>(null);
  const { addEvent } = useCalendarEvents();
  const navigate = useNavigate();

  const exercise = exercises[0];

  if (!moduleId || !exercise) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">
          Module non trouvé
        </h2>
        <p className="mt-2 text-gray-500">
          Le module demandé n'existe pas.
        </p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => navigate('/dashboard/exercises')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour aux modules
        </Button>
      </div>
    );
  }

  const handleSchedule = (exercise: Exercise, date: Date, startTime: string) => {
    const [hours, minutes] = startTime.split(':').map(Number);
    const endDate = new Date(date);
    endDate.setHours(hours, minutes + exercise.duration);
    const endTime = `${endDate.getHours().toString().padStart(2, '0')}:${endDate.getMinutes().toString().padStart(2, '0')}`;

    addEvent({
      title: exercise.title,
      type: 'exercise',
      date,
      startTime,
      endTime,
      description: exercise.description
    });

    navigate('/dashboard/calendar');
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-black text-white rounded-xl overflow-hidden">
        <div className="relative aspect-video">
          <iframe
            className="absolute inset-0 w-full h-full"
            src={exercise.videoUrl}
            title={exercise.title}
            allowFullScreen
          />
        </div>
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">{exercise.title}</h1>
          <p className="text-gray-300">{exercise.description}</p>
          
          <div className="mt-6 flex items-center space-x-6">
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-blue-400 mr-2" />
              <span>Durée : {exercise.duration}:00</span>
            </div>
            <div className="flex items-center">
              <Info className="h-5 w-5 text-blue-400 mr-2" />
              <span>Temps estimé avec exercices : {exercise.estimatedTime}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Requirements */}
      <div className="mt-8 bg-orange-50 border border-orange-100 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-orange-800 mb-4">Vous aurez besoin de :</h2>
        <ul className="space-y-2">
          {exercise.requirements.map((req, index) => (
            <li key={index} className="flex items-center text-orange-700">
              <div className="w-2 h-2 bg-orange-400 rounded-full mr-3" />
              {req}
            </li>
          ))}
        </ul>
      </div>

      {/* Objectives */}
      <div className="mt-8 bg-blue-50 border border-blue-100 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-blue-800 mb-4">Objectifs :</h2>
        <ul className="space-y-2">
          {exercise.objectives.map((obj, index) => (
            <li key={index} className="flex items-center text-blue-700">
              <div className="w-2 h-2 bg-blue-400 rounded-full mr-3" />
              {obj}
            </li>
          ))}
        </ul>
      </div>

      {/* Resources */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Ressources</h2>
        <div className="bg-white rounded-xl border border-gray-200 divide-y">
          {exercise.documents?.map((doc, index) => (
            <div key={index} className="p-4 flex items-center justify-between">
              <div className="flex items-center">
                <FileText className="h-5 w-5 text-blue-500 mr-3" />
                <div>
                  <p className="font-medium text-gray-900">{doc.title}</p>
                  <p className="text-sm text-gray-500">{doc.description}</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Télécharger
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="mt-8 flex justify-between items-center">
        <Button variant="outline" onClick={() => navigate('/dashboard/exercises')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour aux modules
        </Button>
        <div className="flex space-x-3">
          <Button variant="outline" onClick={() => setShowScheduleModal(exercise)}>
            <Calendar className="h-4 w-4 mr-2" />
            Planifier
          </Button>
          <Button>
            <Play className="h-4 w-4 mr-2" />
            Commencer
          </Button>
        </div>
      </div>

      {/* Schedule Modal */}
      {showScheduleModal && (
        <ScheduleModal
          exercise={showScheduleModal}
          onClose={() => setShowScheduleModal(null)}
          onSchedule={(date, startTime) => handleSchedule(showScheduleModal, date, startTime)}
        />
      )}
    </div>
  );
}