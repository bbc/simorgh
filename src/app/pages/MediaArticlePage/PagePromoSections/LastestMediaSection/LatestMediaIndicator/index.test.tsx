import React from 'react';
import {
  render,
  screen,
} from '../../../../../components/react-testing-library-with-providers';

import LatestMediaIndicator from '.';

interface FixtureProps {
  duration: string;
}

const Fixture = ({ duration }: FixtureProps) => (
  <LatestMediaIndicator duration={duration} />
);

describe('Latest Media Indicator', () => {
  it('should render formatted duration when a valid duration is provided', () => {
    const container = render(<Fixture duration="PT3M41S" />);

    const durationString = '3:41';

    expect(container.getByText(durationString)).toBeInTheDocument();
  });
});
