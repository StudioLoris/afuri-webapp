import * as React from 'react';
import { Link } from 'react-router-dom';
export default class Home extends React.PureComponent {
    public render() {
        return (
          <div>
              <Link to='/test'>
                <h1>Home</h1>
              </Link>
          </div>
        );
    }
}
