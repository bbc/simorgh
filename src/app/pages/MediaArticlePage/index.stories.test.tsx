import { Helmet } from 'react-helmet';
import {
  render,
  screen,
} from '#app/components/react-testing-library-with-providers';
import ThemeProviderSCSSModules from '#app/components/ThemeProviderSCSSModules';
import { MediaArticlePageWithSingleLatestMedia } from './index.stories';

jest.mock(
  '#app/components/ThemeProviderSCSSModules/themes/loadableConfig',
  () => {
    const { forwardRef } = jest.requireActual<typeof import('react')>('react');
    const withThemeProvider = jest.requireActual(
      '#app/components/ThemeProviderSCSSModules/withThemeProvider',
    ).default;
    const brandSVG = jest.requireActual(
      '#app/components/ThemeProviderSCSSModules/chameleonLogos/news',
    ).default;
    const Theme = withThemeProvider({ brandSVG });

    return {
      __esModule: true,
      default: {
        // eslint-disable-next-line react/display-name
        news: forwardRef(
          ({ children }: React.PropsWithChildren, _ref: unknown) => (
            <Theme>{children}</Theme>
          ),
        ),
      },
    };
  },
);

jest.mock('./MediaArticlePage', () => () => <p>Media article</p>);
jest.mock('#app/components/PageLayoutWrapper', () => ({
  __esModule: true,
  default: ({ children }: React.PropsWithChildren) => children,
}));
jest.mock(
  '../../legacy/containers/PageHandlers/withOptimizelyProvider',
  () => ({
    __esModule: true,
    default: (Component: React.ComponentType) => Component,
  }),
);

describe('Media article page stories', () => {
  it('sets SCSS dark UI within the page request context, overriding the outer decorator', () => {
    render(
      <ThemeProviderSCSSModules service="news">
        {MediaArticlePageWithSingleLatestMedia(
          {},
          { service: 'news', variant: 'default' },
        )}
      </ThemeProviderSCSSModules>,
    );

    expect(screen.getByText('Media article')).toBeInTheDocument();
    expect(Helmet.peek().htmlAttributes).toMatchObject({
      'data-is-dark-ui': 'true',
    });
  });
});
