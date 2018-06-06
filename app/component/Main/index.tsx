import * as React from 'react';
import { observer } from 'mobx-react';
import Loadable from 'react-loadable';
import Logo from '@/assets/logo.png';
import Loading from '@/component/Loading';
import userService from '@/service/user';
import { Button } from '@/UI';

const Test = Loadable({
    loader: () => import(/* webpackChunkName: "Header" */ '@/component/Header'),
    loading: Loading
});

@observer
class Main extends React.Component {

    public render() {
        return (
          <div>
              <Test />

            <div>
                { userService.isLoggedIn ?
                    <Button onClick={this.clickFBlogout}>logout</Button>
                    :
                    <Button onClick={this.clickFBlogin}>login to facebook</Button>
                }
            </div>
          </div>
        );
    }

    private clickFBlogin = () => {
        userService.login();
    }
    private clickFBlogout = () => {
        userService.logout();
    }
}

const AppMain = <Main />;

export { AppMain };
