import React, { PureComponent } from 'react';
import { observer } from 'mobx-react';
import facebook from '@/assets/facebook.svg';
import line from '@/assets/line.svg';
import styled from 'styled-components';
import userService from '@/service/user';
import { OAUTH_PROVIDER } from '@/service/user/interface';

const OAUthProviderLogo = styled.img`
    height: 50px;
    width: 50px;
    cursor: pointer;
`;

@observer
export default class Login extends PureComponent {

    public render() {
        return (
          <div>
              {!userService.isLoggedIn && (
                <React.Fragment>
                    <OAUthProviderLogo src={facebook} onClick={() => this.handleLogin(OAUTH_PROVIDER.FACEBOOK)} />
                    <OAUthProviderLogo src={line} />
                </React.Fragment>
              )}
              {userService.isLoggedIn && (
                  <span>You have logged in!</span>
              )}

          </div>
        );
    }

    private handleLogin(provider : string) {
        userService.login(provider);
    }
}
