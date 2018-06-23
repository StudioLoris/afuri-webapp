import axios, { AxiosRequestConfig } from 'axios';
import { LoginInfo } from '@/service/user/interface';

const request = axios.create({
    baseURL: '/api',
});

class ApiService {

    public getRoot = () => request.get('/');
    public checkUser = (loginInfo : LoginInfo) => request.post('/user/check', loginInfo);
    public logout = () => request.post('/user/logout');

}

const apiService = new ApiService();

export default apiService;
