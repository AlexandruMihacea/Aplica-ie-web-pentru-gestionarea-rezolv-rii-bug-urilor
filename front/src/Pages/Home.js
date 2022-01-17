import React from 'react';
import PersonIcon from '@mui/icons-material/Person';
import BugReportIcon from '@mui/icons-material/BugReport';
import '../Styles/styleHome.css';
import { color } from '@mui/system';




export default function Home(){

    return(
        <div className='bloc'>
            <div className='second-bloc'>
                <div className='iconHome' id='firstIcon'>
                <a href="/login">
                    <PersonIcon style={{ fontSize: 100, color: '#171820' }}>
                    </PersonIcon>
                </a>
                </div>
                <div className='iconHome' id='secondIcon'>
                <a href="/TesterPage">
                    <BugReportIcon style={{ fontSize: 100, color: '#171820'}}>
                    </BugReportIcon>
                    </a>
                </div>
            </div>
        </div>
    );
}