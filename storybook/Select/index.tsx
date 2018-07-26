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

storiesOf('Select', module)
  .add('Select', () => (
    <ThemeProvider theme={theme}>
      <div>
        <div>
          <Select
            title='title'
            options={options}
            onDataChanged={(it) => {
              console.log(it);
            }}
          />
        </div>
      </div>
    </ThemeProvider>
  ));
