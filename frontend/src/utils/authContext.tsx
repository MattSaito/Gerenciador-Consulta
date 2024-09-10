import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Cookies from 'js-cookie';

interface AuthContextType {
  token: string | null;
  role: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const tokenFromCookie = Cookies.get('token') || null;
    const roleFromCookie = Cookies.get('role') || null;

    setToken(tokenFromCookie);
    setRole(roleFromCookie);
  }, []); // Este efeito só é executado uma vez, quando o componente é montado

  // Observa mudanças no token e no papel, atualizando o estado conforme necessário
  useEffect(() => {
    const tokenFromCookie = Cookies.get('token') || null;
    const roleFromCookie = Cookies.get('role') || null;

    setToken(tokenFromCookie);
    setRole(roleFromCookie);
  }, [token, role]); 

  return (
    <AuthContext.Provider value={{ token, role }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
