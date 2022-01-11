import React, { useState, useEffect } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
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

export default function FormBug({handleonClose, status}) {
  const [visibility, setStatus] = useState(false);
  const openHandle = () => setStatus(true);
  const handleClose = () => setStatus(false);

  return (
    <div>
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
            <input type='text' placeholder='id'></input>
            <input type='text' placeholder='Severitate'></input>   {/* Combo - mediun, high, low*/}
            <input type='text' placeholder='Prioritate'></input>   {/* Combo - mediun, high, low*/}
            <input type='text' placeholder='Descriere'></input>
            <input type='text' placeholder='Link'></input>
            </div>
            <button type='submit'>Send</button>
            <button type='close'>Close</button>
          </Box>
        </Fade>
      </Modal>
      {/* <button onClick={handleOpen}>CeFaci</button> */}
    </div>
  );
}