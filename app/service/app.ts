import apiService from '@/service/api';

apiService.getRoot().then((res) => {
    console.log('api root: ', res);
});

declare const MODE : string;

class AppService {

    public isDEBUG : boolean = (MODE === 'development');

}

const appService = new AppService();

export {
    appService
};
