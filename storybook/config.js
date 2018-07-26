import { configure } from '@storybook/react';

function loadStories() {
  require('./Button/');
  require('./Input/');
  require('./Select');
  // You can require as many stories as you need.
}

configure(loadStories, module);