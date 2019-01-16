import {
  LOADING,
} from '../actions/types';

const INITIAL_STATE = {
  loading: false,
  comments: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true
      }
    default:
      return state;
  }
};