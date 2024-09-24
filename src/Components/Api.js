import axios from 'axios';

const Api = axios.create({
    baseURL: 'https://notes-app-backend-theta.vercel.app/',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default Api;
