import React, { useState } from 'react';
import './menuBar.css';
import { GoogleLogin, GoogleLogout } from 'react-google-login';

const MenuBar = ({getEntries, setProfile, profile}) => {
    const successGoogle = (res) => {
        console.log(res.profileObj);
        setProfile(res.profileObj);
    }
    const failureGoogle = (err) => {
        console.error(err);
    }
    return (
    <div className="menu-bar">
        <div className="login google">
        {
            !profile ? (
                <div className="profile">
                    <GoogleLogin
                        clientId="562104988787-or106pv00a7glumsd7sh81h33i2ruevu.apps.googleusercontent.com"
                        buttonText="Login"
                        onSuccess={successGoogle}
                        onFailure={failureGoogle}
                        isSignedIn={true}
                        cookiePolicy={'single_host_origin'}
                        className="loginBtn"
                    />
                </div>
            ) : (
                <div className="profile">
                    <img src={profile.imageUrl} alt="User's Profile"></img>
                    <div className="info">
                        <p>{profile.name}</p>
                        <GoogleLogout
                            clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                            buttonText="Logout"
                            onLogoutSuccess={()=>{setProfile(null)}}
                            className="logoutBtn"
                        >
                        </GoogleLogout>
                    </div>
                </div>
            )
        }
        </div>
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
