import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // On app load, get saved user and token
    const savedUser = localStorage.getItem('currentUser');
    const token = localStorage.getItem('token');

    if (savedUser && token) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // Login expects email and password (not username)
  const login = async (email, password) => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok) {
        setUser(data.user);
        localStorage.setItem('currentUser', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);
        return { success: true };
      } else {
        return { success: false, error: data.message };
      }
    } catch (err) {
      console.error('Login error:', err);
      return { success: false, error: 'Something went wrong' };
    }
  };

  // Register expects name, email, password
  const register = async (userData) => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });

      const data = await res.json();

      if (res.ok) {
        setUser(data.user);
        localStorage.setItem('currentUser', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);
        return { success: true };
      } else {
        return { success: false, error: data.message };
      }
    } catch (err) {
      console.error('Register error:', err);
      return { success: false, error: 'Something went wrong' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
