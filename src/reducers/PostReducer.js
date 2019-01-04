import {
  LOADING,
  SUCCESS_GETTING_POSTS
} from '../actions/types';

const INITIAL_STATE = {
  loading: false,
  posts: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SUCCESS_GETTING_POSTS:
      return {
        loading: false,
        posts: [...action.payload]
      }
    case LOADING:
      return {
        loading: true
      }
    default:
      return state;
  }
};