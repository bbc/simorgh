import '@testing-library/jest-dom/extend-expect';
import renderApp from './renderApp';
import { LIVE_RADIO_PATH } from './pathnames';

describe('Sighted user tests', () => {
  it('should render the headline', async () => {
    const app = await renderApp(LIVE_RADIO_PATH);
    const mainEl = document.querySelector('[role="main"]');
    const headlineEl = app.within(mainEl).getByText('BBC 코리아 라디오');

    expect(headlineEl).toBeInTheDocument();
  });

  it('should render the summary', async () => {
    const app = await renderApp(LIVE_RADIO_PATH);
    const mainEl = document.querySelector('[role="main"]');
    const summaryEl = app
      .within(mainEl)
      .getByText('세계와 한반도 뉴스를 공정하고 객관적으로 전달해 드립니다');

    expect(summaryEl).toBeInTheDocument();
  });

  it('should have footer copyright text', async () => {
    const app = await renderApp(LIVE_RADIO_PATH);
    const footerEl = document.querySelector('footer');
    const copyrightEl = app
      .within(footerEl)
      .getByTextSpecial(
        '© 2020 BBC. BBC는 외부 인터넷 사이트 및 콘텐츠에 대한 책임을 지지않습니다. 외부 콘텐츠 링크에 대한 본사 정책 보기.',
      );

    expect(copyrightEl).toBeInTheDocument();
  });
});

describe('a11y tests', () => {
  it('should have an H1 with the headline with the id="content"', async () => {
    await renderApp(LIVE_RADIO_PATH);
    const headlineId = document
      .querySelector('[role="main"] h1')
      .getAttribute('id');

    expect(headlineId).toEqual('content');
  });
});

describe('SEO tests', () => {
  it('should have an H1 with the headline', async () => {
    await renderApp(LIVE_RADIO_PATH);
    const headline = document.querySelector('[role="main"] h1');

    expect(headline.textContent).toEqual('BBC 코리아 라디오');
  });

  it('should have a title tag', async () => {
    await renderApp(LIVE_RADIO_PATH);
    const title = document.querySelector('head title');

    expect(title.textContent).toEqual('BBC 코리아 라디오 - BBC News 코리아');
  });
});
