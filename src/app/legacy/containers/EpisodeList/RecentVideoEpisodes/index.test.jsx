import React from 'react';
import { RequestContextProvider } from '#contexts/RequestContext';
import { render } from '../../../../components/react-testing-library-with-providers';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import RecentVideoEpisodes from '.';
import { afrique } from './fixtures';

const RecentVideoEpisodesWithContext = ({ episodes, isAmp = false }) => (
  <ServiceContextProvider service="afrique">
    <RequestContextProvider
      isAmp={isAmp}
      pathname="test"
      service="afrique"
      pageType="media"
    >
      <RecentVideoEpisodes masterBrand="bbc_afrique_tv" episodes={episodes} />
    </RequestContextProvider>
  </ServiceContextProvider>
);

describe('Recent Video Episodes', () => {
  it('should render video episodes correctly', () => {
    const { container } = render(
      <RecentVideoEpisodes masterBrand="bbc_afrique_tv" episodes={afrique} />,
      {
        pageType: 'media',
        derivedPageType: 'On Demand TV',
        service: 'afrique',
      },
    );
    expect(container).toMatchSnapshot();
  });

  it('should render the translated section label', () => {
    const { getByText } = render(
      <RecentVideoEpisodesWithContext episodes={afrique} />,
    );

    const recentEpisodesLabel = getByText('Editions Précédentes');
    expect(recentEpisodesLabel).toBeInTheDocument();
  });

  it('should render the list items', async () => {
    const { container } = render(
      <RecentVideoEpisodesWithContext episodes={afrique} />,
    );

    expect(container.querySelectorAll('li').length).toEqual(3);
  });
  it('should not render a list when there is only one episode', () => {
    const { queryByRole } = render(
      <RecentVideoEpisodesWithContext episodes={[afrique[0]]} />,
    );

    expect(queryByRole('list')).not.toBeInTheDocument();
    expect(queryByRole('listitem')).not.toBeInTheDocument();
  });

  it('should render the brand title', () => {
    const { getAllByText } = render(
      <RecentVideoEpisodesWithContext episodes={afrique} />,
    );

    expect(getAllByText('BBC Info')[0]).toBeInTheDocument();
  });

  it('should render the episode title', () => {
    const { getByText } = render(
      <RecentVideoEpisodesWithContext episodes={afrique} />,
    );

    expect(getByText('Oui, je suis le chef')).toBeInTheDocument();
  });

  it('should render the list item links', async () => {
    const { getAllByText } = render(
      <RecentVideoEpisodesWithContext episodes={afrique} />,
    );

    const links = getAllByText('BBC Info').map(
      titleEl => titleEl.closest('a').href,
    );

    expect(links).toEqual([
      'http://localhost/afrique/bbc_afrique_tv/tv/w172xc9xq2gllfk',
      'http://localhost/afrique/bbc_afrique_tv/tv/w172xc9xq2ghpjg',
      'http://localhost/afrique/bbc_afrique_tv/tv/w172xc9xq2gdsmc',
    ]);
  });

  it('should include the visually hidden audio and date', () => {
    const { getAllByText } = render(
      <RecentVideoEpisodesWithContext episodes={afrique} />,
    );

    const visuallyHiddenAudioLabel = getAllByText('Vidéo,');
    const visuallyHiddenDate = getAllByText(', Durée 15,00');
    expect(visuallyHiddenAudioLabel[0]).toBeInTheDocument();
    expect(visuallyHiddenDate[0]).toBeInTheDocument();
  });

  it('should aria-hide the duration on the video', () => {
    const { container } = render(
      <RecentVideoEpisodesWithContext episodes={afrique} />,
    );

    const hiddenDuration = container.querySelector('div[aria-hidden=true]');

    expect(hiddenDuration).toBeDefined();
    expect(hiddenDuration).toContainHTML('15:00');
  });

  it('should correctly handle images', () => {
    const { container } = render(
      <RecentVideoEpisodesWithContext episodes={afrique} />,
    );

    expect(
      container.querySelector(`img[src='${afrique[0].image}']`),
    ).toBeInTheDocument();
    expect(
      container.querySelector(`img[alt='${afrique[0].altText}']`),
    ).toBeInTheDocument();
  });

  it('should render the media indicator', () => {
    const { container } = render(
      <RecentVideoEpisodesWithContext episodes={afrique} />,
    );
    const svgs = container.querySelectorAll('svg');

    expect(svgs).toHaveLength(3);
  });

  it('should include the data-e2e attribute if passed', () => {
    const { container } = render(
      <RecentVideoEpisodesWithContext
        episodes={afrique}
        ulProps={{ 'data-e2e': 'recent-episode-list' }}
        liProps={{ 'data-e2e': 'recent-episode-list-item' }}
      />,
    );

    expect(container.querySelector('ul')).toHaveAttribute(
      'data-e2e',
      'recent-episodes-list',
    );
    expect(container.querySelector('li')).toHaveAttribute(
      'data-e2e',
      'recent-episodes-list-item',
    );
  });

  describe('on amp', () => {
    it('should use amp-img rather than img', () => {
      const { container } = render(
        <RecentVideoEpisodesWithContext episodes={afrique} isAmp />,
      );

      expect(container.querySelector('amp-img')).toBeDefined();
      expect(container.querySelector('img')).toBeNull();
    });
  });
});
