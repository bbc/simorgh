import { runCoreAmpTests, runAmpAnalyticsTests } from '../../common';

export default () => {
  runCoreAmpTests();
  runAmpAnalyticsTests();

  describe('Media Player -', () => {
    it('I can see the placeholder image', () => {
      const placeholderImage = document.querySelector(`amp-img`);

      expect(placeholderImage).toBeInTheDocument();
      expect(placeholderImage.getAttribute('src')).toMatchSnapshot();
    });
  });
};
