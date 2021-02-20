import axios from "axios";
import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  REGISTER_USER,
  LOGIN_USER,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  GET_PROFILE,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAIL,
  UPDATE_USER,
  UPDATE_SUCCESS,
  UPDATE_FAIL,
  UPLOAD_PROJECT_PUBLIC,
  UPLOAD_PROJECT_PUBLIC_SUCCESS,
  UPLOAD_PROJECT_PUBLIC_FAIL,
  GET_PROFILES_LIST_FAIL,
  GET_PROFILES_LIST_SUCCESS,
  GET_PROFILES_LIST,
  GET_SELECTED_PROFILE,
  GET_SELECTED_PROFILE_FAIL,
  GET_SELECTED_PROFILE_SUCCESS,
  UPLOAD_PROJECT_PRIVATE,
  UPLOAD_PROJECT_PRIVATE_SUCCESS,
  UPLOAD_PROJECT_PRIVATE_FAIL,
  SEND_COMMENT_SUCCESS,
  SEND_COMMENT_FAIL,
  SEND_RATING_SUCCESS,
  SEND_RATING_FAIL,
  SEND_ACCEPT_OR_DENY_SUCCESS,
  SEND_ACCEPT_OR_DENY_FAIL,
  GET_PROJECT,
  GET_PROJECT_SUCCESS,
  GET_PROJECT_FAIL,
  DELETE_PROJECT_SUCCESS,
  DELETE_PROJECT_FAIL,
  GET_EMAIL,
  GET_EMAIL_FAIL,
  GET_EMAIL_SUCCESS,
  SEND_PROJECT_FINISHED,
  SEND_PROJECT_FINISHED_SUCCESS,
  SEND_PROJECT_FINISHED_FAIL,
  PROJECT_RECEIVED_FAIL,
  PROJECT_RECEIVED_SUCCESS,
  GET_PUBLIC_PROJECT_SUCCESS,
  GET_PUBLIC_PROJECT_FAIL,
  POST_WORK_ON_PUBLIC_PROJECT_SUCCESS,
  POST_WORK_ON_PUBLIC_PROJECT_FAIL,
  POST_WORK_ON_PUBLIC_PROJECT,
  GET_FREELANCERS_WORKING_ON_PUBLIC_FAIL,
  GET_FREELANCERS_WORKING_ON_PUBLIC_SUCCESS,
  GET_FREELANCERS_WORKING_ON_PUBLIC,
  HIRE_THIS_FREELANCER,
  HIRE_THIS_FREELANCER_SUCCESS,
  HIRE_THIS_FREELANCER_FAIL,
  LOGOUT_USER,
} from "../constants/actions-types";

export const signin = (newUser) => async (dispatch) => {
  dispatch({
    type: REGISTER_USER,
  });
  try {
    const addRes = await axios.post("/users", newUser);
    localStorage.setItem("token", addRes.data.token);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: addRes.data.userType,
    });
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
      payload: error.response.data.msg,
    });
  }
};

// export const getProjects = () => async (dispatch) => {
//   const token = localStorage.getItem("token");
//   const config = {
//     headers: {
//       Authorization: token,
//     },
//   };
//   dispatch({
//     type: GET_PROFILE,
//   });
//   try {
//     const isAuth = await axios.get("/user/current", config);
//     dispatch({
//       type: GET_PROFILE_SUCCESS,
//     });
//   } catch (error) {
//     dispatch({
//       type: GET_PROFILE_FAIL,
//       // payload: error.response.data,
//     });
//   }
// };

export const getProfile = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: token,
    },
  };
  dispatch({
    type: GET_PROFILE,
  });
  try {
    const isAuth = await axios.get("/user/current", config);
    // console.log('isAuth', isAuth)
    // localStorage.setItem('Projects',JSON.stringify(isAuth.data.actualProjects))
    dispatch({
      type: GET_PROFILE_SUCCESS,
      payload: isAuth.data,
    });
  } catch (error) {
    console.log("error", error);
    dispatch({
      type: GET_PROFILE_FAIL,
      payload: error.response.data,
    });
  }
};

export const getProfilesList = (x) => async (dispatch) => {
  const config = {
    headers: {
      domain: x,
    },
  };
  dispatch({
    type: GET_PROFILES_LIST,
  });
  try {
    const list = await axios.get("/getAllFreelancers", config);
    dispatch({
      type: GET_PROFILES_LIST_SUCCESS,
      payload: list.data.list,
    });
  } catch (error) {
    dispatch({
      type: GET_PROFILES_LIST_FAIL,
      payload: error.response.data,
    });
  }
};

