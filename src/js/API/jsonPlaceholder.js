/**
 * jsonPlaceholder.js
 * 
 * CREATE AN ENTRY POINT TO THE JSONPLACEHOLDER.COM API
 */


import axios from 'axios';

export default axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com'
})