import React, { useMemo } from 'react';
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

    expect(container.querySelector('svg')).toMatchInlineSnapshot(`
      .emotion-0 {
        vertical-align: middle;
        margin: 0 0.25rem;
        color: #222222;
        fill: currentColor;
        width: 0.75rem;
        height: 0.75rem;
      }

      <svg
        aria-hidden="true"
        class="emotion-0 emotion-1"
        focusable="false"
        height="12"
        viewBox="0 0 12 12"
        width="12"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g
          fill="none"
          fill-rule="evenodd"
        >
          <path
            d="M.5.6h12v12H.5z"
          />
          <path
            d="M2.144.96v11.28l8.712-5.64z"
            fill="currentColor"
          />
        </g>
      </svg>
    `);
  });

  it('should render speaker icon when item is audio', () => {
    const { container } = render(
      <Fixture duration="PT3M41S" mediaType="audio" />,
    );

    expect(container.querySelector('svg')).toMatchInlineSnapshot(`
      .emotion-0 {
        vertical-align: middle;
        margin: 0 0.25rem;
        color: #222222;
        fill: currentColor;
        width: 0.75rem;
        height: 0.75rem;
      }

      <svg
        aria-hidden="true"
        class="emotion-0 emotion-1"
        focusable="false"
        height="12px"
        viewBox="0 0 13 12"
        width="13px"
      >
        <path
          d="M9.021 1.811l-.525.525c.938.938 1.5 2.25 1.5 3.675s-.563 2.738-1.5 3.675l.525.525c1.05-1.087 1.725-2.55 1.725-4.2s-.675-3.112-1.725-4.2z"
        />
        <path
          d="M10.596.199l-.525.562c1.35 1.35 2.175 3.225 2.175 5.25s-.825 3.9-2.175 5.25l.525.525c1.5-1.462 2.4-3.525 2.4-5.775s-.9-4.312-2.4-5.812zM6.996 1.511l-2.25 2.25H.996v4.5h3.75l2.25 2.25z"
        />
      </svg>
    `);
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
