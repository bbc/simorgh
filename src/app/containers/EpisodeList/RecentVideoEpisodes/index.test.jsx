import React from 'react';
import { render } from '@testing-library/react';
import RecentVideoEpisodes from '.';
import { afrique } from './fixtures';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { RequestContextProvider } from '#contexts/RequestContext';

/* eslint-disable react/prop-types */
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

describe('RecentAudioEpisodes', () => {
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
    const visuallyHiddenDate = getAllByText('Durée 15,00');
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
