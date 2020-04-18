import { runCoreAmpTests, runAmpAnalyticsTests } from '../../common';

export default () => {
  runCoreAmpTests();
  runAmpAnalyticsTests();

  describe('Media Player -', () => {
    it('I can see the placeholder image', () => {
      const audioPlaceholderImage = document.querySelector(
        'amp-img[src="http://localhost:7080/images/amp_audio_placeholder.png"]',
      );

      expect(audioPlaceholderImage).toBeInTheDocument();
      expect(audioPlaceholderImage.getAttribute('src')).toMatchSnapshot();
    });
  });
};
