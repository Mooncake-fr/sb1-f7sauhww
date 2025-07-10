import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ChatProvider } from './contexts/ChatContext';
import { TaskProvider } from './contexts/TaskContext';
import DashboardLayout from './components/dashboard/DashboardLayout';
import CoachLayout from './components/coach/CoachLayout';
import DashboardHome from './components/dashboard/DashboardHome';
import ExercisesPage from './pages/dashboard/ExercisesPage';
import ExerciseDetailPage from './pages/dashboard/ExerciseDetailPage';
import PhaseModulesPage from './pages/dashboard/PhaseModulesPage';
import CalendarPage from './pages/dashboard/CalendarPage';
import MessagesPage from './pages/dashboard/MessagesPage';
import StatsPage from './pages/dashboard/StatsPage';
import TasksPage from './pages/dashboard/TasksPage';
import TaskDetailPage from './pages/dashboard/TaskDetailPage';
import GoalsPage from './pages/dashboard/GoalsPage';
import CoachDashboard from './pages/coach/CoachDashboard';
import CoachPlanning from './pages/coach/CoachPlanning';
import CoachMessages from './pages/coach/CoachMessages';
import CoachStats from './pages/coach/CoachStats';
import CoachSettings from './pages/coach/CoachSettings';
import LoginPage from './pages/LoginPage';

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <ChatProvider>
          <TaskProvider>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              
              {/* Routes utilisateur */}
              <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index element={<DashboardHome />} />
                <Route path="exercises" element={<ExercisesPage />} />
                <Route path="exercises/phase/:phaseId" element={<PhaseModulesPage />} />
                <Route path="exercises/module/:moduleId" element={<ExerciseDetailPage />} />
                <Route path="calendar" element={<CalendarPage />} />
                <Route path="messages" element={<MessagesPage />} />
                <Route path="stats" element={<StatsPage />} />
                <Route path="tasks" element={<TasksPage />} />
                <Route path="tasks/:taskId" element={<TaskDetailPage />} />
                <Route path="goals" element={<GoalsPage />} />
              </Route>

              {/* Routes coach */}
              <Route path="/coach" element={<CoachLayout />}>
                <Route index element={<CoachDashboard />} />
                <Route path="planning" element={<CoachPlanning />} />
                <Route path="messages" element={<CoachMessages />} />
                <Route path="stats" element={<CoachStats />} />
                <Route path="settings" element={<CoachSettings />} />
              </Route>

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </TaskProvider>
        </ChatProvider>
      </AuthProvider>
    </Router>
  );
}