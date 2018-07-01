import Loadable from 'react-loadable';
import Loading from '@/component/Loading';

const LoginLodable = Loadable({
    loader: () => import(/* webpackChunkName: "Login" */ './Login'),
    loading: Loading
});

const VerifyOAuthLodable = Loadable({
    loader: () => import(/* webpackChunkName: "VerifyOauth" */ './Verify'),
    loading: Loading
});

export {
    LoginLodable,
    VerifyOAuthLodable
};
