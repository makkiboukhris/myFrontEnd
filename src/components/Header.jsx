import React from 'react';
import logo from '../res/logo.svg';
import { withRouter } from 'react-router-dom';
const Header = (props) => {
    return ( 
    <div className="navbar">
    <img src={logo} alt="" onClick={()=>props.history.push("/")}/>
    <ul >
        <li id="Propos">à Propos</li>
        <li className="navlinks">Comment ça marche</li>
        <li onClick={()=>props.history.push("/LogIn")} className="navlinks">Se Connecter</li>
        <li onClick={()=>props.history.push("/SignIn")} ><button id="signin">S'inscrire</button></li>
    </ul>
    </div> 
    );
}

export default withRouter(Header);