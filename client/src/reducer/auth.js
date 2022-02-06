import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOAD,
  USER_LOAD_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  ACCOUNT_DELETE,
} from "../actions/type";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticate: false,
  loading: true,
  user: null,
};

export default function (state = initialState, action) {
  const { payload, type } = action;
  switch (type) {
    case USER_LOAD:
      return {
        ...state,
        ...payload,
        isAuthenticate: true,
        loading: false,
        user: payload,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticate: true,
        loading: false,
      };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case USER_LOAD_FAIL:
    case LOGOUT:
     case ACCOUNT_DELETE: 
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticate: false,
        loading: false,
      };
      // case CLEAR_PROFILE:
      //   return{
      //     ...state,
      //     profile:null,
      //     repos:[]
      //   }
    default:
      return state;
  }
}
