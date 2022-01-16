import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

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
        <>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <h1>Project details...</h1>
                <TextField
                    id="outlined-uncontrolled"
                    label="Proj. name"
                    defaultValue=""
                    onChange={handleNameChange}
                />
                <TextField
                    id="outlined-uncontrolled"
                    label="Repository"
                    onChange={handleRepoChange}
                    defaultValue=""
                />
                <Button variant="contained" onClick={handleclick}>Select team</Button>
                <Button variant="contained" onClick={projSend} style={{ background: "green" }}>Create project</Button>
            </Box>
            <div className="form-team">
                {teamShow ? <Team _name={name} _repo={repo} submit={click} _id_admin={id} /> : null}
            </div>


        </>
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

