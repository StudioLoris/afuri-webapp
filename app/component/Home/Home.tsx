import React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import { Link, Route, Switch, RouteComponentProps } from 'react-router-dom';
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

@observer
export default class Home extends React.Component<Props> {
    public render() {
        console.log(this.props);
        const { location } = this.props;
        return (
            <Wrapper>
                {(appService.width > 600) && (
                    <SideBarDesktopWrapper>
                        <SideBar />
                    </SideBarDesktopWrapper>
                )}
                <Switch location={location}>
                    <Route excat path={ROUTES.BANK} component={Bank} />
                    <Route excat path={ROUTES.HOME} component={Landing} />
                </Switch>
            </Wrapper>
        );
    }
}
