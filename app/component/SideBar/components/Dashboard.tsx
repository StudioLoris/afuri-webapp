import * as React from 'react';
import styled from 'styled-components';
import Logo from '@/assets/logo.svg';
import Coin from '@/assets/coin.svg';
import Rank3 from '@/assets/rank_3.svg';
import Girl1 from '@/assets/girl_1.svg';
import userService from '@/service/user';

const Wrapper = styled.div`
    align-items: flex-start;
    display: flex;
`;

const Name = styled.span`
    font-size: x-large;
    font-weight: bold;
    padding: 5px 0px;
    color: ${(props) => props.theme.TEXT_DARK};
`;
const LogoItem = styled.img`
    margin: 10px;
    width: 80px;
    border-radius: 10px;
`;

const InfoArea = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 5px 20px;
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
    font-size: small;
    color: ${(props) => props.theme.TEXT_DARK};
`;

export default class Dashboard extends React.Component {
    public render() {
        const { username } = userService.profileData;
        return (
          <Wrapper>
                <LogoItem src={Logo} />
                <InfoArea>
                    <Name>Survey City</Name>
                    {userService.isLoggedIn && (
                        <List>
                            <Row>
                                <InfoItem>
                                    <ProfileImg src={userService.profilePicture} />
                                    <InfoText> { username } </InfoText>
                                </InfoItem>
                                <InfoItem>
                                    <InfoIcon src={Rank3} />
                                    <InfoText> Mayor </InfoText>
                                </InfoItem>
                            </Row>
                            <Row>
                                <InfoItem>
                                    <InfoIcon src={Coin} />
                                    <InfoText> 5,432 </InfoText>
                                </InfoItem>
                            </Row>
                        </List>
                    )}
                </InfoArea>
          </Wrapper>
        );
    }
}
