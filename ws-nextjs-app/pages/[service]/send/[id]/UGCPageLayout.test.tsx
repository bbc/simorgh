import {
  act,
  render,
} from '#app/components/react-testing-library-with-providers';
import mockMatchMedia from '#testHelpers/mockMatchMedia';
import mundoFixture from '#data/mundo/send/test2qq3x8vt.json';
import { GROUP_3_MIN_WIDTH } from '#app/components/ThemeProvider/mediaQueries';
import { matchers } from '@emotion/jest';
import { AccountContext } from '#app/contexts/AccountContext';
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

describe('UGC Page Layout', () => {
  let container: HTMLElement;

  beforeEach(async () => {
    jest.restoreAllMocks();

    mockMatchMedia();

    ({ container } = await act(() => {
      const pageData = mundoFixture.data as PageProps['pageData'];

      return render(<UGCPageLayout pageData={pageData} />);
    }));
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

describe('UGC Page Layout background', () => {
  const media = GROUP_3_MIN_WIDTH.replace('@media ', '');

  beforeEach(() => {
    jest.restoreAllMocks();
    mockMatchMedia();
  });

  describe('UGC Page Layout sign-in gate', () => {
    const pageData = {
      ...(mundoFixture.data as PageProps['pageData']),
      settings: {
        ...(mundoFixture.data as PageProps['pageData']).settings,
        signinRequired: true,
      },
    };

    const accountContext = {
      isIdctaAvailable: true,
      isRefreshAvailable: true,
      isSignedIn: false,
      signInUrl: 'https://account.bbc.com/signin',
      registerUrl: 'https://account.bbc.com/register',
      isArticlePersonalizationEnabled: false,
      isArticlePersonalizationAvailable: false,
      isTopicPersonalizationEnabled: false,
      isTopicPersonalizationAvailable: false,
      isPersonalisationOn: false,
    };

    it('does not render the form when the visitor is signed out', async () => {
      await act(() =>
        render(
          <AccountContext.Provider value={accountContext}>
            <UGCPageLayout pageData={pageData} />
          </AccountContext.Provider>,
        ),
      );

      expect(document.querySelector('form')).not.toBeInTheDocument();
      expect(
        document.querySelector('a[href="https://account.bbc.com/signin"]'),
      ).toBeInTheDocument();
    });

    it('renders the form when the visitor is signed in', async () => {
      await act(() =>
        render(
          <AccountContext.Provider
            value={{ ...accountContext, isSignedIn: true }}
          >
            <UGCPageLayout pageData={pageData} />
          </AccountContext.Provider>,
        ),
      );

      expect(document.querySelector('form')).toBeInTheDocument();
    });
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
