import {
  act,
  render,
  within,
} from '#app/components/react-testing-library-with-providers';
import mockMatchMedia from '#testHelpers/mockMatchMedia';
import mundoFixture from '#data/mundo/send/test2qq3x8vt.json';
import hindiSignInRequiredFixture from '#data/hindi/send/u50853345.json';
import { GROUP_3_MIN_WIDTH } from '#app/components/ThemeProvider/mediaQueries';
import { matchers } from '@emotion/jest';
import { AccountContext } from '#app/contexts/AccountContext';
import { IdctaConfig } from '#app/models/types/account';
import UGCPageLayout from './UGCPageLayout';
import { PageProps } from './types';

jest.mock('next/router', () => ({
  useRouter: () => ({
    query: { id: '123' },
  }),
}));

jest.mock('#app/hooks/useOptimizelyVariation', () => ({
  __esModule: true,
  ...jest.requireActual('#app/hooks/useOptimizelyVariation'),
  default: jest.fn(),
}));

expect.extend(matchers);

const idctaConfig: IdctaConfig = {
  'id-availability': 'GREEN',
  signin_url: 'https://account.bbc.com/signin',
  register_url: 'https://account.bbc.com/register',
  settings_url: 'https://account.bbc.com/settings',
  signout_url: 'https://account.bbc.com/signout',
  foryou_url: 'https://account.bbc.com/foryou',
  unavailable_url: 'https://account.bbc.com/unavailable',
  identity: { idSignedInCookieName: 'ckns_id' },
};

const accountContext = {
  isIdctaAvailable: true,
  isRefreshAvailable: true,
  isSignedIn: false,
  signInUrl: idctaConfig.signin_url,
  registerUrl: idctaConfig.register_url,
  isArticlePersonalizationEnabled: false,
  isArticlePersonalizationAvailable: false,
  isTopicPersonalizationEnabled: false,
  isTopicPersonalizationAvailable: false,
  isPersonalisationOn: false,
};

