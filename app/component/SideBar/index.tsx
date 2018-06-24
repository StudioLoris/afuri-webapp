import * as React from 'react';
import { observer } from 'mobx-react';
import styled, { keyframes } from 'styled-components';
import userService from '@/service/user';
import appService from '@/service/app';
import { Button } from '@/UI';
import bank from '@/assets/bank.svg';
import exit from '@/assets/exit.svg';
import enter from '@/assets/enter.svg';
import play from '@/assets/play.svg';
import slot from '@/assets/slotmachine.svg';
import cat from '@/assets/cat.svg';
import lottery from '@/assets/lottery.svg';
import book from '@/assets/book.svg';
import manage from '@/assets/manage.svg';
import ROUTES from '@/constants/routes';
import Dashboard from './components/Dashboard';

const Wrapper = styled.div`
    height: 100%;
    background-color: ${(props) => props.theme.PRIMARY_BG};
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
    color: ${(props) => props.theme.PRIMARY_STRONG_TEXT};
    font-weight: bold;
    font-size: large;
    &:hover {
        cursor: pointer;
        background-color: rgba(255, 255, 255, 0.3);
    }
    & > a {
        text-decoration: none;
    }
`;
const ItemIcon = styled.div`
    display: flex;
    flex: 1;
    justify-content: flex-end;
`;
const ItemText = styled.div`
    flex: 3;
`;

const Footer = styled.div`
    padding: 5px;
    font-size: small;
    text-align: center;
    color: ${(props) => props.theme.PRIMARY_LIGHT_TEXT};
`;
const Expand = keyframes`
  from {
    max-height: 0px;
  }

  to {
    max-height: 500px;
  }
`;
const SubItems = styled.div`
    overflow: hidden;
    animation: ${Expand} 0.5s ease-in;
    border-top: 2px solid ${(props) => props.theme.PRIMARY_BG};
    border-bottom: 2px solid ${(props) => props.theme.PRIMARY_BG};
    background-color: rgba(255, 255, 255, 0.3);
`;

interface State {
    showFunPlace : boolean;
}
interface Props {

}

@observer
export default class SideBar extends React.Component<Props, State> {

    public state : State = {
        showFunPlace: false
    };

    public render() {
        const { username, email } = userService.profileData;
        const { showFunPlace } = this.state;
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
                    <Item>
                        <ItemIcon><Icon src={book} /></ItemIcon>
                        <ItemText>Take Survey & Vote</ItemText>
                    </Item>
                    {userService.isLoggedIn && (
                        <React.Fragment>
                            <Item onClick={() => appService.go(ROUTES.BANK)}>
                                <ItemIcon><Icon src={bank} /></ItemIcon>
                                <ItemText>Bank Account</ItemText>
                            </Item>
                            <Item onClick={this.toggleFunplaces}>
                                <ItemIcon><Icon src={play} /></ItemIcon>
                                <ItemText>Fun Places</ItemText>
                            </Item>
                            {showFunPlace && (
                                <SubItems>
                                    <Item>
                                        <ItemIcon><Icon src={slot} /></ItemIcon>
                                        <ItemText>Slot Machine</ItemText>
                                    </Item>
                                    <Item>
                                        <ItemIcon><Icon src={lottery} /></ItemIcon>
                                        <ItemText>Lottery</ItemText>
                                    </Item>
                                    <Item>
                                        <ItemIcon><Icon src={cat} /></ItemIcon>
                                        <ItemText>Pet</ItemText>
                                    </Item>
                                </SubItems>
                            )}
                            <Item>
                                <ItemIcon><Icon src={manage} /></ItemIcon>
                                <ItemText>Manage My Survey</ItemText>
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

    private toggleFunplaces = () => this.setState({ showFunPlace : !this.state.showFunPlace });
    private clickLogin = () => userService.login();
    private clicklogout = () => userService.logout();
}
