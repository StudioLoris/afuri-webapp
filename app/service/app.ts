import { observable } from 'mobx';
import apiService from '@/service/api';
import debounce from 'lodash/debounce';
import { createBrowserHistory, History } from 'history';

apiService.getRoot().then((res) => {
    console.log('api root: ', res);
});

declare const MODE : string;

class AppService {

    public isDEBUG : boolean = (MODE === 'development');
    @observable public width : number = window.innerWidth;

    public browserHistory : History = createBrowserHistory();

    constructor() {
        window.addEventListener('resize', debounce(() => { this.width = window.innerWidth; }, 100));
    }

    public go = (route : string) => this.browserHistory.push(route);
}

const appService = new AppService();

export default appService;
