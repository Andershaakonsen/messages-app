import "notyf/notyf.min.css";
import { Notyf } from "notyf";
import { createContext, useContext } from "react";

const ToastContext = createContext(
  new Notyf({
    position: { x: "center", y: "bottom" },
  })
);

export const useToast = () => useContext(ToastContext);
