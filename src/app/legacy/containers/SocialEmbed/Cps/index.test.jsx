import { render, act } from '@testing-library/react';
import loggerMock from '#testHelpers/loggerMock';
import CpsSocialEmbedContainer from '.';
import withContexts from '../common/testHelper';
import { cpsTwitterBlock, cpsTwitterBlockNoEmbed } from '../common/fixtures';
import {
  screen,
  fireEvent,
} from '../../../../components/react-testing-library-with-providers';

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

    it('should render correctly without an embed block', async () => {
      let noEmbedContainer;
      let noEmbedUnmount;
      await act(async () => {
        ({ container: noEmbedContainer, unmount: noEmbedUnmount } = render(
          withContexts(CpsSocialEmbedContainer, {
            isAmp: false,
            isEnabled: true,
          })({
            blocks: [cpsTwitterBlockNoEmbed],
            source: 'https://twitter.com/MileyCyrus/status/1237210910835392512',
          }),
        ));
      });
      expect(noEmbedContainer.firstChild).toMatchSnapshot();
      noEmbedUnmount();
    });
  });

  describe('AMP', () => {
    it('should render correctly', async () => {
      let ampContainer;
      let ampUnmount;
      await act(async () => {
        ({ container: ampContainer, unmount: ampUnmount } = render(
          withContexts(CpsSocialEmbedContainer, {
            isAmp: true,
            isEnabled: true,
          })({
            blocks: [cpsTwitterBlock],
            source: 'https://twitter.com/MileyCyrus/status/1237210910835392512',
          }),
        ));
      });
      expect(ampContainer.firstChild).toMatchSnapshot();
      ampUnmount();
    });
  });
});
