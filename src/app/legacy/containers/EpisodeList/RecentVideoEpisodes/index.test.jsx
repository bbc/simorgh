import {
  act,
  render,
} from '../../../../components/react-testing-library-with-providers';
import RecentVideoEpisodes from '.';
import { afrique } from './fixtures';
import { TV_PAGE } from '../../../../routes/utils/pageTypes';

const RecentVideoEpisodesWithContext = ({ episodes }) => (
  <RecentVideoEpisodes masterBrand="bbc_afrique_tv" episodes={episodes} />
);

describe('Recent Video Episodes', () => {
  it('should render video episodes correctly', () => {
    let container;

    act(() => {
      ({ container } = render(
        <RecentVideoEpisodes masterBrand="bbc_afrique_tv" episodes={afrique} />,
        { service: 'afrique', pageType: TV_PAGE },
      ));
    });
    expect(container).toMatchSnapshot();
  });

  it('should render the translated section label', () => {
    let getByText;

    act(() => {
      ({ getByText } = render(
        <RecentVideoEpisodesWithContext episodes={afrique} />,
        { service: 'afrique' },
      ));
    });

    const recentEpisodesLabel = getByText('Editions Précédentes');
    expect(recentEpisodesLabel).toBeInTheDocument();
  });

  it('should render the list items', () => {
    let container;

    act(() => {
      ({ container } = render(
        <RecentVideoEpisodesWithContext episodes={afrique} />,
        { service: 'afrique' },
      ));
    });

    expect(container.querySelectorAll('li').length).toEqual(3);
  });
  it('should not render a list when there is only one episode', () => {
    let queryByRole;

    act(() => {
      ({ queryByRole } = render(
        <RecentVideoEpisodesWithContext episodes={[afrique[0]]} />,
        { service: 'afrique' },
      ));
    });

    expect(queryByRole('list')).not.toBeInTheDocument();
    expect(queryByRole('listitem')).not.toBeInTheDocument();
  });

  it('should render the brand title', () => {
    let getAllByText;

    act(() => {
      ({ getAllByText } = render(
        <RecentVideoEpisodesWithContext episodes={afrique} />,
        { service: 'afrique' },
      ));
    });

    expect(getAllByText('BBC Info')[0]).toBeInTheDocument();
  });

  it('should render the episode title', () => {
    let getByText;

    act(() => {
      ({ getByText } = render(
        <RecentVideoEpisodesWithContext episodes={afrique} />,
        { service: 'afrique' },
      ));
    });

    expect(getByText('Oui, je suis le chef')).toBeInTheDocument();
  });

  it('should render the list item links', () => {
    let getAllByText;

    act(() => {
      ({ getAllByText } = render(
        <RecentVideoEpisodesWithContext episodes={afrique} />,
        { service: 'afrique' },
      ));
    });

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
    let getAllByText;

    act(() => {
      ({ getAllByText } = render(
        <RecentVideoEpisodesWithContext episodes={afrique} />,
        { service: 'afrique' },
      ));
    });

    const visuallyHiddenAudioLabel = getAllByText('Vidéo,');
    const visuallyHiddenDate = getAllByText(', Durée 15,00');
    expect(visuallyHiddenAudioLabel[0]).toBeInTheDocument();
    expect(visuallyHiddenDate[0]).toBeInTheDocument();
  });

  it('should aria-hide the duration on the video', () => {
    let container;

    act(() => {
      ({ container } = render(
        <RecentVideoEpisodesWithContext episodes={afrique} />,
        { service: 'afrique' },
      ));
    });

    const hiddenDuration = container.querySelector('div[aria-hidden=true]');

    expect(hiddenDuration).toBeDefined();
    expect(hiddenDuration).toContainHTML('15:00');
  });

  it('should correctly handle images', () => {
    let container;

    act(() => {
      ({ container } = render(
        <RecentVideoEpisodesWithContext episodes={afrique} />,
        { service: 'afrique' },
      ));
    });

    expect(
      container.querySelector(`img[src='${afrique[0].image}']`),
    ).toBeInTheDocument();
    expect(
      container.querySelector(`img[alt='${afrique[0].altText}']`),
    ).toBeInTheDocument();
  });

  it('should not render images on Lite', () => {
    let container;
    let getByText;

    act(() => {
      ({ container, getByText } = render(
        <RecentVideoEpisodesWithContext episodes={afrique} />,
        { service: 'afrique', isLite: true },
      ));
    });

    expect(getByText('Oui, je suis le chef')).toBeInTheDocument();
    expect(
      container.querySelector(`img[src='${afrique[0].image}']`),
    ).not.toBeInTheDocument();
  });

  it('should render the media indicator', () => {
    let container;

    act(() => {
      ({ container } = render(
        <RecentVideoEpisodesWithContext episodes={afrique} />,
        { service: 'afrique' },
      ));
    });
    const svgs = container.querySelectorAll('svg');

    expect(svgs).toHaveLength(3);
  });

  it('should include the data-e2e attribute if passed', () => {
    let container;

    act(() => {
      ({ container } = render(
        <RecentVideoEpisodesWithContext
          episodes={afrique}
          ulProps={{ 'data-e2e': 'recent-episode-list' }}
          liProps={{ 'data-e2e': 'recent-episode-list-item' }}
        />,
        { service: 'afrique' },
      ));
    });

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
      let container;

      act(() => {
        ({ container } = render(
          <RecentVideoEpisodesWithContext episodes={afrique} />,
          { service: 'afrique', isAmp: true },
        ));
      });

      expect(container.querySelector('amp-img')).toBeDefined();
      expect(container.querySelector('img')).toBeNull();
    });
  });
});
