import axios from 'axios';

// Tạo 1 instance cho baseURL
const request = axios.create({
    baseURL: 'https://tiktok.fullstack.edu.vn/api/',
});

// chuyển đổi data trả về từ res.data.data sang res.data
export const get = async (apiPath: string, options: object) => {
    const response = await request.get(apiPath, options);
    return response.data;
};

export default request;
