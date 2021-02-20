import React, { useEffect } from "react";
import logo from "../res/logo.svg";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, logout } from "../JS/actions";
const Header = (props) => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.userReducer.isAuth);
  const loggedOut = useSelector(state => state.userReducer.loggedOut)
  useEffect(() => {
    dispatch(getProfile());
  }, [loggedOut]);
  return (
    <div className="navbar">
      <img src={logo} alt="" onClick={() => props.history.push("/")} />
      {isAuth ? (
        <ul className="loggedin-links">
          <li className="navlinks" onClick={()=>props.history.push("/dashboard")}>Dashboard</li>
          <div className="menu">
          <div className="customer-image-header">
            <h1> {isAuth.name[0].toUpperCase()} </h1>
          </div>
          <ul className="dropdown-menu">
            <li>Dashboard</li>
            <li>Notifications</li>
            <li>Comment ça marche</li>
            <li>Modifier mon profile</li>
            <li className="logout-link" onClick={()=>{
              dispatch(logout())
              console.log('hi')
              }}>Se déconnecter</li>
          </ul>
          </div>
        </ul>
      ) : (
        <ul className="links-header">
          <li id="Propos">à Propos</li>
          <li className="navlinks">Comment ça marche</li>
          <li onClick={() => props.history.push("/LogIn")} className="navlinks">
            Se Connecter
          </li>
          <li onClick={() => props.history.push("/SignIn")}>
            <button id="signin">S'inscrire</button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default withRouter(Header);
