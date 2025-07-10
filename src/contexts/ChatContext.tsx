import { createContext, useContext, useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  read: boolean;
}

interface ChatContextType {
  messages: Message[];
  sendMessage: (receiverId: string, content: string) => Promise<void>;
  markAsRead: (messageId: string) => Promise<void>;
  currentChat: string | null;
  setCurrentChat: (userId: string | null) => void;
}

const ChatContext = createContext<ChatContextType | null>(null);

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}

const mockMessages: Message[] = [
  {
    id: '1',
    senderId: 'coach',
    receiverId: '1',
    content: 'Comment s\'est passé votre entraînement aujourd\'hui, Sophie ?',
    timestamp: new Date(Date.now() - 3600000),
    read: true,
  },
  {
    id: '2',
    senderId: '1',
    receiverId: 'coach',
    content: 'Très bien ! J\'ai réussi à maintenir mon niveau de concentration pendant toute la séance.',
    timestamp: new Date(Date.now() - 3000000),
    read: true,
  },
  {
    id: '3',
    senderId: 'coach',
    receiverId: '1',
    content: 'Excellent ! Continuez comme ça. N\'oubliez pas de noter vos sensations dans le journal.',
    timestamp: new Date(Date.now() - 2400000),
    read: false,
  },
];

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [currentChat, setCurrentChat] = useState<string | null>(null);

  const sendMessage = async (receiverId: string, content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: 'coach',
      receiverId,
      content,
      timestamp: new Date(),
      read: false,
    };

    setMessages(prev => [...prev, newMessage]);
  };

  const markAsRead = async (messageId: string) => {
    setMessages(prev =>
      prev.map(msg =>
        msg.id === messageId ? { ...msg, read: true } : msg
      )
    );
  };

  return (
    <ChatContext.Provider value={{
      messages,
      sendMessage,
      markAsRead,
      currentChat,
      setCurrentChat,
    }}>
      {children}
    </ChatContext.Provider>
  );
}