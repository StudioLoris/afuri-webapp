import { observable } from 'mobx';
import apiService from '@/service/api';
import debounce from 'lodash/debounce';

apiService.getRoot().then((res) => {
    console.log('api root: ', res);
});

declare const MODE : string;

class AppService {

    public isDEBUG : boolean = (MODE === 'development');
    @observable public width : number = window.innerWidth;

    constructor() {
        window.addEventListener('resize', debounce(() => { this.width = window.innerWidth; }, 100));
    }

}

const appService = new AppService();

export {
    appService
};
