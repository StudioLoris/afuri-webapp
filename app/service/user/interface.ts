export const OAUTH_PROVIDER = {
    FACEBOOK: 'facebook',
};

export interface UserProfile {
    username : string;
    email : string;
}

export interface LoginInfo {
    token : string;
    provider : string;
    email : string;
}
