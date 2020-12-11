import React from 'react'
import { withStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
import Radio from "@material-ui/core/Radio";



  const GreenRadio = withStyles({
    root: {
      color: red[400],
      "&$checked": {
        color: red[400],
      },
    },
    checked: {},
  })((props) => <Radio color="default" {...props} />);

const Step1 = (props) => {


    

    return ( <div>
                  
          <h1>Saisir un Domaine:</h1>
          <div className="choices">
            <GreenRadio
              className="radio"
              checked={props.ProfileDomain === "A"}
              onChange={(e) => {
                props.setProfileDomain(e.target.value);
              }}
              // checkErrorMSGs()}}
              value="A"
              id="Developpement-Web-et-Mobile"
              name="radio-button-demo"
            />
            <label htmlFor="Developpement-Web-et-Mobile">
              Developpement Web et Mobile
            </label>

            {/* <div className={props.ProfileDomain === "A" ? "countries" : "none"}>
              <select
                name="specialty"
                id="select"
                onChange={(e) => props.setUserspecialty(e.target.value)}
              >
                <option value={null}></option>
                <option value=""></option>
                <option value=""></option>
                <option value=""></option>
              </select>
            </div> */}
          </div>

          <div className="choices">
            <GreenRadio
              checked={props.ProfileDomain === "B"}
              onChange={(e) => {
                props.setProfileDomain(e.target.value);
              }}
              // checkErrorMSGs()}}
              className="radio"
              value="B"
              id="Sales-&-Marketing"
              name="radio-button-demo"
            />
            <label htmlFor="Sales-&-Marketing">Sales & Marketing</label>

            {/* <div className={props.ProfileDomain === "B" ? "countries" : "none"}>
              <select
                name="specialty"
                id="select"
                onChange={(e) => props.setUserspecialty(e.target.value)}
              >
                <option value={null}></option>
                <option value=""></option>
                <option value=""></option>
                <option value=""></option>
              </select>
            </div> */}
          </div>

          <div className="choices">
            <GreenRadio
              checked={props.ProfileDomain === "C"}
              onChange={(e) => {
                props.setProfileDomain(e.target.value);
              }}
              // checkErrorMSGs()}}
              className="radio"
              value="C"
              id="Design"
              name="radio-button-demo"
            />
            <label htmlFor="Design">Design</label>

            {/* <div className={props.ProfileDomain === "C" ? "countries" : "none"}>
              <select
                name="specialty"
                id="select"
                onChange={(e) => props.setUserspecialty(e.target.value)}
              >
                <option value={null}></option>
                <option value=""></option>
                <option value=""></option>
                <option value=""></option>
              </select>
            </div> */}
          </div>

          <div className="choices">
            <GreenRadio
              checked={props.ProfileDomain === "D"}
              onChange={(e) => {
                props.setProfileDomain(e.target.value);
              }}
              // checkErrorMSGs()}}
              className="radio"
              value="D"
              id="Consulting"
              name="radio-button-demo"
            />
            <label htmlFor="Consulting">Consulting</label>

            {/* <div className={props.ProfileDomain === "D" ? "countries" : "none"}>
              <select
                name="specialty"
                id="select"
                onChange={(e) => props.setUserspecialty(e.target.value)}
              >
                <option value={null}></option>
                <option value=""></option>
                <option value=""></option>
                <option value=""></option>
              </select>
            </div> */}
          </div>

          <div className={props.ERRORMSG_1 === true ? "alertmessages" : "none"}>
            <h3>saisissez un domaine!</h3>
          </div>


    </div> );
}
 
export default Step1;