import axios from "axios";
import { setAlert } from "./alert";
import {
  ADD_COMMENT,
  CREATE_POST,
  DELETE_COMMENT,
  DELETE_POST,
  GET_POST,
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
} from "./type";
// Get all post
export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/posts");
    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
    dispatch(setAlert("Post fetched", 'success'))
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
// Like Post
export const likePost = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/likes/${id}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data },
    });
    dispatch(setAlert("Post Liked...", "success"));
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
// Dislike Post
export const unlikePost = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/unlikes/${id}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data },
    });
    dispatch(setAlert("Post  unliked...", "primary"));
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
// Delete a  Post
export const deletePost = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/posts/${id}`);
    dispatch({
      type: DELETE_POST,
      payload: id,
    });
    dispatch(setAlert("Post Deleted...", "success"));
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
export const addPost = (PostData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post("/api/posts", PostData, config);
    dispatch({
      type: CREATE_POST,
      payload: res.data,
    });

    dispatch(setAlert("Post Created..", "success"));
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
// Get  A Single post
export const getPost =
  ({ id }) =>
  async (dispatch) => {
    try {
      const res = await axios.get(`/api/posts/${id}`);

      dispatch({
        type: GET_POST,
        payload: res.data,
      });
      // dispatch(setAlert("Post fetched", "success"));
    } catch (error) {
      dispatch({
        type: POST_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status,
        },
      });
    }
  };
// Add Comment on the Post
export const addComment =
  ( postId , CommentData) =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const res = await axios.post(
        `/api/posts/comments/${postId}`,
        CommentData,
        config
      );

      dispatch({
        type: ADD_COMMENT,
        payload: res.data,
      });
      dispatch(
        setAlert("Comment has been added to the Post Successfully. ", "success")
      );
    } catch (error) {
      dispatch({
        type: POST_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status,
        },
      });
    }
  };
// Delete Comment from the Post
export const deleteComment =
  ( postId, commentId ) =>
  async dispatch => {
    try {
       await axios.delete(`/api/posts/comments/${postId}/${commentId}`);
    
      dispatch({
       type: DELETE_COMMENT,
        payload: commentId,
      });
     
      dispatch(
        setAlert(
          "Comment has been deleted from the Post Successfully.",
          "success"
          ));
    } catch (error) {
      dispatch({
        type: POST_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status,
        },
      });
    }
  };
