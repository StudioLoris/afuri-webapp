import { observable, computed, autorun } from 'mobx';
import Facebook from './oauth/facebook';
import { UserProfile, LoginInfo, OAUTH_PROVIDER } from './interface';
import apiService from '@/service/api';
import { createOauthLink } from './utils/oauthLink';

class UserService {

    @observable public loadingInitStatus : boolean = true;
    @observable public isLoggedIn : boolean = false;
    @observable public loginProvider : string;

    private facebook : Facebook;

    constructor() {
        this.facebook = new Facebook('1934419210183456', this.initUser);
        autorun(() => this.isLoggedIn = this.facebook.isLoggedIn);
        autorun(() => {
            this.loadingInitStatus = this.facebook.loadingInitStatus;
        });
    }

    public login(provider? : string) {
        switch(provider) {
            case OAUTH_PROVIDER.LINE:
                this.goToOauthPage(provider);
                break;
            case OAUTH_PROVIDER.FACEBOOK:
            default:
                this.facebook.login();
        }
    }
    public logout() {
        apiService.logout();
        switch(this.loginProvider) {
            case OAUTH_PROVIDER.FACEBOOK:
                this.facebook.logout();
                break;
            default:
                throw new Error('Logging out without oauth provider');
        }
    }
    public goToOauthPage(provider : string) {
        window.open(createOauthLink(provider), '_self');
    }

    @computed public get profilePicture() : string {
        if (this.isLoggedIn) {
            switch (this.loginProvider) {
                case OAUTH_PROVIDER.FACEBOOK:
                    return this.facebook.profilePicture;
            }
        }
    }
    @computed public get profileData() : UserProfile {
        if (this.isLoggedIn) {
            switch (this.loginProvider) {
                case OAUTH_PROVIDER.FACEBOOK:
                    return this.facebook.userProfile;
                default:
                    return { username: '', email: '' };
            }
        }
        return { username: '', email: '' };
    }

    private initUser = async (loginInfo : LoginInfo) => {
        const { provider } = loginInfo;
        this.loginProvider = provider;
        await apiService.checkUser(loginInfo);
    }

}

const userService = new UserService();

export default userService;
