import React from 'react';
import { render } from '../../../../../components/react-testing-library-with-providers';

import LatestMediaIndicator from '.';
import PromoContext from '../../../../../legacy/components/OptimoPromos/PromoContext';

interface FixtureProps {
  duration: string;
  mediaType?: 'audio' | 'video';
}

const Fixture = ({ duration, mediaType }: FixtureProps) => {
  return (
    <PromoContext.Provider value={{ mediaType }}>
      <LatestMediaIndicator duration={duration} />
    </PromoContext.Provider>
  );
};

describe('Latest Media Indicator', () => {
  it('should render formatted duration when a valid duration is provided', () => {
    const container = render(<Fixture duration="PT3M41S" />);

    const durationString = '3:41';

    expect(container.getByText(durationString)).toBeInTheDocument();
  });

  it('should render play icon when item is video', () => {
    const container = render(<Fixture duration="PT3M41S" mediaType="video" />);

    expect(container).toMatchSnapshot();
  });

  it('should render speaker icon when item is audio', () => {
    const container = render(<Fixture duration="PT3M41S" mediaType="audio" />);

    expect(container).toMatchSnapshot();
  });

  it('should only render icon when no duration provided', () => {
    const container = render(<Fixture duration="" mediaType="audio" />);

    expect(container).toMatchSnapshot();
  });

  it('should have aria-hidden attribute on time element', () => {
    const container = render(<Fixture duration="PT3M41S" mediaType="audio" />);

    const durationString = '3:41';

    expect(container.getByText(durationString)).toHaveAttribute('aria-hidden');
  });
});
