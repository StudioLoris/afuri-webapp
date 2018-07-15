import axios, { AxiosRequestConfig } from 'axios';

const request = axios.create({
    baseURL: '/api',
});

request.interceptors.response.use((res) => {
    const { data } = res;
    return data;
});

interface LoginResponse {
    oauthProvider : string;
    accessToken : string;
    oauthId : string;
}

class ApiService {

    public getRoot = () => request.get('/');
    public logout = () => request.post('/user/logout');
    public login = (provider? : string, code? : string) : Promise<LoginResponse> => request.post('/user/login', { provider, code }) as any;

}

const apiService = new ApiService();

export default apiService;
