import { act } from 'react';
import { service as pidginConfig } from '#lib/config/services/pidgin';
import Component from '.';
import { screen, render } from '../react-testing-library-with-providers';
import fixture from './fixture';

const eventTrackingData = {
  componentName: 'portrait-video-carousel',
};

const defaultAriaLabel = pidginConfig.default.translations.media.watch;

describe('PortraitVideoCarousel', () => {
  it('Should contain the expected number of portrait video blocks', async () => {
    await act(async () => {
      render(<Component {...fixture} eventTrackingData={eventTrackingData} />);
    });

    const portraitVideoItems = screen
      .getByTestId('pv-carousel')
      .getElementsByTagName('li');

    expect(portraitVideoItems.length).toBe(fixture.blocks.length);
  });

  it('Should render the carousel heading with the correct title', async () => {
    await act(async () => {
      render(<Component {...fixture} eventTrackingData={eventTrackingData} />);
    });

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      fixture.title,
    );
  });

  it('Should render a Subheading with a link when link prop is provided', async () => {
    const link = '/test-link';
    await act(async () => {
      render(
        <Component
          {...fixture}
          link={link}
          eventTrackingData={eventTrackingData}
        />,
      );
    });

    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent(fixture.title);

    const linkElement = screen.getByRole('link');
    expect(linkElement).toHaveAttribute('href', link);
  });

  it('Should render without a title', async () => {
    await act(async () => {
      render(
        <Component
          {...fixture}
          title={undefined}
          eventTrackingData={eventTrackingData}
        />,
        { service: 'pidgin' },
      );
    });

    expect(screen.queryByRole('heading', { level: 2 })).not.toBeInTheDocument();
    expect(screen.getByTestId('portrait-video-carousel')).toHaveAttribute(
      'aria-label',
      defaultAriaLabel,
    );
  });

  it('Should render the PortraitCarouselNavigation component', async () => {
    await act(async () => {
      render(<Component {...fixture} eventTrackingData={eventTrackingData} />);
    });

    const leftButton = screen.getByTestId('pv-scroll-left');
    const rightButton = screen.getByTestId('pv-scroll-right');

    expect(leftButton).toBeInTheDocument();
    expect(rightButton).toBeInTheDocument();
  });

  it('Should not render anything when isLite is true', async () => {
    await act(async () => {
      render(<Component {...fixture} eventTrackingData={eventTrackingData} />, {
        isLite: true,
      });
    });

    expect(screen.queryByTestId('portrait-video-carousel')).toBeNull();
  });

  it('Should not render anything when isAmp is true', async () => {
    await act(async () => {
      render(<Component {...fixture} eventTrackingData={eventTrackingData} />, {
        isAmp: true,
      });
    });

    expect(screen.queryByTestId('portrait-video-carousel')).toBeNull();
  });
});
