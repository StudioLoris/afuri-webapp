import React, { PureComponent } from 'react';
import { observer } from 'mobx-react';
import line from '@/assets/line.svg';
import styled from 'styled-components';

@observer
export default class Verify extends React.Component {

    public render() {
        console.log(this.props);
        return (
          <div>
              OAuth Verifying...
          </div>
        );
    }

}
