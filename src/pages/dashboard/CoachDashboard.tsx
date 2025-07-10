import { useState } from 'react';
import { Users, TrendingUp, Calendar, MessageSquare, Search } from 'lucide-react';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import ChatWindow from '@/components/chat/ChatWindow';
import { useChat } from '@/contexts/ChatContext';

interface Athlete {
  id: string;
  name: string;
  sport: string;
  level: string;
  lastActive: string;
  mood: number;
  energy: number;
  sleep: number;
  nextSession: string;
  progress: number;
  avatar: string;
}

const mockAthletes: Athlete[] = [
  {
    id: '1',
    name: 'Sophie Martin',
    sport: 'Tennis',
    level: 'Professionnel',
    lastActive: 'Aujourd\'hui',
    mood: 4,
    energy: 3,
    sleep: 4,
    nextSession: '2024-01-30 14:00',
    progress: 75,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop'
  },
  {
    id: '2',
    name: 'Lucas Bernard',
    sport: 'Natation',
    level: 'Elite',
    lastActive: 'Hier',
    mood: 5,
    energy: 4,
    sleep: 5,
    nextSession: '2024-01-31 10:00',
    progress: 90,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop'
  },
  {
    id: '3',
    name: 'Emma Dubois',
    sport: 'Athlétisme',
    level: 'National',
    lastActive: 'Il y a 2 jours',
    mood: 3,
    energy: 2,
    sleep: 3,
    nextSession: '2024-02-01 16:00',
    progress: 60,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop'
  }
];

const getEmojiForValue = (value: number) => {
  switch (value) {
    case 1: return '😢';
    case 2: return '😕';
    case 3: return '😐';
    case 4: return '😊';
    case 5: return '🤩';
    default: return '😐';
  }
};

export default function CoachDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAthlete, setSelectedAthlete] = useState<Athlete | null>(null);
  const [showChat, setShowChat] = useState(false);
  const { setCurrentChat } = useChat();

  const handleOpenChat = (athlete: Athlete) => {
    setCurrentChat(athlete.id);
    setShowChat(true);
  };

  const filteredAthletes = mockAthletes.filter(athlete =>
    athlete.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    athlete.sport.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Tableau de bord Coach</h1>
          <p className="mt-1 text-sm text-gray-500">
            Suivez la progression de vos athlètes
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Users className="h-6 w-6 text-blue-500" />
              <span className="ml-2 text-sm font-medium text-gray-500">Athlètes actifs</span>
            </div>
            <p className="mt-2 text-3xl font-bold text-gray-900">3</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Calendar className="h-6 w-6 text-green-500" />
              <span className="ml-2 text-sm font-medium text-gray-500">Sessions aujourd'hui</span>
            </div>
            <p className="mt-2 text-3xl font-bold text-gray-900">2</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <TrendingUp className="h-6 w-6 text-purple-500" />
              <span className="ml-2 text-sm font-medium text-gray-500">Progression moyenne</span>
            </div>
            <p className="mt-2 text-3xl font-bold text-gray-900">75%</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <MessageSquare className="h-6 w-6 text-orange-500" />
              <span className="ml-2 text-sm font-medium text-gray-500">Messages non lus</span>
            </div>
            <p className="mt-2 text-3xl font-bold text-gray-900">5</p>
          </div>
        </div>

        {/* Search and Athletes List */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 border-b">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher un athlète..."
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="divide-y">
                {filteredAthletes.map((athlete) => (
                  <div
                    key={athlete.id}
                    className={cn(
                      "p-4 hover:bg-gray-50 cursor-pointer transition-colors",
                      selectedAthlete?.id === athlete.id && "bg-blue-50"
                    )}
                    onClick={() => setSelectedAthlete(athlete)}
                  >
                    <div className="flex items-center">
                      <img
                        src={athlete.avatar}
                        alt={athlete.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{athlete.name}</p>
                        <p className="text-xs text-gray-500">{athlete.sport}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Athlete Details */}
          <div className="lg:col-span-2">
            {selectedAthlete ? (
              <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img
                        src={selectedAthlete.avatar}
                        alt={selectedAthlete.name}
                        className="w-16 h-16 rounded-full"
                      />
                      <div className="ml-4">
                        <h2 className="text-xl font-bold text-gray-900">{selectedAthlete.name}</h2>
                        <p className="text-sm text-gray-500">
                          {selectedAthlete.sport} • {selectedAthlete.level}
                        </p>
                      </div>
                    </div>
                    <Button onClick={() => handleOpenChat(selectedAthlete)}>
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Message
                    </Button>
                  </div>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Métriques du jour */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="text-sm font-medium text-gray-500 mb-4">Métriques du jour</h3>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                          <p className="text-2xl mb-1">{getEmojiForValue(selectedAthlete.mood)}</p>
                          <p className="text-xs text-gray-500">Humeur</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl mb-1">{getEmojiForValue(selectedAthlete.energy)}</p>
                          <p className="text-xs text-gray-500">Énergie</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl mb-1">{getEmojiForValue(selectedAthlete.sleep)}</p>
                          <p className="text-xs text-gray-500">Sommeil</p>
                        </div>
                      </div>
                    </div>

                    {/* Progression */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="text-sm font-medium text-gray-500 mb-4">Progression globale</h3>
                      <div className="relative pt-1">
                        <div className="flex mb-2 items-center justify-between">
                          <div>
                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                              En cours
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="text-xs font-semibold inline-block text-blue-600">
                              {selectedAthlete.progress}%
                            </span>
                          </div>
                        </div>
                        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                          <div
                            style={{ width: `${selectedAthlete.progress}%` }}
                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Prochaine session */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="text-sm font-medium text-gray-500 mb-4">Prochaine session</h3>
                      <div className="text-sm">
                        <p className="font-medium text-gray-900">
                          {new Date(selectedAthlete.nextSession).toLocaleDateString('fr-FR', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>

                    {/* Dernière activité */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="text-sm font-medium text-gray-500 mb-4">Dernière activité</h3>
                      <p className="text-sm text-gray-900">
                        Dernière connexion : {selectedAthlete.lastActive}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Sélectionnez un athlète
                </h3>
                <p className="text-sm text-gray-500">
                  Cliquez sur un athlète pour voir ses détails et sa progression
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      {showChat && selectedAthlete && (
        <ChatWindow
          athleteId={selectedAthlete.id}
          athleteName={selectedAthlete.name}
          onClose={() => {
            setShowChat(false);
            setCurrentChat(null);
          }}
        />
      )}
    </div>
  );
}