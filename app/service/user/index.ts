import { observable, computed, autorun } from 'mobx';
import Facebook from './oauth/facebook';
import { UserProfile, LoginInfo, OAUTH_PROVIDER } from './interface';
import apiService from '@/service/api';

class UserService {

    @observable public isLoggedIn : boolean = false;
    @observable public loginProvider : string;

    private facebook : Facebook;

    constructor() {
        this.facebook = new Facebook('1934419210183456', this.initUser);
        autorun(() => this.isLoggedIn = this.facebook.isLoggedIn);
    }

    public login(provider? : string) {
        switch(provider) {
            case OAUTH_PROVIDER.FACEBOOK:
            default:
                this.facebook.login(this.initUser);
        }
    }
    public logout() {
        switch(this.loginProvider) {
            case OAUTH_PROVIDER.FACEBOOK:
                this.facebook.logout();
                break;
            default:
                throw new Error('Logging out without oauth provider');
        }
    }
    @computed public get profilePicture() : string {
        switch (this.loginProvider) {
            case OAUTH_PROVIDER.FACEBOOK:
                return this.facebook.profilePicture;
        }
    }
    @computed public get profileData() : UserProfile {
        switch (this.loginProvider) {
            case OAUTH_PROVIDER.FACEBOOK:
                return this.facebook.userProfile;
            default:
                return { username: '', email: '' };
        }

    }

    private initUser = async (loginInfo : LoginInfo) => {
        const { provider } = loginInfo;
        this.loginProvider = provider;
        await apiService.checkUser(loginInfo);
    }

}

const userService = new UserService();

export default userService;
