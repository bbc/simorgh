import runCoreTests from '../../common/core.canonical';
import runAnalyticsTests from '../../common/analytics.canonical';

runCoreTests();
runAnalyticsTests();

it('Media Player Title', () => {
  const mediaPlayerIFrame = document.querySelector(`iframe`);

  expect(mediaPlayerIFrame).toBeInTheDocument();
  expect(mediaPlayerIFrame.getAttribute('title')).toMatchInlineSnapshot();
});

it('Media Player Embed URL', () => {
  const mediaPlayerIFrame = document.querySelector(`iframe`);

  expect(mediaPlayerIFrame).toBeInTheDocument();
  expect(mediaPlayerIFrame.getAttribute('src')).toMatchInlineSnapshot();
});
