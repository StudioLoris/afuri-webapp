import React from 'react';
import { ThemeProvider } from 'styled-components';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { theme } from '../../app/UI';
import Button from '../../app/UI/Button';

storiesOf('Button', module)
  .add('All kinds of Buttons', () => (
    <ThemeProvider theme={theme}>
      <div>
        <div>
          <Button primary onClick={() => alert('click')}>Primary</Button>
          <Button secondary>Secondary</Button>
          <Button primary ghost>Primary</Button>
          <Button secondary ghost>Secondary</Button>
          <Button warning >Warning</Button>
          <Button warning ghost>Warning</Button>
        </div>
        <div>
          <Button primary disabled>Disabled</Button>
          <Button secondary disabled>Disabled</Button>
          <Button primary ghost disabled>Disabled</Button>
          <Button secondary ghost disabled>Disabled</Button>
          <Button warning disabled>Disabled</Button>
          <Button warning ghost disabled>Disabled</Button>
        </div>
        <div>
          <Button primary loading onClick={() => alert('click')}>Disabled</Button>
          <Button secondary loading>Disabled</Button>
          <Button primary ghost loading>Disabled</Button>
          <Button secondary ghost loading>Disabled</Button>
          <Button warning loading>Disabled</Button>
          <Button warning ghost loading>Disabled</Button>
        </div>
      </div>
    </ThemeProvider>
  ));
