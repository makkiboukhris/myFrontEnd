import React, { useEffect, useState } from 'react'
import logo from '../res/logo.svg'
import { Redirect, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile, Login } from '../JS/actions';

const LogIn = (props) => {

    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
 
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.userReducer.loading);
    const error = useSelector((state) => state.userReducer.errors);
    const wrongcred = useSelector(state => state.userReducer.wrongcred)
    const isAuth = useSelector((state) => state.userReducer.isAuth);
    const token = useSelector(state => state.userReducer.token)

    useEffect(() => {
        dispatch(getProfile());
      }, [token]);

    const SECONNECTER = async() =>{ 
        const cred = {email,password}
        dispatch(
            Login(cred)
        )
    }

    return (<div className="LOGIN">
        <br />
        <img onClick={() => props.history.push("/")} src={logo} alt="" />
        <div className="INPUTS">
            {
                 loading ? (
                    <h1>please wait ....</h1>
                  ):isAuth ? (
                    <Redirect to='/Dashboard' />
                  ) :
                    (
                <div>
                    <h1>Se Connecter</h1>
                    <h6>vous n'êtes pas encore inscrit? </h6> <h6 onClick={() => props.history.push("/SignIn")} id="LinkToSignIn">Inscrivez vous!</h6>
                    <p>Votre E-Mail:</p>
                    <input type="email" placeholder="E-Mail" onChange={(e)=>setemail(e.target.value)}/>
                    <p>Mot De Passe:</p>
                    <input type="password" placeholder="Mot De Passe" onChange={(e)=>setpassword(e.target.value)} />
                    <h5 className={wrongcred ? "alertmessages" : "none"}> Vérifiez votre mot de passe </h5>
                    <h2 onClick={SECONNECTER}>Se connecter</h2>
                    <h3 onClick={()=>props.history.push('/')} className="RetourBTN">Retour</h3>
                </div>
                  )
            } 
        </div>

    </div>);
    }

    export default withRouter(LogIn);