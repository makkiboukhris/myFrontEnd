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
    dispatch({
      type: GET_PROFILE_SUCCESS,
      payload: isAuth.data,
    });
  } catch (error) {
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
    console.log('uploadRes', uploadRes)
    let existingPrivateProject = JSON.parse(localStorage.getItem('Projects'))
    if(existingPrivateProject === null){ existingPrivateProject = []}
    existingPrivateProject.push(uploadRes.data)
    localStorage.setItem('Projects',JSON.stringify(existingPrivateProject))
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
  console.log('_id', _id)
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
    // console.log("selectedFreelancer", selectedFreelancer.data.selectedProfile);
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
     await axios.post("/link/userproject", privateProject);
    const privateProjectRes = await axios.post('/project/private/upload',privateProject)
    let existingPrivateProject = JSON.parse(localStorage.getItem('Projects'))
    if(existingPrivateProject === null){ existingPrivateProject = []}
    existingPrivateProject.push(privateProjectRes.data)
    localStorage.setItem('Projects',JSON.stringify(existingPrivateProject))
    dispatch({
      type: UPLOAD_PROJECT_PRIVATE_SUCCESS,
      payload: privateProjectRes.data,
    });
  } catch (error) {
    dispatch({
      type: UPLOAD_PROJECT_PRIVATE_FAIL,
      // payload: error.response.data,
    });
  }
};
