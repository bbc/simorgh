import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import RecentAudioEpisodes from './RecentAudioEpisodes';
import RecentVideoEpisodes from './RecentVideoEpisodes';
import { indonesian } from './RecentAudioEpisodes/fixtures';
import { afrique } from './RecentVideoEpisodes/fixtures';

/* eslint-disable react/prop-types */
const RecentAudioEpisodesWithContext = ({ episodes, isAmp = false }) => (
  <ServiceContextProvider service="indonesia">
    <RequestContextProvider
      service="indonesia"
      pageType="media"
      pathname="test"
      isAmp={isAmp}
    >
      <RecentAudioEpisodes
        masterBrand="bbc_indonesian_radio"
        episodes={episodes}
        pageType="On Demand Radio"
      />
    </RequestContextProvider>
  </ServiceContextProvider>
);

const RecentVideoEpisodesWithContext = ({ episodes, isAmp = false }) => (
  <ServiceContextProvider service="afrique">
    <RequestContextProvider
      service="afrique"
      pageType="media"
      pathname="test"
      isAmp={isAmp}
    >
      <RecentVideoEpisodes masterBrand="bbc_afrique_tv" episodes={episodes} />
    </RequestContextProvider>
  </ServiceContextProvider>
);

describe('Episode List ', () => {
  shouldMatchSnapshot(
    'should render audio episodes correctly',
    <RecentAudioEpisodesWithContext episodes={indonesian} />,
  );

  shouldMatchSnapshot(
    'should render video episodes correctly',
    <RecentVideoEpisodesWithContext episodes={afrique} />,
  );

  it('should render the list', () => {
    const { getByRole } = render(
      <RecentAudioEpisodesWithContext episodes={indonesian} />,
    );

    expect(getByRole('list')).toBeInTheDocument();
  });

  it('should render the list item', () => {
    const { getAllByRole } = render(
      <RecentAudioEpisodesWithContext episodes={indonesian} />,
    );

    expect(getAllByRole('listitem')[0]).toBeInTheDocument();
  });

  it('should not render a list when there is only one episode', () => {
    const { queryByRole } = render(
      <RecentAudioEpisodesWithContext episodes={[indonesian[0]]} />,
    );

    expect(queryByRole('list')).not.toBeInTheDocument();
    expect(queryByRole('listitem')).not.toBeInTheDocument();
  });

  it('should render the brand title', () => {
    const { getAllByText } = render(
      <RecentAudioEpisodesWithContext episodes={indonesian} />,
    );

    expect(getAllByText('Dunia Pagi Ini')[0]).toBeInTheDocument();
  });

  it('should render the episode title', () => {
    const { getByText } = render(
      <RecentAudioEpisodesWithContext episodes={indonesian} />,
    );

    expect(
      getByText('BBC Indonesia, Kamis 18 Februari 2021'),
    ).toBeInTheDocument();
  });

  it('should render the link', () => {
    const { getAllByText } = render(
      <RecentAudioEpisodesWithContext episodes={indonesian} />,
    );

    expect(
      getAllByText(indonesian[0].brandTitle)[0].closest('a'),
    ).toHaveAttribute('href', indonesian[0].url);
  });

  it('should render the media indicator', () => {
    const { container } = render(
      <RecentAudioEpisodesWithContext episodes={indonesian} />,
    );
    const svgs = container.querySelectorAll('svg');

    expect(svgs).toHaveLength(4);
  });

  it('should render the duration', () => {
    const { getAllByText } = render(
      <RecentAudioEpisodesWithContext episodes={indonesian} />,
    );

    expect(getAllByText('Durasi 15:30')[0]).toBeInTheDocument();
  });

  it('should render the date', () => {
    const { getByText } = render(
      <RecentAudioEpisodesWithContext episodes={indonesian} />,
    );

    expect(getByText('17 November 2020')[0]);
  });

  it('should render the correct number of episodes', () => {
    const { getAllByRole } = render(
      <RecentAudioEpisodesWithContext episodes={indonesian} />,
    );

    expect(getAllByRole('listitem').length).toEqual(4);
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

  it('should include the data-e2e attribute if passed', () => {
    const { container } = render(
      <RecentAudioEpisodesWithContext
        episodes={indonesian}
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

  it('should render a span with role=text to avoid text splitting in screenreaders', () => {
    const { getAllByRole } = render(
      <RecentAudioEpisodesWithContext episodes={indonesian} />,
    );

    expect(getAllByRole('text')[0].closest('a')).toBeInTheDocument();
  });

  it('should not render a border when list contains only one element', async () => {
    const { container } = render(
      <RecentAudioEpisodesWithContext episodes={[indonesian[0]]} />,
    );
    const wrappingDiv = container.querySelector("div[class*='Wrapper']");
    expect(wrappingDiv.style.borderBottom).toBe('');
  });

  it('should render a border between two elements', async () => {
    const { getByText } = await render(
      <RecentAudioEpisodesWithContext episodes={indonesian} />,
    );
    const spanEl = getByText('17 November 2020');
    const style = window.getComputedStyle(spanEl);

    expect(style.borderLeft).toBe('0.0625rem solid #BABABA');
    expect(style.borderRight).toBe('');
  });
});
