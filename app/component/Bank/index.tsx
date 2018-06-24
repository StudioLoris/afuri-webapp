import Loadable from 'react-loadable';
import Loading from '@/component/Loading';

const BankLoadable = Loadable({
    loader: () => import(/* webpackChunkName: "Bank" */ './Bank'),
    loading: Loading
});

export default BankLoadable;
