import {
  POST_ERROR,
  GET_POSTS,
  UPDATE_LIKES,
  DELETE_POST,
  CREATE_POST,
  GET_POST,
  ADD_COMMENT,
  DELETE_COMMENT,
} from "../actions/type";
const initialState = {
  post: null,
  posts: [],
  error: [],
  loading: true,
};

export default function (state = initialState, actions) {
  const { type, payload } = actions;
  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false,
      };
    case GET_POST:
      return {
        ...state,
        post: payload,
        loading: false,
      };
    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload.id ? { ...post, likes: payload.likes } : post
        ),
        loading: false,
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== payload),
        loading: false,
      };
    case CREATE_POST:
      return {
        ...state,
        posts: [payload, ...state.posts],
        loading: false,
      };
    case ADD_COMMENT:
      return {
        ...state,
        post: { ...state.post, comments: payload },
        loading: false,
      };

    case DELETE_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments:state.post.comments.filter( comment => comment._id !== payload),
        },
        loading: false,
      };
    default:
      return { ...state };
  }
}
