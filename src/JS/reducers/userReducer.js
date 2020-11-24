import{
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
} from '../constants/actions-types';

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
                loading:true,
              };
            case LOGIN_SUCCESS:
              return {
                ...state,
                loading:false,
                token:payload,
              };
            case LOGIN_FAIL:
              return{
                ...state,
                loading:false,
                wrongcred:payload,
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
                errors:null,
                isAuth: payload,
                condition: payload.ProfileDomain,
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
        default:
            return state;
    }
}

export default userReducer;