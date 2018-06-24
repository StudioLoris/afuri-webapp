import React from 'react';
import styled, { keyframes } from 'styled-components';
import { observer } from 'mobx-react';
import SVG from 'react-inlinesvg';
import { Route, Switch, RouteComponentProps, Redirect } from 'react-router-dom';
import PrivateComponentWrapper from '@/component/HOC/PrivateComponentWrapper';
import SideBar from '@/component/SideBar';
import appService from '@/service/app';
import userService from '@/service/user';
import Landing from '@/component/LandingPage';
import Bank from '@/component/Bank';
import ROUTES from '@/constants/routes';
import Menu from '@/assets/menu.svg';

const Wrapper = styled.div`
    flex: 1;
    display: flex;
`;

const MenuIcon = styled(SVG)`
    position: fixed;
    margin: 10px;
    height: 40px;
    width: 40px;
    fill: ${(props) => props.theme.PRIMARY};
    cursor: pointer;
`;

const SideBarDesktopWrapper = styled.div`
    height: 100%;
    width: 300px;
`;
const Appear = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;
const SideBarMobileWrapper = styled.div`
    animation: ${Appear} 0.5s ease-out;
    position: fixed;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
`;

const SideBarMobileCloseButton = styled.span`
    text-align: center;
    padding: 10px;
    background-color: ${(props) => props.theme.PRIMARY_BG};
    color: ${(props) => props.theme.PRIMARY_STRONG_TEXT};
    font-weight: bold;
    font-size: large;
`;

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

const BREAK_POINT = 840;

interface Props extends RouteComponentProps<any> {

}
interface State {
    mobileMenu : boolean;
}

@observer
export default class Home extends React.Component<Props, State> {

    public state = {
        mobileMenu: false,
    };

    public render() {
        // console.log(this.props);
        const { mobileMenu } = this.state;
        const { location } = this.props;
        return (
            <Wrapper>
                {(appService.width > BREAK_POINT) && (
                    <SideBarDesktopWrapper>
                        <SideBar />
                    </SideBarDesktopWrapper>
                )}
                {(!mobileMenu && appService.width <= BREAK_POINT) && (
                    <div onClick={this.toggleMobileMenu}>
                        <MenuIcon
                            src={Menu}
                        />
                    </div>
                )}
                {(mobileMenu) && (
                    <SideBarMobileWrapper>
                        <SideBar />
                        <SideBarMobileCloseButton
                            onClick={this.toggleMobileMenu}
                        >
                            Close
                        </SideBarMobileCloseButton>
                    </SideBarMobileWrapper>
                )}
                <Switch location={location}>
                    <PrivateRoute path={ROUTES.BANK} Component={Bank} />
                    <Route excat path={ROUTES.HOME} component={Landing} />
                    <Redirect to={{pathname: ROUTES.HOME}} />
                </Switch>
            </Wrapper>
        );
    }

    private toggleMobileMenu = () => this.setState({ mobileMenu: !this.state.mobileMenu });
}
