import React from 'react';
import { render } from '#app/components/react-testing-library-with-providers';
import { Tag } from '#app/components/Metadata/types';
import isLive from '#app/lib/utilities/isLive';
import BANNER_CONFIG from './config';
import ElectionBanner from '.';

jest.mock('#app/lib/utilities/isLive', () =>
  jest.fn().mockImplementation(() => false),
);

const mockAboutTags = [
  { thingId: 'thing1' },
  { thingId: BANNER_CONFIG.thingId },
  { thingId: 'thing3' },
] as Tag[];

describe('ElectionBanner', () => {
  describe.each(['canonical', 'amp'])('%s', platform => {
    const isAmp = platform === 'amp';
    const bannerElement = isAmp ? 'election-banner-amp' : 'election-banner';

    it('should render ElectionBanner when aboutTags contain the correct thingLabel', () => {
      const { getByTestId } = render(
        <ElectionBanner aboutTags={mockAboutTags} />,
        {
          toggles: { electionBanner: { enabled: true } },
          isAmp,
        },
      );

      expect(getByTestId(bannerElement)).toBeInTheDocument();
    });

    it('should not render ElectionBanner when toggle is disabled', () => {
      const { queryByTestId } = render(
        <ElectionBanner aboutTags={mockAboutTags} />,
        {
          toggles: { indianElectionBanner: { enabled: false } },
          isAmp,
        },
      );

      expect(queryByTestId(bannerElement)).not.toBeInTheDocument();
    });

    it('should not render ElectionBanner when aboutTags do not contain the correct thingLabel', () => {
      const { queryByTestId } = render(
        <ElectionBanner aboutTags={[{ thingLabel: 'thing1' }] as Tag[]} />,
        { isAmp },
      );

      expect(queryByTestId(bannerElement)).not.toBeInTheDocument();
    });

    it('should not render ElectionBanner when aboutTags is empty', () => {
      const { queryByTestId } = render(<ElectionBanner aboutTags={[]} />, {
        isAmp,
      });

      expect(queryByTestId(bannerElement)).not.toBeInTheDocument();
    });

    it('should not render ElectionBanner when isLive is true', () => {
      (isLive as jest.Mock).mockImplementationOnce(() => true);

      const { queryByTestId } = render(
        <ElectionBanner aboutTags={mockAboutTags} />,
        { isAmp },
      );

      expect(queryByTestId(bannerElement)).not.toBeInTheDocument();
    });
  });
});
