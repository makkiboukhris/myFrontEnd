import React, { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import AddToHomeScreenIcon from "@material-ui/icons/AddToHomeScreen";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import StarRoundedIcon from "@material-ui/icons/StarRounded";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";
import { Redirect } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProject,
  getEmail,
  getFreelancersWorkinOnPublicProject,
  getProfile,
  getPublicProjects,
  getSelectedProfile,
  getWaitingProjects,
  hireThisFreelancer,
  projectRecieved,
  projectSent,
  responseToPrivateProject,
  sendComment,
  sendRating,
  uploadPublicProject,
  workOnPublicProject,
} from "../JS/actions";
import Card from "./Card";
import NewRate from "./NewRate";
import { CLEAR_EMAIL } from "../JS/constants/actions-types";
import Loading from "./Loading";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: "flex",
//     flexDirection: "column",
//     "& > * + *": {
//       marginTop: theme.spacing(1),
//     },
//   },
// }));
const Dashboard = (props) => {
  const dispatch = useDispatch();
  const userType = useSelector((state) => state.userReducer.userType);
  const loading = useSelector((state) => state.userReducer.loading);
  const isAuth = useSelector((state) => state.userReducer.isAuth);
  const privateProjectUploaded = useSelector(
    (state) => state.userReducer.privateProjectUploaded
  );
  const userUpdateSuccess = useSelector(
    (state) => state.userReducer.userUpdateSuccess
  );
  const deletedProject = useSelector(
    (state) => state.userReducer.deletedProject
  );
  const waitingProjects = useSelector(
    (state) => state.userReducer.waitingProjects
  );
  const uploadedProject = useSelector(
    (state) => state.userReducer.uploadedProject
  );
  const actualProjects = useSelector(
    (state) => state.userReducer.actualProjects
  );
  const projectFinished = useSelector(
    (state) => state.userReducer.projectFinished
  );
  const publicProjects = useSelector(
    (state) => state.userReducer.publicProjects
  );
  const uploadPublicErrors = useSelector(
    (state) => state.userReducer.uploadPublicErrors
  );
  const workingOnPublicProject = useSelector(
    (state) => state.userReducer.workingOnPublicProject
  );
  const freelancersWorkingOnPublicProject = useSelector(
    (state) => state.userReducer.freelancersWorkingOnPublicProject
  );
  const hiredFreelancer = useSelector(
    (state) => state.userReducer.hiredFreelancer
  );
  const selectedProfile = useSelector(
    (state) => state.userReducer.selectedProfile
  );
  const projectReceived = useSelector(
    (state) => state.userReducer.projectReceived
  );
  const email = useSelector((state) => state.userReducer.email);

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
  const [copySuccess, setCopySuccess] = useState();
  const [sentProject, setSentProject] = useState(false);

  const renderBlock = (dashboardSections) => {
    console.log("projects", waitingProjects);
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
              <option value="A">Developpement web et mobile</option>
              <option value="B">Design</option>
              <option value="C">Sales and Marketing</option>
              <option value="D">Consulting</option>
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
          {waitingProjects ? (
            waitingProjects.map((el) => (
              <div key={el._id} className="project-list-container">
                <div className="project-list">
                  <div>
                    <h1
                      onClick={() => {
                        if (el.projectType === "PUBLIC") {
                          setDashboardSections(5);
                          setClickedProject(
                            waitingProjects.findIndex((x) => x._id === el._id)
                          );
                          if (
                            !waitingProjects[
                              waitingProjects.findIndex((x) => x._id === el._id)
                            ].isTaken
                          ) {
                            dispatch(
                              getFreelancersWorkinOnPublicProject(
                                waitingProjects[
                                  waitingProjects.findIndex(
                                    (x) => x._id === el._id
                                  )
                                ].freelancers
                              )
                            );
                          }
                          if (
                            waitingProjects[
                              waitingProjects.findIndex((x) => x._id === el._id)
                            ].isTaken
                          ) {
                            dispatch(
                              getSelectedProfile(
                                waitingProjects[
                                  waitingProjects.findIndex(
                                    (x) => x._id === el._id
                                  )
                                ].isTaken
                              )
                            );
                          }
                        } else {
                          setDashboardSections(4);
                          setClickedProject(el);
                        }
                      }}
                    >
                      {el.projectName}
                    </h1>
                    <div className="project-state-list">
                      <h2>
                        {el.projectFinished
                          ? "Le projet est terminé"
                          : el.projectState}
                      </h2>
                    </div>
                  </div>
                  <div
                    className={
                      el.projectReceived ||
                      (el.projectState === "En attente" && !el.isTaken) ||
                      el.projectState ===
                        "Désolé, le freelancer n'a pas accepté de travailler sur ce projet" ||
                      el.projectReceived
                        ? "project-list-icons-delete"
                        : "none"
                    }
                  >
                    <DeleteIcon
                      style={{
                        fontSize: "2vw",
                      }}
                      onClick={() => {
                        if (el.projectType === "PRIVATE") {
                          dispatch(
                            deleteProject({
                              projectID: el._id,
                              projectOwnerID: isAuth._id,
                              freelancerID: [el.freelancerID],
                            })
                          );
                        }
                        if (el.projectType === "PUBLIC") {
                          dispatch(
                            deleteProject({
                              projectID: el._id,
                              projectOwnerID: isAuth._id,
                              freelancerID: el.freelancers,
                            })
                          );
                        }
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
          <div className="Private-Project-Customer">
            <h1>Nom du Projet: </h1> <h2>{clickedProject.projectName} </h2>
            <h1>Description du projet: </h1>{" "}
            <h2> {clickedProject.projectDescription} </h2>
            <h1>Le pack choisi: </h1>
            <h2> {clickedProject.pack} </h2>
            <h2>
              {" "}
              {clickedProject.projectState === "En attente"
                ? "Le projet est en cours"
                : clickedProject.projectFinished
                ? "Le projet est terminé verifiez votre E-mail"
                : clickedProject.projectState}{" "}
            </h2>
          </div>
          {clickedProject.projectFinished ? (
            <div className="Private-Project-Customer">
              <button
                onClick={() => {
                  dispatch(
                    projectRecieved({
                      recieved: true,
                      projectID: clickedProject._id,
                      projectOwnerID: clickedProject.projectOwner,
                      freelancerID: clickedProject.freelancerID,
                    })
                  );
                  setDashboardSections(3);
                }}
              >
                j'ai bien reçu mon projet
              </button>
              <button
                onClick={() =>
                  dispatch(
                    projectRecieved({
                      recieved: false,
                      projectID: clickedProject._id,
                      projectOwnerID: clickedProject.projectOwner,
                      freelancerID: clickedProject.freelancerID,
                    })
                  )
                }
              >
                je n'ai pas reçu mon projet
              </button>
            </div>
          ) : (
            <div></div>
          )}
          {clickedProject.projectFinished ? (
            <div className="Private-Project-Customer">
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
                        freelancerID: clickedProject.freelancerID,
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
                      freelancerID: clickedProject.freelancerID,
                      sender: isAuth.name,
                      rateValue: value,
                    })
                  )
                }
              >
                Envoyer
              </button>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      );
    }
    if (dashboardSections === 5) {
      return (
        <div>
          <div className="Public-Project-Customer">
            <h1>Nom du projet: </h1>
            <h2> {waitingProjects[clickedProject].projectName} </h2>
            <h1>Description du projet: </h1>
            <h2> {waitingProjects[clickedProject].projectDescription} </h2>
            <h1>budget min: </h1>
            <h2> {waitingProjects[clickedProject].budgetmin} TND</h2>
            <h1>budget max: </h1>
            <h2> {waitingProjects[clickedProject].budgetmax} TND </h2>
            <h1>Délai du projet: </h1>
            <h2> {waitingProjects[clickedProject].delay}</h2>
            <h2>
              {" "}
              {waitingProjects[clickedProject].projectState === "En attente"
                ? ""
                : waitingProjects[clickedProject].projectFinished
                ? "Le projet est terminé verifiez votre E-mail"
                : "Le projet est en cours"}{" "}
            </h2>
          </div>
          {waitingProjects[clickedProject].isTaken ? (
            <div className="Public-Project-Customer">
              <h2>
                {selectedProfile.name} est pris en charge de votre projet!
              </h2>
            </div>
          ) : (
            <div className="Public-Project-Customer">
              <h2>les demandes de travail sur ce projet:</h2>
              <div className="profiles-container-dashboard">
                {freelancersWorkingOnPublicProject ? (
                  freelancersWorkingOnPublicProject.map((el) => (
                    <div
                      key={el._id}
                      className="profile-card"
                      onClick={() =>
                        gotothisProfile({ _id: el._id, index: clickedProject })
                      }
                    >
                      <img
                        className="serviceImages"
                        src={
                          process.env.PUBLIC_URL +
                          "/pexels-andrea-piacquadio-3769021.jpg"
                        }
                        alt=""
                      />
                      <div className="profileIMG-Name">
                        <div className="profileIMG-container-profileList">
                          <img
                            className="profileIMG"
                            src={
                              "https://www.weact.org/wp-content/uploads/2016/10/Blank-profile.png"
                            }
                            alt=""
                          />
                        </div>
                        <h5 className="name"> {el.name} </h5>
                      </div>
                    </div>
                    // <div key={el._id}>
                    //   <h2
                    //     onClick={() =>
                    //       gotothisProfile({ _id: el._id, index: clickedProject })
                    //     }
                    //   >
                    //     {" "}
                    //     {el.name}{" "}
                    //   </h2>
                    // </div>
                  ))
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          )}
          {waitingProjects[clickedProject].projectFinished ? (
            <div className="Private-Project-Customer">
              <button
                onClick={() => {
                  dispatch(
                    projectRecieved({
                      recieved: true,
                      projectID: waitingProjects[clickedProject]._id,
                      projectOwnerID:
                        waitingProjects[clickedProject].projectOwner,
                      freelancerID: waitingProjects[clickedProject].isTaken,
                    })
                  );
                  setDashboardSections(3);
                }}
              >
                j'ai bien reçu mon projet
              </button>
              <button
                onClick={() =>
                  dispatch(
                    projectRecieved({
                      recieved: false,
                      projectID: waitingProjects[clickedProject]._id,
                      projectOwnerID:
                        waitingProjects[clickedProject].projectOwner,
                      freelancerID: waitingProjects[clickedProject].isTaken,
                    })
                  )
                }
              >
                je n'ai pas reçu mon projet
              </button>
            </div>
          ) : (
            <div></div>
          )}

          {waitingProjects[clickedProject].projectFinished ? (
            <div className="Private-Project-Customer">
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
                        freelancerID: waitingProjects[clickedProject].isTaken,
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
                      freelancerID: waitingProjects[clickedProject].isTaken,
                      sender: isAuth.name,
                      rateValue: value,
                    })
                  )
                }
              >
                Envoyer
              </button>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      );
    }

    return <div></div>;
  };

  const gotothisProfile = (data) => {
    const { _id, index } = data;
    props.history.push(`/ProfilePublicProject/${_id}/${index}`);
  };

  useEffect(() => {
    dispatch(getProfile());
  }, [
    privateProjectUploaded,
    userUpdateSuccess,
    deletedProject,
    uploadedProject,
    workingOnPublicProject,
    hiredFreelancer,
    projectReceived,
  ]);

  useEffect(() => {
    if (isAuth) {
      dispatch(
        getWaitingProjects({
          waitingProjectsIDs: isAuth.waitingProjects,
          actualProjectsIDs: isAuth.actualProjects,
        })
      );
    }
  }, [isAuth, projectFinished, workingOnPublicProject, hiredFreelancer]);

  useEffect(() => {
    if (isAuth) {
      dispatch(getPublicProjects(isAuth.ProfileDomain));
    }
  }, []);

  const inputToCopy = useRef(null);

  const copyFunction = () => {
    inputToCopy.current.select();
    document.execCommand("copy");
    setCopySuccess("Copied!");
    setTimeout(() => {
      setCopySuccess();
      setSentProject(true);
    }, 1000);
    dispatch({
      type: CLEAR_EMAIL,
    });
  };

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
          <Loading />
        ) : userType === "FREELANCER" ? (
          <div>
            <div className="salutation-dashboard">
              <h1>Bonjour {isAuth.name} !</h1>
            </div>

            {dashboardSections === 0 ? (
              <div className="dashboard-insights">
                <div className="dashboard-insights-clicks">
                  <FormatListBulletedIcon
                    style={{ fontSize: "4vw", color: "#1a936f" }}
                  />
                  <h6>{isAuth.actualProjects.length} projets actuels</h6>
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
                    /5 {"  "}
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
                  <h6>{"0"} TND</h6>
                </div>
                <div className="dashboard-insights-basic">
                  <h1>Basic</h1>
                  <h6>{"0"} Acheteurs</h6>
                </div>
                <div className="dashboard-insights-stand">
                  <h1>Standard</h1>
                  <h6>{"0"} Acheteurs</h6>
                </div>
                <div className="dashboard-insights-prem">
                  <h1>Premium</h1>
                  <h6>{"0"} Acheteurs</h6>
                </div>
                <div className="dashboard-insights-done">
                  <DoneAllIcon style={{ fontSize: "4vw", color: "#1a936f" }} />
                  <h6>{"0"} Projets finis</h6>
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
              <div>
                {publicProjects ? (
                  publicProjects.map((el) => (
                    <div
                      key={el._id}
                      className="project-list-container"
                      onClick={() => {
                        setDashboardSections(7);
                        setClickedProject(publicProjects.indexOf(el));
                      }}
                    >
                      <div className="project-list">
                        <div>
                          <h1>{el.projectName}</h1>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <h2>Il n'ya pas encore de projets publics</h2>
                )}
              </div>
            ) : dashboardSections === 2 ? (
              <div>
                {actualProjects.map((el) => (
                  <div
                    key={el._id}
                    className="project-list-container"
                    onClick={() => {
                      if (el.projectType === "PUBLIC") {
                        setDashboardSections(8);
                        setClickedProject(
                          publicProjects.findIndex((x) => x._id === el._id)
                        );
                      } else {
                        setDashboardSections(6);
                        setClickedProject(actualProjects.indexOf(el));
                      }
                    }}
                  >
                    <div className="project-list">
                      <div>
                        <h1>{el.projectName}</h1>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : dashboardSections === 4 ? (
              <div>
                {waitingProjects.map((el) => (
                  <div
                    key={el._id}
                    className="project-list-container"
                    onClick={() => {
                      if (el.projectType === "PUBLIC") {
                        setDashboardSections(7);
                        setClickedProject(
                          publicProjects.findIndex((x) => x._id === el._id)
                        );
                      } else {
                        setDashboardSections(5);
                        setClickedProject(el);
                      }
                    }}
                  >
                    <div className="project-list">
                      <div>
                        <h1>{el.projectName}</h1>
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
                ))}
              </div>
            ) : dashboardSections === 5 ? (
              <div className="Private-Project-Customer">
                <h1>Nom du Projet: </h1> <h2> {clickedProject.projectName} </h2>
                <h1>Description du projet: </h1>{" "}
                <h2> {clickedProject.projectDescription} </h2>
                <h1>Le pack choisi: </h1> <h2> {clickedProject.pack} </h2>
                <button
                  onClick={() => {
                    dispatch(
                      responseToPrivateProject({
                        accept: true,
                        projectID: clickedProject._id,
                        projectOwner: clickedProject.projectOwner,
                        freelancer: isAuth._id,
                      })
                    );
                    setDashboardSections(2);
                  }}
                >
                  Accepter
                </button>
                <button
                  onClick={() => {
                    dispatch(
                      responseToPrivateProject({
                        accept: false,
                        projectID: clickedProject._id,
                        projectOwner: clickedProject.projectOwner,
                        freelancer: isAuth._id,
                      })
                    );
                    setDashboardSections(4);
                  }}
                >
                  Refuser
                </button>
              </div>
            ) : dashboardSections === 7 ? (
              <div>
                <div className="Public-Project-Customer">
                  {console.log("clickedProject", clickedProject)}
                  <h1>Nom du projet: </h1>
                  <h2> {publicProjects[clickedProject].projectName} </h2>
                  <h1>Description du projet: </h1>
                  <h2> {publicProjects[clickedProject].projectDescription} </h2>
                  <h1>Budget min: </h1>
                  <h2>{publicProjects[clickedProject].budgetmin} </h2>
                  <h1>Budget max: </h1>
                  <h2>{publicProjects[clickedProject].budgetmax} </h2>
                  <h1>Délai: </h1>
                  <h2>{publicProjects[clickedProject].delay} </h2>
                </div>
                <div  className="Private-Project-Customer">
                  <button
                    onClick={() => {
                      dispatch(
                        workOnPublicProject({
                          projectID: publicProjects[clickedProject]._id,
                          freelancerID: isAuth._id,
                        })
                      );
                      setDashboardSections(4);
                    }}
                  >
                    travailler sur ce projet !
                  </button>
                </div>
              </div>
            ) : dashboardSections === 8 ? (
              <div>
                <div className="Public-Project-Customer">
                  <h1>Nom du projet: </h1>
                  <h2> {publicProjects[clickedProject].projectName} </h2>
                  <h1>Description du projet: </h1>
                  <h2> {publicProjects[clickedProject].projectDescription} </h2>
                  <h1>Budget min: </h1>
                  <h2>{publicProjects[clickedProject].budgetmin} </h2>
                  <h1>Budget max: </h1>
                  <h2>{publicProjects[clickedProject].budgetmax} </h2>
                  <h1>Délai: </h1>
                  <h2>{publicProjects[clickedProject].delay} </h2>
                  {publicProjects[clickedProject].projectFinished ? (
                    <h2>un message a été transmis au recrutteur</h2>
                  ) : (
                    ""
                  )}
                  {publicProjects[clickedProject].projectNotReceived ? (
                    <h3>
                      {" "}
                      {publicProjects[clickedProject].projectNotReceived}{" "}
                    </h3>
                  ) : (
                    <div></div>
                  )}
                </div>

                <div className="Private-Project-Customer">
                  {!publicProjects[clickedProject].projectFinished ||
                  publicProjects[clickedProject].projectNotReceived ? (
                    <button
                      onClick={() =>
                        dispatch(
                          getEmail(publicProjects[clickedProject].projectOwner)
                        )
                      }
                    >
                      Envoyer le projet
                    </button>
                  ) : (
                    ""
                  )}
                  {email ? (
                    <div>
                      <input ref={inputToCopy} type="text" value={email} />
                      <button onClick={() => copyFunction()}>copier</button>
                    </div>
                  ) : (
                    <h6> {copySuccess} </h6>
                  )}
                  {!publicProjects[clickedProject].projectFinished ||
                  publicProjects[clickedProject].projectNotReceived ? (
                    sentProject ? (
                      <button
                        onClick={() =>
                          dispatch(
                            projectSent({
                              projectID: publicProjects[clickedProject]._id,
                            })
                          )
                        }
                      >
                        j'ai bien envoyé le projet
                      </button>
                    ) : (
                      <div></div>
                    )
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
            ) : dashboardSections === 6 ? (
              <div className="Private-Project-Customer">
                <h1>Nom du projet: </h1>{" "}
                <h2> {actualProjects[clickedProject].projectName} </h2>
                <h1>Description du projet: </h1>{" "}
                <h2> {actualProjects[clickedProject].projectDescription} </h2>
                <h1>Le pack choisi: </h1>{" "}
                <h2> {actualProjects[clickedProject].pack} </h2>
                {actualProjects[clickedProject].projectFinished &&
                !actualProjects[clickedProject].projectNotReceived ? (
                  <h2>un message a été transmis au recrutteur</h2>
                ) : (
                  ""
                )}
                {actualProjects[clickedProject].projectNotReceived ? (
                  <h3> {actualProjects[clickedProject].projectNotReceived} </h3>
                ) : (
                  <div></div>
                )}
                {!actualProjects[clickedProject].projectFinished ||
                actualProjects[clickedProject].projectNotReceived ? (
                  <button
                    onClick={() =>
                      dispatch(
                        getEmail(actualProjects[clickedProject].projectOwner)
                      )
                    }
                  >
                    Envoyer le projet
                  </button>
                ) : (
                  ""
                )}
                {email ? (
                  <div>
                    <input ref={inputToCopy} type="text" value={email} />
                    <button onClick={() => copyFunction()}>copier</button>
                  </div>
                ) : (
                  <h6> {copySuccess} </h6>
                )}
                {!actualProjects[clickedProject].projectFinished ||
                actualProjects[clickedProject].projectNotReceived ? (
                  sentProject ? (
                    <button
                      onClick={() =>
                        dispatch(
                          projectSent({
                            projectID: actualProjects[clickedProject]._id,
                          })
                        )
                      }
                    >
                      j'ai bien envoyé le projet
                    </button>
                  ) : (
                    <div></div>
                  )
                ) : (
                  <div></div>
                )}
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
      </div>
      {/* end main  */}
    </div>
  );
};

export default Dashboard;
