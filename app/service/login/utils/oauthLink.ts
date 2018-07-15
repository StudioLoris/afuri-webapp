import { OAUTH_PROVIDER } from '@/constants/login';
import ROUTES from '@/constants/routes';

const createRedirectLink = (provider : string) => {
    const {
        hostname,
        protocol,
        port,
    } = window.location;
    return `${protocol}//${hostname}:${port}${ROUTES.VERIFY_OAUTH}/${provider}`;
};

const LineOAuthLink = () => `
https://access.line.me/oauth2/v2.1/authorize?
response_type=code&
client_id=1590579283&
redirect_uri=${createRedirectLink(OAUTH_PROVIDER.LINE)}&
state=12345abcde&
scope=email%20openid%20profile&nonce=09876xyz
`;

const FacebookOauthLink = () => `
https://www.facebook.com/v3.0/dialog/oauth?
client_id=1934419210183456
&redirect_uri=${createRedirectLink(OAUTH_PROVIDER.FACEBOOK)}
&scope=email
`;

export const createOauthLink = (provider : string) : string => {

    switch(provider) {
        case OAUTH_PROVIDER.FACEBOOK:
            return FacebookOauthLink();
        case OAUTH_PROVIDER.LINE:
            return LineOAuthLink();
        default:
            return null;
    }
};
