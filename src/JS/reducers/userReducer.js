import {
  GET_PROFILE,
  GET_PROFILE_FAIL,
  GET_PROFILE_SUCCESS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGIN_USER,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  REGISTER_USER,
  UPDATE_FAIL,
  UPDATE_SUCCESS,
  UPDATE_USER,
  UPLOAD_PROJECT_PUBLIC,
  UPLOAD_PROJECT_PUBLIC_FAIL,
  UPLOAD_PROJECT_PUBLIC_SUCCESS,
  GET_PROFILES_LIST_FAIL,
  GET_PROFILES_LIST_SUCCESS,
  GET_PROFILES_LIST,
  GET_SELECTED_PROFILE,
  GET_SELECTED_PROFILE_SUCCESS,
  GET_SELECTED_PROFILE_FAIL,
  CHOOSE_PACK,
  UPLOAD_PROJECT_PRIVATE,
  UPLOAD_PROJECT_PRIVATE_SUCCESS,
  UPLOAD_PROJECT_PRIVATE_FAIL,
  SEND_COMMENT_FAIL,
  SEND_RATING_SUCCESS,
  SEND_RATING_FAIL,
  SEND_COMMENT_SUCCESS,
  SEND_ACCEPT_OR_DENY_SUCCESS,
  SEND_ACCEPT_OR_DENY_FAIL,
  GET_PROJECT_FAIL,
  GET_PROJECT,
  GET_PROJECT_SUCCESS,
  DELETE_PROJECT_FAIL,
  DELETE_PROJECT_SUCCESS,
  GET_EMAIL,
  GET_EMAIL_SUCCESS,
  GET_EMAIL_FAIL,
  CLEAR_EMAIL,
  SEND_PROJECT_FINISHED,
  SEND_PROJECT_FINISHED_SUCCESS,
  SEND_PROJECT_FINISHED_FAIL,
  PROJECT_RECEIVED_SUCCESS,
  PROJECT_RECEIVED_FAIL,
  GET_PUBLIC_PROJECT_SUCCESS,
  GET_PUBLIC_PROJECT_FAIL,
  POST_WORK_ON_PUBLIC_PROJECT_SUCCESS,
  POST_WORK_ON_PUBLIC_PROJECT_FAIL,
  POST_WORK_ON_PUBLIC_PROJECT,
  GET_FREELANCERS_WORKING_ON_PUBLIC,
  GET_FREELANCERS_WORKING_ON_PUBLIC_SUCCESS,
  GET_FREELANCERS_WORKING_ON_PUBLIC_FAIL,
  HIRE_THIS_FREELANCER,
  HIRE_THIS_FREELANCER_FAIL,
  HIRE_THIS_FREELANCER_SUCCESS,
  LOGOUT_USER,
} from "../constants/actions-types";

