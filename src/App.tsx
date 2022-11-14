import React from "react";
import { Route, Routes } from "react-router-dom";
import Appointments from "./pages/Appointments";
import Contacts from "./pages/Contacts";
import Messages from "./pages/Messages";
import Navbar from "./components/Navbar";
import { useAuthContext } from "context/AuthContext";
import AuthPage from "components/AuthPage";
import { auth } from "firebase-config";

const App = () => {
  const { user } = useAuthContext();
  return (
    <>
      {user ? (
        <>
          <div className="container mx-auto  ">
            <div className="flex justify-end">
              <button onClick={() => auth.signOut()} className="cursor-pointer">
                Log Out
              </button>
            </div>
            <Routes>
              <Route path="/" element={<Contacts />} />
              <Route path="/messages" element={<Messages />} />
              <Route
                path="/appointments"
                element={<Appointments navn={"Anders"} />}
              />
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
