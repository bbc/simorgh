import { render } from '#app/components/react-testing-library-with-providers';
import LazyOnwardJourneyPlaceholder from './lazy';

jest.mock('next/dynamic', () => () => () => null);

describe('LazyOnwardJourneyPlaceholder', () => {
  it('reserves the skeleton space before the client component loads', () => {
    const { getByTestId } = render(
      <LazyOnwardJourneyPlaceholder onwardJourney="mostRead" />,
    );

    expect(getByTestId('onward-journey-reservation-mostRead')).toHaveStyle({
      minBlockSize: '10rem',
    });
  });
});
