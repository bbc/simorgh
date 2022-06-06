import React from 'react';
import { shouldMatchSnapshot } from '#legacy/psammead-test-helpers/src';
import { arabic } from '#legacy/gel-foundations/src/scripts';
import LiveLabel from './index';

describe('LiveLabel', () => {
  shouldMatchSnapshot(
    'should render correctly with english live text',
    <LiveLabel service="news" ariaHidden offScreenText="Live" />,
  );

  shouldMatchSnapshot(
    'should render correctly with localised live text',
    <LiveLabel service="news" liveText="AS E DE HAPPEN" />,
  );

  shouldMatchSnapshot(
    'should render correctly with custom offscreen text',
    <LiveLabel service="news" ariaHidden offScreenText="Watch Live" />,
  );

  shouldMatchSnapshot(
    'should correctly render for RTL service',
    <LiveLabel service={arabic} dir="rtl" ariaHidden offScreenText="Live" />,
  );
});
