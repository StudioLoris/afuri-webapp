import * as React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import userService from '@/service/user';
import { Button } from '@/UI';

const Wrapper = styled.div`
    height: 100%;
    background-color: ${(props) => props.theme.YELLOW};
`;

@observer
export default class SideBar extends React.Component {
    public render() {
        const { username, email } = userService.profileData;
        return (
          <Wrapper>
            { userService.isLoggedIn ?
                <Button onClick={this.clickFBlogout}>logout</Button>
                :
                <Button onClick={this.clickFBlogin}>login to facebook</Button>
            }
            <img src={userService.profilePicture} />
            <div> {username} - {email} </div>
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
