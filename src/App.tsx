import React from "react";
import { Route, Routes } from "react-router-dom";
import Appointments from "./components/Appointments";
import Contacts from "./components/Contacts";
import Messages from "./components/Messages";
import Navbar from "./components/Navbar";

type Props = {};

const App = (props: Props) => {
  return (
    <>
      <div className="container mx-auto  ">
        {/* <div className="border border-radix-mauve3  m-4"> */}
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
  );
};

export default App;
