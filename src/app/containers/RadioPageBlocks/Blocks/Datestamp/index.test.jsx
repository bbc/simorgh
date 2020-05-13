import React from 'react';
import {
  shouldMatchSnapshot,
  isNull,
  suppressPropWarnings,
} from '@bbc/psammead-test-helpers';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import Datestamp from '.';

describe('AudioPlayer blocks Datestamp', () => {
  shouldMatchSnapshot(
    'should render correctly',
    <ServiceContextProvider service="news">
      <Datestamp timestamp={1587945600000} uuid="uuid" idAttr="idAttr" />
    </ServiceContextProvider>,
  );

  describe('when timestamp isnt provided', () => {
    suppressPropWarnings(['timestamp', 'undefined']);

    isNull(
      'should render null',
      <ServiceContextProvider service="news">
        <Datestamp uuid="uuid" idAttr="idAttr" />
      </ServiceContextProvider>,
    );
  });
});
