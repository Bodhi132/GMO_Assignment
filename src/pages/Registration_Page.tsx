import React, { useState, useEffect } from 'react'
import { Button, TextField, InputLabel, Stack, Box } from '@mui/material';
import './Styles/registration_page.css'
import { useNavigate } from "react-router-dom";
import { useAlertContext } from '../context/AlertContext';
import Alert from '@mui/material/Alert';
import { useModifyContext } from '../context/ModifyContext';

const Registration_Page = () => {

    const userDetails = localStorage.getItem('user_details');
    const parsedUserDetails = userDetails ? JSON.parse(userDetails) : null;

    const { alert,setAlert } = useAlertContext();
    const {setModify} = useModifyContext()

    const [name, setName] = useState(parsedUserDetails ? parsedUserDetails.name : '');
    const [email, setEmail] = useState(parsedUserDetails ? parsedUserDetails.email : '');
    const [phone, setPhone] = useState(parsedUserDetails ? parsedUserDetails.phone : '');

    const navigate = useNavigate();

    useEffect(() => {
        localStorage.setItem('user_details', JSON.stringify({ name, email, phone }));
    }, [name, email, phone]);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setAlert(false)
        setModify(false)
        localStorage.setItem('user_details', JSON.stringify({ name, email, phone }));
        navigate('/display')

    };

    return (
        <>
            {alert && <Alert severity="warning" style={{marginBottom:'2rem'}}>
               Enter Proper Details and Press Submit to Proceed Further
            </Alert>
            }
            <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                border="solid"
                padding="5rem"
                borderRadius="2rem"
                marginBottom="2rem"
            >
                <form onSubmit={handleSubmit}>
                    <Stack spacing={2} direction="column">
                        <div className='input_styles'>
                            <InputLabel>Username</InputLabel>
                            <TextField
                                label="Name"
                                value={name}
                                onChange={(e) => {
                                    setModify(true)
                                    setName(e.target.value)
                                }}
                                required
                            />
                        </div >
                        <div className='input_styles'>
                            <InputLabel>Email</InputLabel>
                            <TextField
                                label="Email"
                                type='email'
                                value={email}
                                onChange={(e) => {
                                    setModify(true)
                                    setEmail(e.target.value)
                                }}
                                required
                            />
                        </div>
                        <div className='input_styles'>
                            <InputLabel>Phone Number</InputLabel>
                            <TextField
                                label="Phone"
                                value={phone}
                                type='tel'
                                inputMode='numeric'
                                onChange={(e) => {
                                    setModify(true)
                                    const value = e.target.value;
                                    if (/^\d*$/.test(value)) {
                                        setPhone(value);
                                    }
                                }}
                                required
                            />
                        </div>
                        <Button type="submit" variant="contained">Submit</Button>
                    </Stack>
                </form>
            </Box>
        </>
    )
}

export default Registration_Page