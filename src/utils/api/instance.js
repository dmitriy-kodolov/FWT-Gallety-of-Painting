import axios from 'axios';

const defaultHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': '*',
  'Content-Type': 'application/json;charset=UTF-8',
};
const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: defaultHeaders,
});

export default instance;
