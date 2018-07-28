import React from 'react';
import { observer } from 'mobx-react';
import { Redirect } from 'react-router-dom';
import loginService from '@/service/login';
import Spinner from '@/UI/Spinner';
import ROUTES from '@/constants/routes';

@observer
export default class PrivateComponentWrapper extends React.Component {
    public render() {
        return (
            <div>
                {!loginService.initDone && (<Spinner />)}
                {loginService.initDone && (
                    <>
                        {loginService.isLoggedIn && (this.props.children)}
                        {!loginService.isLoggedIn && (<Redirect to={ROUTES.HOME} />)}
                    </>
                )}
            </div>
        );
    }
}
