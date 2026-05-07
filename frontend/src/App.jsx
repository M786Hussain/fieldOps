import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Signup from './pages/Signup';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import TechDashboard from './pages/TechDashboard';
import ClientDashboard from './pages/ClientDashboard';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Default Route: Seedha Login par bhejo */}
          <Route path="/" element={<Navigate to="/login" />} />
          
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          
          {/* Dashboards */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/tech" element={<TechDashboard />} />
          <Route path="/client" element={<ClientDashboard />} />

          {/* 404 handling: Agar koi galat URL likhe toh login par wapas */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
