import React, { useEffect } from "react";
import { useState } from "react";
import Header from "./Header";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import { useDispatch, useSelector } from "react-redux";
import { getSelectedProfile } from "../JS/actions";
import { Redirect } from "react-router-dom";
import Loading from "./Loading";
const Profile = (props) => {
  // State

  const [serviceImages, setServiceImages] = useState([
    process.env.PUBLIC_URL + "/pexels-andrea-piacquadio-3769021.jpg",
  ]);
  const [TableRowValues, setTableRowValues] = useState([]);
  const [ProfileImg, setProfileImg] = useState(
    process.env.PUBLIC_URL + "/images.png"
  );
  const [userName, setUserName] = useState("");
  const [ProfileBIO, setProfileBIO] = useState("");
  const [UserLocation, setUserLocation] = useState("");
  const [CompanyName, setCompanyName] = useState("");
  const [UserDescreption, setUserDescreption] = useState();
  // "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Malesuada bibendum arcu vitae elementum. Eget velit aliquet sagittis id. Dictum at tempor commodo ullamcorper a. Tempor orci dapibus ultrices in iaculis nunc sed. Faucibus pulvinar elementum integer enim neque volutpat."
  const [UserType, setUserType] = useState("");
  const [BasicPrice, setBasicPrice] = useState("");
  const [StandardPrice, setStandardPrice] = useState("");
  const [PremiumPrice, setPremiumPrice] = useState("");
  const [BasicDeliveryTime, setBasicDeliveryTime] = useState("");
  const [StandardDeliveryTime, setStandardDeliveryTime] = useState("");
  const [PremiumDeliveryTime, setPremiumDeliveryTime] = useState("");
  const [showBasic, setShowBasic] = useState(true);
  const [showStandard, setShowStandard] = useState(false);
  const [showPremium, setShowPremium] = useState(false);
  const [ServiceDescription, setServiceDescription] = useState();
  // "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Malesuada bibendum arcu vitae elementum. Eget velit aliquet sagittis id. Dictum at tempor commodo ullamcorper a. Tempor orci dapibus ultrices in iaculis nunc sed. Faucibus pulvinar elementum integer enim neque volutpat. Lacus sed turpis tincidunt id aliquet risus feugiat in ante. Egestas quis ipsum suspendisse ultrices gravida dictum fusce ut placerat. Penatibus et magnis dis parturient montes nascetur ridiculus. Consequat nisl vel pretium lectus quam. Mi tempus imperdiet nulla malesuada pellentesque elit eget gravida. Elementum sagittis vitae et leo duis ut."
  const [Standard, setStandard] = useState(true);
  const [Premium, setPremium] = useState(true);
  const [activeIMGstep, setActiveIMGstep] = useState(0);

  // End Of State

  const dispatch = useDispatch();
  const selectedProfile = useSelector(
    (state) => state.userReducer.selectedProfile
  );
  const selectedProfileError = useSelector(
    (state) => state.userReducer.selectedProfileError
  );
  const loading = useSelector(
    (state) => state.userReducer.loading
  );

  useEffect(() => {
    dispatch(getSelectedProfile(props.match.params._id));
  }, []);

  useEffect(() => {
    if (selectedProfile) {
      setUserName(selectedProfile.name + " " + selectedProfile.familyName); //name+famName
      setProfileBIO(selectedProfile.ProfileBIO); //bio
      setUserLocation(selectedProfile.UserLocation); //location
      setCompanyName(selectedProfile.CompanyName); //company name
      setUserDescreption(selectedProfile.UserDescreption); //user description
      setUserType(selectedProfile.UserType); //usertype
      setBasicPrice(selectedProfile.BasicPrice); //basic price
      setStandardPrice(selectedProfile.StandardPrice); //standard price
      setPremiumPrice(selectedProfile.PremiumPrice); //prem price
      setBasicDeliveryTime(selectedProfile.BasicDeliveryTime); //basic time
      setStandardDeliveryTime(selectedProfile.StandardDeliveryTime); //standard time
      setPremiumDeliveryTime(selectedProfile.PremiumDeliveryTime); //prem time
      setStandard(selectedProfile.Standard); //standard
      setPremium(selectedProfile.Premium); //premium
      setTableRowValues(selectedProfile.TableRowValues); //tablerows
      setServiceDescription(selectedProfile.ServiceDescription);
    }
  }, [selectedProfile]);

  const HandleNext = () => {
    setActiveIMGstep((prevActiveStep) => prevActiveStep + 1);
  };

  const HandleBack = () => {
    setActiveIMGstep((prevActiveStep) => prevActiveStep - 1);
  };

  return (<div>
    {
      loading ?(
        <Loading />
      ):selectedProfileError?(
        <Redirect to='/dashboard'/>
      ):(
        
        <div className="Profile-Component">
        <div className="header">
          <Header />
        </div>
  
        <div className="Profile-Navigation">
          <ul>
            <li>Description</li>
            <li>à Propos</li>
            <li>Comparer les packs</li>
            <li>Commentaires</li>
          </ul>
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
              disabled={activeIMGstep === serviceImages.length - 1 ? true : false}
            >
              {" "}
              <ArrowRightIcon style={{ fontSize: "3vw" }} />{" "}
            </button>
          </div>
        </div>
  
        <div className="Packs">
          <ul>
            <li>
              <button
                onClick={() => {
                  setShowBasic(true);
                  setShowStandard(false);
                  setShowPremium(false);
                }}
                className={showBasic ? "Clicked-Btn" : "UnClicked-BTN"}
              >
                Basic
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setShowBasic(false);
                  setShowStandard(true);
                  setShowPremium(false);
                }}
                className={
                  Standard && showStandard
                    ? "Clicked-Btn"
                    : Standard && !showStandard
                    ? "UnClicked-BTN"
                    : "none"
                }
              >
                Standard
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setShowBasic(false);
                  setShowStandard(false);
                  setShowPremium(true);
                }}
                className={
                  Premium && showPremium
                    ? "Clicked-Btn"
                    : Premium && !showPremium
                    ? "UnClicked-BTN"
                    : "none"
                }
              >
                Premium
              </button>
            </li>
          </ul>
          <div className={showBasic ? "Schown-Pack" : "none"}>
            <h1>Les options:</h1>
            {TableRowValues.filter((el) => el.Basic === true).map((el) => (
              <div className="Options">
                <h2>{el.Features}</h2>
                <CheckIcon style={{ fill: "#31cb00", fontSize: "1.2vw" }} />
              </div>
            ))}
            <div className="Delivery-Time-Pack">
              <h1>Temps de livraison : {BasicDeliveryTime} jours</h1>
            </div>
            <button
              className="price-BTN"
              onClick={() => {
                localStorage.setItem("pack", 'Basic');
                localStorage.setItem(
                  "freelancer",
                  JSON.stringify(selectedProfile)
                );
                props.history.push("/Choose/Pack");
              }}
            >
              {" "}
              {BasicPrice} TND
            </button>
          </div>
          <div className={showStandard ? "Schown-Pack" : "none"}>
            <h1>Les options:</h1>
            {TableRowValues.filter((el) => el.Standard === true).map((el) => (
              <div className="Options">
                <h2>{el.Features}</h2>
                <CheckIcon style={{ fill: "#31cb00", fontSize: "1.2vw" }} />
              </div>
            ))}
            <div className="Delivery-Time-Pack">
              <h1>Temps de livraison : {StandardDeliveryTime} jours</h1>
            </div>
            <button
              className="price-BTN"
              onClick={() => {
                localStorage.setItem("pack", 'Standard');
                localStorage.setItem(
                  "freelancer",
                  JSON.stringify(selectedProfile)
                );
                props.history.push("/Choose/Pack");
              }}
            >
              {" "}
              {StandardPrice} TND
            </button>
          </div>
          <div className={showPremium ? "Schown-Pack" : "none"}>
            <h1>Les options:</h1>
            {TableRowValues.filter((el) => el.Premium === true).map((el) => (
              <div className="Options">
                <h2>{el.Features}</h2>
                <CheckIcon style={{ fill: "#31cb00", fontSize: "1.2vw" }} />
              </div>
            ))}
            <div className="Delivery-Time-Pack">
              <h1>Temps de livraison : {PremiumDeliveryTime} jours</h1>
            </div>
            <button
              className="price-BTN"
              onClick={() => {
                localStorage.setItem("pack", 'Premium');
                localStorage.setItem(
                  "freelancer",
                  JSON.stringify(selectedProfile)
                );
                props.history.push("/Choose/Pack");
              }}
            >
              {" "}
              {PremiumPrice} TND
            </button>
          </div>
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
  
        {/* tableau de 📦  */}
        <div className="Service-Table">
          <table>
            <thead>
              <tr>
                <td>Options</td>
                <td>Basic</td>
                <td className={Standard === false ? "none" : "Standard"}>
                  Standard
                </td>
                <td className={Premium === false ? "none" : "Premium"}>
                  Premium
                </td>
              </tr>
            </thead>
            <tbody>
              {[...TableRowValues].map((el) => (
                <tr>
                  <td>
                    <h1>{el.Features}</h1>
                  </td>
                  <td>
                    {el.Basic ? (
                      <CheckIcon style={{ fill: "#31cb00" }} />
                    ) : (
                      <ClearIcon style={{ fill: "#ef233c" }} />
                    )}
                  </td>
                  <td className={Standard === false ? "none" : "Standard"}>
                    {el.Standard ? (
                      <CheckIcon style={{ fill: "#31cb00" }} />
                    ) : (
                      <ClearIcon style={{ fill: "#ef233c" }} />
                    )}
                  </td>
                  <td className={Premium === false ? "none" : "Premium"}>
                    {el.Premium ? (
                      <CheckIcon style={{ fill: "#31cb00" }} />
                    ) : (
                      <ClearIcon style={{ fill: "#ef233c" }} />
                    )}
                  </td>
                </tr>
              ))}
              <tr>
                <td>Temps de livraison</td>
                <td>
                  <h1> {BasicDeliveryTime} jours</h1>
                </td>
                <td className={Standard === false ? "none" : "StandardColumn"}>
                  <h1> {StandardDeliveryTime} jours</h1>
                </td>
                <td className={Premium === false ? "none" : "PremiumColumn"}>
                  <h1> {PremiumDeliveryTime} jours</h1>
                </td>
              </tr>
  
              <tr>
                <td>Prix du pack</td>
                <td>
                  <h1>{BasicPrice} TND</h1>
                </td>
                <td className={Standard === false ? "none" : "StandardColumn"}>
                  <h1>{StandardPrice} TND</h1>
                </td>
                <td className={Premium === false ? "none" : "PremiumColumn"}>
                  <h1>{PremiumPrice} TND</h1>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* fin tableau de 📦 */}
      </div>
      )
    }
    </div>
  );
};

export default Profile;
