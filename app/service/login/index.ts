import { observable, computed } from 'mobx';
import apiService from '@/service/api';
import { createOauthLink } from './utils/oauthLink';
import { getUserProfile } from './utils/getOauthData';

class LoginService {

    @observable public oauthProvider : string;
    @observable public name : string;
    @observable public picture : string;

    @observable private accessToken : string;

    @computed public get isLoggedIn() {
        return this.oauthProvider && this.accessToken;
    }

    constructor() {

    }

    public async login(provider? : string, code? : string) {
        try {
            const res = await apiService.login(provider, code);
            if (res && res.accessToken) {
                const { oauthProvider, accessToken } = res;
                this.oauthProvider = oauthProvider;
                this.accessToken = accessToken;
                this.getUserProfile();
                return this.isLoggedIn;
            }
        } catch {
            console.log('Logged in failed');
        }
    }

    public async logout() {
        await apiService.logout();
        this.oauthProvider = undefined;
        this.accessToken = undefined;
    }

    public goToOauthPage(provider : string) {
        window.open(createOauthLink(provider), '_self');
    }

    public async getUserProfile() {
        const { name, picture } = await getUserProfile(this.oauthProvider, this.accessToken);
        this.name = name;
        this.picture = picture;
    }
}

const loginService = new LoginService();

export default loginService;
