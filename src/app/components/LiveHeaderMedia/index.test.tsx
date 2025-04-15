import mundoLiveFixture from '#data/mundo/live/c7dkx155e626t.json';
import React from 'react';
import LiveHeaderMedia from '.';
import { MediaCollection } from '../MediaLoader/types';
import {
  screen,
  render,
  fireEvent,
} from '../react-testing-library-with-providers';
import * as viewTracking from '../../hooks/useViewTracker';
import * as clickTracking from '../../hooks/useClickTrackerHandler';

const fixtureData = mundoLiveFixture.data.mediaCollections;

describe('liveMediaStream', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Displays all components on intial render.', () => {
    const { container } = render(
      <LiveHeaderMedia mediaCollection={fixtureData as MediaCollection[]} />,
    );

    const playCloseButton = container.querySelector(
      'button[data-testid="watch-now-close-button"]',
    );
    const mediaLoader = container.querySelector('figure');

    expect(playCloseButton).toBeInTheDocument();
    expect(mediaLoader).toBeInTheDocument();
  });

  it('Displays a warning message when needed.', () => {
    const mediaBlock = fixtureData[0];
    mediaBlock.model.version.warnings = {
      warning_text: 'Contains some upsetting scenes.',
      warning: [
        {
          warning_code: 'D1',
          short_description: 'some upsetting scenes',
        },
      ],
    };

    const { container } = render(
      <LiveHeaderMedia mediaCollection={fixtureData as MediaCollection[]} />,
    );

    const playCloseButton = container.querySelector(
      'span[data-testid="warning-message"]',
    );

    expect(playCloseButton?.innerHTML).toContain(
      'Contains some upsetting scenes.',
    );
  });

  it('Plays the media loader when the watch button is clicked.', () => {
    window.mediaPlayers = {
      p0gh4n67: {
        player: { paused: jest.fn().mockReturnValueOnce(true) },
        play: jest.fn(),
        pause: jest.fn(),
      },
    };

    render(
      <LiveHeaderMedia mediaCollection={fixtureData as MediaCollection[]} />,
    );

    const playCloseButton = screen.getByTestId('watch-now-close-button');
    fireEvent.click(playCloseButton);

    expect(window.mediaPlayers.p0gh4n67.play).toHaveBeenCalled();
  });

  it('Paused the media loader when the close button is clicked.', () => {
    window.mediaPlayers = {
      p0gh4n67: {
        play: jest.fn(),
        pause: jest.fn(),
      },
    };
    render(
      <LiveHeaderMedia mediaCollection={fixtureData as MediaCollection[]} />,
    );

    const playCloseButton = screen.getByTestId('watch-now-close-button');
    fireEvent.click(playCloseButton);
    fireEvent.click(playCloseButton);

    expect(window.mediaPlayers.p0gh4n67.play).toHaveBeenCalledTimes(1);
    expect(window.mediaPlayers.p0gh4n67.pause).toHaveBeenCalledTimes(1);
  });

  it('Displays nothing if no mediaCollection is passed in.', () => {
    const { container } = render(<LiveHeaderMedia mediaCollection={null} />);

    expect(container).toBeEmptyDOMElement();
  });

  it('Displays nothing if an empty array is passed in.', () => {
    const { container } = render(
      <LiveHeaderMedia mediaCollection={[] as MediaCollection[]} />,
    );

    expect(container).toBeEmptyDOMElement();
  });

  it.each([
    {
      title: 'Displays a title with a comma when there is no punctuation.',
      inputTitle: 'Title with no punctuation',
      expectedResult:
        'Title with no punctuation, CBBC, Contains some upsetting scenes.Watch',
    },
    {
      title: 'Displays a title as is when there is punctuation.',
      inputTitle: 'Title with punctuation!',
      expectedResult:
        'Title with punctuation! CBBC, Contains some upsetting scenes.Watch',
    },
  ])('Open state - $title', ({ inputTitle, expectedResult }) => {
    const mediaBlock = fixtureData[0];
    mediaBlock.model.synopses.short = inputTitle;

    const { container } = render(
      <LiveHeaderMedia mediaCollection={fixtureData as MediaCollection[]} />,
    );

    const mediaLoader = container.querySelector(
      'button[data-testid="watch-now-close-button"]',
    );

    expect(mediaLoader?.textContent).toEqual(expectedResult);
  });

  it.each([
    {
      title: 'Displays a title with a comma when there is no punctuation.',
      inputTitle: 'Title with no punctuation',
      expectedResult:
        'Close video, Title with no punctuation, CBBC, Contains some upsetting scenes.',
    },
    {
      title: 'Displays a title as is when there is punctuation.',
      inputTitle: 'Title with punctuation!',
      expectedResult:
        'Close video, Title with punctuation! CBBC, Contains some upsetting scenes.',
    },
  ])('Close state - $title', ({ inputTitle, expectedResult }) => {
    const mediaBlock = fixtureData[0];
    mediaBlock.model.synopses.short = inputTitle;

    window.mediaPlayers = {
      p0gh4n67: {
        player: { paused: jest.fn().mockReturnValueOnce(true) },
        play: jest.fn(),
        pause: jest.fn(),
      },
    };

    const { container } = render(
      <LiveHeaderMedia mediaCollection={fixtureData as MediaCollection[]} />,
    );

    const mediaLoader = container.querySelector(
      'button[data-testid="watch-now-close-button"]',
    );

    const playCloseButton = screen.getByTestId('watch-now-close-button');
    fireEvent.click(playCloseButton);

    expect(mediaLoader?.textContent).toEqual(expectedResult);
  });

  it.each([
    {
      title: 'Should NOT autoplay for Level 1 warnings and above.',
      playCalls: 0,
      warning: [
        {
          warning_code: 'D1',
          short_description: 'some upsetting scenes',
        },
        {
          warning_code: 'D2',
          short_description: 'upsetting scenes',
        },
        {
          warning_code: 'L1',
          short_description: 'some strong language',
        },
      ],
    },
    {
      title: 'Should autoplay for below L1 warnings.',
      playCalls: 1,
      warning: [
        {
          warning_code: 'D1',
          short_description: 'some upsetting scenes',
        },
        {
          warning_code: 'D2',
          short_description: 'upsetting scenes',
        },
      ],
    },
  ])('$title', ({ warning, playCalls }) => {
    const mediaBlock = fixtureData[0];
    mediaBlock.model.version.warnings = {
      warning_text: '',
      warning,
    };

    window.mediaPlayers = {
      p0gh4n67: {
        player: { paused: jest.fn().mockReturnValueOnce(true) },
        play: jest.fn(),
        pause: jest.fn(),
      },
    };

    render(
      <LiveHeaderMedia mediaCollection={fixtureData as MediaCollection[]} />,
    );

    const playCloseButton = screen.getByTestId('watch-now-close-button');
    fireEvent.click(playCloseButton);

    expect(window.mediaPlayers.p0gh4n67.play).toHaveBeenCalledTimes(playCalls);
  });

  describe('Event Tracking', () => {
    const eventTrackingData = { componentName: 'live-header-media' };

    describe('Click tracking', () => {
      const clickTrackerSpy = jest.spyOn(clickTracking, 'default');

      it('should register click tracker', () => {
        render(
          <LiveHeaderMedia
            mediaCollection={fixtureData as MediaCollection[]}
          />,
        );
        expect(clickTrackerSpy).toHaveBeenCalledWith(eventTrackingData);
      });
    });

    describe('View tracking', () => {
      const viewTrackerSpy = jest.spyOn(viewTracking, 'default');

      it('should register view tracker', () => {
        render(
          <LiveHeaderMedia
            mediaCollection={fixtureData as MediaCollection[]}
          />,
        );

        expect(viewTrackerSpy).toHaveBeenCalledWith(eventTrackingData);
      });
    });
  });
});
