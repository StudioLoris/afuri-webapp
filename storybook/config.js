import { configure } from '@storybook/react';

function loadStories() {
  require('./Button/');
  // You can require as many stories as you need.
}

configure(loadStories, module);