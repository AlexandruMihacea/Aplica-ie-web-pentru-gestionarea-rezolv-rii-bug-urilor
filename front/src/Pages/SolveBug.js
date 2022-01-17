import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
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

export default function SolveBug({ click }) {
    const [visibility, setVisibility] = useState({click});
    if (click) {
        return (
            <div>
                <Box sx={style}>
                    <Typography id="transition-modal-title" variant="h6" component="h2">
                        Solve bug
                    </Typography>
                    <div className='bugInput'>
                        <input type='text' placeholder='Commit'></input>
                        <input type='text' placeholder='Status'></input>
                    </div>
                    <button type='submit'>Send</button>
                    <button type='close'>Close</button>
                </Box>

            </div>
        );
    } else {
        return(
            <div></div>
        )
    }
}