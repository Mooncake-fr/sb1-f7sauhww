import { useState } from 'react';
import { MessageSquare, Search, Send } from 'lucide-react';
import Button from '@/components/ui/Button';
import { useChat } from '@/contexts/ChatContext';
import { cn } from '@/lib/utils';

interface Athlete {
  id: string;
  name: string;
  avatar: string;
  lastMessage?: string;
  lastMessageTime?: string;
}

const mockAthletes: Athlete[] = [
  {
    id: '1',
    name: 'Sophie Martin',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    lastMessage: 'Merci pour la séance d\'aujourd\'hui !',
    lastMessageTime: '14:30'
  },
  {
    id: '2',
    name: 'Lucas Bernard',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    lastMessage: 'Je serai en retard demain',
    lastMessageTime: 'Hier'
  },
  {
    id: '3',
    name: 'Emma Dubois',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    lastMessage: 'À quelle heure commence l\'entraînement ?',
    lastMessageTime: 'Lun.'
  }
];

export default function CoachMessages() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAthlete, setSelectedAthlete] = useState<Athlete | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const { messages, sendMessage } = useChat();

  const filteredAthletes = mockAthletes.filter(athlete =>
    athlete.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const athleteMessages = selectedAthlete
    ? messages.filter(msg =>
        msg.senderId === selectedAthlete.id || msg.receiverId === selectedAthlete.id
      )
    : [];

  const handleSendMessage = async () => {
    if (!selectedAthlete || !newMessage.trim()) return;
    await sendMessage(selectedAthlete.id, newMessage);
    setNewMessage('');
  };

  return (
    <div className="h-[calc(100vh-6rem)] flex">
      {/* Liste des athlètes */}
      <div className="w-80 bg-white border-r flex flex-col">
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
        <div className="flex-1 overflow-y-auto">
          {filteredAthletes.map((athlete) => (
            <button
              key={athlete.id}
              className={cn(
                "w-full p-4 flex items-center hover:bg-gray-50 transition-colors",
                selectedAthlete?.id === athlete.id && "bg-blue-50"
              )}
              onClick={() => setSelectedAthlete(athlete)}
            >
              <img
                src={athlete.avatar}
                alt={athlete.name}
                className="w-12 h-12 rounded-full"
              />
              <div className="ml-3 text-left">
                <p className="font-medium text-gray-900">{athlete.name}</p>
                {athlete.lastMessage && (
                  <p className="text-sm text-gray-500 truncate">
                    {athlete.lastMessage}
                  </p>
                )}
              </div>
              {athlete.lastMessageTime && (
                <span className="ml-auto text-xs text-gray-500">
                  {athlete.lastMessageTime}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Zone de messages */}
      {selectedAthlete ? (
        <div className="flex-1 flex flex-col bg-gray-50">
          {/* En-tête */}
          <div className="p-4 bg-white border-b">
            <div className="flex items-center">
              <img
                src={selectedAthlete.avatar}
                alt={selectedAthlete.name}
                className="w-10 h-10 rounded-full"
              />
              <h3 className="ml-3 font-medium text-gray-900">
                {selectedAthlete.name}
              </h3>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {athleteMessages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.senderId === 'coach' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={cn(
                    'max-w-[70%] rounded-lg p-4',
                    message.senderId === 'coach'
                      ? 'bg-blue-500 text-white'
                      : 'bg-white'
                  )}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs mt-1 opacity-75">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t">
            <div className="flex space-x-4">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Écrivez votre message..."
                className="flex-1 rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') handleSendMessage();
                }}
              />
              <Button onClick={handleSendMessage}>
                <Send className="h-4 w-4 mr-2" />
                Envoyer
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              Sélectionnez un athlète
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Choisissez un athlète pour commencer une conversation
            </p>
          </div>
        </div>
      )}
    </div>
  );
}