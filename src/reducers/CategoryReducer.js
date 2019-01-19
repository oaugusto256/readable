import {
  LOADING,
  SUCCESS_GETTING_CATEGORIES
} from '../actions/types';

const INITIAL_STATE = {
  loading: false,
  categories: [],
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SUCCESS_GETTING_CATEGORIES:
      return {
        ...state,
        loading: false,
        categories: [...action.payload]
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