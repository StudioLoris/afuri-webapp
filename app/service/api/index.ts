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

    public imgurUpload = async (file : File) : Promise<string> => {
        const fileData = new FormData();
        fileData.append('image', file);
        const res = await axios.post('https://api.imgur.com/3/image', fileData, {
            headers: { Authorization: 'Client-ID 2fa71b819630c32' },
        });
        const { data: { data } } = res;
        if (data && data.link) {
            return data.link;
        }
    }
}

const apiService = new ApiService();

export default apiService;
