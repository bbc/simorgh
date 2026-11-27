import { useEffect } from 'react';
import {
  render,
  waitFor,
} from '#app/components/react-testing-library-with-providers';
import LazyOnwardJourneyPlaceholder from './lazy';

jest.mock('next/dynamic', () => () => {
  const DynamicOnwardJourneyPlaceholder = ({
    onSkeletonReady,
  }: {
    onSkeletonReady?: () => void;
  }) => {
    useEffect(() => {
      onSkeletonReady?.();
    }, [onSkeletonReady]);

    return null;
  };

  return DynamicOnwardJourneyPlaceholder;
});

describe('LazyOnwardJourneyPlaceholder', () => {
  it('removes its reservation once the client skeleton is ready', async () => {
    const { getByTestId } = render(
      <LazyOnwardJourneyPlaceholder onwardJourney="mostRead" />,
    );

    await waitFor(() =>
      expect(
        getByTestId('onward-journey-reservation-mostRead'),
      ).not.toHaveStyle({ minBlockSize: '10rem' }),
    );
  });
});
