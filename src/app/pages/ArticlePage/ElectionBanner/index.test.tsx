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
  { thingId: 'thing2' },
  ...BANNER_CONFIG.thingIds.map(thingId => ({ thingId })),
] as Tag[];

const AMP_ELEMENT = 'election-banner-amp';
const CANONICAL_ELEMENT = 'election-banner';

describe('ElectionBanner', () => {
  it('should not render ElectionBanner when isLite is true', () => {
    const { queryByTestId } = render(
      <ElectionBanner aboutTags={mockAboutTags} />,
      { isLite: true },
    );

    expect(queryByTestId(CANONICAL_ELEMENT)).not.toBeInTheDocument();
  });

  describe.each(['canonical', 'amp'])('%s', platform => {
    const isAmp = platform === 'amp';
    const bannerElement = isAmp ? AMP_ELEMENT : CANONICAL_ELEMENT;

    it('should render ElectionBanner when aboutTags contain the correct thingLabel', () => {
      const { getByTestId } = render(
        <ElectionBanner aboutTags={mockAboutTags} />,
        {
          toggles: { articleElectionBanner: { enabled: true } },
          isAmp,
        },
      );

      expect(getByTestId(bannerElement)).toBeInTheDocument();

      const iframe = getByTestId(bannerElement).querySelector(
        isAmp ? 'amp-iframe' : 'iframe',
      );

      expect(iframe).toHaveAttribute(
        'src',
        BANNER_CONFIG[isAmp ? 'iframeSrcAmp' : 'iframeSrc'].replace(
          '{service}',
          'news',
        ),
      );
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

    it('should not render ElectionBanner when toggle is disabled', () => {
      const { queryByTestId } = render(
        <ElectionBanner aboutTags={mockAboutTags} />,
        {
          toggles: { articleElectionBanner: { enabled: false } },
          isAmp,
        },
      );

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
