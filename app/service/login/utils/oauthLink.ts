import { OAUTH_PROVIDER } from '@/constants/login';
import ROUTES from '@/constants/routes';

const LineOAuthLink = (protocol, hostname, port) => `
https://access.line.me/oauth2/v2.1/authorize?
response_type=code&
client_id=1590579283&
redirect_uri=${protocol}//${hostname}:${port}${ROUTES.VERIFY_OAUTH}/line&
state=12345abcde&
scope=email%20openid%20profile&nonce=09876xyz
`;

export const createOauthLink = (provider : string) : string => {
    const {
        hostname,
        protocol,
        port,
    } = window.location;
    switch(provider) {
        case OAUTH_PROVIDER.LINE:
            return LineOAuthLink(protocol, hostname, port);
        default:
            return null;
    }
};
