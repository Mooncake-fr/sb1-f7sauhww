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

const mockPhases: Record<string, Phase> = {
  'phase1': {
    id: 'phase1',
    title: 'Fondations mentales',
    description: 'Construire les bases solides du mental d\'un sportif performant',
    modules: [
      {
        id: 'module1',
        title: 'Comprendre son profil mental',
        description: 'Découvrez vos forces et axes d\'amélioration en préparation mentale à travers une évaluation complète.',
        duration: '60 minutes',
        objectives: [
          'Identifier vos forces mentales',
          'Repérer vos axes d\'amélioration',
          'Établir votre profil mental de base'
        ],
        requirements: [
          'Carnet de travail',
          'Stylo',
          'Environnement calme'
        ],
        documents: [
          {
            title: 'Test d\'auto-évaluation mentale',
            description: 'PDF interactif pour évaluer votre profil mental',
            url: '#'
          },
          {
            title: 'Guide d\'interprétation',
            description: 'Comment interpréter vos résultats',
            url: '#'
          }
        ]
      },
      {
        id: 'module2',
        title: 'Définir des objectifs SMART',
        description: 'Apprenez à définir des objectifs clairs, mesurables et motivants qui vous guideront vers le succès.',
        duration: '55 minutes',
        objectives: [
          'Comprendre la méthode SMART',
          'Définir vos objectifs à court et long terme',
          'Créer un plan d\'action concret'
        ],
        requirements: [
          'Template d\'objectifs SMART',
          'Votre calendrier sportif',
          'Vision claire de vos ambitions'
        ],
        documents: [
          {
            title: 'Template Objectifs SMART',
            description: 'Modèle pour structurer vos objectifs',
            url: '#'
          }
        ]
      },
      {
        id: 'module3',
        title: 'Gestion des émotions',
        description: 'Développez votre intelligence émotionnelle et apprenez à utiliser vos émotions comme des alliées.',
        duration: '45 minutes',
        objectives: [
          'Identifier et comprendre vos émotions',
          'Développer des stratégies de régulation émotionnelle',
          'Transformer les émotions en ressources'
        ],
        requirements: [
          'Journal des émotions',
          'Environnement calme',
          'Expériences récentes à analyser'
        ],
        documents: [
          {
            title: 'Guide de gestion émotionnelle',
            description: 'Techniques de régulation émotionnelle',
            url: '#'
          }
        ]
      },
      {
        id: 'module4',
        title: 'Techniques de respiration',
        description: 'Maîtrisez les techniques de respiration essentielles pour la gestion du stress et la performance.',
        duration: '40 minutes',
        objectives: [
          'Comprendre l\'impact de la respiration',
          'Maîtriser différentes techniques respiratoires',
          'Créer votre routine de respiration'
        ],
        requirements: [
          'Espace calme et confortable',
          'Tapis de sol',
          'Chronomètre'
        ],
        documents: [
          {
            title: 'Guide des techniques respiratoires',
            description: 'Manuel des exercices de respiration',
            url: '#'
          }
        ]
      },
      {
        id: 'module5',
        title: 'Visualisation de base',
        description: 'Découvrez les fondamentaux de la visualisation mentale et son impact sur la performance.',
        duration: '50 minutes',
        objectives: [
          'Comprendre les principes de la visualisation',
          'Développer vos capacités d\'imagerie mentale',
          'Créer des scénarios de visualisation efficaces'
        ],
        requirements: [
          'Environnement calme',
          'Journal de visualisation',
          'Tapis ou chaise confortable'
        ],
        documents: [
          {
            title: 'Guide de visualisation',
            description: 'Techniques de base de visualisation',
            url: '#'
          }
        ]
      },
      {
        id: 'module6',
        title: 'Dialogue interne positif',
        description: 'Apprenez à transformer votre dialogue interne pour qu\'il devienne un allié de votre performance.',
        duration: '45 minutes',
        objectives: [
          'Identifier vos schémas de pensée',
          'Développer un dialogue interne constructif',
          'Créer des affirmations positives personnalisées'
        ],
        requirements: [
          'Journal de pensées',
          'Stylo',
          'Liste de situations à analyser'
        ],
        documents: [
          {
            title: 'Manuel du dialogue interne',
            description: 'Techniques de restructuration cognitive',
            url: '#'
          }
        ]
      }
    ]
  },
  'phase2': {
    id: 'phase2',
    title: 'Techniques avancées',
    description: 'Maîtriser les outils mentaux de haut niveau',
    modules: []
  },
  'phase3': {
    id: 'phase3',
    title: 'Performance sous pression',
    description: 'Exceller dans les moments décisifs',
    modules: []
  },
  'phase4': {
    id: 'phase4',
    title: 'Excellence durable',
    description: 'Maintenir la performance sur le long terme',
    modules: []
  },
  'phase5': {
    id: 'phase5',
    title: 'Leadership mental',
    description: 'Devenir un leader mental dans son sport',
    modules: []
  }
};

export default mockPhases;