import { combineReducers } from 'redux';
import PostReducer from './PostReducer';
import CommentReducer from './CommentReducer';
import CategorieReducer from './CategoryReducer';

export default combineReducers({
  post: PostReducer,
  comment: CommentReducer,
  categorie: CategorieReducer
});