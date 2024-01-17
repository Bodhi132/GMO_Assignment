import { useNavigate, useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';
import { Stack } from '@mui/material';
import { useAlertContext } from '../context/AlertContext';
import { useModifyContext } from '../context/ModifyContext';

const Navigations_Button = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const {setAlert} = useAlertContext();
  const {modify} = useModifyContext()


  return (
    <Stack direction="row" spacing={2}>
      <Button variant="contained" onClick={() => navigate(-1)} disabled={location.pathname === '/'}>Previous Page</Button>
      <Button variant="contained" disabled={location.pathname === '/display'}
        onClick={(e) => {
          e.preventDefault()
          if (modify) {
            setAlert(true)
            return;
          }
          else
            navigate(1)
        }}
      >Next Page</Button>
    </Stack>
  );
}

export default Navigations_Button