import React, { Fragment } from 'react';
import { configure, addDecorator } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import GlobalStyle from '../src/app/lib/globalStyles';

const req = require.context('../src/app', true, /\.stories\.jsx$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

addDecorator(story => (
  /* eslint-disable react/jsx-filename-extension */
  <Fragment>
    <GlobalStyle />
    {story()}
  </Fragment>
  /* eslint-enable react/jsx-filename-extension */
));

configure(loadStories, module);
