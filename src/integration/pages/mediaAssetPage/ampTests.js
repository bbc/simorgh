import { runCoreAmpTests, runAmpAnalyticsTests } from '../../common';

export default () => {
  runCoreAmpTests();
  runAmpAnalyticsTests();

  it('I can see the media player placeholder image', () => {
    const placeholderImage = document.querySelector(`amp-img`);

    expect(placeholderImage).toBeInTheDocument();
    expect(placeholderImage.getAttribute('src')).toMatchSnapshot();
  });
};
