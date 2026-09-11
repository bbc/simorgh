import { useMemo } from 'react';
import {
  render,
  screen,
} from '../../../../../components/react-testing-library-with-providers';

import LatestMediaIndicator from '.';
import PromoContext from '../../../../../legacy/components/OptimoPromos/PromoContext';
import { Media } from '../types';

interface FixtureProps {
  duration: string;
  mediaType?: Media;
}

const Fixture = ({ duration, mediaType }: FixtureProps) => {
  const memoizedValue = useMemo(() => ({ mediaType }), [mediaType]);
  return (
    <PromoContext.Provider value={memoizedValue}>
      <LatestMediaIndicator duration={duration} />
    </PromoContext.Provider>
  );
};

describe('Latest Media Indicator', () => {
  it('should render formatted duration when a valid duration is provided', () => {
    render(<Fixture duration="PT3M41S" />);

    const durationString = '3:41';

    expect(screen.getByText(durationString)).toBeInTheDocument();
  });

  it('should render play icon when item is video', () => {
    const { container } = render(
      <Fixture duration="PT3M41S" mediaType="video" />,
    );

    const playIcon = container.querySelector('svg[viewBox="0 0 12 12"]');

    expect(playIcon).toBeInTheDocument();
    expect(playIcon).toHaveAttribute('aria-hidden', 'true');
  });

  it('should render speaker icon when item is audio', () => {
    const { container } = render(
      <Fixture duration="PT3M41S" mediaType="audio" />,
    );

    const speakerIcon = container.querySelector('svg[viewBox="0 0 13 12"]');

    expect(speakerIcon).toBeInTheDocument();
    expect(speakerIcon).toHaveAttribute('aria-hidden', 'true');
  });

  it('should only render icon when no duration provided', () => {
    const { container } = render(<Fixture duration="" mediaType="audio" />);

    expect(container.querySelector('svg')).toBeTruthy();
    expect(container.querySelector('time')).toBeFalsy();
  });

  it('should have aria-hidden attribute on time element', () => {
    render(<Fixture duration="PT3M41S" mediaType="audio" />);

    const durationString = '3:41';

    expect(screen.getByText(durationString)).toHaveAttribute('aria-hidden');
  });
});
