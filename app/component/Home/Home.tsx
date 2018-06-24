import React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import { Route, Switch, RouteComponentProps, Redirect } from 'react-router-dom';
import PrivateComponentWrapper from '@/component/HOC/PrivateComponentWrapper';
import SideBar from '@/component/SideBar';
import appService from '@/service/app';
import userService from '@/service/user';
import Landing from '@/component/LandingPage';
import Bank from '@/component/Bank';
import ROUTES from '@/constants/routes';

const Wrapper = styled.div`
    flex: 1;
    display: flex;
`;

const SideBarDesktopWrapper = styled.div`
    height: 100%;
    width: 300px;
`;

interface Props extends RouteComponentProps<any> {

}

const PrivateRoute = (
    { Component, path } : { Component : any, path : string }
) => (
    <Route
        exact
        path={path}
        render={() => (
            <PrivateComponentWrapper>
                <Component />
            </PrivateComponentWrapper>
        )}
    />
);

@observer
export default class Home extends React.Component<Props> {
    public render() {
        // console.log(this.props);
        const { location } = this.props;
        return (
            <Wrapper>
                {(appService.width > 600) && (
                    <SideBarDesktopWrapper>
                        <SideBar />
                    </SideBarDesktopWrapper>
                )}
                <Switch location={location}>
                    <PrivateRoute path={ROUTES.BANK} Component={Bank} />
                    <Route excat path={ROUTES.HOME} component={Landing} />
                    <Redirect to={{pathname: ROUTES.HOME}} />
                </Switch>
            </Wrapper>
        );
    }
}
