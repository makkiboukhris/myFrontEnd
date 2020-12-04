import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import AddToHomeScreenIcon from "@material-ui/icons/AddToHomeScreen";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import StarRoundedIcon from "@material-ui/icons/StarRounded";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";
import { Redirect } from "react-router-dom";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import { useDispatch, useSelector } from "react-redux";
import {
  getProfile,
  getWaitingProjects,
  responseToPrivateProject,
  sendComment,
  sendRating,
  uploadPublicProject,
} from "../JS/actions";
import Card from "./Card";

import { makeStyles } from "@material-ui/core/styles";
import NewRate from "./NewRate";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    "& > * + *": {
      marginTop: theme.spacing(1),
    },
  },
}));
const Dashboard = () => {
  const dispatch = useDispatch();
  const userType = useSelector((state) => state.userReducer.userType);
  const loading = useSelector((state) => state.userReducer.loading);
  const isAuth = useSelector((state) => state.userReducer.isAuth);
  const projects = useSelector((state) => state.userReducer.projects);
  const uploadPublicErrors = useSelector(
    (state) => state.userReducer.uploadPublicErrors
  );

  // hooks
  const [dashboardSections, setDashboardSections] = useState(0);
  const [projectDescription, setProjectDescription] = useState("");
  const [budgetmin, setBudgetmin] = useState();
  const [budgetmax, setBudgetmax] = useState();
  const [delay, setDelay] = useState();
  const [skill, setSkill] = useState();
  const [projectName, setProjectName] = useState();
  const [errormessage, setErrormessage] = useState();
  const [comments, setComments] = useState();
  const [clickedProject, setClickedProject] = useState();
  const [value, setValue] = useState(2.5);

  const renderBlock = (dashboardSections) => {
    console.log("projects", projects);
    if (dashboardSections === 0) {
      return (
        <div>
          <Card />
        </div>
      );
    }

    if (dashboardSections === 1) {
      return (
        <div className="create-project-dashboard-client">
          <h1>Créer un projet public:</h1>
          <h2>
            Nom du projet:{" "}
            <input
              value={projectName}
              type="text"
              placeholder="Nom"
              onChange={(e) => {
                console.log("e.target", e.target.value);
                setProjectName(e.target.value);
              }}
            />
          </h2>
          <h6 className={uploadPublicErrors ? "alertmessages" : "none"}>
            ce nom exisite déja essayez un autre nom
          </h6>
          <h2>Description du projet:</h2>
          <textarea
            defaultValue={projectDescription}
            name="project-desc"
            id="project-desc"
            cols="120"
            rows="13"
            onChange={(e) => setProjectDescription(e.target.value)}
          ></textarea>
          <h2>
            Budget:{" "}
            <input
              defaultValue={budgetmin}
              className="budget-proj-dashboard"
              type="text"
              placeholder="min"
              onChange={(e) => setBudgetmin(e.target.value)}
            />{" "}
            <input
              defaultValue={budgetmax}
              className="budget-proj-dashboard"
              type="text"
              placeholder="max"
              onChange={(e) => setBudgetmax(e.target.value)}
            />
          </h2>

          <h2>
            Délai:{" "}
            <input
              defaultValue={delay}
              className="delay-proj-dashboard"
              type="date"
              onChange={(e) => setDelay(e.target.value)}
            />
          </h2>

          <h2>
            Compétence requise:{" "}
            <select
              name="skills"
              id="skills"
              onChange={(e) => setSkill(e.target.value)}
            >
              <option value="">Choisir la compétence requise</option>
              <option value="Dev">Developpement web et mobile</option>
              <option value="design">Design</option>
              <option value="Marketing">Sales and Marketing</option>
              <option value="Consulting">Consulting</option>
            </select>
          </h2>
          <h6 className="alertmessages">{errormessage}</h6>
          <button
            className="share-proj-dashboard"
            onClick={() => upload_Public_Project()}
          >
            Partager
          </button>
        </div>
      );
    }
    if (dashboardSections === 2) {
      return <div></div>;
    }
    if (dashboardSections === 3) {
      return (
        <div>
          {projects ? (
            projects.map((el) => (
              <div
                key={el._id}
                className="project-list-container"
                onClick={() => {
                  setDashboardSections(4);
                  setClickedProject(el);
                }}
              >
                <div className="project-list">
                  <div>
                    <h1>{el.projectName}</h1>
                    <div className="project-state-list">
                      <h2
                        className={
                          el.projectState === "En attente" ? "fdec" : "none"
                        }
                      >
                        {" "}
                        {el.projectState}{" "}
                      </h2>
                      <h2>
                        {" "}
                        {el.projectState === "En attente"
                          ? ""
                          : el.projectFinished
                          ? "Le projet est terminé verifiez votre E-mail"
                          : "Le projet est en cours"}{" "}
                      </h2>
                    </div>
                  </div>
                  <div>
                    <ArrowRightIcon
                      style={{
                        fontSize: "4vw",
                        color: "#6d6d6d",
                        marginTop: "50%",
                      }}
                    />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h1>créer un projet</h1>
          )}
        </div>
      );
    }
    if (dashboardSections === 4) {
      return (
        <div>
          <div>
            <h1> {clickedProject.projectName} </h1>
            <h1> {clickedProject.projectDescription} </h1>
            <h1> {clickedProject.projectState} </h1>
            <h1>
              {" "}
              {clickedProject.projectState === "En attente"
                ? ""
                : clickedProject.projectFinished
                ? "Le projet est terminé verifiez votre E-mail"
                : "Le projet est en cours"}{" "}
            </h1>
          </div>
          <div>
            <h1>Commentaires:</h1>
            <input
              type="text"
              placeholder="Laisser un commentaire"
              onChange={(e) => setComments(e.target.value)}
            />
            <button
              onClick={() =>
                dispatch(
                  sendComment({
                    freelancerID: clickedProject.freelancer,
                    sender: isAuth.name,
                    comments: comments,
                    date: new Date(),
                  })
                )
              }
            >
              Envoyer
            </button>
          </div>
          <NewRate setValue={setValue} value={value} />
          <button
            onClick={() =>
              dispatch(
                sendRating({
                  freelancerID: clickedProject.freelancer,
                  sender: isAuth.name,
                  rateValue: value,
                })
              )
            }
          >
            Envoyer
          </button>
        </div>
      );
    }

    return <div></div>;
  };

  useEffect(() => {
    dispatch(getProfile());
  }, []);
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(!isMounted), []);
  useEffect(() => {
    if (isAuth) {
      dispatch(getWaitingProjects(isAuth.waitingProjects));
    }
  }, []);

  const classes = useStyles();

  const upload_Public_Project = () => {
    var today = new Date();
    var inputDate = new Date(delay);
    if (today.getTime() > inputDate.getTime()) {
      setErrormessage("veuillez saisir une date valide");
    } else if (!projectName || !skill || !budgetmax || !projectDescription) {
      setErrormessage("veuillez remplir tous les champs");
    } else {
      setErrormessage();
      dispatch(
        uploadPublicProject({
          projectName,
          projectDescription,
          budgetmin,
          budgetmax,
          delay,
          skill,
          projectOwner: isAuth._id,
        })
      );
    }
  };

  return (
    <div className="dashboard">
      {/* {console.log("isAuth", isAuth)} */}
      <div className="header">
        <Header />
      </div>

      {/* left menu  */}
      <div className="left-menu">
        {isAuth ? (
          userType === "FREELANCER" ? (
            <div>
              <div className="profile-img-dashboard">
                <img
                  src="https://www.weact.org/wp-content/uploads/2016/10/Blank-profile.png"
                  alt=""
                />
              </div>
              <div className="bio-dashboard">
                <h1>This is my BIO!</h1>
              </div>
              <div className="main-links-dashboard">
                <h2 onClick={() => setDashboardSections(0)}>
                  à propos mon profil
                </h2>
                <h2 onClick={() => setDashboardSections(1)}>
                  Projets publiques
                </h2>
                <h2 onClick={() => setDashboardSections(2)}>Projet actuel</h2>
                <h2 onClick={() => setDashboardSections(3)}>Messages</h2>
                <h2 onClick={() => setDashboardSections(4)}>
                  Projets en attente
                </h2>
              </div>
            </div>
          ) : (
            <div>
              <div className="customer-image-dashboard">
                <h1> {isAuth.name[0].toUpperCase()} </h1>
              </div>
              <div className="bio-dashboard">
                <h1>{isAuth.name}</h1>
              </div>
              <div className="main-links-dashboard">
                <h2 onClick={() => setDashboardSections(0)}>
                  Embocher un
                  <br />
                  freelancer
                </h2>
                <h2 onClick={() => setDashboardSections(1)}>
                  Créer un projet
                  <br />
                  public
                </h2>
                <h2 onClick={() => setDashboardSections(2)}>Messages</h2>
                <h2 onClick={() => setDashboardSections(3)}>
                  Suivre mes projets
                  <br />
                  actuels
                </h2>
              </div>
            </div>
          )
        ) : (
          <div></div>
        )}
      </div>
      {/* end left menu  */}

      {/* main  */}
      <div className="main-dashboard">
        {loading ? (
          <h1>please wait ...</h1>
        ) : userType === "FREELANCER" ? (
          <div>
            <div className="salutation-dashboard">
              <h1>Bonjour {isAuth.name} !</h1>
            </div>

            {dashboardSections === 0 ? (
              <div className="dashboard-insights">
                <div className="dashboard-insights-clicks">
                  <AddToHomeScreenIcon
                    style={{ fontSize: "4vw", color: "#1a936f" }}
                  />
                  <h6>{"16"} visits</h6>
                </div>
                <div className="dashboard-insights-rating">
                  <StarRoundedIcon
                    style={{ fontSize: "4vw", color: "#1a936f" }}
                  />
                  <h6>
                    {(
                      isAuth.ratings.reduce(
                        (a, b) => a + parseFloat(b.rateValue),
                        0
                      ) / isAuth.ratings.length
                    ).toFixed(2)}{" "}
                    on {isAuth.ratings.length} ratings
                  </h6>
                </div>
                <div className="dashboard-insights-proj">
                  <FormatListBulletedIcon
                    style={{ fontSize: "4vw", color: "#1a936f" }}
                  />
                  <h6>{isAuth.waitingProjects.length} projets en attente</h6>
                </div>
                <div className="dashboard-insights-money">
                  <LocalAtmIcon style={{ fontSize: "4vw", color: "#1a936f" }} />
                  <h6>{"250"} TND</h6>
                </div>
                <div className="dashboard-insights-basic">
                  <h1>Basic</h1>
                  <h6>{"5"} Acheteurs</h6>
                </div>
                <div className="dashboard-insights-stand">
                  <h1>Standard</h1>
                  <h6>{"2"} Acheteurs</h6>
                </div>
                <div className="dashboard-insights-prem">
                  <h1>Premium</h1>
                  <h6>{"2"} Acheteurs</h6>
                </div>
                <div className="dashboard-insights-done">
                  <DoneAllIcon style={{ fontSize: "4vw", color: "#1a936f" }} />
                  <h6>{"9"} Projets finis</h6>
                </div>
                <div className="comment-section-dashboard">
                  <h1>Commentaires:</h1>
                  {isAuth.comments.map((el) => (
                    <div>
                      <ul>
                        <li>
                          <h6>{el.sender}</h6>
                          <p>{el.comments}</p>
                          <h6>{el.date}</h6>
                        </li>
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ) : dashboardSections === 1 ? (
              <div></div>
            ) : dashboardSections === 2 ? (
              <div></div>
            ) : dashboardSections === 4 ? (
              <div>
                {isAuth.waitingProjects.map((el) => (
                  <div>
                    <h1
                      onClick={() => {
                        setDashboardSections(5);
                        setClickedProject(el);
                      }}
                    >
                      {el.projectName}
                    </h1>
                  </div>
                ))}
              </div>
            ) : dashboardSections === 5 ? (
              <div>
                <h2> {clickedProject.projectName} </h2>
                <h2> {clickedProject.projectDescription} </h2>
                <h2> {clickedProject.pack} </h2>
                <button
                  onClick={dispatch(
                    responseToPrivateProject({
                      accept: true,
                      projectID: clickedProject._id,
                      projectOwner: clickedProject.projectOwner,
                    })
                  )}
                >
                  Accepter
                </button>
                <button
                  onClick={dispatch(
                    responseToPrivateProject({
                      accept: false,
                      projectID: clickedProject._id,
                      projectOwner: clickedProject.projectOwner,
                    })
                  )}
                >
                  Refuser
                </button>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        ) : userType === "CUSTOMER" ? (
          <div>
            <div className="salutation-dashboard">
              <h1>Bonjour {isAuth.name} !</h1>
            </div>
            {renderBlock(dashboardSections)}
          </div>
        ) : (
          <Redirect to="/LogIn" />
        )}
        {/* !isAuth?(
            <Redirect to='/LogIn'/>
            ): */}
      </div>
      {/* end main  */}
    </div>
  );
};

export default Dashboard;
