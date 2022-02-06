import {
  CLEAR_GITREPOS,
    CLEAR_PROFILE,
  GET_GITREPOS,
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_ERROR,
  UPDATE_PROFILE,
} from "../actions/type";

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  error: {},
  loading: true,
};
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        profile: null,
      };
    case GET_GITREPOS:
      return {
        ...state,
        repos: payload,
        loading: false,
      };
    case CLEAR_PROFILE:
   
      return {
        ...state,
        profile: null,
        repos: [],
      };
    case CLEAR_GITREPOS:
      return{
        ...state,
        repos:null
      }
    default:
      return state;
  }
}
