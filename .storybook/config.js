import React, { Fragment } from 'react';
import { configure, addDecorator, addParameters } from '@storybook/react';
import { create } from '@storybook/theming';
import * as fontFaces from '@bbc/psammead-styles/fonts';
import GlobalStyle from '../src/app/lib/globalStyles';

const req = require.context('../src/app', true, /\.stories\.jsx$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

addDecorator(story => (
  /* eslint-disable react/jsx-filename-extension */
  <Fragment>
    <GlobalStyle fonts={Object.values(fontFaces)} />
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