export const Login = (cred) => async (dispatch) => {
  dispatch({
    type: LOGIN_USER,
  });
  try {
    const loginRes = await axios.post("/login", cred);
    localStorage.setItem("token", loginRes.data.token);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: loginRes.data,
    });
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response.data,
    });
  }
};

export const updateFreelancer = (freelancer) => async (dispatch) => {
  dispatch({
    type: UPDATE_USER,
  });
  try {
    const { _id } = freelancer;
    const updateRes = await axios.post(
      `/update/freelancer/${_id}`,
      freelancer.data
    );
    localStorage.setItem("token", updateRes.data.token);
    await axios.post(`/profileImage/${_id}`, freelancer.Profile_Image);
    await axios.post(`/otherImages/${_id}`, freelancer.Other_Photos);
    dispatch({
      type: UPDATE_SUCCESS,
      payload: updateRes.data.updateRes,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_FAIL,
      payload: error.response,
    });
  }
};

export const uploadPublicProject = (infos) => async (dispatch) => {
  console.log("infos", infos);
  dispatch({
    type: UPLOAD_PROJECT_PUBLIC,
  });
  try {
    const uploadRes = await axios.post("/project/public/upload", infos);
    console.log("uploadRes", uploadRes);
    let existingPrivateProject = JSON.parse(localStorage.getItem("Projects"));
    if (existingPrivateProject === null) {
      existingPrivateProject = [];
    }
    existingPrivateProject.push(uploadRes.data);
    dispatch({
      type: UPLOAD_PROJECT_PUBLIC_SUCCESS,
      payload: uploadRes.data,
    });
  } catch (error) {
    dispatch({
      type: UPLOAD_PROJECT_PUBLIC_FAIL,
      payload: error.response,
    });
  }
};

export const getSelectedProfile = (_id) => async (dispatch) => {
  const config = {
    headers: {
      _id: _id,
    },
  };
  dispatch({
    type: GET_SELECTED_PROFILE,
  });
  try {
    const selectedFreelancer = await axios.get(
      "/getselectedFreelancer",
      config
    );
    dispatch({
      type: GET_SELECTED_PROFILE_SUCCESS,
      payload: selectedFreelancer.data.selectedProfile,
    });
  } catch (error) {
    dispatch({
      type: GET_SELECTED_PROFILE_FAIL,
      payload: error.response.data,
    });
  }
};

export const sendPrivateProject = (privateProject) => async (dispatch) => {
  dispatch({
    type: UPLOAD_PROJECT_PRIVATE,
  });
  try {
    const privateProjectRes = await axios.post(
      "/project/private/upload",
      privateProject
    );
    dispatch({
      type: UPLOAD_PROJECT_PRIVATE_SUCCESS,
      payload: privateProjectRes.data,
    });
  } catch (error) {
    dispatch({
      type: UPLOAD_PROJECT_PRIVATE_FAIL,
      payload: error.response.data,
    });
  }
};

export const getWaitingProjects = (projectIDs) => async (dispatch) => {
  try {
    const privateProjectRes = await axios.post('/project/getWaiting', projectIDs )
    dispatch({
      type:GET_PROJECT_SUCCESS,
      payload: privateProjectRes.data
    })
  } catch (error) {
    dispatch({
      type: GET_PROJECT_FAIL,
      payload: error.response.data,
    });
  }
};

export const sendComment = (comment) => async (dispatch) => {
  try {
    const commentRes = await axios.post("/shareComment", comment);
    dispatch({
      type: SEND_COMMENT_SUCCESS,
      payload: commentRes.data,
    });
  } catch (error) {
    dispatch({
      type: SEND_COMMENT_FAIL,
      payload: error.response.data,
    });
  }
};

export const sendRating = (rate) => async (dispatch) => {
  try {
    const ratingRes = await axios.post("/rating", rate);
    dispatch({
      type: SEND_RATING_SUCCESS,
      payload: ratingRes.data,
    });
  } catch (error) {
    dispatch({
      type: SEND_RATING_FAIL,
      payload: error.response.data,
    });
  }
};

