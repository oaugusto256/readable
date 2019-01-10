import {
  LOADING,
  SUCCESS_GETTING_COMMENTS
} from '../actions/types';

const INITIAL_STATE = {
  loading: false,
  comments: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SUCCESS_GETTING_COMMENTS:
      return {
        ...state,
        loading: false,
        comments: [...action.payload]
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