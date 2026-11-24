import type { PropsWithChildren, ReactNode } from 'react';
import {
  fireEvent,
  render,
  screen,
  within,
} from '#app/components/react-testing-library-with-providers';
import { EventMapping } from '#app/components/MediaLoader/types';
import { Article } from '#app/models/types/optimo';
import { ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
import { ToggleContextProvider } from '../../contexts/ToggleContext';
import { RequestContextProvider } from '../../contexts/RequestContext';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import ThemeProvider from '../../components/ThemeProvider';
import { pidginPageData } from './fixtureData';
import MediaArticlePage from './MediaArticlePage';

jest.mock('#app/components/MediaLoader', () => ({
  __esModule: true,
  default: ({
    eventMapping,
    endScreen,
  }: {
    eventMapping?: EventMapping;
    endScreen?: ReactNode;
  }) => (
    <div data-testid="mock-media-loader">
      <button
        type="button"
        data-testid="pause-without-end"
        onClick={() => eventMapping?.pause?.({ ended: false })}
      />
      <button
        type="button"
        data-testid="pause-with-end"
        onClick={() => eventMapping?.pause?.({ ended: true })}
      />
      <button
        type="button"
        data-testid="playlist-loaded"
        onClick={() => eventMapping?.playlistLoaded?.({})}
      />
      {endScreen}
    </div>
  ),
}));

jest.mock('../../components/MediaLoader/utils/isPortraitVideo', () => ({
  __esModule: true,
  isPortraitVideo: () => true,
}));

jest.mock('./SecondaryColumn', () => () => null);
jest.mock('../../components/ThemeProvider');
jest.mock('../../components/ChartbeatAnalytics', () => () => <div />);
jest.mock('#src/app/components/ATIAnalytics', () => () => <div />);

const Context = ({ children }: PropsWithChildren) => (
  <ThemeProvider service="pidgin" variant="default">
    <ToggleContextProvider toggles={{}}>
      <RequestContextProvider
        bbcOrigin="https://www.test.bbc.co.uk"
        id="c0000000000o"
        isAmp={false}
        isApp={false}
        pageType={ARTICLE_PAGE}
        pathname="/pathname"
        service="pidgin"
        statusCode={200}
      >
        <ServiceContextProvider service="pidgin">
          {children}
        </ServiceContextProvider>
      </RequestContextProvider>
    </ToggleContextProvider>
  </ThemeProvider>
);

const pageData = {
  ...pidginPageData,
  secondaryColumn: {
    latestMedia: [
      {
        type: 'video',
        duration: 'PT2M',
        firstPublished: '2025-04-07T18:02:43.847Z',
        id: 'video-1',
        imageUrl: 'https://ichef.test/{width}/video-1.jpg',
        link: '/video-1',
        title: 'Video one',
        description: 'Video one description',
      },
    ],
  },
};

describe('MediaArticlePage portrait video promos', () => {
  it('only shows the end screen for an ended portrait video and clears it on replay or reload', () => {
    render(
      <Context>
        <MediaArticlePage pageData={pageData as unknown as Article} />
      </Context>,
    );

    const player = screen.getByTestId('mock-media-loader');
    expect(
      screen.queryByTestId('portrait-video-end-screen'),
    ).not.toBeInTheDocument();

    fireEvent.click(screen.getByTestId('pause-without-end'));
    expect(
      screen.queryByTestId('portrait-video-end-screen'),
    ).not.toBeInTheDocument();

    fireEvent.click(screen.getByTestId('pause-with-end'));
    const endScreen = screen.getByTestId('portrait-video-end-screen');
    expect(endScreen).toBeInTheDocument();
    expect(
      within(endScreen).getByRole('link', { name: /Video one/ }),
    ).toHaveAttribute('href', '/video-1');

    fireEvent.click(
      within(endScreen).getByTestId('portrait-video-end-screen-replay'),
    );
    expect(
      screen.queryByTestId('portrait-video-end-screen'),
    ).not.toBeInTheDocument();

    fireEvent.click(screen.getByTestId('pause-with-end'));
    expect(screen.getByTestId('portrait-video-end-screen')).toBeInTheDocument();

    fireEvent.click(
      within(screen.getByTestId('portrait-video-end-screen')).getByTestId(
        'portrait-video-end-screen-replay',
      ),
    );
    fireEvent.click(screen.getByTestId('pause-with-end'));
    fireEvent.click(screen.getByTestId('playlist-loaded'));
    expect(
      screen.queryByTestId('portrait-video-end-screen'),
    ).not.toBeInTheDocument();
    expect(player).toBeInTheDocument();
  });
});