const initialState = {
  loading: false,
  errors: null,
};

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case REGISTER_USER:
      return {
        ...state,
        loading: true,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        userType: payload,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        loading: false,
        emailexist: payload,
      };
    case LOGIN_USER:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        token: payload,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        wrongcred: payload,
      };
    case GET_PROFILE:
      return {
        ...state,
        loading: true,
      };
    case GET_PROFILE_FAIL:
      return {
        ...state,
        loading: false,
        errors: payload,
      };
    case GET_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        errors: null,
        isAuth: payload,
        condition: payload.ProfileDomain,
        userType: payload.userType,
        user: payload,
        userID: payload._id,
      };
    case UPDATE_USER:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_FAIL:
      return {
        ...state,
        loading: false,
        uploadErrors: payload,
      };
    case UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        uploadedUser: payload,
      };
    case UPLOAD_PROJECT_PUBLIC:
      return {
        ...state,
        loading: true,
      };
    case UPLOAD_PROJECT_PUBLIC_FAIL:
      return {
        ...state,
        loading: false,
        uploadPublicErrors: payload,
      };
    case UPLOAD_PROJECT_PUBLIC_SUCCESS:
      return {
        ...state,
        loading: false,
        uploadedProject: payload,
      };
    case GET_PROFILES_LIST:
      return {
        ...state,
        loading: true,
      };
    case GET_PROFILES_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        profilesList: payload,
      };
    case GET_PROFILES_LIST_FAIL:
      return {
        ...state,
        loading: false,
        listError: payload,
      };
    case GET_SELECTED_PROFILE:
      return {
        ...state,
        loading: true,
      };
    case GET_SELECTED_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        selectedProfile: payload,
        selectedProfileError: null,
      };
    case GET_SELECTED_PROFILE_FAIL:
      return {
        ...state,
        loading: false,
        selectedProfileError: payload,
      };
    case UPLOAD_PROJECT_PRIVATE:
      return {
        ...state,
        loading: true,
      };
    case UPLOAD_PROJECT_PRIVATE_SUCCESS:
      return {
        ...state,
        loading: false,
        privateProjectUploaded: payload,
      };
    case UPLOAD_PROJECT_PRIVATE_FAIL:
      return {
        ...state,
        loading: false,
        privateProjectError: payload,
      };
    case SEND_COMMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        commentSuccess: payload,
      };
    case SEND_COMMENT_FAIL:
      return {
        ...state,
        loading: false,
        commentError: payload,
      };
    case SEND_RATING_SUCCESS:
      return {
        ...state,
        loading: false,
        ratingSuccess: payload,
      };
    case SEND_RATING_FAIL:
      return {
        ...state,
        loading: false,
        ratingError: payload,
      };
    case SEND_ACCEPT_OR_DENY_SUCCESS:
      return {
        ...state,
        loading: false,
        responseSuccess: payload.project,
        userUpdateSuccess: payload.updatedFreelancer,
      };
    case SEND_ACCEPT_OR_DENY_FAIL:
      return {
        ...state,
        loading: false,
        responseError: payload,
      };
    case GET_PROJECT:
      return {
        ...state,
        loading: true,
      };
    case GET_PROJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        actualProjects: payload.actualProjects,
        waitingProjects: payload.waitingProjects,
      };
    case GET_PROJECT_FAIL:
      return {
        ...state,
        loading: false,
        projectsError: payload,
      };
    case DELETE_PROJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        deletedProject: payload,
      };
    case DELETE_PROJECT_FAIL:
      return {
        ...state,
        loading: false,
        deletedProjectError: payload,
      };
    case GET_EMAIL:
      return {
        ...state,
        loading: true,
      };
    case GET_EMAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        email: payload,
      };
    case GET_EMAIL_FAIL:
      return {
        ...state,
        loading: false,
        emailError: payload,
      };
    case CLEAR_EMAIL:
      return {
        ...state,
        email: null,
      };
    case SEND_PROJECT_FINISHED:
      return {
        ...state,
        loading: true,
      };
    case SEND_PROJECT_FINISHED_SUCCESS:
      return {
        ...state,
        loading: false,
        projectFinished: payload,
      };
    case SEND_PROJECT_FINISHED_FAIL:
      return {
        ...state,
        loading: false,
        projectFinishedError: payload,
      };
    case PROJECT_RECEIVED_SUCCESS:
      return {
        ...state,
        loading: false,
        projectReceived: payload,
      };
    case PROJECT_RECEIVED_FAIL:
      return {
        ...state,
        loading: false,
        projectReceivedError: payload,
      };
    case GET_PUBLIC_PROJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        publicProjects: payload.list,
      };
    case GET_PUBLIC_PROJECT_FAIL:
      return {
        ...state,
        loading: false,
        publicProjectsError: payload,
      };
    case POST_WORK_ON_PUBLIC_PROJECT:
      return {
        ...state,
        loading: true,
      };
    case POST_WORK_ON_PUBLIC_PROJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        workingOnPublicProject: payload,
      };
    case POST_WORK_ON_PUBLIC_PROJECT_FAIL:
      return {
        ...state,
        loading: false,
        workingOnPublicProjectError: payload,
      };
    case GET_FREELANCERS_WORKING_ON_PUBLIC:
      return {
        ...state,
        loading: true,
      };
    case GET_FREELANCERS_WORKING_ON_PUBLIC_SUCCESS:
      return {
        ...state,
        loading: false,
        freelancersWorkingOnPublicProject: payload,
      };
    case GET_FREELANCERS_WORKING_ON_PUBLIC_FAIL:
      return {
        ...state,
        loading: false,
        freelancersWorkingOnPublicProjectError: payload,
      };
    case HIRE_THIS_FREELANCER:
      return {
        ...state,
        loading: true,
      };
    case HIRE_THIS_FREELANCER_SUCCESS:
      return {
        ...state,
        loading: false,
        hiredFreelancer: payload,
      };
    case HIRE_THIS_FREELANCER_FAIL:
      return {
        ...state,
        loading: false,
        fhiredFreelancerError: payload,
      };
    case LOGOUT_USER:
      return {
        ...state,
        isAuth: null,
        loggedOut : true,
        userType:null,
        user:null,
        userID:null,
        token:null
      }
    default:
      return state;
  }
};

export default userReducer;
