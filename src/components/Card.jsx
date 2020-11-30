import React from "react";
import { Redirect, withRouter } from "react-router-dom";
import Card1 from "../res/Card1.svg";
import Card2 from "../res/Card2.svg";
import Card3 from "../res/Card3.svg";
import Card4 from "../res/Card4.svg";
const Card = (props) => {
  return (
    <div className="main1">
      <h1>Embocher les meilleurs talents ou agences!</h1>
      <div className="MainCard">
        <div onClick={()=>props.history.push("/Freelancer"+"/Software")} className="Card">
          <img src={Card1} alt="" />
          <h1>Developpement Web et Mobile</h1>
        </div>
        <div onClick={()=>props.history.push("/Freelancer"+"/Marketing")} className="Card">
          <img src={Card2} alt="" />
          <h1>Sales & Marketing</h1>
        </div>
        <div onClick={()=>props.history.push("/Freelancer"+"/Design")} className="Card">
          <img src={Card3} alt="" />
          <h1>Design</h1>
        </div>
        <div onClick={()=>props.history.push("/Freelancer"+"/Consulting")} className="Card">
          <img src={Card4} alt="" />
          <h1>Consulting</h1>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Card) ;
