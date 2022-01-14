import React, { useState, useEffect } from 'react';
import '../Styles/styleLogIn.css'
import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
      color: '#fdc029',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#171820',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#aa3d01',
      },
      '&:hover fieldset': {
        borderColor: '#fdc029',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#171820',
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
  

export default function LogIn(){
  const [input, setInput] = useState("");
  const [password, setPassword]= useState("");
  const [acces, setAcces] = useState(false); //grant acces to userPage
  
  const handleUsername = (event) => {
      setInput(event.target.value);
  }

  const handlePassword = (event) => {
    setPassword(event.target.value);
  }

  const submitAction = () => {
    
  }
    return(
        <div className='form'>
                <div>
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
                </Box>
                </div>

                <div>
                <Stack direction="row" spacing={2}>
                <Button variant="contained" color="success" onClick={submitAction}>
                  LogIn
                </Button>
                </Stack>
                </div>

                <div>
                <a className='create' href="/register">Creaza-ti cont!</a>
                </div>
        </div>
    )
}