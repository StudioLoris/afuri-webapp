import * as React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import userService from '@/service/user';
import { Button } from '@/UI';
import bank from '@/assets/bank.svg';
import exit from '@/assets/exit.svg';
import enter from '@/assets/enter.svg';
import play from '@/assets/play.svg';
import Dashboard from './components/Dashboard';

const Wrapper = styled.div`
    height: 100%;
    background-color: ${(props) => props.theme.YELLOW};
    display: flex;
    flex-direction: column;
`;

const Items = styled.div`
    padding: 20px 0px;
    overflow-y: auto;
    flex: 1;
`;

const Icon = styled.img`
    height: 25px;
    margin: 0px 15px;
`;

const Item = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 15px;
    color: ${(props) => props.theme.TEXT_DARK};
    font-weight: bold;
    font-size: large;
    &:hover {
        cursor: pointer;
        background-color: rgba(255, 255, 255, 0.3);
    }
`;
const ItemIcon = styled.div`
    display: flex;
    flex: 1;
    justify-content: flex-end;
`;
const ItemText = styled.div`
    flex: 2;
`;

const Footer = styled.div`
    padding: 5px;
    font-size: small;
    text-align: center;
    color: ${(props) => props.theme.TEXT_LIGHT};
`;

@observer
export default class SideBar extends React.Component {
    public render() {
        const { username, email } = userService.profileData;
        return (
            <Wrapper>
                <Dashboard />
                <Items>
                    { !userService.isLoggedIn && (
                        <Item onClick={this.clickLogin}>
                            <ItemIcon><Icon src={enter} /></ItemIcon>
                            <ItemText>Login</ItemText>
                        </Item>
                    )}
                    {userService.isLoggedIn && (
                        <React.Fragment>
                            <Item>
                                <ItemIcon><Icon src={bank} /></ItemIcon>
                                <ItemText>Bank Account</ItemText>
                            </Item>
                            <Item>
                                <ItemIcon><Icon src={play} /></ItemIcon>
                                <ItemText>Fun Places</ItemText>
                            </Item>
                            <Item onClick={this.clicklogout}>
                                <ItemIcon><Icon src={exit} /></ItemIcon>
                                <ItemText>Log Out</ItemText>
                            </Item>
                        </React.Fragment>

                    )}
                </Items>

                <Footer>Survery City 2018</Footer>
            </Wrapper>
        );
    }

    private clickLogin = () => {
        userService.login();
    }
    private clicklogout = () => {
        userService.logout();
    }
}
