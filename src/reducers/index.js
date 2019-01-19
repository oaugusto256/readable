import { combineReducers } from 'redux';
import PostReducer from './PostReducer';
import CommentReducer from './CommentReducer';
import CategoryReducer from './CategoryReducer';

export default combineReducers({
  post: PostReducer,
  comment: CommentReducer,
  category: CategoryReducer
});