import React from 'react';
import { ThemeProvider } from 'styled-components';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { theme } from '../../app/UI';
import Select from '../../app/UI/Select';

const options = [
  { value: 'tw', content: 'Taiwan' },
  { value: 'de', content: 'Germany' },
  { value: 'jp', content: 'Japan' },
]

class ControllableSelect extends React.PureComponent {
  state = {
      value: 'tw',
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ value: 'jp' });
    }, 3000);
  }

  render() {
      const { value } = this.state;
      return (
          <ThemeProvider theme={theme}>
              <>
                <Select
                  title='Controllable Select'
                  secondary
                  value={value}
                  options={options}
                  onDataChanged={(value) => {
                    this.setState({value});
                  }}
                />
                  <div>Selected value: {value}</div>
              </>
          </ThemeProvider>
      );
  }
}

storiesOf('Select', module)
  .add('Select', () => (
    <ThemeProvider theme={theme}>
      <div>
        <div>
          <Select
            options={options}
            onDataChanged={(it) => {
              console.log(it);
            }}
          />
          <Select
            warning
            title='Country'
            options={options}
            onDataChanged={(it) => {
              console.log(it);
            }}
          />
        </div>
        <div>
          <ControllableSelect />
        </div>
      </div>
    </ThemeProvider>
  ));
