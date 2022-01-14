import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';


//TODO: id_admin e harcodat, trebuie rezolvat login-ul 
//TODO: validations missing

export default function StateTextFields() {
    const [name, setName] = useState(); //nume proiect
    const [repo, setRepo] = useState(); //repo
    const [click, setClick] = useState(); //submit action
    const [teamShow, setTeamShow] = useState(false); //adaugare echipa action 

    //setez nume
    const handleNameChange = (event) => {
        setName(event.target.value);
    };
    //setez repo
    const handleRepoChange = (event) => {
        setRepo(event.target.value);
    };

    //confirm submit
    const projSend = () => {
        setClick(true);
    };
    //afisez componenta de adaugare echipa
    const handleclick = () => {
        setTeamShow(teamShow ? false : true);
    };

    // useEffect(() => {
    //     console.log("rendered")
    // }, [teamShow])

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
                {teamShow ? <Team name={name} repo={repo} submit={click} /> : null}
            </div>


        </>
    );
}


const Team = ({ name, repo, submit }) => {
    const [team, setTeam] = useState([]); //output autocomplete
    const [user, setUsers] = useState([]); //array de users pentru autocomplete
    const [message, setMessage]=useState(); //mesaj de pe server, daca e ok totul
    
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

    //post proiect nou
    useEffect(() => {
        if (submit === true) {
            const members = team.map(m => m.id)
            const id_admin = 5;
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id_admin, name, repo, members })
            }
            fetch("http://localhost:7000/app/projects", requestOptions)
                .then(response=> response.json())
                .then(data=> setMessage(data.message))
        }
    }, [submit])

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

