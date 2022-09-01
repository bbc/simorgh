import React from 'react';
import { shouldMatchSnapshot } from '#psammead/psammead-test-helpers/src';
import Guidance from '.';

describe('Media Player: Guidance', () => {
  shouldMatchSnapshot(
    'should render Guidance',
    <Guidance
      guidanceMessage="Guidance: Contains strong language with adult humor"
      service="news"
      noJsMessage="no js"
    />,
  );

  shouldMatchSnapshot(
    'should render no-js styles when noJsClassName prop is used',
    <Guidance
      guidanceMessage="Guidance: Contains strong language with adult humor"
      service="news"
      noJsMessage="This media cannot play in your browser. Please enable Javascript or a different browser."
      noJsClassName="no-js"
    />,
  );
});
