import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Logo from '@/assets/logo.svg';
import Coin from '@/assets/coin.svg';
import Rank3 from '@/assets/rank_3.svg';
import Girl1 from '@/assets/girl_1.svg';
import loginService from '@/service/login';
import { observer } from 'mobx-react';
import ROUTES from '@/constants/routes';
import appService from '@/service/app';

const Wrapper = styled.div`
    align-items: flex-start;
    display: flex;
    height: 100px;
    align-items: center;
`;
const CenterText = styled.div`
    text-align: center;
`;
const Name = styled.span`
    font-size: x-large;
    font-weight: bold;
    color: ${(props) => props.theme.TEXT_DARK};
`;
const Description = styled.span`
    color: ${(props) => props.theme.TEXT_DARK};
    font-size: small;
`;
const LogoItem = styled.img`
    border-radius: 15px;
    margin: 10px;
    width: 80px;
`;

const InfoArea = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 5px 10px;
`;
const List = styled.div`
    display: flex;
    flex-direction: column;
`;
const Row = styled.div`
    display: flex;
`;
const InfoItem = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    padding: 5px 0px;
`;
const InfoIcon = styled.img`
    height: 20px;
    margin-right: 5px;
`;
const ProfileImg = styled(InfoIcon)`
    border-radius: 100%;
`;

const InfoText = styled.span`
    color: ${(props) => props.theme.TEXT_DARK};
`;

@observer
export default class Dashboard extends React.Component {
    public render() {
        return (
          <Wrapper>
                <LogoItem src={Logo} onClick={() => appService.go(ROUTES.HOME)}/>
                <InfoArea>
                    {loginService.isLoggedIn && (
                        <List>
                            <Row>
                                <InfoItem>
                                    <ProfileImg src={loginService.picture} />
                                    <InfoText> { loginService.name } via {loginService.oauthProvider}</InfoText>
                                </InfoItem>
                            </Row>
                            <Row>
                                <InfoItem>
                                    <InfoIcon src={Rank3} />
                                    <InfoText> Mayor </InfoText>
                                </InfoItem>
                                <InfoItem>
                                    <InfoIcon src={Coin} />
                                    <InfoText> 5,432 </InfoText>
                                </InfoItem>
                            </Row>
                        </List>
                    )}
                    {!loginService.isLoggedIn && (
                        <React.Fragment>
                            <CenterText>
                                <Name>Survey City</Name>
                            </CenterText>
                            <CenterText>
                                <Description>Lovely & Fun Survey Platform</Description>
                            </CenterText>
                        </React.Fragment>
                    )}
                </InfoArea>
          </Wrapper>
        );
    }
}
