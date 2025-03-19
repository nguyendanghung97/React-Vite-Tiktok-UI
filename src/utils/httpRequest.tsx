import axios from 'axios';

// Tạo 1 instance cho baseURL
export const request = axios.create({
    baseURL: 'https://tiktok.fullstack.edu.vn/api/',
});
