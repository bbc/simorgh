import '@testing-library/jest-dom/extend-expect';
import renderApp from './renderApp';
import { ARTICLE_PAGE_PATH } from './pathnames';
import { shouldHaveFooterBranding } from './common';

describe('Sighted user tests', () => {
  it('should render a H1, which contains/displays a styled headline', async () => {
    const { getByText } = await renderApp(ARTICLE_PAGE_PATH);
    const headlineEl = getByText(
      "Adams Oshiomhole say 'I still be APC National Chairman'",
    );

    expect(headlineEl).toBeInTheDocument();
  });

  shouldHaveFooterBranding({
    text: 'BBC News, Pidgin',
    link: '/pidgin',
    pathname: ARTICLE_PAGE_PATH,
  });
});
