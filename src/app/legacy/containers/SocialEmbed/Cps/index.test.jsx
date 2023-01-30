import React from 'react';
import { render, act } from '@testing-library/react';
import loggerMock from '#testHelpers/loggerMock';
import { shouldMatchSnapshot } from '#psammead/psammead-test-helpers/src';
import CpsSocialEmbedContainer from '.';
import withContexts from '../common/testHelper';
import { cpsTwitterBlock, cpsTwitterBlockNoEmbed } from '../common/fixtures';
import {
  screen,
  fireEvent,
} from '../../../../components/react-testing-library-with-providers';

/* eslint-disable react/prop-types */
jest.mock('react-lazyload', () => {
  return function MockedLazyload({ children }) {
    return <>{children}</>;
  };
});

describe('CpsSocialEmbedContainer', () => {
  afterEach(() => {
    loggerMock.info.mockClear();
  });

  describe('Canonical', () => {
    it('should render and unmount correctly', async () => {
      let container;
      let unmount;
      await act(async () => {
        ({ container, unmount } = render(
          withContexts(CpsSocialEmbedContainer, {
            isAmp: false,
            isEnabled: true,
          })({
            blocks: [cpsTwitterBlock],
            source: 'https://twitter.com/MileyCyrus/status/1237210910835392512',
          }),
        ));
      });
      const button = screen.getByTestId('banner-button');
      fireEvent.click(button);

      expect(container.firstChild).toMatchSnapshot();
      expect(
        document.querySelector(
          'head script[src="https://platform.twitter.com/widgets.js"]',
        ),
      ).toBeTruthy();
      unmount();
      expect(
        document.querySelector(
          'head script[src="https://platform.twitter.com/widgets.js"]',
        ),
      ).toBeFalsy();
    });

    shouldMatchSnapshot(
      'should render correctly without an embed block',
      withContexts(CpsSocialEmbedContainer, {
        isAmp: false,
        isEnabled: true,
      })({
        blocks: [cpsTwitterBlockNoEmbed],
        source: 'https://twitter.com/MileyCyrus/status/1237210910835392512',
      }),
    );
  });

  describe('AMP', () => {
    shouldMatchSnapshot(
      'should render correctly',
      withContexts(CpsSocialEmbedContainer, {
        isAmp: true,
        isEnabled: true,
      })({
        blocks: [cpsTwitterBlock],
        source: 'https://twitter.com/MileyCyrus/status/1237210910835392512',
      }),
    );
  });
});
