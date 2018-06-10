export const OAUTH_PROVIDER = {
    FACEBOOK: 'facebook',
};

export interface UserProfile {
    username : string;
    email : string;
}

export interface LoginInfo {
    provider : string;
    email : string;
}
