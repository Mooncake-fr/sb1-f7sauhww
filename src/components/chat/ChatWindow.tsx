import { useState, useEffect, useRef } from 'react';
import { Send, X } from 'lucide-react';
import { useChat } from '@/contexts/ChatContext';
import Button from '@/components/ui/Button';

interface ChatWindowProps {
  athleteId: string;
  athleteName: string;
  onClose: () => void;
}

export default function ChatWindow({ athleteId, athleteName, onClose }: ChatWindowProps) {
  const { messages, sendMessage, markAsRead, currentChat } = useChat();
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const chatMessages = messages.filter(
    msg => (msg.senderId === athleteId && msg.receiverId === 'coach') ||
           (msg.senderId === 'coach' && msg.receiverId === athleteId)
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    chatMessages
      .filter(msg => !msg.read && msg.senderId === athleteId)
      .forEach(msg => markAsRead(msg.id));
  }, [chatMessages]);

  const handleSend = async () => {
    if (!newMessage.trim()) return;
    await sendMessage(athleteId, newMessage);
    setNewMessage('');
  };

  return (
    <div className="fixed bottom-4 right-4 w-96 bg-white rounded-lg shadow-lg flex flex-col">
      {/* Header */}
      <div className="p-4 border-b flex justify-between items-center bg-blue-50 rounded-t-lg">
        <h3 className="font-medium text-gray-900">{athleteName}</h3>
        <button
          onClick={onClose}
          className="p-1 hover:bg-blue-100 rounded-full transition-colors"
        >
          <X className="h-5 w-5 text-gray-500" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 space-y-4 h-96 overflow-y-auto">
        {chatMessages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.senderId === 'coach' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.senderId === 'coach'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100'
              }`}
            >
              <p className="text-sm">{message.content}</p>
              <p className="text-xs mt-1 opacity-75">
                {new Date(message.timestamp).toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t">
        <div className="flex space-x-2">
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
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}