import axios from 'axios';
const url = 'https://glacial-basin-97045.herokuapp.com/';
const devUrl = 'http://localhost:4000/';
const instance = axios.create({
    baseURL: url
});

export default instance;