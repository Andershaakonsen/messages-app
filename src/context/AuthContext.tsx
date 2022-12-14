import React, { useEffect } from "react";
import { auth, db } from "firebase-config";
import { onAuthStateChanged, User } from "firebase/auth";
import { createContext, useContext, useState } from "react";
import { doc, getDoc } from "firebase/firestore";

interface IAuthContext {
  user: User | null;
  // loading: boolean;
  profile: IProfile | null;
  setProfile: (user: IProfile) => void;
  loading: boolean;
}

interface AuthProvider {
  children: React.ReactNode;
}

export interface Account extends User {
  firstName: string;
  lastName: string;
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const AuthContext = createContext<IAuthContext>(undefined!);

export const AuthProvider = ({ children }: AuthProvider) => {
  const [user, setUser] = useState<IAuthContext["user"]>(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<IAuthContext["profile"]>(null);

  useEffect(() => {
    // Callback is ran:
    // When firebase auth has loaded
    // When we have a user
    // When the user logs out
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const documentRef = doc(db, "profiles", user.uid);
        const profileSnapshot = await getDoc(documentRef);
        const profile = {
          ...profileSnapshot.data(),
        } as IProfile;
        setProfile(profile);

        //Profile
      } else {
        setUser(null);
      }

      setLoading(false);
    });

    () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, profile: profile, setProfile: setProfile, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
export const useUser = () => useAuthContext().user;
export const useProfile = () => useAuthContext().profile;
export const useLoading = () => useAuthContext().loading;
