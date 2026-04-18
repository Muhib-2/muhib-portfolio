import { useState, useEffect } from 'react';
import Login from './Login';
import Dashboard from './Dashboard';

export default function AdminApp() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    const authStatus = sessionStorage.getItem('admin_authenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    // Update document title based on authentication status
    if (isAuthenticated) {
      document.title = 'Admin Dashboard - Muhib Portfolio';
    } else {
      document.title = 'Admin Login - Muhib Portfolio';
    }

    // Cleanup: restore original title when component unmounts
    return () => {
      document.title = 'Muhib Nabil - Frontend Developer | React & Next.js Expert';
    };
  }, [isAuthenticated]);

  const handleLogin = () => {
    sessionStorage.setItem('admin_authenticated', 'true');
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_authenticated');
    setIsAuthenticated(false);
  };

  return isAuthenticated ? (
    <Dashboard onLogout={handleLogout} />
  ) : (
    <Login onLogin={handleLogin} />
  );
}
