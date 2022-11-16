import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ContactProvider } from "./context/ContactContext";
import { AuthProvider } from "context/AuthContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ContactProvider>
          <App />
        </ContactProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
