import React, { createContext,useContext } from "react";

export type ModifyContextType = {
  modify: boolean;
  setModify: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ModifyContext = createContext<ModifyContextType>({
    modify: false,
    setModify: () => {},
    })

export const useModifyContext = () => useContext(ModifyContext)