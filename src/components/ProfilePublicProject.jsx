import React, { useEffect } from "react";
import { useState } from "react";
import Header from "./Header";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, getSelectedProfile, getWaitingProjects, hireThisFreelancer } from "../JS/actions";
import { Redirect } from "react-router-dom";
import Loading from "./Loading";
const ProfilePublicProject = (props) => {
  const [serviceImages, setServiceImages] = useState([
    process.env.PUBLIC_URL + "/pexels-andrea-piacquadio-3769021.jpg",
  ]);
  const [ProfileImg, setProfileImg] = useState(
    process.env.PUBLIC_URL + "/images.png"
  );
  const [userName, setUserName] = useState("");
  const [ProfileBIO, setProfileBIO] = useState("");
  const [UserLocation, setUserLocation] = useState("");
  const [CompanyName, setCompanyName] = useState("");
  const [UserDescreption, setUserDescreption] = useState();
  const [UserType, setUserType] = useState("");
  const [ServiceDescription, setServiceDescription] = useState();
  const [activeIMGstep, setActiveIMGstep] = useState(0);

  const dispatch = useDispatch();
  const selectedProfile = useSelector(
    (state) => state.userReducer.selectedProfile
  );
  const isAuth = useSelector(state => state.userReducer.isAuth)
  const waitingProjects = useSelector(
    (state) => state.userReducer.waitingProjects
  );
  const selectedProfileError = useSelector(
    (state) => state.userReducer.selectedProfileError
  );
  const loading = useSelector((state) => state.userReducer.loading);

  useEffect(() => {
    dispatch(getSelectedProfile(props.match.params._id));
  }, []);

  useEffect(() => {
    dispatch(getProfile());
  }, []);

  useEffect(() => {
    if (isAuth) {
      dispatch(
        getWaitingProjects({
          waitingProjectsIDs: isAuth.waitingProjects,
          actualProjectsIDs: isAuth.actualProjects,
        })
      );
    }
  }, [isAuth]);

  useEffect(() => {
    if (selectedProfile) {
      setUserName(selectedProfile.name + " " + selectedProfile.familyName); //name+famName
      setProfileBIO(selectedProfile.ProfileBIO); //bio
      setUserLocation(selectedProfile.UserLocation); //location
      setCompanyName(selectedProfile.CompanyName); //company name
      setUserDescreption(selectedProfile.UserDescreption); //user description
      setUserType(selectedProfile.UserType); //usertype
      setServiceDescription(selectedProfile.ServiceDescription);
    }
  }, [selectedProfile]);

  const HandleNext = () => {
    setActiveIMGstep((prevActiveStep) => prevActiveStep + 1);
  };

  const HandleBack = () => {
    setActiveIMGstep((prevActiveStep) => prevActiveStep - 1);
  };
  return (
    <div>
      {loading ? (
        <Loading />
      ) : selectedProfileError ? (
        <>
          {console.log("hello")}
          <Redirect to="/dashboard" />
        </>
      ) : (
        <div className="Profile-Component">
          <div className="header">
            <Header />
          </div>

          <div className="carrousel">
            {/* <div className="current-image"> */}
            <img src={serviceImages[activeIMGstep]} />
            {/* </div> */}
            <div className="Image-Control">
              <button
                onClick={HandleBack}
                disabled={activeIMGstep === 0 ? true : false}
              >
                {" "}
                <ArrowLeftIcon style={{ fontSize: "3vw" }} />{" "}
              </button>
              <p>
                {" "}
                {activeIMGstep + 1} / {serviceImages.length}{" "}
              </p>
              <button
                onClick={HandleNext}
                disabled={
                  activeIMGstep === serviceImages.length - 1 ? true : false
                }
              >
                {" "}
                <ArrowRightIcon style={{ fontSize: "3vw" }} />{" "}
              </button>
            </div>
          </div>
          <div className="Packs">
            <button
              onClick={() =>{
                dispatch(
                  hireThisFreelancer({
                    freelancerID: props.match.params._id ,
                    projectID: waitingProjects[props.match.params.index]._id,
                    freelancerArray: waitingProjects[props.match.params.index].freelancers
                  })
                );
                props.history.push(`/Dashboard`);
              }}
            >
              embocher
            </button>
          </div>

          {/* Description  */}
          <div className="Service-Description">
            <h1>Description:</h1>
            <p>{ServiceDescription}</p>
          </div>
          {/* fin Description  */}

          {/* à propos 👨‍🦱  */}
          <div className="About-Section">
            <div className="Title">
              <div className="Profile-Image-Container">
                <img src={ProfileImg} />
              </div>
              <div className="Name-Bio">
                <h1> {UserType === "Company" ? CompanyName : userName} </h1>
                <h2> {ProfileBIO} </h2>
                <h2 id="User-Location">{UserLocation}</h2>
              </div>
            </div>
            <div className="Description-Freelancer">
              <p>{UserDescreption}</p>
            </div>
          </div>
          {/* fin à propos 🏃‍♂️  */}
        </div>
      )}
    </div>
  );
};

export default ProfilePublicProject;
