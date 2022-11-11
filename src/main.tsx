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
      <ContactProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ContactProvider>
    </BrowserRouter>
  </React.StrictMode>
);
