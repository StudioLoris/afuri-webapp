import React from 'react';
import { observer } from 'mobx-react';
import userService from '@/service/user';

@observer
export default class PrivateComponentWrapper extends React.Component {
    public render() {
        return (
          <div>
              {userService.loadingInitStatus && ('loading')}
              {!userService.loadingInitStatus && (
                  <>
                    {!userService.isLoggedIn && ('please login')}
                    {userService.isLoggedIn && (this.props.children)}
                  </>
              )}
          </div>
        );
    }
}
