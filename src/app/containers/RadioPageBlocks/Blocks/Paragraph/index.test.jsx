import React from 'react';
import {
  shouldMatchSnapshot,
  isNull,
  suppressPropWarnings,
} from '@bbc/psammead-test-helpers';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import Paragraph from '.';

describe('MediaPageBlocks Paragraph', () => {
  shouldMatchSnapshot(
    'should render correctly',
    <ServiceContextProvider service="news">
      <Paragraph uuid="uuid" idAttr="idAttr" text="Example text" />
    </ServiceContextProvider>,
  );

  shouldMatchSnapshot(
    'should render correctly - dark mode',
    <ServiceContextProvider service="news">
      <Paragraph uuid="uuid" idAttr="idAttr" text="Example text" darkMode />
    </ServiceContextProvider>,
  );

  describe("when text isn't provided", () => {
    suppressPropWarnings(['text', 'undefined']);

    isNull(
      'should render null',
      <ServiceContextProvider service="news">
        <Paragraph uuid="uuid" idAttr="idAttr" />
      </ServiceContextProvider>,
    );
  });
});
