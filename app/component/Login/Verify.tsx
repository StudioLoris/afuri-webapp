import React, { PureComponent } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { observer } from 'mobx-react';
import appService from '@/service/app';
import loginService from '@/service/login';
import ROUTES from '@/constants/routes';
import { OAUTH_PROVIDER } from '@/constants/login';
import line from '@/assets/line.svg';
import styled from 'styled-components';

interface Params {
    provider : string;
}

@observer
export default class Verify extends React.Component<RouteComponentProps<Params>, {}> {

    public async componentDidMount() {
        const { location: { search }, match: { params: { provider } } } = this.props;
        const res = await loginService.login(provider, this.getOauthCode(provider, search));
        if (res) {
            appService.go(ROUTES.HOME);
        }
    }

    public render() {
        const { location: { search }, match: { params: { provider } } } = this.props;
        return (
          <div>
              { provider } OAuth Verifying...
          </div>
        );
    }

    private getOauthCode(provider : string, search : string) {
        const urlParams = new URLSearchParams(search);
        switch (provider) {
            case OAUTH_PROVIDER.LINE:
            default:
                return urlParams.get('code');
        }
    }
}
