import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import axios from "axios"
import Typography from '@mui/material/Typography';

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

export default function SolveBug({ closeModal, click, id_user, id_bug }) {
    const [commit, setCommit] = useState("");
    
    const handleChange = (event) => {
        setCommit(event.target.value);
    };

    const updateData = () => {
        //post cu commit link
        if(commit!=""){
            axios.put(`http://localhost:7000/app/bugs/${id_bug}`, { commit: commit })
            .then((response) => {
              console.log(response.data);
            })
        }
        closeModal();
    }

    if (click) {
        return (
            <div>
                <Box sx={style}>
                    <Typography id="transition-modal-title" variant="h6" component="h2">
                        Solve bug
                    </Typography>
                    <div className='bugInput'>
                        <input type='text' placeholder='Commit' onChange={handleChange}></input>
                    </div>
                    <button type='submit' onClick={updateData}>Send</button>
                    <button type='close' onClick={closeModal}>Close</button>
                </Box>

            </div>
        );
    } else {
        return(
            <div>..........</div>
        )
    }
}