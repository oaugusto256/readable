import axios from 'axios';
import {
  LOADING,
  VOTE_POST,
  SUCCESS_GETTING_POSTS,
  UPDATE_POSTS
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

export const votePost = (postId, voteOption) => {
  return dispatch => {
    axios({
      method: 'post',
      headers: headers,
      url: `${api}/posts/${postId}`,
      data: {
        option: voteOption
      }
    })
    .then(res => {
      console.log(res.data)
      dispatch({
        type: UPDATE_POSTS,
        payload: res.data
      })
    })
    .catch(err => {
      console.log(err);
    });
  }
}

export const editPost = (postId, post) => {
  return dispatch => {
    axios({
      method: 'put',
      headers: headers,
      url: `${api}/posts/${postId}`,
      data: {
        title: post.title,
        body: post.body
      }
    })
    .then(res => {
      console.log(res.data)
      dispatch({
        type: UPDATE_POSTS,
        payload: res.data
      })
    })
    .catch(err => {
      console.log(err);
    });
  }
}