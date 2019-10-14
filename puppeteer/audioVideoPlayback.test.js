import puppeteer from 'puppeteer';

// Example article asset for testing
const audioVideoUrl = 'https://www.test.bbc.co.uk/news/articles/cn7k01xp8kxo';

// Increase default timeout for all hooks/tests from 5s to 30s
jest.setTimeout(30000);

describe('Audio/video playback', () => {
  let browser;
  let page;
  let smpContentFrame;

  beforeAll(async () => {
    // Fail fast if path to Chrome not supplied
    expect(process.env.CHROME_EXECUTABLE_PATH).toBeDefined();

    // Use system installed Chrome instead of Chromium bundled with puppeteer
    browser = await puppeteer.launch({
      headless: false,
      executablePath: process.env.CHROME_EXECUTABLE_PATH,
    });
  });

  beforeEach(async () => {
    page = await browser.newPage();

    // Affects goto, reload, etc. - takes priority over one below
    page.setDefaultNavigationTimeout(20000); // 20s

    // Affects above but also waitFor* methods
    page.setDefaultTimeout(15000); // 15s

    await page.setViewport({ width: 1280, height: 800 });

    // Wait for no more than 0 network connections for at least 500 ms
    await page.goto(audioVideoUrl, { waitUntil: 'networkidle0' });

    const videoContainer = await page.$('div[class^="StyledVideoContainer"]');
    await videoContainer.click();

    // Again only finds first piece of media
    const avIframeSelector = 'iframe[class^="StyledIframe"]';
    const wsEmbedIframe = await page.waitForSelector(avIframeSelector);
    const wsEmbedContent = await wsEmbedIframe.contentFrame();

    // Question: should we use waitForNavigation at this point to defer till the iframe(s) have loaded?
    // https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#pagewaitfornavigationoptions

    // Is this ID stable?
    const smpSelector = 'iframe#smphtml5iframemediaPlayer';
    const smpIframe = await wsEmbedContent.waitForSelector(smpSelector);
    smpContentFrame = await smpIframe.contentFrame();
  });

  afterAll(async () => {
    await browser.close();
  });

  afterEach(async () => {
    await page.close();
  });

  // Question: do we want to have separate tests with common setup (easier to debug and more
  // isolated but slower to run because of repeated setup overhead) or one big test?
  test('displays guidance', async () => {
    const guidance = await smpContentFrame.waitForSelector('.p_guidanceText'); // Stable?
    const guidanceText = await guidance.evaluate(node => node.innerText);

    expect(guidanceText).toBe('Contains strong language and adult humour.');
  });

  test('displays subtitles', async () => {
    // NB on the test clip there is a miniumum 10s wait before the first subtitle appears
    const sub1 = await smpContentFrame.waitForSelector('#subtitle_sub1');
    const sub1text = await sub1.evaluate(node => node.innerText);

    expect(sub1text).toMatch(/^Ants and human societies/);
  });
});
