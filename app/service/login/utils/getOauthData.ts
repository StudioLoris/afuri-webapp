import axios from 'axios';
import { OAUTH_PROVIDER } from '@/constants/login';

interface UserProfile {
    name? : string;
    picture? : string;
}

export const getUserProfile = async (provider : string, accessToken : string) : Promise<UserProfile> => {
    switch(provider) {
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