export const responseToPrivateProject = (projectToAccept) => async (dispatch) => {
  try {
    const res = await axios.post("/responseToPrivateProject", projectToAccept);
    dispatch({
      type: SEND_ACCEPT_OR_DENY_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: SEND_ACCEPT_OR_DENY_FAIL,
      payload: error.response.data,
    });
  }
};

export const deleteProject = (x) => async (dispatch) =>{
  console.log(x)
  try {
    const deleteRes = await axios.post( "/project/deletePrivate" , x );
    dispatch({
      type: DELETE_PROJECT_SUCCESS,
      payload: deleteRes.data,
    })
  } catch (error) {
    console.log('error', error)
    dispatch({
      type: DELETE_PROJECT_FAIL,
      payload: error.response.data,
    })
  }
};

export const getEmail = (id) => async (dispatch) =>{
  dispatch({
    type: GET_EMAIL,
  })
  const config = {
    headers: {
      _id: id,
    }}
  try {
    const email = await axios.get("/getEmail",config);
    dispatch({
      type: GET_EMAIL_SUCCESS,
      payload: email.data
    })
  } catch (error) {
    console.log('error', error)
    dispatch({
      type: GET_EMAIL_FAIL,
      payload: error.response.data,
    }) 
  }
};

export const projectSent = (projectID) => async (dispatch) =>{
  dispatch({
    type: SEND_PROJECT_FINISHED,
  })
  try {
    const successRes = await axios.post('/project/isFinished',projectID);
    dispatch({
      type: SEND_PROJECT_FINISHED_SUCCESS,
      payload: successRes.data,
    })
  } catch (error) {
    console.log('error--projectSent', error)
    dispatch({
      type: SEND_PROJECT_FINISHED_FAIL,
      payload: error.response.data
    })
  }
};

export const projectRecieved = (recieved) => async (dispatch) =>{
try {
  const res = await axios.post('/project/isRecieved',recieved);
  dispatch({
    type:PROJECT_RECEIVED_SUCCESS,
    payload:res.data
  })
} catch (error) {
  dispatch({
    type: PROJECT_RECEIVED_FAIL,
    payload: error.response.data
  })
}
};

export const getPublicProjects = (domain) => async (dispatch) =>{
  const config = {
    headers: {
      skill: domain,
    }}
try {
  const res = await axios.get('/project/getPublicProjects' , config);
  dispatch({
    type: GET_PUBLIC_PROJECT_SUCCESS,
    payload: res.data
  })
} catch (error) {
  dispatch({
    type: GET_PUBLIC_PROJECT_FAIL,
    payload: error.response.data
  })
}
};

export const workOnPublicProject = (data) => async (dispatch) =>{
  dispatch({
    type: POST_WORK_ON_PUBLIC_PROJECT,
  });
  try {
    const res = await axios.post('/project/workOnPublicProject',data);
    console.log("🚀 ~ file: index.js ~ line 422 ~ workOnPublicProject ~ res", res)
    dispatch({
      type: POST_WORK_ON_PUBLIC_PROJECT_SUCCESS,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: POST_WORK_ON_PUBLIC_PROJECT_FAIL,
      payload: error.response.data
    })
  }
};

export const getFreelancersWorkinOnPublicProject = (freelancerIDs) => async (dispatch) =>{
  console.log('freelancerIDs', freelancerIDs)
  dispatch({
    type: GET_FREELANCERS_WORKING_ON_PUBLIC,
  });
  try {
    const res = await axios.post('/getFreelancersWorkinOnPublicProject' , {freelancerIDs});
    dispatch({
      type: GET_FREELANCERS_WORKING_ON_PUBLIC_SUCCESS,
      payload: res.data,
    })
  } catch (error) {
    dispatch({
      type: GET_FREELANCERS_WORKING_ON_PUBLIC_FAIL,
      payload: error
    })
  }
};

export const hireThisFreelancer = (data) => async (dispatch) =>{
  dispatch({
    type: HIRE_THIS_FREELANCER,
  });
  try {
    const res = await axios.post('/project/hireThisFreelancer',data);
    dispatch({
      type:HIRE_THIS_FREELANCER_SUCCESS,
      payload:res.data
    })
  } catch (error) {
    dispatch({
      type: HIRE_THIS_FREELANCER_FAIL,
      payload:error,
    })
  }
}

export const logout = () => (dispatch) =>{
  console.log('hello')
  dispatch({
    type: LOGOUT_USER,
  });
  localStorage.removeItem('token');
}