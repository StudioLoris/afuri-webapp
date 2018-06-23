import * as React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import Home from '@/component/Home';
import Header from '@/component/Header';
import { theme } from '@/UI';

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
                <Route exact path='/' component={Home} />
                <Route path='/test' component={Header} />
            </AppArea>
        );
    }
}

const AppMain = (
    <ThemeProvider theme={theme}>
        <BrowserRouter>
            <Main />
        </BrowserRouter>
    </ThemeProvider>
);

export { AppMain };
