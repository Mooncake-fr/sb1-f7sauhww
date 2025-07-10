import { useState } from 'react';
import { Send, Search } from 'lucide-react';
import Button from '@/components/ui/Button';
import { useChat } from '@/contexts/ChatContext';

export default function MessagesPage() {
  const { messages, sendMessage } = useChat();
  const [newMessage, setNewMessage] = useState('');

  // Filtrer les messages pour Sophie Martin (id: 1)
  const athleteId = '1'; // ID de Sophie Martin
  const athleteMessages = messages.filter(
    msg => msg.senderId === athleteId || msg.receiverId === athleteId
  );

  const handleSend = async () => {
    if (!newMessage.trim()) return;
    await sendMessage('coach', newMessage);
    setNewMessage('');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Messages</h2>
        <p className="mt-1 text-sm text-gray-500">
          Échangez avec votre coach
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="h-[600px] flex flex-col">
          {/* En-tête */}
          <div className="p-4 border-b bg-gray-50">
            <div className="flex items-center">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop"
                alt="Coach"
                className="w-8 h-8 rounded-full"
              />
              <span className="ml-3 font-medium">Coach Thomas</span>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {athleteMessages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.senderId === athleteId ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-4 ${
                    message.senderId === athleteId
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-sm">
                      {message.senderId === athleteId ? 'Vous' : 'Coach'}
                    </span>
                    <span className="text-xs opacity-75">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="border-t p-4">
            <div className="flex space-x-4">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Écrivez votre message..."
                className="flex-1 rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') handleSend();
                }}
              />
              <Button onClick={handleSend}>
                <Send className="h-4 w-4 mr-2" />
                Envoyer
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}