import { UserProfile, LoginInfo, OAUTH_PROVIDER } from '../interface';

interface OauthHandlerConstructor {
  new (appId : string, userValidator : (loginInfo : LoginInfo) => void);
}

interface OauthHandlerInterface {
  loadingInitStatus : boolean;
  userProfile : UserProfile;
  login() : void;
  logout() : void;
  profilePicture : string;
  isLoggedIn : boolean;
}

export { OauthHandlerInterface, OauthHandlerConstructor };
