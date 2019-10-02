import React from 'react';
import {
  shouldMatchSnapshot,
  isNull,
  suppressPropWarnings,
} from '@bbc/psammead-test-helpers';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import Heading from '.';

describe('MediaPageBlocks Heading', () => {
  shouldMatchSnapshot(
    'should render correctly',
    <ServiceContextProvider service="news">
      <Heading uuid="uuid" idAttr="idAttr" text="Example text" />
    </ServiceContextProvider>,
  );

  describe('when text isnt provided', () => {
    suppressPropWarnings(['text', 'undefined']);

    isNull(
      'should render null',
      <ServiceContextProvider service="news">
        <Heading uuid="uuid" idAttr="idAttr" />
      </ServiceContextProvider>,
    );
  });
});
