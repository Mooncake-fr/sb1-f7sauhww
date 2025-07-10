import Button from '../components/ui/Button';

export default function PricingPage() {
  const plans = [
    {
      name: 'Débutant',
      price: '29€',
      period: 'par mois',
      features: [
        'Accès aux exercices de base',
        'Journal personnel',
        'Calendrier basique',
        'Support par email'
      ]
    },
    {
      name: 'Pro',
      price: '79€',
      period: 'par mois',
      features: [
        'Tous les exercices avancés',
        'Journal avec analyses',
        'Calendrier complet',
        'Coaching personnalisé',
        'Support prioritaire'
      ],
      featured: true
    },
    {
      name: 'Équipe',
      price: '199€',
      period: 'par mois',
      features: [
        'Accès pour 5 athlètes',
        'Tableau de bord équipe',
        'Analyses avancées',
        'Support dédié 24/7',
        'Formation sur mesure'
      ]
    }
  ];

  return (
    <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Des tarifs adaptés à vos besoins
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Choisissez le plan qui correspond le mieux à vos objectifs
          </p>
        </div>

        <div className="mt-16 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative p-8 bg-white border rounded-2xl shadow-sm flex flex-col ${
                plan.featured ? 'ring-2 ring-blue-600' : ''
              }`}
            >
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900">{plan.name}</h3>
                <p className="mt-4 flex items-baseline text-gray-900">
                  <span className="text-5xl font-extrabold tracking-tight">
                    {plan.price}
                  </span>
                  <span className="ml-1 text-xl font-semibold">{plan.period}</span>
                </p>
                <ul className="mt-6 space-y-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex">
                      <span className="text-blue-500">✓</span>
                      <span className="ml-3 text-gray-500">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button
                className="mt-8 w-full"
                variant={plan.featured ? 'primary' : 'outline'}
              >
                Commencer maintenant
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}