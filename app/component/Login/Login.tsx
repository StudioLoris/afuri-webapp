import React, { PureComponent } from 'react';
import { observer } from 'mobx-react';
import facebook from '@/assets/facebook.svg';
import line from '@/assets/line.svg';
import styled from 'styled-components';
import loginService from '@/service/login';
import { OAUTH_PROVIDER } from '@/constants/login';

const OAUthProviderLogo = styled.img`
    height: 50px;
    width: 50px;
    cursor: pointer;
`;

@observer
export default class Login extends React.Component {

    public render() {
        return (
          <div>
              {(
                <React.Fragment>
                    <OAUthProviderLogo src={facebook} onClick={() => this.handleLogin(OAUTH_PROVIDER.FACEBOOK)} />
                    <OAUthProviderLogo src={line} onClick={() => this.handleLogin(OAUTH_PROVIDER.LINE)}/>
                </React.Fragment>
              )}
          </div>
        );
    }

    private handleLogin(provider : string) {
        loginService.goToOauthPage(provider);
    }
}
