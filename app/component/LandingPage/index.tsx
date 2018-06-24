import Loadable from 'react-loadable';
import Loading from '@/component/Loading';

const LandingLoadable = Loadable({
    loader: () => import(/* webpackChunkName: "Landing" */ './Landing'),
    loading: Loading
});

export default LandingLoadable;
