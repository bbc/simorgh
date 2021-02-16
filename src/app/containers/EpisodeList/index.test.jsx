import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import { render } from '@testing-library/react';
import * as scripts from '@bbc/gel-foundations/scripts';
import '@testing-library/jest-dom/extend-expect';
import {
  audioEpisodesFixture,
  videoEpisodesFixture,
} from './examples/fixtureData';
import AudioEpisodesExample from './examples/AudioEpisodesExample';
import VideoEpisodesExample from './examples/VideoEpisodesExample';
import { EpisodeContext } from './helpers';
import EpisodeList from '.';

// eslint-disable-next-line react/prop-types
const RenderDateTimeDuration = ({ children, hasBorder }) => (
  <EpisodeContext.Provider
    value={{ script: scripts.latin, service: 'news', dir: 'ltr' }}
  >
    <EpisodeList.DateTimeDuration hasBorder={hasBorder}>
      {children}
    </EpisodeList.DateTimeDuration>
  </EpisodeContext.Provider>
);

describe('Episode List ', () => {
  shouldMatchSnapshot(
    'should render video episodes correctly',
    AudioEpisodesExample({
      episodes: videoEpisodesFixture,
      script: scripts.latin,
      service: 'news',
      dir: 'ltr',
    }),
  );

  shouldMatchSnapshot(
    'should render radio episodes correctly',
    AudioEpisodesExample({
      episodes: audioEpisodesFixture,
      script: scripts.latin,
      service: 'news',
      dir: 'ltr',
    }),
  );

  it('should render the list', () => {
    const { getByRole } = render(
      AudioEpisodesExample({
        episodes: audioEpisodesFixture,
        script: scripts.latin,
        service: 'news',
        dir: 'ltr',
      }),
    );

    expect(getByRole('list')).toBeInTheDocument();
  });

  it('should render the list item', () => {
    const { getAllByRole } = render(
      AudioEpisodesExample({
        episodes: audioEpisodesFixture,
        script: scripts.latin,
        service: 'news',
        dir: 'ltr',
      }),
    );

    expect(getAllByRole('listitem')[0]).toBeInTheDocument();
  });

  it('should render the brand title', () => {
    const { getByText } = render(
      AudioEpisodesExample({
        episodes: audioEpisodesFixture,
        script: scripts.latin,
        service: 'news',
        dir: 'ltr',
      }),
    );

    expect(getByText('Le Journal')).toBeInTheDocument();
  });

  it('should render the episode title', () => {
    const { getByText } = render(
      AudioEpisodesExample({
        episodes: audioEpisodesFixture,
        script: scripts.latin,
        service: 'news',
        dir: 'ltr',
      }),
    );

    expect(
      getByText("Le premier rendez-vous d'information de la soirée."),
    ).toBeInTheDocument();
  });

  it('should render the link', () => {
    const { getByText } = render(
      AudioEpisodesExample({
        episodes: audioEpisodesFixture,
        script: scripts.latin,
        service: 'news',
        dir: 'ltr',
      }),
    );

    expect(
      getByText(audioEpisodesFixture[0].brandTitle).closest('a'),
    ).toHaveAttribute('href', audioEpisodesFixture[0].url);
  });

  it('should render the media indicator', () => {
    const { container } = render(
      AudioEpisodesExample({
        episodes: audioEpisodesFixture,
        script: scripts.latin,
        service: 'news',
        dir: 'ltr',
      }),
    );
    const svgs = container.querySelectorAll('svg');

    expect(svgs).toHaveLength(3);
  });

  it('should render the duration', () => {
    const { getAllByText } = render(
      AudioEpisodesExample({
        episodes: audioEpisodesFixture,
        script: scripts.latin,
        service: 'news',
        dir: 'ltr',
      }),
    );

    expect(getAllByText('Durée 59:00')[0]).toBeInTheDocument();
  });

  it('should render the date', () => {
    const { getAllByText } = render(
      AudioEpisodesExample({
        episodes: audioEpisodesFixture,
        script: scripts.latin,
        service: 'news',
        dir: 'ltr',
      }),
    );

    expect(getAllByText('4 Avril 2020, 14:00')[0]);
  });

  it('should render the correct number of episodes', () => {
    const { getAllByRole } = render(
      AudioEpisodesExample({
        episodes: audioEpisodesFixture,
        script: scripts.latin,
        service: 'news',
        dir: 'ltr',
      }),
    );

    expect(getAllByRole('listitem').length).toEqual(3);
  });

  it('should not render a list when there is only one episode', () => {
    const { queryByRole } = render(
      AudioEpisodesExample({
        episodes: [audioEpisodesFixture[0]],
        script: scripts.latin,
        service: 'news',
        dir: 'ltr',
      }),
    );

    expect(queryByRole('list')).not.toBeInTheDocument();
    expect(queryByRole('listitem')).not.toBeInTheDocument();
  });

  it('should correctly handle images', () => {
    const { container } = render(
      VideoEpisodesExample({
        episodes: [videoEpisodesFixture[0]],
        script: scripts.latin,
        service: 'news',
        dir: 'ltr',
      }),
    );

    expect(
      container.querySelector(`img[src='${videoEpisodesFixture[0].image}']`),
    ).toBeInTheDocument();
    expect(
      container.querySelector(`img[alt='${videoEpisodesFixture[0].altText}']`),
    ).toBeInTheDocument();
  });

  it('should include the data-e2e attribute if passed', () => {
    const { container } = render(
      AudioEpisodesExample({
        episodes: audioEpisodesFixture,
        script: scripts.latin,
        service: 'news',
        dir: 'ltr',
        ulProps: { 'data-e2e': 'recent-episode-list' },
        liProps: { 'data-e2e': 'recent-episode-list-item' },
      }),
    );

    expect(container.querySelector('ul')).toHaveAttribute(
      'data-e2e',
      'recent-episode-list',
    );
    expect(container.querySelector('li')).toHaveAttribute(
      'data-e2e',
      'recent-episode-list-item',
    );
  });

  it('should render a span with role=text to avoid text splitting in screenreaders', () => {
    const { getAllByRole } = render(
      AudioEpisodesExample({
        episodes: audioEpisodesFixture,
        script: scripts.latin,
        service: 'news',
        dir: 'ltr',
      }),
    );

    expect(getAllByRole('text')[0].closest('a')).toBeInTheDocument();
  });

  it('should not render a border when list contains only one element', async () => {
    const { container, getByText } = await render(
      <RenderDateTimeDuration>Some duration</RenderDateTimeDuration>,
    );
    const spanEl = getByText('Some duration');
    const style = window.getComputedStyle(spanEl);

    expect(container.getElementsByTagName('span').length).toBe(1);
    expect(style.borderLeft).toBe('');
    expect(style.borderRight).toBe('');
  });

  it('should render a border between two elements', async () => {
    const { getByText } = await render(
      <RenderDateTimeDuration hasBorder>Some date</RenderDateTimeDuration>,
    );
    const spanEl = getByText('Some date');
    const style = window.getComputedStyle(spanEl);

    expect(style.borderLeft).toBe('0.0625rem solid #BABABA');
    expect(style.borderRight).toBe('');
  });
});
