import axios from 'axios';
import {
  LOADING,
  SUCCESS_GETTING_POSTS
} from './types';

const api = process.env.NODE_ENV === 'development' ? "http://localhost:3001" :  '';

// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export const getPosts = () => {
  return dispatch => {
    dispatch({
      type: LOADING
    })

    axios
      .get(`${api}/posts`, { headers })
      .then(res => {
        dispatch({
          type: SUCCESS_GETTING_POSTS,
          payload: res.data
        })
      })
      .catch(err => {
        console.log(err)
      });
  }
}