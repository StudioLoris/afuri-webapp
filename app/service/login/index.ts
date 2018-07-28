import { observable, computed } from 'mobx';
import apiService from '@/service/api';
import { createOauthLink } from './utils/oauthLink';
import { getUserProfile } from './utils/getOauthData';

class LoginService {

    @observable public initDone : boolean = false;
    @observable public oauthProvider : string;
    @observable public name : string;
    @observable public picture : string;

    @observable private accessToken : string;
    @observable private oauthId : string;

    @computed public get isLoggedIn() {
        return this.oauthProvider && this.accessToken && this.oauthId;
    }

    constructor() {

    }

    public async login(provider? : string, code? : string) {
        try {
            const res = await apiService.login(provider, code);
            if (res && res.accessToken) {
                // console.log(res);
                const { oauthProvider, accessToken, oauthId } = res;
                this.oauthProvider = oauthProvider;
                this.accessToken = accessToken;
                this.oauthId = oauthId;
                this.getUserProfile();
                this.initDone = true;
                return this.isLoggedIn;
            }
        } catch {
            console.log('Logged in failed');
            this.initDone = true;
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
        const { name, picture } = await getUserProfile(this.oauthProvider, this.accessToken, this.oauthId);
        this.name = name;
        this.picture = picture;
    }
}

const loginService = new LoginService();

export default loginService;
