import React, { createContext, useState, ReactNode } from 'react';

// 타입 정의
interface AuthContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  nickname: string;
  setNickname: React.Dispatch<React.SetStateAction<string>>;
}

// 초기 값
const defaultContextValue: AuthContextType = {
  isLoggedIn: !!localStorage.getItem('accessToken'),
  setIsLoggedIn: () => {},
  nickname: '',
  setNickname: () => {},
};

export const AuthContext = createContext<AuthContextType>(defaultContextValue);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!localStorage.getItem('accessToken'));
  const [nickname, setNickname] = useState<string>('');

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, nickname, setNickname }}>
      {children}
    </AuthContext.Provider>
  );
};
