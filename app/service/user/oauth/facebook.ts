import { observable, computed } from 'mobx';
import { UserProfile, LoginInfo, OAUTH_PROVIDER } from '../interface';

interface AuthResponse {
    accessToken : string;
    expiresIn : number;
    reauthorize_required_in : number;
    signedRequest : string;
    userID : string;
}
interface StatusResponse {
    status : 'connected' | 'unknown';
    authResponse : AuthResponse;
}

interface FacebookSDK {
    init : (
        data : {
            appId : string,
            autoLogAppEvents : boolean,
            xfbml : true,
            version : string
        }
    ) => void;
    getLoginStatus : (cb : (res : StatusResponse) => void) => void;
    login : (
        cb : (res : StatusResponse) => void,
        option : { scope : string }
    ) => void;
    logout : (
        cb : (res : StatusResponse) => void
    ) => void;
    api : (
        endpoint : string,
        params : { fields : string },
        cb : (res : object) => void
    ) => void;
}

const FB_STATUS = {
    CONNECTED: 'connected',
    UNKNOWN: 'unknown',
    NOT_AUTHORIZED: 'not_authorized',
};

class Facebook {

    @observable public userProfile : UserProfile;

    private sdk : FacebookSDK;
    private appId : string;
    private userValidator : (loginInfo : LoginInfo) => void;

    @observable private userID : string;
    @observable private userToken : string;
    @observable private status : string = FB_STATUS.UNKNOWN;

    constructor(appId : string, userValidator : (loginInfo : LoginInfo) => void) {
        this.userValidator = userValidator;
        this.appId = appId;
        window.fbAsyncInit = () => {
            this.sdk = window.FB;
            this.init();
        };
        this.loadFacebookSDK(document, 'script', 'facebook-jssdk');
    }

    public login(userValidator : (loginInfo : LoginInfo) => void) {
        this.sdk.login(this.handleStatusResponse, { scope: 'public_profile,email' });
    }
    public logout() {
        this.sdk.logout(this.handleStatusResponse);
    }
    @computed public get profilePicture() : string {
        return this.userID ? `https://graph.facebook.com/${this.userID}/picture` : null;
    }

    @computed public get isLoggedIn() : boolean {
        return !!((this.status === FB_STATUS.CONNECTED) && this.userID);
    }

    private init() {
        if (this.sdk && this.appId) {
            this.sdk.init({
                appId: this.appId,
                autoLogAppEvents: true,
                xfbml: true,
                version: 'v3.0'
            });
        }
        this.sdk.getLoginStatus(this.handleStatusResponse);
    }

    private loadFacebookSDK(d, s, id) {
        let js;
        const fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = 'https://connect.facebook.net/en_US/sdk.js';
        fjs.parentNode.insertBefore(js, fjs);
    }
    private handleStatusResponse = async (statusResponse : StatusResponse) => {
        const { status, authResponse } = statusResponse;
        const { userID, accessToken } = authResponse || { userID: '', accessToken: '' };
        this.status = status;
        this.userID = userID;
        this.userToken = accessToken;
        if (this.status === FB_STATUS.CONNECTED) {
            await this.updateUserProfile();
            if (this.userValidator) {
                const { email } = this.userProfile;
                /* After we login from Facebook, we check user status from Afuri server */
                this.userValidator({
                    provider: OAUTH_PROVIDER.FACEBOOK,
                    email,
                    token: accessToken
                });
            }
        }
        console.log(statusResponse);
    }
    private updateUserProfile() {
        return new Promise((res) => {
            this.sdk.api('/me', { fields: 'email,name,picture' }, (data : { email : string, name : string }) => {
                const { email, name } = data;
                this.userProfile = { email, username: name };
                res();
            });
        });
    }
}

export default Facebook;
