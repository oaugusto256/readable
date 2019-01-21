import { combineReducers } from 'redux';
import PostReducer from './PostReducer';
import CategoryReducer from './CategoryReducer';
import CommentReducer from './CommentReducer';

export default combineReducers({
  post: PostReducer,
  category: CategoryReducer,
  comment: CommentReducer
});