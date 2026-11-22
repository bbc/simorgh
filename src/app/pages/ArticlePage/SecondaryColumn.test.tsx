import { Article } from '#app/models/types/optimo';
import { useOnwardJourneyRequest } from '#app/contexts/ArticleOnwardJourneysContext';
import {
  render,
  screen,
} from '../../components/react-testing-library-with-providers';
import SecondaryColumn from './SecondaryColumn';

jest.mock('#app/components/OnwardJourneyPlaceholder/lazy', () => ({
  __esModule: true,
  default: () => <div data-testid="secondary-column-placeholder" />,
}));

jest.mock('#app/contexts/ArticleOnwardJourneysContext', () => ({
  __esModule: true,
  ...jest.requireActual('#app/contexts/ArticleOnwardJourneysContext'),
  useOnwardJourneyRequest: jest.fn(),
}));

const pageData = {
  secondaryColumn: {},
} as Article;

describe('SecondaryColumn', () => {
  beforeEach(() => {
    jest.mocked(useOnwardJourneyRequest).mockReturnValue({
      article: null,
      isEnabled: true,
      requestOnwardJourney: jest.fn(),
    });
  });

  it('keeps Top Stories lazy in the secondary column outside the experiment', () => {
    render(<SecondaryColumn pageData={pageData} />);

    expect(
      screen.getByTestId('secondary-column-placeholder'),
    ).toBeInTheDocument();
  });

  it('keeps a desktop secondary-column trigger for the Top Stories treatment', () => {
    render(<SecondaryColumn pageData={pageData} />, {
      serverSideExperiments: [
        {
          experimentName: 'newswb_ws_topbarojs_read_more',
          variation: 'read-more-a-and-top-stories',
          enabled: true,
        },
      ],
    });

    expect(
      screen.getByTestId('secondary-column-placeholder').parentElement,
    ).toHaveClass('desktopOnly');
  });

  it('keeps the trigger when another journey creates an empty secondary column', () => {
    render(
      <SecondaryColumn
        pageData={{
          ...pageData,
          secondaryColumn: { topStories: [], features: [] },
        }}
      />,
    );

    expect(
      screen.getByTestId('secondary-column-placeholder'),
    ).toBeInTheDocument();
  });
});
