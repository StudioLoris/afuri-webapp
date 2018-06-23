import Loadable from 'react-loadable';
import Loading from '@/component/Loading';

const HeaderLoadable = Loadable({
    loader: () => import(/* webpackChunkName: "Header" */ './Header'),
    loading: Loading
});

export default HeaderLoadable;
