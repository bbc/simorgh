import runCoreTests from '../../common/core.canonical';
import runAnalyticsTests from '../../common/analytics.canonical';

runCoreTests();
runAnalyticsTests();

it('Audio Player Title', () => {
  const audioPlayerIframe = document.querySelector('iframe');

  expect(audioPlayerIframe).toBeInTheDocument();
  expect(audioPlayerIframe.getAttribute('title')).toMatchInlineSnapshot();
});

it('Audio Player Embed URL', () => {
  const audioPlayerIframe = document.querySelector('iframe');

  expect(audioPlayerIframe).toBeInTheDocument();
  expect(audioPlayerIframe.getAttribute('src')).toMatchInlineSnapshot();
});
