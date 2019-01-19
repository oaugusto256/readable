import axios from 'axios';
import {
  LOADING,
  DELETE_POST,
  UPDATE_POSTS,
  SUCCESS_GETTING_POST,
  SUCCESS_GETTING_POSTS,
  SUCCESS_GETTING_POST_COMMENTS
} from './types';

const api = process.env.NODE_ENV === 'development' ? "http://localhost:3001" :  '';

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

export const getPost = (postId) => {
  return dispatch => {
    dispatch({
      type: LOADING
    })

    axios
      .get(`${api}/posts/${postId}`, { headers })
      .then(res => {
        dispatch({
          type: SUCCESS_GETTING_POST,
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

export const deletePost = (postId) => {
  return dispatch => {
    axios({
      method: 'delete',
      headers: headers,
      url: `${api}/posts/${postId}`
    })
    .then(res => {
      dispatch({
        type: DELETE_POST,
        payload: res.data.id
      })
    })
    .catch(err => {
      console.log(err);
    });
  }
}

export const getPostComments = (postId) => {
  return dispatch => {
    dispatch({
      type: LOADING
    })

    axios
      .get(`${api}/posts/${postId}/comments`, { headers })
      .then(res => {
        dispatch({
          type: SUCCESS_GETTING_POST_COMMENTS,
          payload: res.data
        })
      })
      .catch(err => {
        console.log(err)
      });
  }
}