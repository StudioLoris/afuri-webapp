import { observable, computed, observe, autorun } from 'mobx';
import facebook from './oauth/facebook';

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

}

const userService = new UserService();

export default userService;
