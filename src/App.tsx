import React from "react";
import { Route, Routes } from "react-router-dom";
import Appointments from "./pages/Appointments";
import Contacts from "./pages/Contacts";
import Messages from "./pages/Messages";
import Navbar from "./components/Navbar";
import { useAuthContext } from "context/AuthContext";
import AuthPage from "components/AuthPage";
import { auth } from "firebase-config";
import { CgProfile } from "react-icons/cg";
import Profile from "pages/Profile";
import { Link } from "react-router-dom";

const App = () => {
  const { profile, user } = useAuthContext();
  return (
    <>
      {user ? (
        <>
          <div className="container mx-auto">
            <div className="flex items-center text-radix-mauve11 py-2 mx-1 md:mx-0">
              <Link
                className="flex items-center gap-1 hover:text-radix-violet11 hover:scale-110 transition-all"
                to="/profile"
              >
                <CgProfile />
                <span>{profile?.firstName}</span>
              </Link>
              <button
                onClick={() => auth.signOut()}
                className="cursor-pointer mauve-cta-int p-1 border mauve-border-int ml-auto text-sm rounded-md"
              >
                Log Out
              </button>
            </div>
            <Routes>
              <Route path="/" element={<Contacts />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/appointments" element={<Appointments />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </div>

          <Navbar />
        </>
      ) : (
        <AuthPage />
      )}
    </>
  );
};

export default App;
