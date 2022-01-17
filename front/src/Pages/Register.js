import React, { useState, useEffect } from 'react';
import axios from "axios"
import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#171820',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#171820',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#171820',
    },
    '&:hover fieldset': {
      borderColor: '#fdc029',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#fdc029',
    },
  },
});

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
    border: '1px solid #ced4da',
    fontSize: 16,
    width: 'auto',
    padding: '10px 12px',
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}));

const RedditTextField = styled((props) => (
  <TextField InputProps={{ disableUnderline: true }} {...props} />
))(({ theme }) => ({
  '& .MuiFilledInput-root': {
    border: '1px solid #e2e2e1',
    overflow: 'hidden',
    borderRadius: 4,
    backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),
    '&:hover': {
      backgroundColor: 'transparent',
    },
    '&.Mui-focused': {
      backgroundColor: 'transparent',
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
      borderColor: theme.palette.primary.main,
    },
  },
}));

const ValidationTextField = styled(TextField)({
  '& input:valid + fieldset': {
    borderColor: 'green',
    borderWidth: 2,
  },
  '& input:invalid + fieldset': {
    borderColor: 'red',
    borderWidth: 2,
  },
  '& input:valid:focus + fieldset': {
    borderLeftWidth: 6,
    padding: '4px !important', // override inline-style
  },
});


export default function Register() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const navigate = useNavigate();
  const [redirect, setRedirect] = useState(false);
  //const [message, setMessage] = useState("hi");
  //const [error, setError] = useState();

  const handleUsername = (event) => {
    setUsername(event.target.value);
  }
  const handlePassword = (event) => {
    setPassword(event.target.value);
  }
  const handleEmail = (event) => {
    setEmail(event.target.value);
  }

  const register = () => {

    axios.post("http://localhost:7000/app/users", { username: username, password: password, email: email })
      .then((response) => {
        navigate(`/userPage/:${response.data.id}`);
      })
      //handler errori idk cum
  }

  return (
    <div className='form'>
      <Box
        component="form"
        noValidate
        sx={{
          display: 'grid',
          gridTemplateRow: { sm: '1fr 1fr' },
          gap: 2,
        }}
      >
        <CssTextField label="Nume" onChange={handleUsername} id="custom-css-outlined-input" />
        <CssTextField label="Password" onChange={handlePassword} id="custom-css-outlined-input" />
        <CssTextField label="Email" onChange={handleEmail} id="custom-css-outlined-input" />
      </Box>
      <div>
        <Button variant="contained" color="success" onClick={register}>
            Register
          </Button>
      </div>
    </div>
  )
}

