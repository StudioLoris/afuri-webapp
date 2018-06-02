import { observable } from 'mobx';

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
    getLoginStatus : (cb : (isLogin : any) => void) => void;
    login : (cd : (res : any) => void) => void;
}

const FB_STATUS = {
    connected: 'connected',
    unknown: 'unknown'
};

class Facebook {

    private sdk : FacebookSDK;
    private appId : string;

    @observable private userID : string;
    @observable private userToken : string;
    @observable private status : string;

    constructor(appId : string) {
        this.appId = appId;
        window.fbAsyncInit = () => {
            this.sdk = window.FB;
            this.init();
        };
        this.loadFacebookSDK(document, 'script', 'facebook-jssdk');
    }

    public login() {
        this.sdk.login(this.handleStatusResponse);
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
    private handleStatusResponse = (statusResponse : StatusResponse) => {
        const { status, authResponse } = statusResponse;
        const { userID, accessToken } = authResponse || { userID: '', accessToken: '' };
        this.status = status;
        this.userID = userID;
        this.userToken = accessToken;
        console.log(this.status);
    }
}

const fbSDK = new Facebook('1934419210183456');
export { fbSDK };
