import {
  render,
  screen,
} from '#app/components/react-testing-library-with-providers';
import ThemeProvider from '.';

jest.mock('./themes/loadableConfig', () => {
  const { forwardRef } = jest.requireActual<typeof import('react')>('react');

  const createMockTheme = (testId: string) =>
    // eslint-disable-next-line react/display-name
    forwardRef(({ children }: { children: React.ReactNode }, _ref: unknown) => (
      <div data-testid={testId as string}>{children}</div>
    ));

  return {
    __esModule: true,
    default: {
      // Non-variant service — next/dynamic returns a React.forwardRef object
      arabic: createMockTheme('arabic-theme'),
      // ServicesWithVariants service whose primary variant is 'default'
      ukrainian: createMockTheme('ukrainian-theme'),
      // Variant service — stored as a plain object map
      serbian: {
        cyr: createMockTheme('serbian-cyr-theme'),
        lat: createMockTheme('serbian-lat-theme'),
      },
    },
  };
});

describe('ThemeProviderSCSSModules', () => {
  describe('given a non-variant service', () => {
    it('renders children', () => {
      render(
        <ThemeProvider service="arabic">
          <p>child content</p>
        </ThemeProvider>,
      );

      expect(screen.getByText('child content')).toBeInTheDocument();
    });

    it('renders children when variant is "default"', () => {
      // Ukrainian is a ServicesWithVariants service whose primary variant is 'default'.
      // This was flagged in PR review as a potential issue — the component should still render.
      render(
        <ThemeProvider service="ukrainian" variant="default">
          <p>child content</p>
        </ThemeProvider>,
      );

      expect(screen.getByText('child content')).toBeInTheDocument();
    });

    it('renders children when variant is null', () => {
      render(
        <ThemeProvider service="arabic" variant={null}>
          <p>child content</p>
        </ThemeProvider>,
      );

      expect(screen.getByText('child content')).toBeInTheDocument();
    });
  });

  describe('given a variant service', () => {
    it('renders the correct theme for an explicit variant', () => {
      render(
        <ThemeProvider service="serbian" variant="lat">
          <p>child content</p>
        </ThemeProvider>,
      );

      expect(screen.getByTestId('serbian-lat-theme')).toBeInTheDocument();
    });

    it('falls back to defaultServiceVariants when no variant prop is provided', () => {
      // no variant prop → defaultServiceVariants['serbian'] = 'lat'
      render(
        <ThemeProvider service="serbian">
          <p>child content</p>
        </ThemeProvider>,
      );

      expect(screen.getByTestId('serbian-lat-theme')).toBeInTheDocument();
    });
  });
});
