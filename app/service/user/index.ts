import { observable, computed, autorun } from 'mobx';
import Facebook from './oauth/facebook';
import { OauthHandlerInterface , OauthHandlerConstructor } from './oauth/interface';
import { UserProfile, LoginInfo, OAUTH_PROVIDER } from './interface';
import apiService from '@/service/api';

function createOauthProvider(
    provider : OauthHandlerConstructor,
    appId : string,
    userValidator : (loginInfo : LoginInfo) => void,
) : OauthHandlerInterface {
    return new provider(appId, userValidator);
}

class UserService {

    @observable public loadingInitStatus : boolean = true;
    @observable public isLoggedIn : boolean = false;
    @observable public loginProvider : string;

    private facebook : OauthHandlerInterface;
    private line : OauthHandlerInterface;

    constructor() {
        this.facebook = createOauthProvider(Facebook, '1934419210183456', this.initUser);
        autorun(() => this.isLoggedIn = this.facebook.isLoggedIn);
        autorun(() => {
            this.loadingInitStatus = this.facebook.loadingInitStatus;
        });
    }

    public login(provider? : string) {
        switch(provider) {
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