describe('UGC Page Layout', () => {
  let container: HTMLElement;

  beforeEach(async () => {
    jest.restoreAllMocks();

    mockMatchMedia();
  });

  describe('Sign-in gate', () => {
    const pageData = hindiSignInRequiredFixture.data as PageProps['pageData'];
    const signInRequiredHeading = 'प्रश्न भेजने के लिए साइन इन करें';
    const hindiLocale = 'hi-IN';

    it('Does not render the form when the visitor is signed out', async () => {
      const { container: signInPageContainer } = await act(() =>
        render(
          <AccountContext.Provider value={accountContext}>
            <UGCPageLayout pageData={pageData} />
          </AccountContext.Provider>,
          { service: 'hindi' },
        ),
      );

      expect(signInPageContainer.querySelector('form')).not.toBeInTheDocument();
      expect(
        signInPageContainer.querySelector(
          `a[href="${accountContext.signInUrl}"]`,
        ),
      ).toBeInTheDocument();
      expect(
        signInPageContainer.querySelector(
          `a[href="${accountContext.registerUrl}"]`,
        ),
      ).toBeInTheDocument();
      expect(signInPageContainer).toHaveTextContent(signInRequiredHeading);
    });

    it('Renders the form when the visitor is signed in', async () => {
      const { container: formContainer } = await act(() =>
        render(
          <AccountContext.Provider
            value={{ ...accountContext, isSignedIn: true }}
          >
            <UGCPageLayout pageData={pageData} />
          </AccountContext.Provider>,
          { service: 'hindi' },
        ),
      );

      expect(formContainer.querySelector('form')).toBeInTheDocument();
    });

    it('Does not show the registration link when no registration URL is available', async () => {
      const { container: signInPageContainer } = await act(() =>
        render(
          <AccountContext.Provider
            value={{ ...accountContext, registerUrl: undefined }}
          >
            <UGCPageLayout pageData={pageData} />
          </AccountContext.Provider>,
          { service: 'hindi' },
        ),
      );

      expect(
        signInPageContainer.querySelector(
          `a[href="${accountContext.registerUrl}"]`,
        ),
      ).not.toBeInTheDocument();
    });

    it.each([
      ['missing Account configuration', null],
      [
        'unavailable Account despite an initial signed-in state',
        {
          ...idctaConfig,
          'id-availability': 'RED',
          initialIsSignedIn: true,
        },
      ],
    ] as const)('Keeps required forms hidden with %s', async (_, config) => {
      const { container: signInPageContainer } = await act(() =>
        render(<UGCPageLayout pageData={pageData} />, {
          service: 'hindi',
          idctaConfig: config,
        }),
      );

      expect(signInPageContainer.querySelector('form')).not.toBeInTheDocument();
      expect(
        within(signInPageContainer).getByRole('heading', { level: 1 }),
      ).toHaveTextContent(signInRequiredHeading);
      expect(
        signInPageContainer.querySelector('a[href=""]'),
      ).not.toBeInTheDocument();
      if (config) {
        expect(within(signInPageContainer).getAllByRole('link')).toEqual([
          expect.objectContaining({ href: config.unavailable_url }),
          expect.objectContaining({ href: config.unavailable_url }),
        ]);
      } else {
        expect(
          within(signInPageContainer).queryByRole('link'),
        ).not.toBeInTheDocument();
      }
    });

    it('Updates the required form when authentication changes after render', async () => {
      const renderPage = (isSignedIn: boolean) => (
        <AccountContext.Provider value={{ ...accountContext, isSignedIn }}>
          <UGCPageLayout pageData={pageData} />
        </AccountContext.Provider>
      );
      const { container: formContainer, rerender } = await act(() =>
        render(renderPage(false), { service: 'hindi' }),
      );

      expect(formContainer.querySelector('form')).not.toBeInTheDocument();

      await act(() => rerender(renderPage(true)));
      expect(formContainer.querySelector('form')).toBeInTheDocument();

      await act(() => rerender(renderPage(false)));
      expect(formContainer.querySelector('form')).not.toBeInTheDocument();
      expect(
        formContainer.querySelector(`a[href="${accountContext.signInUrl}"]`),
      ).toBeInTheDocument();
    });
  });

  describe.each([false, undefined])(
    'Optional sign-in with signinRequired=%s',
    signinRequired => {
      it.each([
        ['signed out', idctaConfig],
        ['missing Account configuration', null],
        ['Account unavailable', { ...idctaConfig, 'id-availability': 'RED' }],
      ] as const)('Keeps the form accessible with %s', async (_, config) => {
        const pageData =
          hindiSignInRequiredFixture.data as PageProps['pageData'];
        const { container: formContainer } = await act(() =>
          render(
            <UGCPageLayout
              pageData={{
                ...pageData,
                settings: { ...pageData.settings, signinRequired },
              }}
            />,
            { service: 'hindi', idctaConfig: config },
          ),
        );

        expect(formContainer.querySelector('form')).toBeInTheDocument();
        expect(
          formContainer.querySelector('#sign-in-required-heading'),
        ).not.toBeInTheDocument();
      });
    },
  );

  describe('Default campaign', () => {
    beforeEach(async () => {
      ({ container } = await act(() =>
        render(
          <UGCPageLayout
            pageData={mundoFixture.data as PageProps['pageData']}
          />,
        ),
      ));
    });

    it('Renders a level 1 heading', () => {
      const level1Heading = container.querySelector('h1');
      expect(level1Heading).toBeInTheDocument();
      expect(level1Heading?.innerHTML).toEqual('Escríbenos');
    });

    it('Renders a description', () => {
      const description = container.innerHTML.includes(
        'En BBC Mundo nos importa tu punto de vista.',
      );
      expect(description).toBeTruthy();
    });

    it('Renders a form', () => {
      const form = container.querySelector('form');
      expect(form).toBeInTheDocument();
    });

    it('Renders a submit button within the form', () => {
      const submitButton = container.querySelector('button[type=submit]');
      expect(submitButton).toBeInTheDocument();
    });
  });
});

describe('UGC Page Layout background', () => {
  const media = GROUP_3_MIN_WIDTH.replace('@media ', '');

  beforeEach(() => {
    jest.restoreAllMocks();
    mockMatchMedia();
  });

  const renderWithSettings = async (
    settings: PageProps['pageData']['settings'],
  ) => {
    const pageData = {
      ...(mundoFixture.data as PageProps['pageData']),
      settings,
    };

    return act(() => render(<UGCPageLayout pageData={pageData} />));
  };

  it('Falls back to the gradient background and no fixed attachment when pageBackgroundTemplateUrl is absent', async () => {
    const { getByTestId } = await renderWithSettings({
      replyEmailAddress: 'test@bbc.co.uk',
      retentionPeriodDays: '270',
    });

    const backgroundElement = getByTestId('ugc-page-background');

    expect(backgroundElement).toHaveStyleRule('background', /linear-gradient/, {
      media,
    });
    expect(backgroundElement).not.toHaveStyleRule('background-attachment', {
      media,
    });
  });
});
