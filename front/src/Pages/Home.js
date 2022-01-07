import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AccessibleIcon from '@mui/icons-material/Accessible';


export default function Home(){

    return(
        <div>
            <a href="/login">User</a>
           <a href="/reportBug">Tester</a>
           <AccessibleIcon></AccessibleIcon>
        </div>
    );
}