import React, { Fragment } from 'react';
import { configure, addDecorator, addParameters } from '@storybook/react';
import { create } from '@storybook/theming';
import * as fontFaces from '@bbc/psammead-styles/fonts';
import { createGlobalStyle } from 'styled-components';

const req = require.context('../src/app', true, /\.stories\.jsx$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

const styles = Object.keys(fontFaces).reduce(
  (fontStyles, face) => fontFaces[face] + fontStyles,
  '',
);

const GlobalStyles = createGlobalStyle`${styles}`;

addDecorator(story => (
  /* eslint-disable react/jsx-filename-extension */
  <Fragment>
    <GlobalStyles />
    {story()}
  </Fragment>
  /* eslint-enable react/jsx-filename-extension */
));

const theme = create({
  base: 'light',
  brandTitle: 'BBC Simorgh',
  brandUrl: 'https://github.com/bbc/simorgh',
});

addParameters({
  options: {
    panelPosition: 'right',
    sidebarAnimcations: true,
    theme,
  },
});

configure(loadStories, module);
