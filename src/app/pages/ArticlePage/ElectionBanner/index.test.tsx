import React from 'react';
import { render } from '#app/components/react-testing-library-with-providers';
import { Tag } from '#app/components/Metadata/types';
import isLive from '#app/lib/utilities/isLive';
import ElectionBanner from '.';

jest.mock('#app/lib/utilities/isLive', () =>
  jest.fn().mockImplementation(() => false),
);

const mockAboutTags = [
  {
    thingLabel: 'thing1',
  },
  {
    thingLabel: 'लोकसभा चुनाव 2024',
  },
  {
    thingLabel: 'thing3',
  },
] as Tag[];

describe('ElectionBanner', () => {
  describe('Canonical', () => {
    it('should render ElectionBanner for Hindi service when aboutTags contain ther correct thingLabel', () => {
      const { getByTestId } = render(
        <ElectionBanner aboutTags={mockAboutTags} />,
        {
          service: 'hindi',
        },
      );

      expect(getByTestId('election-banner')).toBeInTheDocument();
    });

    it('should not render ElectionBanner for Hindi service when aboutTags do not contain the correct thingLabel', () => {
      const { queryByTestId } = render(
        <ElectionBanner aboutTags={[{ thingLabel: 'thing1' }] as Tag[]} />,
        {
          service: 'hindi',
        },
      );

      expect(queryByTestId('election-banner')).not.toBeInTheDocument();
    });

    it('should not render ElectionBanner when aboutTags is empty', () => {
      const { queryByTestId } = render(<ElectionBanner aboutTags={[]} />, {
        service: 'hindi',
      });

      expect(queryByTestId('election-banner')).not.toBeInTheDocument();
    });

    it('should not render ElectionBanner when isLive is true', () => {
      (isLive as jest.Mock).mockImplementationOnce(() => true);

      const { queryByTestId } = render(
        <ElectionBanner aboutTags={mockAboutTags} />,
        {
          service: 'hindi',
        },
      );

      expect(queryByTestId('election-banner')).not.toBeInTheDocument();
    });
  });

  describe('AMP', () => {
    it('should render ElectionBanner for Hindi service when aboutTags contain the correct thingLabel', () => {
      const { getByTestId } = render(
        <ElectionBanner aboutTags={mockAboutTags} />,
        {
          service: 'hindi',
          isAmp: true,
        },
      );

      expect(getByTestId('election-banner-amp')).toBeInTheDocument();
    });

    it('should not render ElectionBanner for Hindi service when aboutTags do not contain the correct thingLabel', () => {
      const { queryByTestId } = render(
        <ElectionBanner aboutTags={[{ thingLabel: 'thing1' }] as Tag[]} />,
        {
          service: 'hindi',
          isAmp: true,
        },
      );

      expect(queryByTestId('election-banner-amp')).not.toBeInTheDocument();
    });

    it('should not render ElectionBanner when aboutTags is empty', () => {
      const { queryByTestId } = render(<ElectionBanner aboutTags={[]} />, {
        service: 'hindi',
        isAmp: true,
      });

      expect(queryByTestId('election-banner-amp')).not.toBeInTheDocument();
    });

    it('should not render ElectionBanner when isLive is true', () => {
      (isLive as jest.Mock).mockImplementationOnce(() => true);

      const { queryByTestId } = render(
        <ElectionBanner aboutTags={mockAboutTags} />,
        {
          service: 'hindi',
          isAmp: true,
        },
      );

      expect(queryByTestId('election-banner-amp')).not.toBeInTheDocument();
    });
  });
});
