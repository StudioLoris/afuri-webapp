import axios from 'axios';
import { OAUTH_PROVIDER } from '@/constants/login';

interface UserProfile {
    name? : string;
    picture? : string;
}

const graphApiUri = 'https://graph.facebook.com/v3.0/';

const GraphAPI = axios.create({
    baseURL: graphApiUri
});

GraphAPI.interceptors.response.use((res) => {
    return res.data;
});

export const getUserProfile = async (provider : string, accessToken : string, oauthId : string) : Promise<UserProfile> => {
    switch(provider) {
        case OAUTH_PROVIDER.FACEBOOK: {
            const profile : { name : string } = await GraphAPI.get(`/me?fields=id,name,email&access_token=${accessToken}`) as any;
            return {
                name: profile.name,
                picture: graphApiUri + `/${oauthId}/picture`,
            };
        }
        case OAUTH_PROVIDER.LINE: {
            const { data } = await axios.get('https://api.line.me/v2/profile', { headers: { 'Authorization': `Bearer ${accessToken}` } });
            return {
                name: data.displayName,
                picture: data.pictureUrl,
            };
        }
        default:
            return {};
    }
};
