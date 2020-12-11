import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "./Header";
import { getProfilesList } from "../JS/actions";
import { Backdrop, CircularProgress } from "@material-ui/core";
import Loading from "./Loading";

const List = (props) => {
  const dispatch = useDispatch();
  const profilesList = useSelector((state) => state.userReducer.profilesList);
  const loading = useSelector((state) => state.userReducer.loading);

  const [profileIMG, setprofileIMG] = useState(
    "https://www.weact.org/wp-content/uploads/2016/10/Blank-profile.png"
  );
  const [serviceImages, setServiceImages] = useState(
    process.env.PUBLIC_URL + "/pexels-andrea-piacquadio-3769021.jpg"
  );

  useEffect(() => {
    let x = "";
    props.match.params.domain === "Software"
      ? (x = "A")
      : props.match.params.domain === "Marketing"
      ? (x = "B")
      : props.match.params.domain === "Design"
      ? (x = "C")
      : (x = "D");
    dispatch(getProfilesList(x));
  }, []);

  const gotothisProfil = (_id) => {
    props.history.push(`/Profile/${_id}`);
  };

  return (
    <div>
      <Header />
      {/*props.match.params.domain*/}
      {loading ? (
        <Loading />
      ) : profilesList ? (
        <div className="profiles-container">
          {profilesList.map((el) => (
            <div
              key={el._id}
              className="profile-card"
              onClick={() => gotothisProfil(el._id)}
            >
              <img className="serviceImages" src={serviceImages} alt="" />
              <div className="profileIMG-Name">
                <div className="profileIMG-container-profileList">
                  <img className="profileIMG" src={profileIMG} alt="" />
                </div>
                <h5 className="name"> {el.name} </h5>
              </div>
              <h5 className="BasicPrice"> {el.BasicPrice} TND</h5>
            </div>
          ))}
        </div>
      ) : (
        <h1>pas de freelancers</h1>
      )}
    </div>
  );
};

export default List;
