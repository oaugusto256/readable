import axios from 'axios';
import {
  LOADING,
} from './types';

const api = process.env.NODE_ENV === 'development' ? "http://localhost:3001" :  'https://readable-udacity-api.herokuapp.com/';

// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}