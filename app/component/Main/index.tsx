import * as React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from '@/component/Home';
import Header from '@/component/Header';

class Main extends React.Component {

    public render() {
        return (
            <div>
                <Route exact path='/' component={Home} />
                <Route path='/test' component={Header} />
            </div>
        );
    }
}

const AppMain = <BrowserRouter><Main /></BrowserRouter>;

export { AppMain };
