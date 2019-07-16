import React, { Fragment } from 'react';
import { configure, addDecorator, addParameters } from '@storybook/react';
import { create } from '@storybook/theming';
import GlobalStyle from '../src/app/lib/globalStyles';
import * as fontFaces from '@bbc/psammead-styles/fonts';
import { withKnobs } from '@storybook/addon-knobs';
import { dirDecorator } from '@bbc/psammead-storybook-helpers';
import { createGlobalStyle } from 'styled-components';

const req = require.context('../src/app', true, /\.stories\.jsx$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

const styles = Object.keys(fontFaces).reduce((faces, acc) => fontFaces[faces] + acc, '')

const GlobalStyles = createGlobalStyle`${styles}`

addDecorator(withKnobs)
addDecorator(dirDecorator)
addDecorator(story => (
  /* eslint-disable react/jsx-filename-extension */
  <Fragment>
    <GlobalStyle />
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
