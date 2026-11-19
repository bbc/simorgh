import {
  render,
  screen,
  waitFor,
} from '#app/components/react-testing-library-with-providers';
import { Summary } from '#app/models/types/curationData';
import SinceLastVisited from '.';
import { getStorageKey } from './constants';
import { resetVisitStateForTests } from './lastVisit';

const hoursAgo = (hours: number) =>
  new Date(Date.now() - hours * 60 * 60 * 1000).toISOString();

const buildSummary = (firstPublished: string): Summary =>
  ({
    id: 'story-1',
    title: 'Titular nuevo',
    link: 'https://www.bbc.com/mundo/articles/story-1',
    imageUrl: 'https://ichef.bbci.co.uk/ace/ws/{width}/a.jpg',
    imageAlt: 'alt',
    type: 'article',
    firstPublished,
    lastPublished: firstPublished,
  }) as Summary;

const renderComponent = (topStories: Summary[]) =>
  render(<SinceLastVisited topStories={topStories} />, {
    service: 'mundo',
    pathname: '/mundo',
  });

describe('SinceLastVisited', () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
    resetVisitStateForTests();
  });

  it('renders nothing on a first visit but records the visit', async () => {
    renderComponent([buildSummary(hoursAgo(1))]);

    await waitFor(() =>
      expect(localStorage.getItem(getStorageKey('mundo'))).not.toBeNull(),
    );
    expect(screen.queryByTestId('since-last-visited')).not.toBeInTheDocument();
  });

  it('renders stories published after the previous visit', async () => {
    localStorage.setItem(
      getStorageKey('mundo'),
      String(Date.now() - 2 * 60 * 60 * 1000),
    );

    renderComponent([buildSummary(hoursAgo(1))]);

    expect(
      await screen.findByRole('heading', { name: 'Desde tu última visita' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Titular nuevo')).toBeInTheDocument();
  });

  it('renders nothing when no stories are newer than the previous visit', async () => {
    localStorage.setItem(
      getStorageKey('mundo'),
      String(Date.now() - 60 * 60 * 1000),
    );

    renderComponent([buildSummary(hoursAgo(3))]);

    await waitFor(() =>
      expect(
        screen.queryByTestId('since-last-visited'),
      ).not.toBeInTheDocument(),
    );
  });

  it('renders nothing when there are no top stories', () => {
    renderComponent([]);

    expect(screen.queryByTestId('since-last-visited')).not.toBeInTheDocument();
  });
});
