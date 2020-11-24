import React, { useEffect } from "react";
import logo from "../res/logo.svg";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import { useState } from "react";
import Step1 from "./profileMaking-steps/step1.jsx";
import Step2 from "./profileMaking-steps/step2";
import Step3 from "./profileMaking-steps/step3";
import Step4 from "./profileMaking-steps/step4";
import FinalStep from "./profileMaking-steps/finalstep";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, updateFreelancer } from "../JS/actions";
import { Redirect, withRouter } from "react-router-dom";

function getSteps() {
  return ["Domaine", "à Propos", "Packs", "Description Du Service"];
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

const ProfileMaking = (props) => {

  const loading = useSelector((state) => state.userReducer.loading);
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.userReducer.isAuth);
  const user = useSelector((state) => state.userReducer.user);
  const condition = useSelector((state) => state.userReducer.condition);
  const userID = useSelector((state) => state.userReducer.userID);
  const uploadedUser = useSelector((state) => state.userReducer.uploadedUser);
  const uploadErrors = useSelector((state) => state.userReducer.uploadErrors);
  
  useEffect(() => {
    dispatch(getProfile());
  }, [uploadedUser]);

  // HOOKS

  const [ServiceDescription, setServiceDescription] = useState("");
  const [Userspecialty, setUserspecialty] = useState();
  const [OtherImages, setOtherImages] = useState();
  const [Videos, setVideos] = useState([]);
  const [BasicDeliveryTime, setBasicDeliveryTime] = useState();
  const [StandardDeliveryTime, setStandardDeliveryTime] = useState();
  const [PremiumDeliveryTime, setPremiumDeliveryTime] = useState();
  const [BasicPrice, setBasicPrice] = useState();
  const [StandardPrice, setStandardPrice] = useState();
  const [PremiumPrice, setPremiumPrice] = useState();
  const [Standard, setStandard] = useState(true);
  const [Premium, setPremium] = useState(true);
  const [TableRowValues, setTableRowValues] = useState([
    { id: 0, Features: "", Basic: false, Standard: false, Premium: false },
    { id: 1, Features: "", Basic: false, Standard: false, Premium: false },
  ]);
  const [ERRORMSG_1, setERRORMSG_1] = useState();
  const [ERRORMSG_2, setERRORMSG_2] = useState();
  const [ProfileDomain, setProfileDomain] = useState("");
  const [ProfileImgFile, setProfileImgFile] = useState();
  const [ProfileImg, setProfileImg] = useState(
    process.env.PUBLIC_URL + "/images.png"
  );
  const [ProfileBIO, setProfileBIO] = useState("");
  const [UserLocation, setUserLocation] = useState("");
  const [UserType, setUserType] = useState("");
  const [CompanyName, setCompanyName] = useState("");
  const [UserGender, setUserGender] = useState("");
  const [UserDescreption, setUserDescreption] = useState("");
  const [activeStep, setActiveStep] = useState(0);

  // END HOOKS

  const classes = useStyles();
  const steps = getSteps();

  const StoreTableText = (id) => (e) => {
    let i = TableRowValues.findIndex((el) => el.id === id);
    switch (e.target.name) {
      case "Basic":
        TableRowValues[i] = {
          ...TableRowValues[i],
          [e.target.name]: e.target.checked,
        };
        break;
      case "Standard":
        TableRowValues[i] = {
          ...TableRowValues[i],
          [e.target.name]: e.target.checked,
        };
        break;
      case "Premium":
        TableRowValues[i] = {
          ...TableRowValues[i],
          [e.target.name]: e.target.checked,
        };
        break;
      case "Features":
        TableRowValues[i] = {
          ...TableRowValues[i],
          [e.target.name]: e.target.value,
        };
        // console.log(e.target.name+"   "+e.target.value)
        break;
    }
  };

  const removeRowIndex = (id) => {
    TableRowValues.splice(
      TableRowValues.findIndex((el) => el.id === id),
      1
    );
    setTableRowValues([...TableRowValues]);
  };

  const addRowToTable = () => {
    setTableRowValues([
      ...TableRowValues,
      {
        id: Math.floor(
          (Math.random() + 1) * 1000 + (Math.random() + 1) * 1000 + 1
        ),
        Features: "",
        Basic: false,
        Standard: false,
        Premium: false,
      },
    ]);
  };

  const Get_Profile_Image = () => {
    const Data = new FormData();
    Data.append("ProfilePhoto", ProfileImgFile);
    return Data;
  };

  const Get_Other_Photos = () => {
    const Data = new FormData();
    if (OtherImages) {
      for (const file of OtherImages) {
        Data.append("OtherImages", file);
      }
    }
    Data.append("_id", userID);
    return Data;
  };

  const handleNext = async (x) => {
    let h = await x();
    if (h === false) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
    if (activeStep === steps.length - 1) {
      console.log("hi");
      let Profile_Image = Get_Profile_Image();
      let Other_Photos = Get_Other_Photos();
      dispatch(
        updateFreelancer({
          _id: userID,
          data: {
            ProfileDomain,
            Standard,
            Premium,
            BasicPrice,
            StandardPrice,
            PremiumPrice,
            BasicDeliveryTime,
            StandardDeliveryTime,
            PremiumDeliveryTime,
            TableRowValues,
            ProfileBIO,
            UserLocation,
            UserType,
            UserGender,
            CompanyName,
            UserDescreption,
            ServiceDescription,
          },
          Profile_Image,
          Other_Photos,
        })
      );
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const checkNext = () => {
    if (activeStep === 0 && ProfileDomain === "") {
      setERRORMSG_1(true);
      return true;
    } else if (activeStep === 0 && ProfileDomain !== "") {
      setERRORMSG_1(false);
      return false;
    } else if (
      activeStep === 1 &&
      (UserLocation === "" ||
        (UserType === "Individu" && UserGender === "") ||
        UserType === "" ||
        (UserType === "Société" && CompanyName === "") ||
        UserDescreption === "")
    ) {
      setERRORMSG_2(true);
      return true;
    } else if (
      activeStep === 1 &&
      UserLocation !== "" &&
      UserType !== "" &&
      ((UserType === "Individu" && UserGender !== "") ||
        (UserType === "Société" && CompanyName !== "")) &&
      UserDescreption !== ""
    ) {
      setERRORMSG_2(false);
      return false;
    } else if (activeStep === 2) {
      return false;
    }
  };

  return (
    <div className="ProfileMaking">
      <br />
      <img onClick={() => props.history.push("/")} src={logo} alt="" />
      <div className="steps">
        {
          loading?
          <h1>please wait ...</h1>
          : 
          !isAuth?(
            <Redirect to='/LogIn'/>
          ):isAuth && condition?(
             <Redirect to='/dashboard' /> 
          ):isAuth && !condition?(
            <div>
            {/* STEP1! */}
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
    
            <div className={activeStep === 0 ? "step-1" : "none"}>
              <Step1
                ProfileDomain={ProfileDomain}
                Userspecialty={Userspecialty}
                ERRORMSG_1={ERRORMSG_1}
                setProfileDomain={setProfileDomain}
                setUserspecialty={setUserspecialty}
              />
            </div>
    
            <div className={activeStep === 1 ? "step-2" : "none"}>
              <Step2
                ProfileImg={ProfileImg}
                ProfileBIO={ProfileBIO}
                UserLocation={UserLocation}
                UserType={UserType}
                CompanyName={CompanyName}
                UserDescreption={UserDescreption}
                ERRORMSG_2={ERRORMSG_2}
                setProfileImgFile={setProfileImgFile}
                setProfileImg={setProfileImg}
                setProfileBIO={setProfileBIO}
                setUserLocation={setUserLocation}
                setUserType={setUserType}
                setCompanyName={setCompanyName}
                setCompanyName={setCompanyName}
                setUserGender={setUserGender}
                setUserDescreption={setUserDescreption}
              />
            </div>
    
            <div className={activeStep === 2 ? "step-3" : "none"}>
              <Step3
                BasicDeliveryTime={BasicDeliveryTime}
                TableRowValues={TableRowValues}
                Premium={Premium}
                Standard={Standard}
                PremiumPrice={PremiumPrice}
                StandardPrice={StandardPrice}
                BasicPrice={BasicPrice}
                PremiumDeliveryTime={PremiumDeliveryTime}
                StandardDeliveryTime={StandardDeliveryTime}
                setBasicDeliveryTime={setBasicDeliveryTime}
                setStandardDeliveryTime={setStandardDeliveryTime}
                setPremiumDeliveryTime={setPremiumDeliveryTime}
                setBasicPrice={setBasicPrice}
                setStandardPrice={setStandardPrice}
                setPremiumPrice={setPremiumPrice}
                setStandard={setStandard}
                setPremium={setPremium}
                StoreTableText={StoreTableText}
                removeRowIndex={removeRowIndex}
                addRowToTable={addRowToTable}
              />
            </div>
    
            <div className={activeStep === 3 ? "step-4" : "none"}>
              <Step4
                setOtherImages={setOtherImages}
                setServiceDescription={setServiceDescription}
              />
            </div>
    
            {/* buttons next and back */}
            <div className="progression-bar">
              <div className={classes.root}>
                <div>
                  {activeStep === steps.length ? (
                    <div>
                      <Button onClick={handleReset}>Reset</Button>
                    </div>
                  ) : (
                    <div className="ButtonContainer">
                      <Button
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        className={classes.backButton}
                      >
                        Retour
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                          handleNext(checkNext);
                          // checkERRORs()
                        }}
                      >
                        {activeStep === steps.length - 1
                          ? "Enregistrer"
                          : "Suivant"}
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          ):(
            <div className={uploadErrors ? "step-5" : "none"}>
              <FinalStep
                finalmessage={uploadErrors}
              />
            </div>
          )
        }

      </div>
    </div>
  );
};

export default withRouter(ProfileMaking) ;
