import React from 'react';
import PersonIcon from '@mui/icons-material/Person';
import BugReportIcon from '@mui/icons-material/BugReport';
import '../Styles/styleHome.css';




export default function Home(){

    return(
        <div className='bloc'>
            <div className='second-bloc'>
                <div className='iconHome' id='firstIcon'>
                <a href="/login">
                    <PersonIcon style={{ fontSize: 100 }}
                                // style={{ color: 'rgb(170, 61, 1)' }}                        
                                >
                    </PersonIcon>
                </a>
                </div>
                <div className='iconHome' id='secondIcon'>
                <a href="/reportBug">
                    <BugReportIcon style={{ fontSize: 100 }}>
                    </BugReportIcon>
                    </a>
                </div>
            </div>
        </div>
    );
}