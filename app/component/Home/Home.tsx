import * as React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import SideBar from '@/component/SideBar';
import { appService } from '@/service/app';

const Wrapper = styled.div`
    flex: 1;
    display: flex;
`;

const SideBarDesktopWrapper = styled.div`
    height: 100%;
    width: 300px;
`;

@observer
export default class Home extends React.Component {
    public render() {
        return (
            <Wrapper>
                {(appService.width > 600) && (
                    <SideBarDesktopWrapper>
                        <SideBar />
                    </SideBarDesktopWrapper>
                )}

                <div>
                    sdfsdfds
                </div>
            </Wrapper>
        );
    }
}
