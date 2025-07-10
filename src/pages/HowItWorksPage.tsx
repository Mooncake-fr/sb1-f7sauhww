import { Brain, Target, TrendingUp, Users } from 'lucide-react';

export default function HowItWorksPage() {
  const steps = [
    {
      title: 'Évaluation initiale',
      description: 'Nous analysons vos besoins et objectifs pour créer un programme personnalisé.',
      icon: Brain
    },
    {
      title: 'Définition des objectifs',
      description: 'Ensemble, nous établissons des objectifs clairs et mesurables.',
      icon: Target
    },
    {
      title: 'Suivi régulier',
      description: 'Suivez vos progrès et ajustez votre programme en fonction de vos résultats.',
      icon: TrendingUp
    },
    {
      title: 'Support communautaire',
      description: 'Rejoignez une communauté d\'athlètes partageant les mêmes objectifs.',
      icon: Users
    }
  ];

  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Comment ça marche ?
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Un processus simple et efficace pour améliorer vos performances mentales
          </p>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="absolute h-12 w-12 flex items-center justify-center rounded-md bg-blue-500 text-white">
                  <step.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <div className="ml-16">
                  <h3 className="text-xl font-medium text-gray-900">{step.title}</h3>
                  <p className="mt-2 text-base text-gray-500">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20">
            <div className="lg:mx-auto lg:max-w-3xl lg:text-center">
              <h3 className="text-2xl font-extrabold text-gray-900">
                Prêt à commencer votre voyage ?
              </h3>
              <p className="mt-4 text-lg text-gray-500">
                Rejoignez des milliers d'athlètes qui ont déjà transformé leur approche mentale du sport.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}