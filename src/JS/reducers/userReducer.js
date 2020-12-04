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
        ratingSuccess: payload,
      };
    case SEND_ACCEPT_OR_DENY_FAIL:
      return {
        ...state,
        loading: false,
        ratingError: payload,
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
        projects: payload,
      };
    case GET_PROJECT_FAIL:
      return {
        ...state,
        loading: false,
        projectsError: payload,
      };
    default:
      return state;
  }
};

export default userReducer;
