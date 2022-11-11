import { auth } from "firebase-config";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { createContext, useContext, useState } from "react";

interface IAuthContext {
  user: User | null;
  loading: boolean;
}

interface AuthProvider {
  children: React.ReactNode;
}

export const AuthContext = createContext<IAuthContext>(undefined!);

export const AuthProvider = ({ children }: AuthProvider) => {
  const [user, setUser] = useState<IAuthContext["user"]>(null);
  const [loading, setLoading] = useState(false);

  onAuthStateChanged(auth, (user) => {
    console.log(
      "🚀 ~ file: AuthContext.tsx ~ line 21 ~ onAuthStateChanged ~ user",
      user
    );
    if (user) {
      setUser(user);
    } else {
      setUser(null);
    }
  });

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
