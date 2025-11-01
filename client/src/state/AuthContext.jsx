import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext(null);

const TOKEN_KEY = 'tpms_token';
const USER_KEY = 'tpms_user';

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem(TOKEN_KEY) || '');
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  });

  useEffect(() => {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);
  }, [token]);

  useEffect(() => {
    if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
    else localStorage.removeItem(USER_KEY);
  }, [user]);

  const value = useMemo(
    () => ({ token, setToken, user, setUser, isAuthenticated: Boolean(token), isAdmin: user?.role === 'admin' }),
    [token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}


