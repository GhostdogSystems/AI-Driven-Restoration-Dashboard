import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Dashboard from './components/Dashboard/Dashboard';
import NewAssessment from './components/Assessment/NewAssessment';
import AssessmentsList from './components/Assessment/AssessmentsList';
import Reports from './components/Reports/Reports';
import ClientPortal from './components/ClientPortal/ClientPortal';
import Settings from './components/Settings/Settings';
import Equipment from './components/Equipment';
import ReportAssistant from './components/ReportAssistant/ReportAssistant';
import RestoreVoice from './components/RestoreVoice/RestoreVoice';
import LoginPage from './components/Auth/LoginPage';
import { ThemeProvider } from './context/ThemeContext';
export function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const login = () => {
    setIsAuthenticated(true);
  };
  const logout = () => {
    setIsAuthenticated(false);
  };
  return <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/login" element={isAuthenticated ? <Navigate to="/" replace /> : <LoginPage onLogin={login} />} />
          <Route path="/*" element={isAuthenticated ? <Layout onLogout={logout}>
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/assessments" element={<AssessmentsList />} />
                    <Route path="/assessments/new" element={<NewAssessment />} />
                    <Route path="/equipment" element={<Equipment />} />
                    <Route path="/reports" element={<Reports />} />
                    <Route path="/client-portal" element={<ClientPortal />} />
                    <Route path="/settings" element={<Settings />} />
                  </Routes>
                  <ReportAssistant />
                  <RestoreVoice />
                </Layout> : <Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>;
}