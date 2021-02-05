import React from 'react';
import styled from '@emotion/styled';
import { latin } from '@bbc/gel-foundations/scripts';
import article from './article';
import cpsAsset from './cpsAsset';
import home from './home';
import liveRadio from './liveRadio';
import mostRead from './mostRead';
import mostWatched from './mostWatched';
import podcast from './podcast';
import onDemandRadio from './onDemandRadio';
import onDemandTV from './onDemandTV';
import idx from './idx';
import error from './error';
import errorNoRouteMatch from './errorNoRouteMatch';

import Paragraph from '@bbc/psammead-paragraph';

const Div = styled.div`
  color: red;
`;

const component = () => (
  <>
    <Div>Foo</Div>
    <Paragraph script={latin} service="news">
      Bar
    </Paragraph>
  </>
);
const emotionRoute = {
  path: '/emotion',
  exact: true,
  component,
  getInitialData: () => Promise.resolve({ status: 200 }),
};

export default [
  emotionRoute,
  article,
  home,
  liveRadio,
  mostRead,
  mostWatched,
  podcast,
  onDemandRadio,
  onDemandTV,
  idx,
  cpsAsset,
  error,
  errorNoRouteMatch, // When none of the above routes match, it will fall to this.
  // Please ensure that when adding new pages, it is above this element in the array.
];
