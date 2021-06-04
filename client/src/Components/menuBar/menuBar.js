import React from 'react';
import './menuBar.css';


const MenuBar = () => {
    return (
    <div className="menu-bar">
        <nav>
        <ul>
            <li><button onClick={(event) => {console.log(event)}}>VIVO</button></li>
            <li><button onClick={(event) => {console.log(event)}}>CLARO</button></li>
            <li><button onClick={(event) => {console.log(event)}}>OI</button></li>
            <li><button onClick={(event) => {console.log(event)}}>TIM</button></li>
            <li><button onClick={(event) => {console.log(event)}}>TODAS</button></li>
        </ul>
        </nav>
    </div>
    )
}

export default MenuBar;
