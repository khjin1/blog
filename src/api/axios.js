import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://dev.wenivops.co.kr/services/fastapi-crud/1',
});

// 로그인 토큰을 헤더에 담아 보내는 설정
instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default instance;