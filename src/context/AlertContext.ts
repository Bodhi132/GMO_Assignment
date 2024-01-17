import React, { createContext,useContext } from "react";

export type AlertContextType = {
  alert: boolean;
  setAlert: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AlertContext = createContext<AlertContextType>({
    alert: false,
    setAlert: () => {},
    })

export const useAlertContext = () => useContext(AlertContext)