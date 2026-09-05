import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface AuthContextType {
  isAdmin: boolean;
  login: (user: string, pass: string) => boolean;
  logout: () => void;
  updateCredentials: (newUser: string, newPass: string) => void;
}

const AuthContext = createContext<AuthContextType>({
  isAdmin: false,
  login: () => false,
  logout: () => {},
  updateCredentials: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  
  // Cargar credenciales desde localStorage o usar las por defecto
  const [adminUser, setAdminUser] = useState('admin');
  const [adminPass, setAdminPass] = useState('nonna2024');

  useEffect(() => {
    const savedUser = localStorage.getItem('admin_user');
    const savedPass = localStorage.getItem('admin_pass');
    if (savedUser && savedPass) {
      setAdminUser(savedUser);
      setAdminPass(savedPass);
    }
  }, []);

  const login = (user: string, pass: string) => {
    if (user === adminUser && pass === adminPass) {
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const logout = () => setIsAdmin(false);

  const updateCredentials = (newUser: string, newPass: string) => {
    setAdminUser(newUser);
    setAdminPass(newPass);
    localStorage.setItem('admin_user', newUser);
    localStorage.setItem('admin_pass', newPass);
  };

  return (
    <AuthContext.Provider value={{ isAdmin, login, logout, updateCredentials }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
