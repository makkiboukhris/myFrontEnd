import React, { useState } from "react";
import CheckIcon from "@material-ui/icons/Check";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { sendPrivateProject } from "../JS/actions";

const ChoosePack = (props) => {
  const [privateProjectDescription, setPrivateProjectDescription] = useState();
  const [privateProjectName, setPrivateProjectName] = useState();

  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.userReducer.isAuth);
  const loading = useSelector((state) => state.userReducer.loading);

  return (
    <div>
      {!isAuth ? (
        <Redirect to="/LogIn" />
      ) : loading ? (
        <h1>please wait ...</h1>
      ) : (
        <div className="choose-pack">
          <div className="header">
            <Header />
          </div>

          <div className="project-description">
            <h1>
              Nom du projet:{" "}
              <input
                defaultValue={privateProjectName}
                type="text"
                onChange={(e) => setPrivateProjectName(e.target.value)}
              />{" "}
            </h1>
            <h1>Description du projet:</h1>
            <textarea
              defaultValue={privateProjectDescription}
              name="project-desc"
              id="project-desc"
              cols="30"
              rows="10"
              onChange={(e) => setPrivateProjectDescription(e.target.value)}
            ></textarea>
          </div>

          <div className="pack-section">
            <h1>{localStorage.getItem("pack")}</h1>
            {localStorage.getItem("pack") === "Basic"
              ? JSON.parse(localStorage.getItem("freelancer"))
                  .TableRowValues.filter((el) => el.Basic === true)
                  .map((el) => (
                    <div className="Options">
                      <h2>{el.Features}</h2>
                      <CheckIcon
                        style={{ fill: "#31cb00", fontSize: "1.2vw" }}
                      />
                    </div>
                  ))
              : localStorage.getItem("pack") === "Standard"
              ? JSON.parse(localStorage.getItem("freelancer"))
                  .TableRowValues.filter((el) => el.Standard === true)
                  .map((el) => (
                    <div className="Options">
                      <h2>{el.Features}</h2>
                      <CheckIcon
                        style={{ fill: "#31cb00", fontSize: "1.2vw" }}
                      />
                    </div>
                  ))
              : JSON.parse(localStorage.getItem("freelancer"))
                  .TableRowValues.filter((el) => el.Premium === true)
                  .map((el) => (
                    <div className="Options">
                      <h2>{el.Features}</h2>
                      <CheckIcon
                        style={{ fill: "#31cb00", fontSize: "1.2vw" }}
                      />
                    </div>
                  ))}
            <button
              className="price-BTN send-BTN"
              onClick={() => {
                dispatch(
                  sendPrivateProject({
                    projectDescription: privateProjectDescription,
                    projectName: privateProjectName,
                    freelancer: JSON.parse(localStorage.getItem("freelancer"))._id,
                    pack: localStorage.getItem("pack"),
                    projectOwner: isAuth._id,
                  })
                );
                localStorage.removeItem("pack");
                localStorage.removeItem("freelancer");
                props.history.push("/dashboard");
              }}
            >
              Envoyer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChoosePack;
