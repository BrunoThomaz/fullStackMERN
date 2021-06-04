import React from 'react';
import './menuBar.css';


const MenuBar = () => {
    return (
    <div className="menu-bar">
        <nav>
        <ul>
            <li><button onClick={(event) => {console.log(event)}}>Vivo</button></li>
            <li><button onClick={(event) => {console.log(event)}}>Claro</button></li>
            <li><button onClick={(event) => {console.log(event)}}>Oi</button></li>
            <li><button onClick={(event) => {console.log(event)}}>Tim</button></li>
            <li><button onClick={(event) => {console.log(event)}}>Todas</button></li>
        </ul>
        </nav>
    </div>
    )
}

export default MenuBar;
