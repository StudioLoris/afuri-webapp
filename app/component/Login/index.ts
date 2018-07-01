import Loadable from 'react-loadable';
import Loading from '@/component/Loading';

const LoginLodable = Loadable({
    loader: () => import(/* webpackChunkName: "Login" */ './Login'),
    loading: Loading
});

export default LoginLodable;
