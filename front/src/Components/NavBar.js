import * as React from 'react';
import '../Styles/styleNavBar.css';
import logo from '../Photo/Logo2.png';


export default function DenseAppBar() {
  return (
   <div className='nav'>
     <a href='/'>
     <img className='logo' src={logo} alt='Logo'/>
     </a>
      
   </div>
  );
}