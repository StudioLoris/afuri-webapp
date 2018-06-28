import React from 'react';
import styled, { keyframes, StyledFunction } from 'styled-components';
import { observer } from 'mobx-react';
import SVG from 'react-inlinesvg';
import { Route, Switch, RouteComponentProps, Redirect } from 'react-router-dom';
import PrivateComponentWrapper from '@/component/HOC/PrivateComponentWrapper';
import SideBar from '@/component/SideBar';
import appService from '@/service/app';
import Landing from '@/component/LandingPage';
import Bank from '@/component/Bank';
import ROUTES from '@/constants/routes';
import Menu from '@/assets/menu.svg';

const BREAK_POINT = 840;
const MOBILE_BAR_MAX_WIDTH = 450;

const Wrapper = styled.div`
    flex: 1;
    display: flex;
`;

const StyledSvg : StyledFunction<{ hide : boolean } & SVG> = styled(SVG);

const MenuIcon = StyledSvg`
    visibility: ${(props) => props.hide ? 'hidden' : 'visible'}
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
    animation: ${Appear} 0.3s ease-out;
    position: fixed;
    height: 100%;
    width: 100%;
    max-width: ${MOBILE_BAR_MAX_WIDTH}px;
    display: flex;
    flex-direction: column;
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
        const desktopMode = appService.width > BREAK_POINT;
        return (
            <Wrapper>
                {(desktopMode) && (
                    <SideBarDesktopWrapper>
                        <SideBar />
                    </SideBarDesktopWrapper>
                )}
                {(!desktopMode) && (
                    <div onClick={this.toggleMobileMenu}>
                        <MenuIcon
                            hide={mobileMenu}
                            src={Menu}
                        />
                    </div>
                )}
                {(mobileMenu && !desktopMode) && (
                    <SideBarMobileWrapper>
                        <SideBar
                            isMobile
                            close={this.toggleMobileMenu}
                        />
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
