import * as React from 'react';
import { LoadingComponentProps } from 'react-loadable';
import Spinner from '@/UI/Spinner';

class Loading extends React.Component<LoadingComponentProps> {
    public render() {
        return (
          <div>
              <Spinner />
          </div>
        );
    }
}

export default Loading;
