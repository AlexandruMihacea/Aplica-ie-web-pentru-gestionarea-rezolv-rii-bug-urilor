import React, { useState, useEffect } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


//TextField

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

////////



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function FormBug({handleonClose, status}) {
  const [visibility, setStatus] = useState(false);
  const [severity, setSeverity] = React.useState('');
  const [priority, setPriority] = React.useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [idApp, setIdApp] = useState('');
  const navigate = useNavigate();

  const handleClose = () => setStatus(false);

  const openHandle = () => setStatus(true);

  const handleIdApp = (event) => {
    setIdApp(event.target.value);
  }

  const handleLink = (event) => {
    setLink(event.target.value);
  }
 
 const handleDescription = (event) => {
   setDescription(event.target.value);
 }

  const handleSeverity = (event) => {
    setSeverity(event.target.value);
  };

  const handlePriority = (event) => {
    setPriority(event.target.value);
  };

  const register = () =>{

  axios.post("http://localhost:7000/app/bugs", {severitate: severity, prioritate: priority, descriere: description, link: link, id_app: idApp})
    .then(() =>{
      navigate('/');
    })
  }

  return (
    <div className='report'>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={status}
        onClose={handleonClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        handleClick={openHandle}
      >
        <Fade in={status}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Report a Bug
            </Typography>
        <div className='bugInput'>
          <Box
              component="form"
              noValidate
              sx={{
                display: 'grid',
                gridTemplateRow: { sm: '1fr 1fr' },
                gap: 2,
              }}
          >
              <CssTextField label="Id Project"  id="custom-css-outlined-input" onChange={handleIdApp}/>
              <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Severity</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={severity}
                      label="Severity"
                      onChange={handleSeverity}
                    >
                     
                      <MenuItem value={'Hight'}>High</MenuItem>
                      <MenuItem value={'Medium'}>Medium</MenuItem>
                      <MenuItem value={'Low'}>Low</MenuItem>
                    </Select>
                  </FormControl>
              </Box>

              <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Priority</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={priority}
                      label="Severity"
                      onChange={handlePriority}
                    >
                     
                      <MenuItem value={'Hight'}>High</MenuItem>
                      <MenuItem value={'Medium'}>Medium</MenuItem>
                      <MenuItem value={'Low'}>Low</MenuItem>
                    </Select>
                  </FormControl>
              </Box>
              <CssTextField label="Description"  id="custom-css-outlined-input" onChange={handleDescription}/>
              <CssTextField label="Link"  id="custom-css-outlined-input" onChange={handleLink}/>

          </Box>
        </div>
        
            <Stack direction="row" spacing={2}>
              <Button variant="contained" color="success" onClick={register}>
              Send
              </Button>
            </Stack>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}