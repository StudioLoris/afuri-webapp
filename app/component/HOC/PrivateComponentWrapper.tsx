import React from 'react';
import { observer } from 'mobx-react';
import { Redirect } from 'react-router-dom';
import userService from '@/service/user';
import ROUTES from '@/constants/routes';

@observer
export default class PrivateComponentWrapper extends React.Component {
    public render() {
        return (
          <div>
              {userService.loadingInitStatus && ('loading')}
              {!userService.loadingInitStatus && (
                  <>
                    {userService.isLoggedIn && (this.props.children)}
                    {!userService.isLoggedIn && (
                        <Redirect to={ROUTES.HOME} />
                    )}
                  </>
              )}
          </div>
        );
    }
}
