import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Stack from '@mui/material/Stack';
///// Text Field


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

  //////////



//TODO: validations missing

export default function StateTextFields() {
    const [name, setName] = useState(); //nume proiect
    const [repo, setRepo] = useState(); //repo
    const [click, setClick] = useState(false); //submit action
    const [teamShow, setTeamShow] = useState(false); //adaugare echipa action 
    const navigate = useNavigate();
    let { id} = useParams();
    
    //setez nume
    const handleNameChange = (event) => {
        setName(event.target.value);
    };
    //setez repo
    const handleRepoChange = (event) => {
        setRepo(event.target.value);
    };

    //kill me daca se face create proj fara team, desi mi se pare o prostie
    const projSend = () => {
        if(teamShow==false){
            axios.post("http://localhost:7000/app/projects",
            {
                id_admin: id, name: name, repo: repo
            })
            .then((response) => { navigate(`/userPage/:${id}`) })
        }
        else {
            setClick("send");
        }
    };
    //afisez componenta de adaugare echipa
    const handleclick = () => {
        setTeamShow(teamShow ? false : true);
    };

    return (
        <div className='form'>
            <h1>Project details...</h1>
            <Box
                component="form"
                noValidate
                sx={{
                    display: 'grid',
                    gridTemplateColumns: { sm: '1fr 1fr' },
                    gap: 2,
                }}
            >
                
                 <CssTextField label="Project Name" id="custom-css-outlined-input" onChange={handleNameChange}/>
                 <CssTextField label="Repository" id="custom-css-outlined-input"  onChange={handleRepoChange}/>
                </Box>
                <Stack direction="row" spacing={2} sx={{ display: 'flex', justifyContent: 'center'}} >
                            <Button variant="contained" color="success" onClick={handleclick}>
                                Select Team
                            </Button>
                            <Button variant="outlined" color="error" onClick={projSend}>
                                Create Project
                            </Button>
                 </Stack>

            <div className="form-team">
                {teamShow ? <Team _name={name} _repo={repo} submit={click} _id_admin={id} /> : null}
            </div>


        </div>
    );
}


const Team = ({ _name, _repo, submit, _id_admin }) => {
    const [team, setTeam] = useState([]); //output autocomplete
    const [user, setUsers] = useState([]); //array de users pentru autocomplete
    const [message, setMessage] = useState(); //mesaj de pe server, daca e ok totul
    const navigate = useNavigate();
    let _team;
    //ia users de pe server
    useEffect(() => {
        fetch("http://localhost:7000/app/users")
            .then(res => res.json())
            .then(setUsers)
            .catch(console.error)
    }, [])

    //adauga membrii de echipa
    const handleChange = (event, value, reason) => {
        setTeam(value)
    }

    //ma asigur ca trimit doar cand s-a facut click pe create proj si nu cand s a randat prima data componenta
    useEffect(() => {
        if(submit=="send") {
            postProj();
            navigate(`/userPage/:${_id_admin}`);
        }
    }, [submit])

    //am luat doar id-urile pentru ca asa e facut serverul
    const tranform = () => {
        _team  = team.map(t => t.id);
    }

    //post new proj
    const postProj = () => {
        tranform();
        axios.post("http://localhost:7000/app/projects",
            {
                id_admin: _id_admin, name: _name, repo: _repo, team: _team
            })
            .then((response) => { console.log(response) })
    }

    return (
        <>
            <Autocomplete
                multiple
                id="size-small-standard-multi"
                size="small"
                options={user}
                getOptionLabel={(option) => option.username}
                onChange={handleChange}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="standard"
                        label="Team members"
                        placeholder="Choose"
                    />
                )}
            />
        </>
    )
}

