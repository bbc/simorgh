import React from 'react';
import {
  shouldMatchSnapshot,
  isNull,
  suppressPropWarnings,
} from '#psammead/psammead-test-helpers/src';
import { ServiceContextProvider } from '../../../contexts/ServiceContext';
import ThemeProvider from '../../../components/ThemeProvider';
import Paragraph from '.';

jest.mock('../../../components/ThemeProvider');

describe('MediaPageBlocks Paragraph', () => {
  shouldMatchSnapshot(
    'should render correctly',
    <ServiceContextProvider service="news">
      <ThemeProvider service="news" variant="default">
        <Paragraph uuid="uuid" idAttr="idAttr" text="Example text" />
      </ThemeProvider>
    </ServiceContextProvider>,
  );

  shouldMatchSnapshot(
    'should render correctly - dark mode',
    <ServiceContextProvider service="news">
      <ThemeProvider service="news" variant="default">
        <Paragraph uuid="uuid" idAttr="idAttr" text="Example text" darkMode />
      </ThemeProvider>
    </ServiceContextProvider>,
  );

  describe("when text isn't provided", () => {
    suppressPropWarnings(['text', 'undefined']);

    isNull(
      'should render null',
      <ServiceContextProvider service="news">
        <ThemeProvider service="news" variant="default">
          <Paragraph uuid="uuid" idAttr="idAttr" />
        </ThemeProvider>
      </ServiceContextProvider>,
    );
  });
});
