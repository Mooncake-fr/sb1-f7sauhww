import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Clock, FileText, Calendar, Play, ChevronRight } from 'lucide-react';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import mockPhases from './mockPhases';

interface Document {
  title: string;
  description: string;
  url: string;
}

interface Module {
  id: string;
  title: string;
  description: string;
  duration: string;
  objectives: string[];
  requirements: string[];
  documents: Document[];
}

interface Phase {
  id: string;
  title: string;
  description: string;
  modules: Module[];
}

export default function PhaseModulesPage() {
  const { phaseId } = useParams<{ phaseId: string }>();
  const navigate = useNavigate();
  const phase = mockPhases[phaseId || ''];

  if (!phase) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Phase non trouvée</h2>
        <p className="mt-2 text-gray-500">La phase demandée n'existe pas.</p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => navigate('/dashboard/exercises')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour au programme
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            onClick={() => navigate('/dashboard/exercises')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{phase.title}</h1>
            <p className="text-gray-500">{phase.description}</p>
          </div>
        </div>
      </div>

      {/* Liste des modules */}
      <div className="space-y-6">
        {phase.modules.map((module, index) => (
          <div
            key={module.id}
            className="bg-white rounded-xl shadow-sm overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold mr-4">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {module.title}
                      </h3>
                      <p className="mt-1 text-gray-500">{module.description}</p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center space-x-6 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      {module.duration}
                    </div>
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 mr-2" />
                      {module.documents.length} ressources
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-6">
                    {/* Objectifs */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-2">
                        Objectifs
                      </h4>
                      <ul className="space-y-2">
                        {module.objectives.map((objective, i) => (
                          <li key={i} className="flex items-center text-sm text-gray-600">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mr-2" />
                            {objective}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Prérequis */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-2">
                        Prérequis
                      </h4>
                      <ul className="space-y-2">
                        {module.requirements.map((requirement, i) => (
                          <li key={i} className="flex items-center text-sm text-gray-600">
                            <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mr-2" />
                            {requirement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="ml-6 flex flex-col space-y-2">
                  <Link to={`/dashboard/exercises/module/${module.id}`}>
                    <Button className="w-full">
                      <Play className="h-4 w-4 mr-2" />
                      Commencer
                    </Button>
                  </Link>
                  <Link to="/dashboard/calendar">
                    <Button variant="outline" className="w-full">
                      <Calendar className="h-4 w-4 mr-2" />
                      Planifier
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}