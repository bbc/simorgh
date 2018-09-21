import React from 'react';
import { shouldMatchSnapshot } from '../../../helpers/tests/testHelpers';
import Caption from './index';
import { ServiceContext } from '../../ServiceContext';
import serviceContextStub from '../../../helpers/contextHelpers';

const CaptionWithService = (captionText, service) => (
  <ServiceContext.Provider value={serviceContextStub[service]}>
    <Caption>{captionText}</Caption>
  </ServiceContext.Provider>
);

describe('Caption', () => {
  shouldMatchSnapshot(
    'should render correctly with news ServiceContext',
    CaptionWithService('This is some Caption text', 'news'),
  );

  shouldMatchSnapshot(
    'should render correctly with persian ServiceContext',
    CaptionWithService('توصیف چیزی که اتفاق می افتد', 'persian'),
  );
});
