import * as React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import userService from '@/service/user';
import { Button } from '@/UI';
import Dashboard from './components/Dashboard';

const Wrapper = styled.div`
    height: 100%;
    background-color: ${(props) => props.theme.YELLOW};
    display: flex;
    flex-direction: column;
`;

const Padding = styled.div`
    flex: 1;
`;

const Footer = styled.div`
    padding: 5px;
    font-size: small;
    text-align: center;
`;

@observer
export default class SideBar extends React.Component {
    public render() {
        const { username, email } = userService.profileData;
        return (
            <Wrapper>
                <Dashboard />
                <Padding />
                { userService.isLoggedIn ?
                    <Button onClick={this.clickFBlogout}>logout</Button>
                    :
                    <Button onClick={this.clickFBlogin}>login to facebook</Button>
                }
                <Footer>Survery City 2018</Footer>
            </Wrapper>
        );
    }

    private clickFBlogin = () => {
        userService.login();
    }
    private clickFBlogout = () => {
        userService.logout();
    }
}
