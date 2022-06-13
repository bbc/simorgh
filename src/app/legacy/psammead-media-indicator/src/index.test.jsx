import React from 'react';
import { shouldMatchSnapshot } from '#legacy/psammead-test-helpers/src';
import { latin, arabic } from '#legacy/gel-foundations/src/scripts';
import MediaIndicator from './index';

describe('MediaIndicator', () => {
  shouldMatchSnapshot(
    'should render video by default',
    <MediaIndicator service="news" />,
  );

  shouldMatchSnapshot(
    'should render video indicator correctly',
    <MediaIndicator type="video" script={latin} service="news" />,
  );

  shouldMatchSnapshot(
    'should render video indicator correctly when inline',
    <MediaIndicator type="video" script={latin} service="news" isInline />,
  );

  shouldMatchSnapshot(
    'should render video indicator correctly when inline on RTL',
    <MediaIndicator
      type="video"
      script={arabic}
      service="persian"
      dir="rtl"
      isInline
    />,
  );

  shouldMatchSnapshot(
    'should render audio indicator correctly',
    <MediaIndicator type="audio" script={latin} service="news" />,
  );

  shouldMatchSnapshot(
    'should render photogallery correctly',
    <MediaIndicator type="photogallery" script={latin} service="news" />,
  );
});
