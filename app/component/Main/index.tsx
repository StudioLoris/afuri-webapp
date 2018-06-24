import React, { PureComponent } from 'react';
import { Router, Route, Redirect, Switch } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import Home from '@/component/Home';
import Header from '@/component/Header';
import { theme } from '@/UI';
import appService from '@/service/app';

const AppArea = styled.div`
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
`;

class Main extends React.Component {

    public render() {
        return (
            <AppArea>
                <Switch>
                    <Route excat path='/test' component={Header} />
                    <Route render={(props) => <Home {...props} />} />
                </Switch>
            </AppArea>
        );
    }
}

const AppMain = (
    <ThemeProvider theme={theme}>
        <Router history={appService.browserHistory}>
            <Main />
        </Router>
    </ThemeProvider>
);

export { AppMain };
