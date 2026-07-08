import mockIdctaConfig from '#app/contexts/AccountContext/mocks';
import { ARTICLE_PAGE, MEDIA_ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
import ErrorPage from './ErrorPage';
import {
  render,
  screen,
} from '../../components/react-testing-library-with-providers';

jest.mock('#app/components/ArticleNotFoundUASCleanup', () => ({
  __esModule: true,
  default: () => <div data-testid="article-not-found-uas-cleanup" />,
}));

const personalizationToggle = {
  uasPersonalization: { enabled: true, value: 'hindi' },
};

const personalizedRenderOptions = {
  service: 'hindi',
  toggles: personalizationToggle,
  idctaConfig: { ...mockIdctaConfig, initialIsSignedIn: true },
};

describe('ErrorPage', () => {
  it('should correctly render for 404', () => {
    const { container } = render(<ErrorPage errorCode={404} />, {
      service: 'news',
    });
    expect(container).toMatchSnapshot();
  });

  it('should correctly render for 500', () => {
    const { container } = render(<ErrorPage errorCode={500} />, {
      service: 'news',
    });
    expect(container).toMatchSnapshot();
  });

  it('should correctly render for other status code', () => {
    const { container } = render(<ErrorPage errorCode={123} />, {
      service: 'news',
    });
    expect(container).toMatchSnapshot();
  });

  it('should correctly render for 404 for persian', () => {
    const { container } = render(<ErrorPage errorCode={404} />, {
      service: 'persian',
    });
    expect(container).toMatchSnapshot();
  });

  it('should correctly render for 500 for persian', async () => {
    const { container } = render(<ErrorPage errorCode={500} />, {
      service: 'persian',
    });
    expect(container).toMatchSnapshot();
  });

  it('renders ArticleNotFoundUASCleanup when personalization is enabled, errorCode is 404 and pageType is an article page', () => {
    render(<ErrorPage errorCode={404} />, {
      ...personalizedRenderOptions,
      pageType: ARTICLE_PAGE,
    });

    expect(
      screen.getByTestId('article-not-found-uas-cleanup'),
    ).toBeInTheDocument();
  });

  it('renders ArticleNotFoundUASCleanup when personalization is enabled, errorCode is 404 and pageType is a media article page', () => {
    render(<ErrorPage errorCode={404} />, {
      ...personalizedRenderOptions,
      pageType: MEDIA_ARTICLE_PAGE,
    });

    expect(
      screen.getByTestId('article-not-found-uas-cleanup'),
    ).toBeInTheDocument();
  });

  it('does not render ArticleNotFoundUASCleanup when user is not signed in', () => {
    render(<ErrorPage errorCode={404} />, {
      ...personalizedRenderOptions,
      idctaConfig: { ...mockIdctaConfig, initialIsSignedIn: false },
      pageType: ARTICLE_PAGE,
    });

    expect(
      screen.queryByTestId('article-not-found-uas-cleanup'),
    ).not.toBeInTheDocument();
  });
});
