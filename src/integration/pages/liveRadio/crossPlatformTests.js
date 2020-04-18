import { runCommonCrossPlatformTests, runMediaPlayerTests } from '../../common';

export default () => {
  runCommonCrossPlatformTests();
  runMediaPlayerTests();

  it('I can see the headline', () => {
    const h1El = document.querySelector('h1');

    expect(h1El).toBeInTheDocument();
    expect(h1El).toBeTruthy();
    expect(h1El.textContent).toMatchInlineSnapshot(`"BBC 코리아 라디오"`);
  });

  it('I can see the summary', () => {
    const summaryEl = document.querySelector('main p');

    expect(summaryEl).toBeInTheDocument();
    expect(summaryEl).toBeTruthy();
    expect(summaryEl.textContent).toMatchInlineSnapshot(
      `"세계와 한반도 뉴스를 공정하고 객관적으로 전달해 드립니다"`,
    );
  });

  it('I can see the audio player embed', () => {
    const audioPlayerIframe = document.querySelector('iframe, amp-iframe');

    expect(audioPlayerIframe.getAttribute('src')).toMatchInlineSnapshot(
      `"https://polling.test.bbc.co.uk/ws/av-embeds/media/bbc_korean_radio/liveradio/ko"`,
    );
  });
};
