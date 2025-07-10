import { Play, Shield, Brain, Trophy } from 'lucide-react';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section avec vidéo sur le côté */}
      <div className="relative min-h-[80vh] bg-gray-900">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contenu texte */}
          <div className="relative z-10 flex items-center px-4 sm:px-6 lg:px-8">
            <div className="py-12 lg:py-0 max-w-xl mx-auto lg:mx-0">
              <div className="text-center lg:text-left space-y-6">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight">
                  <span className="block text-white font-['Montserrat']">Atteignez</span>
                  <span className="block bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent font-['Montserrat']">
                    Votre Sommet Mental
                  </span>
                </h1>
                <p className="mt-8 text-lg sm:text-xl text-gray-300 leading-relaxed max-w-2xl">
                  Découvrez la voie vers l'excellence mentale. Un programme personnalisé 
                  pour transformer votre esprit et atteindre vos objectifs les plus ambitieux.
                </p>
                <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link to="/signup">
                    <Button 
                      size="lg" 
                      className="w-full sm:w-auto text-lg px-8 py-4 bg-blue-500 hover:bg-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      Commencer l'Ascension
                    </Button>
                  </Link>
                  <Link to="/how-it-works">
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="w-full sm:w-auto text-lg px-8 py-4 text-white border-2 border-white/80 hover:bg-white/10 transition-all duration-200"
                    >
                      Découvrir Notre Méthode
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Section vidéo */}
          <div className="relative h-full min-h-[400px] lg:min-h-full overflow-hidden rounded-bl-3xl">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source
                src="https://cdn.coverr.co/videos/coverr-focused-athlete-preparing-for-workout-2683/1080p.mp4"
                type="video/mp4"
              />
            </video>
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-transparent to-transparent lg:from-transparent"></div>
          </div>
        </div>
      </div>

      {/* Section Caractéristiques */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">
              Notre Approche
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              La Voie vers l'Excellence
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Une méthode éprouvée pour développer votre force mentale et atteindre les sommets
            </p>
          </div>

          <div className="mt-20">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              {[
                {
                  name: 'Exercices Guidés',
                  description: 'Des exercices mentaux conçus par des experts pour renforcer votre mental.',
                  icon: Brain,
                },
                {
                  name: 'Suivi Personnalisé',
                  description: 'Un tableau de bord détaillé pour suivre votre progression vers le sommet.',
                  icon: Trophy,
                },
                {
                  name: 'Environnement Sécurisé',
                  description: 'Un espace confidentiel pour votre développement personnel.',
                  icon: Shield,
                },
                {
                  name: 'Accompagnement Expert',
                  description: 'Des coachs certifiés pour vous guider à chaque étape.',
                  icon: Play,
                },
              ].map((feature) => (
                <div key={feature.name} className="relative">
                  <div className="absolute h-12 w-12 flex items-center justify-center rounded-md bg-blue-500 text-white">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                    {feature.name}
                  </p>
                  <p className="mt-2 ml-16 text-base text-gray-500">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Section Témoignages */}
      <div className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Ils ont Atteint leur Sommet
            </h2>
          </div>
          <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                quote: "La Voie du Sommet m'a permis de repousser mes limites mentales. Une transformation totale.",
                author: "Thomas D.",
                role: "Athlète Professionnel"
              },
              {
                quote: "Les exercices quotidiens ont révolutionné ma préparation mentale. Un outil indispensable.",
                author: "Marie L.",
                role: "Sportive de Haut Niveau"
              },
              {
                quote: "L'accompagnement personnalisé m'a guidé vers des sommets que je pensais inaccessibles.",
                author: "Pierre M.",
                role: "Champion National"
              }
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-md"
              >
                <p className="text-gray-600 italic mb-4">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.author}</p>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section CTA */}
      <div className="bg-blue-600">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Prêt à Gravir votre Montagne ?</span>
            <span className="block text-blue-200">Commencez votre Ascension Aujourd'hui</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link to="/signup">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-blue-50"
                >
                  Débuter l'Aventure
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}