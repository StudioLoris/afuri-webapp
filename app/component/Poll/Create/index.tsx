import Loadable from 'react-loadable';
import Loading from '@/component/Loading';

const CreateLoadable = Loadable({
    loader: () => import(/* webpackChunkName: "CreatePoll" */ './Create'),
    loading: Loading
});

export default CreateLoadable;
