import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://burgerapp-17e7d.firebaseio.com/'
});

export default axiosInstance;