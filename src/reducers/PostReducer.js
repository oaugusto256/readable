import {
  LOADING,
  SUCCESS_GETTING_POSTS,
  UPDATE_POSTS
} from '../actions/types';

const INITIAL_STATE = {
  loading: false,
  posts: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SUCCESS_GETTING_POSTS:
      return {
        ...state,
        loading: false,
        posts: [...action.payload]
      }
    case UPDATE_POSTS:
      const updatedPosts = state.posts.map((item) => {
        if (item.id !== action.payload.id) {
          return item
        }

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