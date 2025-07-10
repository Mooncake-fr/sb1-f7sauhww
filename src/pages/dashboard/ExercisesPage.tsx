import { Link } from 'react-router-dom';
import { Brain, Target, Trophy, Star, Users, ChevronRight, Clock, Video } from 'lucide-react';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';

const phases = [
  {
    id: 'phase1',
    number: 1,
    title: 'Fondations mentales',
    subtitle: 'La pierre angulaire de votre développement',
    description: 'Construire les bases solides du mental d\'un sportif performant',
    duration: '3 mois',
    color: 'blue',
    icon: Brain,
    moduleCount: 6,
    videoUrl: 'https://player.vimeo.com/video/517031489?h=83d7b4d0d6',
    learnings: [
      'Maîtrise de vos émotions et pensées',
      'Concentration optimale',
      'Routines mentales efficaces',
      'Gestion de l\'énergie'
    ],
    outcomes: [
      'Mental plus fort et stable',
      'Meilleure connaissance de soi',
      'Confiance renforcée'
    ]
  },
  {
    id: 'phase2',
    number: 2,
    title: 'Techniques avancées',
    subtitle: 'Maîtrisez les outils des champions',
    description: 'Maîtriser les outils mentaux de haut niveau',
    duration: '3 mois',
    color: 'green',
    icon: Target,
    moduleCount: 4,
    videoUrl: 'https://player.vimeo.com/video/517031566?h=83d7b4d0d7',
    learnings: [
      'Visualisation mentale puissante',
      'Gestion du stress avancée',
      'Techniques de récupération',
      'Préparation mentale spécifique'
    ],
    outcomes: [
      'Performance sous pression',
      'Résilience mentale',
      'Techniques personnalisées'
    ]
  },
  {
    id: 'phase3',
    number: 3,
    title: 'Performance sous pression',
    subtitle: 'Transformez la pression en alliée',
    description: 'Exceller dans les moments décisifs',
    duration: '3 mois',
    color: 'purple',
    icon: Trophy,
    moduleCount: 4,
    videoUrl: 'https://player.vimeo.com/video/517031677?h=83d7b4d0d8',
    learnings: [
      'Gestion de la pression',
      'État de flow optimal',
      'Résilience mentale',
      'Adaptation aux situations critiques'
    ],
    outcomes: [
      'Excellence sous pression',
      'Confiance en compétition',
      'Mental de champion'
    ]
  },
  {
    id: 'phase4',
    number: 4,
    title: 'Excellence durable',
    subtitle: 'Maintenez le cap vers les sommets',
    description: 'Maintenir la performance sur le long terme',
    duration: '3 mois',
    color: 'orange',
    icon: Star,
    moduleCount: 4,
    videoUrl: 'https://player.vimeo.com/video/517031788?h=83d7b4d0d9',
    learnings: [
      'Motivation durable',
      'Équilibre mental',
      'Prévention du burnout',
      'Vision à long terme'
    ],
    outcomes: [
      'Performance durable',
      'Équilibre optimal',
      'Progression continue'
    ]
  },
  {
    id: 'phase5',
    number: 5,
    title: 'Leadership mental',
    subtitle: 'Devenez une source d\'inspiration',
    description: 'Devenir un leader mental dans son sport',
    duration: '3 mois',
    color: 'red',
    icon: Users,
    moduleCount: 4,
    videoUrl: 'https://player.vimeo.com/video/517031899?h=83d7b4d0e0',
    learnings: [
      'Leadership inspirant',
      'Communication d\'impact',
      'Influence positive',
      'Héritage durable'
    ],
    outcomes: [
      'Leadership reconnu',
      'Impact sur les autres',
      'Transmission réussie'
    ]
  }
];

const phaseColors = {
  blue: 'from-blue-600 to-blue-400 border-blue-200 text-blue-800 bg-gradient-to-br from-blue-500 to-blue-600',
  green: 'from-green-600 to-green-400 border-green-200 text-green-800 bg-gradient-to-br from-green-500 to-green-600',
  purple: 'from-purple-600 to-purple-400 border-purple-200 text-purple-800 bg-gradient-to-br from-purple-500 to-purple-600',
  orange: 'from-orange-600 to-orange-400 border-orange-200 text-orange-800 bg-gradient-to-br from-orange-500 to-orange-600',
  red: 'from-red-600 to-red-400 border-red-200 text-red-800 bg-gradient-to-br from-red-500 to-red-600'
};

export default function ExercisesPage() {
  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,black)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
              Programme d'Excellence Mentale
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Un parcours complet en 5 phases pour développer votre force mentale
              et atteindre votre plein potentiel d'athlète.
            </p>
          </div>
        </div>
      </div>

      {/* Phases */}
      <div className="space-y-12">
        {phases.map((phase) => (
          <div key={phase.id} className="bg-white rounded-2xl shadow-sm overflow-hidden">
            {/* Header */}
            <div className={cn(
              "px-6 py-8",
              `bg-${phase.color}-50`
            )}>
              <div className="flex items-center space-x-4">
                <div className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center",
                  `bg-${phase.color}-100`
                )}>
                  <phase.icon className={cn("h-6 w-6", `text-${phase.color}-600`)} />
                </div>
                <div>
                  <div className={cn("text-sm font-medium", `text-${phase.color}-600`)}>
                    Phase {phase.number}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">{phase.title}</h2>
                  <p className="text-gray-500">{phase.subtitle}</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Vidéo explicative */}
              <div className="aspect-video rounded-xl overflow-hidden bg-black">
                <iframe
                  src={phase.videoUrl}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>

              {/* Info */}
              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  {phase.duration}
                </div>
                <div className="flex items-center">
                  <Video className="h-4 w-4 mr-2" />
                  {phase.moduleCount} modules
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600">{phase.description}</p>

              {/* Learnings & Outcomes */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Ce que vous apprendrez</h3>
                  <ul className="space-y-2">
                    {phase.learnings.map((learning, index) => (
                      <li key={index} className="flex items-center text-gray-600">
                        <div className={cn(
                          "w-1.5 h-1.5 rounded-full mr-2",
                          `bg-${phase.color}-400`
                        )} />
                        {learning}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Résultats attendus</h3>
                  <ul className="space-y-2">
                    {phase.outcomes.map((outcome, index) => (
                      <li key={index} className="flex items-center text-gray-600">
                        <Star className={cn("h-4 w-4 mr-2", `text-${phase.color}-400`)} />
                        {outcome}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action */}
              <div className="flex justify-end">
                <Link to={`/dashboard/exercises/phase/${phase.id}`}>
                  <Button className={cn(
                    "group",
                    phaseColors[phase.color as keyof typeof phaseColors]
                  )}>
                    <span>Voir les modules</span>
                    <ChevronRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}