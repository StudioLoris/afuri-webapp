import Loadable from 'react-loadable';
import Loading from '@/component/Loading';
import Home from './Home';

const HomeLodable = Loadable({
    loader: () => import(/* webpackChunkName: "Home" */ './Home'),
    loading: Loading
});

export default HomeLodable;
