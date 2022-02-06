import axios from "axios";
import {
  ACCOUNT_DELETE,
  CLEAR_PROFILE,
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  GET_GITREPOS,
  CLEAR_GITREPOS,

} from "./type";
import { setAlert } from "./alert";


// Get current profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/profiles/me");

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
// Get a profile By UserId
export const getProfileById = userId => async (dispatch) => {
  
  try {
    const res = await axios.get(`/api/profiles/user/${userId}`);
  console.log(res.data)
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
     
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};
// Get all profile
export const getProfiles = () => async (dispatch) => {
  // dispatch({type:CLEAR_PROFILES})
  try {
    const res = await axios.get("/api/profiles");
 
    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
     
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
// Get github Repos 

export const getGitRepos = username => async (dispatch) => {
  // dispatch({type:CLEAR_GITREPOS})
  try {
    const res = await axios.get(`/api/profiles/github/${username}`);

    

    dispatch({
      type: GET_GITREPOS,
      payload: res.data,
    });
  } 
  catch (error) {
    dispatch({
      type: CLEAR_GITREPOS,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};



//create a profile
export const createProfile =
  (formData, edit = false,useNavigate) =>
  async (dispatch) => {
//  const navigate = useNavigate();

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post("/api/profiles", formData, config);

      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });

      dispatch(
        setAlert(
          edit ? "Profile is Updated" : "Profile has been created successfully",
          "success"
        )
      );

      if (!edit) {
          // return navigate('/dashboard')
        
      }
    } catch (error) {
      const errors = error.response.data.error;

      dispatch({
        type: CLEAR_PROFILE,
        payload: {
          msg: error.response.statusText,
          status: error.response.status,
        },
      });
      if (errors) {
        errors.map((error) => (
          dispatch(setAlert(error.msg, "danger"))
        ));
      }
    }
  };

// ADD Experience
export const addExperience = (formData ,useNavigate) => async (dispatch) => {
  // const navigate = useNavigate();
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post("api/profiles/experience", formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert("Experience has been added Successfully", "success"));
      // navigate(-1);
      
    
  } catch (error) {
    const errors = error.response.data.error;

    dispatch({
      type: CLEAR_PROFILE,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
    if (errors) {
      errors.map((error) => (
        dispatch(setAlert(error.msg, "danger"))
      ));
    }
  }
};
// ADD Education
export const addEducation = (formData ,useNavigate) => async (dispatch) => {
  // const navigate = useNavigate();
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post("api/profiles/education", formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert("Education has been added Successfully", "success"));
    
      // return navigate(-1);
    
  } catch (error) {
    const errors = error.response.data.error;

    dispatch({
      type: CLEAR_PROFILE,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
    if (errors) {
      errors.map((error) => {
       return  dispatch(setAlert(error.msg, "danger"));
      });
    }
  }
};


// Delete experience

export const deleteExperience = (_id) => async dispatch =>{
  try {
    const res = await axios.delete(`/api/profiles/experience/${_id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert("Experience has been deleted Successfully", "success"));
    
      // return navigate(-1);
    

  } catch (error) {
    const errors = error.response.data.error;

    dispatch({
      type: CLEAR_PROFILE,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
    if (errors) {
      errors.map((error) => {
        return  dispatch(setAlert(error.msg, "danger"));
      });
    }
  }
} 

// Delete Education
export const deleteEducation = (_id) => async dispatch =>{
  try {
    const res = await axios.delete(`/api/profiles/education/${_id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert("Education has been deleted Successfully", "success"));
    
    // return navigate(-1);
    

  } catch (error) {
    const errors = error.response.data.error;

    dispatch({
      type: CLEAR_PROFILE,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
    if (errors) {
      errors.map((error) => {
        return   dispatch(setAlert(error.msg, "danger"));
      });
    }
  }
} 


// Delete Account :)

export const deleteAccount = () => async dispatch =>{

  if(window.confirm('Are you sure to delete account?')){

    try {
       await axios.delete(`/api/profiles`);
  
      dispatch({
        type: CLEAR_PROFILE,
      });
      dispatch({
        type: ACCOUNT_DELETE,
      });
      dispatch(setAlert("Account has been deleted Successfully", "success"));
      
        // return navigate(-1);
      
  
    } catch (error) {
      const errors = error.response.data.error;
  
      dispatch({
        type: CLEAR_PROFILE,
        payload: {
          msg: error.response.statusText,
          status: error.response.status,
        },
      });
      if (errors) {
        errors.map((error) => {
          return  dispatch(setAlert(error.msg, "danger"));
        });
      }
    }
  }
} 
