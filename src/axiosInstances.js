import axios from 'axios';
const instance = axios.create({
    baseURL:'https://seal-app-5gg2a.ondigitalocean.app/api',
    withCredentials:true,
});

export default instance;