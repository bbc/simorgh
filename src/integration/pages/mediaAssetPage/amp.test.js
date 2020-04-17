import runCoreTests from '../../common/core.amp';
import runAnalyticsTests from '../../common/analytics.amp';

runCoreTests();
runAnalyticsTests();

it('Media Player Placeholder Image', () => {
  const placeholderImage = document.querySelector(`amp-img`);

  expect(placeholderImage).toBeInTheDocument();
  expect(placeholderImage.getAttribute('src')).toMatchInlineSnapshot();
});

it('Media Player Title', () => {
  const mediaPlayerIFrame = document.querySelector(`amp-iframe`);

  expect(mediaPlayerIFrame).toBeInTheDocument();
  expect(mediaPlayerIFrame.getAttribute('title')).toMatchInlineSnapshot();
});

it('Media Player Embed URL', () => {
  const mediaPlayerIFrame = document.querySelector(`amp-iframe`);

  expect(mediaPlayerIFrame).toBeInTheDocument();
  expect(mediaPlayerIFrame.getAttribute('src')).toMatchInlineSnapshot();
});
