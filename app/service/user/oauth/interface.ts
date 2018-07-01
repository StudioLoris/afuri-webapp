import { UserProfile, LoginInfo, OAUTH_PROVIDER } from '../interface';

interface OauthHandlerConstructor {
  new (appId : string, userValidator : (loginInfo : LoginInfo) => void);
}

interface OauthHandlerInterface {
  profilePicture : string;
  isLoggedIn : boolean;
  loadingInitStatus : boolean;
  userProfile : UserProfile;
  login() : void;
  logout() : void;
}

export { OauthHandlerInterface, OauthHandlerConstructor };
