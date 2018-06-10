import { observable, computed, observe, autorun } from 'mobx';
import Facebook from './oauth/facebook';
import { UserProfile, LoginInfo } from './interface';
import apiService from '@/service/api';

class UserService {

    @observable public isLoggedIn : boolean = false;
    @observable public loginProvider : string;

    private facebook : Facebook;

    constructor() {
        this.facebook = new Facebook('1934419210183456', this.initUser);
        autorun(() => this.isLoggedIn = this.facebook.isLoggedIn);
    }

    public login() {
        this.facebook.login(this.initUser);
    }
    public logout() {
        this.facebook.logout();
    }
    @computed public get profilePicture() : string {
        return this.facebook.profilePicture;
    }
    @computed public get profileData() : UserProfile {
        const fb = this.facebook.userProfile;
        return fb || { username: '', email: '' };
    }

    private initUser = async (loginInfo : LoginInfo) => {
        const { provider, email } = loginInfo;
        this.loginProvider = provider;
        // console.log(loginInfo);
        await apiService.checkUser(loginInfo);
    }

}

const userService = new UserService();

export default userService;
