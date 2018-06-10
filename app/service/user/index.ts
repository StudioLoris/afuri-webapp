import { observable, computed, observe, autorun } from 'mobx';
import facebook from './oauth/facebook';
import { UserProfile } from './interface';

class UserService {

    @observable public isLoggedIn : boolean = false;

    constructor() {
        autorun(() => this.isLoggedIn = facebook.isLoggedIn);
    }

    public login() {
        facebook.login();
    }
    public logout() {
        facebook.logout();
    }
    @computed public get profilePicture() : string {
        return facebook.profilePicture;
    }
    @computed public get profileData() : UserProfile {
        const fb = facebook.userProfile;
        return fb || { username: '', email: '' };
    }

}

const userService = new UserService();

export default userService;
