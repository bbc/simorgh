import userEvent from '@testing-library/user-event';
import { render, screen } from '../react-testing-library-with-providers';
import ActionTooltip from '.';
import getArticleTooltipContent from './ArticleTooltipContent';

const onClose = jest.fn();

const mockTranslations = {
  success: {
    titleBefore: 'This article is now saved to',
    titleAfter: '',
  },
  error: {
    title: 'Sorry, something went wrong',
    body: 'Check your connection, refresh the page and try again',
  },
  removed: {
    titleBefore: 'This article has now been removed from',
    titleAfter: '',
  },
  myNewsLinkText: 'My News',
  myNewsUrl: 'https://www.bbc.com/hindi/my-news',
};

const content = getArticleTooltipContent(mockTranslations);
const closeLabel = 'Close';

describe('ActionTooltip', () => {
  beforeEach(() => jest.clearAllMocks());

  it('renders the success title with a My News link', () => {
    render(
      <ActionTooltip
        status="success"
        content={content}
        closeLabel={closeLabel}
        onClose={onClose}
      />,
      { service: 'hindi' },
    );

    expect(
      screen.getByText(/This article is now saved to/i),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'My News' })).toHaveAttribute(
      'href',
      'https://www.bbc.com/hindi/my-news',
    );
    expect(
      screen.queryByText(/check your connection/i),
    ).not.toBeInTheDocument();
  });

  it('renders the error title and body without a link', () => {
    render(
      <ActionTooltip
        status="error"
        content={content}
        closeLabel={closeLabel}
        onClose={onClose}
      />,
      { service: 'hindi' },
    );

    expect(screen.getByText('Sorry, something went wrong')).toBeInTheDocument();
    expect(
      screen.getByText('Check your connection, refresh the page and try again'),
    ).toBeInTheDocument();
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('renders the removed title with a My News link', () => {
    render(
      <ActionTooltip
        status="removed"
        content={content}
        closeLabel={closeLabel}
        onClose={onClose}
      />,
      { service: 'hindi' },
    );

    expect(
      screen.getByText(/This article has now been removed from/i),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'My News' })).toBeInTheDocument();
    expect(
      screen.queryByText(/check your connection/i),
    ).not.toBeInTheDocument();
  });

  it('calls onClose when the close button is clicked', async () => {
    render(
      <ActionTooltip
        status="success"
        content={content}
        closeLabel={closeLabel}
        onClose={onClose}
      />,
      { service: 'hindi' },
    );

    await userEvent.click(screen.getByRole('button', { name: 'Close' }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('exposes the tooltip as a polite live region for assistive technology', () => {
    render(
      <ActionTooltip
        status="success"
        content={content}
        closeLabel={closeLabel}
        onClose={onClose}
      />,
      { service: 'hindi' },
    );

    const tooltip = screen.getByTestId('action-tooltip');

    expect(tooltip).toHaveAttribute('role', 'status');
    expect(tooltip).toHaveAttribute('aria-live', 'polite');
    expect(tooltip).toHaveAttribute('aria-atomic', 'true');
  });
});
