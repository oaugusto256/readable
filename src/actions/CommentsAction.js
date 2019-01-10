import axios from 'axios';
import {
  LOADING,
  SUCCESS_GETTING_COMMENTS
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

export const getComments = () => {
  return dispatch => {
    dispatch({
      type: LOADING
    })

    axios
      .get(`${api}/comments`, { headers })
      .then(res => {
        dispatch({
          type: SUCCESS_GETTING_COMMENTS,
          payload: res.data
        })
      })
      .catch(err => {
        console.log(err)
      });
  }
}