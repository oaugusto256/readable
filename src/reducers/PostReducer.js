import {
  LOADING,
  DELETE_POST,
  UPDATE_POSTS,
  SUCCESS_GETTING_POST,
  SUCCESS_CREATING_POST,
  SUCCESS_GETTING_POSTS,
  SUCCESS_GETTING_POST_COMMENTS,
} from '../actions/types';

const INITIAL_STATE = {
  posts: [],
  postComments: [],
  post: {},
  loading: false,
};

let updatedPosts = [];

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SUCCESS_CREATING_POST:
      return {
        ...state,
        loading: false,
        posts: [...state.posts, action.payload]
      }
    case SUCCESS_GETTING_POST_COMMENTS:
      return {
        ...state,
        loading: false,
        postComments: [...action.payload]
      }
    case SUCCESS_GETTING_POST:
      return {
        ...state,
        loading: false,
        post: action.payload
      }
    case SUCCESS_GETTING_POSTS:
      return {
        ...state,
        loading: false,
        posts: [...action.payload]
      }
    case DELETE_POST:
      return {
        ...state,
        posts: [...state.posts.filter(post => {
          return (post.id !== action.payload)
        })]
      }
    case UPDATE_POSTS:
      updatedPosts = state.posts.map((item) => {
        if (item.id !== action.payload.id)
          return item

        return {
          ...item,
          ...action.payload
        }
      })

      return {
        ...state,
        posts: [...updatedPosts]
      }
    case LOADING:
      return {
        ...state,
        loading: true
      }
    default:
      return state;
  }
};