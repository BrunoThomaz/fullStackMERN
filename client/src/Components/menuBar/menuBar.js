import React from 'react';
import { listLogEntries } from '../../API';

import './menuBar.css';


const MenuBar = ({getEntries}) => {
    return (
    <div className="menu-bar">
        <nav>
        <ul>
            <li><button onClick={()=>{getEntries('vivo')}}>VIVO</button></li>
            <li><button onClick={()=>{getEntries('claro')}}>CLARO</button></li>
            <li><button onClick={()=>{getEntries('oi')}}>OI</button></li>
            <li><button onClick={()=>{getEntries('tim')}}>TIM</button></li>
            <li><button onClick={()=>{getEntries('all')}}>TODAS</button></li>
        </ul>
        </nav>
    </div>
    )
}

export default MenuBar;
