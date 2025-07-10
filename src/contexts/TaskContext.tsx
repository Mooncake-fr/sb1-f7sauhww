import { createContext, useContext, useState } from 'react';

export interface Task {
  id: string;
  title: string;
  description?: string;
  type: 'daily' | 'weekly';
  category: 'Visualisation' | 'Respiration' | 'Discours Intérieur' | 'Objectifs';
  completedDates: string[];
  createdAt: Date;
}

const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Affirmations positives',
    description: 'Répéter mes affirmations du jour : "Je suis capable", "Je progresse chaque jour", "Je suis confiant(e)"',
    type: 'daily',
    category: 'Discours Intérieur',
    completedDates: [
      '2024-01-28',
      '2024-01-29',
      '2024-01-30',
    ],
    createdAt: new Date('2024-01-28'),
  },
  {
    id: '2',
    title: 'Visualisation pré-entraînement',
    description: '5 minutes de visualisation avant chaque séance',
    type: 'daily',
    category: 'Visualisation',
    completedDates: [
      '2024-01-28',
      '2024-01-29',
    ],
    createdAt: new Date('2024-01-28'),
  },
  {
    id: '3',
    title: 'Exercice de respiration',
    description: '5 minutes de respiration profonde',
    type: 'daily',
    category: 'Respiration',
    completedDates: [
      '2024-01-28',
      '2024-01-29',
    ],
    createdAt: new Date('2024-01-28'),
  }
];

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'completedDates' | 'createdAt'>) => Task;
  getTask: (id: string) => Task | undefined;
  toggleTaskCompletion: (taskId: string, date: string) => void;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  deleteTask: (taskId: string) => void;
}

const TaskContext = createContext<TaskContextType | null>(null);

export function useTask() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
}

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const addTask = (taskData: Omit<Task, 'id' | 'completedDates' | 'createdAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      completedDates: [],
      createdAt: new Date(),
    };
    setTasks(prev => [...prev, newTask]);
    return newTask;
  };

  const getTask = (id: string) => {
    return tasks.find(task => task.id === id);
  };

  const toggleTaskCompletion = (taskId: string, date: string) => {
    setTasks(prev =>
      prev.map(task => {
        if (task.id !== taskId) return task;
        
        const isCompleted = task.completedDates.includes(date);
        return {
          ...task,
          completedDates: isCompleted
            ? task.completedDates.filter(d => d !== date)
            : [...task.completedDates, date]
        };
      })
    );
  };

  const updateTask = (taskId: string, updates: Partial<Task>) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === taskId ? { ...task, ...updates } : task
      )
    );
  };

  const deleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  return (
    <TaskContext.Provider value={{
      tasks,
      addTask,
      getTask,
      toggleTaskCompletion,
      updateTask,
      deleteTask,
    }}>
      {children}
    </TaskContext.Provider>
  );
}