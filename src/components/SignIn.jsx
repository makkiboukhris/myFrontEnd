import React, { useEffect, useState } from "react";
import { getProfile, signin } from "../JS/actions/index";
import logo from "../res/logo.svg";
import { Redirect, withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./Loading";

const SignIn = (props) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.userReducer.loading);
  const userType = useSelector((state) => state.userReducer.userType);
  const errors = useSelector((state) => state.userReducer.errors);
  const isAuth = useSelector((state) => state.userReducer.isAuth);
  const user = useSelector((state) => state.userReducer.user);
  const emailexist = useSelector(state => state.userReducer.emailexist)

  const [secondStep, setSecondStep] = useState(false);
  const [nameNotEmpty, setNameNotEmpty] = useState(false);
  const [famNameNotEmpty, setFamNameNotEmpty] = useState(false);
  const [validPassword, setValidPassword] = useState();
  const [validEmail, setValidEmail] = useState();
  const [VerifyYourPassword, setVerifyYourPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [familyName, setFamilyName] = useState("");



  useEffect(() => {
    dispatch(getProfile());
  }, [userType]);

  useEffect(()=>{
    setSecondStep(false)
  },[emailexist])



  const gotoSecondStep = () => {
    if (password !== ConfirmPassword) {
      setVerifyYourPassword(true);
    } else if (
      !name ||
      !familyName ||
      !email ||
      !validEmail ||
      !validPassword ||
      !password
    ) {
      console.log("error");
    } else if (errors === "user already exist!") {
      setSecondStep(false);
    } else {
      setSecondStep(true);
    }
  };

  const handleCustomer = () => {
    dispatch(
      signin({
        name,
        familyName,
        email,
        password,
        userType: "CUSTOMER",
      })
    );
  };

  const handleWorker = () => {
    dispatch(
      signin({
        name,
        familyName,
        email,
        password,
        userType: "FREELANCER",
      })
    );
  };

  const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(email.toLowerCase())) {
      setEmail(email);
      setValidEmail(true);
    } else {
      setValidEmail(false);
    }
  };

  const validatePassword = (str) => {
    // at least one number, one lowercase and one uppercase letter
    // at least 8 characters
    var re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    if (re.test(str)) {
      setPassword(str);
      setValidPassword(true);
    } else {
      setValidPassword(false);
    }
  };

  const verifyName = (str) => {
    if (str === "") {
      setNameNotEmpty(true);
    } else {
      setNameNotEmpty(false);
    }
  };

  const verifyFamName = (str) => {
    if (str === "") {
      setFamNameNotEmpty(true);
    } else {
      setFamNameNotEmpty(false);
    }
  };

  return (
    <div className="SIGNIN">
      {/* {console.log('userType',userType )} */}
      {/* {console.log('errors', emailexist)} */}
      {/* {console.log('isAuth', isAuth)} */}
      {/* {console.log('userType', userType)} */}

      <br />
      <img onClick={() => props.history.push("/")} src={logo} alt="" />
      
        {loading ? (
          <Loading />
        ) : isAuth ? (
          user.userType === "CUSTOMER" ? (
            <Redirect to="/dashboard" />
          ) : (
            <Redirect to="/ProfileMaking" />
          )
        ) : secondStep === false ? (
          <div className="INPUTSS">
            <h1>S'inscrire</h1>
            <p>Votre Nom:</p>
            <input
              defaultValue={name}
              className="fullname"
              type="text"
              placeholder="Prénom"
              onChange={(e) => setName(e.target.value)}
              onBlur={(e) => verifyName(e.target.value)}
            />

            <input
              defaultValue={familyName}
              className="fullname"
              type="text"
              placeholder="Nom"
              onChange={(e) => setFamilyName(e.target.value)}
              onBlur={(e) => verifyFamName(e.target.value)}
            />
            <h6
              className={
                famNameNotEmpty || nameNotEmpty ? "alertmessages" : "none"
              }
            >
              Ce champ est obligatoire
            </h6>

            <p>Votre E-Mail:</p>
            <input
              defaultValue={email}
              type="email"
              placeholder="E-Mail"
              onBlur={(e) => validateEmail(e.target.value)}
            />
            <h6 className={validEmail === false ? "alertmessages" : "none"}>
              E-Mail Invalide!
            </h6>
            <h6
              className={
                emailexist ? "alertmessages" : "none"
              }
            >
              Ce email est déja pris
            </h6>

            <p>Mot De Passe:</p>
            <input
              defaultValue={password}
              type="password"
              placeholder="Mot De Passe"
              onBlur={(e) => validatePassword(e.target.value)}
            />
            <h6 className={validPassword === false ? "alertmessages" : "none"}>
              Mot De passe Trés faible: utilisez des numéros des lettres
              majuscules et miniscules!
            </h6>
            <h6 className={validPassword === false ? "alertmessages" : "none"}>
              Mot De Passe doit avoir au moins 8 caractères!
            </h6>
            <p>Confirmer Votre Mot De Passe:</p>
            <input
              defaultValue={ConfirmPassword}
              type="password"
              placeholder="Mot De Passe"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <h6 className={VerifyYourPassword ? "alertmessages" : "none"}>
              Vérifiez Votre Mot De passe
            </h6>
            <h2 onClick={() => gotoSecondStep()}>continuer</h2>
            <h3 onClick={() => props.history.push("/")} className="RetourBTN">
              Retour
            </h3>
          </div>
        ) : (
          <div className="box-ClaasifyUsers">
            <h1>question?</h1>
            <h2
              onClick={() => {
                handleCustomer();
                gotoSecondStep();
              }}
            >
              client
            </h2>
            <h2
              onClick={() => {
                handleWorker();
                gotoSecondStep();
              }}
            >
              freelancer
            </h2>
          </div>
        )}
      
    </div>
  );
};

export default withRouter(SignIn);
