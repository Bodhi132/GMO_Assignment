import './App.css'
import { useState } from 'react';
import {
  Routes,
  Route,
} from "react-router-dom";
import Registration_Page from './pages/Registration_Page';
import Display_Page from './pages/Display_Page';
import Navigations_Button from './components/Navigations_Button';
import { AlertContext, AlertContextType } from './context/AlertContext';
import { ModifyContext, ModifyContextType } from './context/ModifyContext';

function App() {

  const [alert, setAlert] = useState<boolean>(false);
  const [modify, setModify] = useState<boolean>(false)

  const alertContextValue: AlertContextType = {
    alert,
    setAlert,
  };
  const modifyContextValue: ModifyContextType = {
    modify,
    setModify,
  };

  return (
    <ModifyContext.Provider value={modifyContextValue}>
      <AlertContext.Provider value={alertContextValue}>
        <Routes>
          <Route path="/" element={<><Registration_Page /><Navigations_Button /></>} />
          <Route path="display/*" element={<><Display_Page /><Navigations_Button /></>} />
        </Routes>
      </AlertContext.Provider>
    </ModifyContext.Provider>

  )
}

export default App
