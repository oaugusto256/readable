import axios from 'axios';
import {
  LOADING,
  SUCCESS_GETTING_CATEGORIES
} from './types';

const api = process.env.NODE_ENV === 'development' ? "http://localhost:3001" :  '';

let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export const getCategories = () => {
  return dispatch => {
    dispatch({
      type: LOADING
    })

    axios
      .get(`${api}/categories`, { headers })
      .then(res => {
        dispatch({
          type: SUCCESS_GETTING_CATEGORIES,
          payload: res.data.categories
        })
      })
      .catch(err => {
        console.log(err)
      });
  }
}