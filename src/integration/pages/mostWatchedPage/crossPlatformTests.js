import getTextContent from '../../utils/getTextContent';
import { runCommonCrossPlatformTests, runMainHeadingTests } from '../../common';

export default service => {
  runCommonCrossPlatformTests(service);
  runMainHeadingTests();

  it('I can see the list items', () => {
    const listItemElements = document.querySelectorAll('main ol li');

    listItemElements.forEach(itemEl => {
      expect(itemEl).toBeInTheDocument();
      expect(getTextContent(itemEl)).toBeTruthy();
      expect(getTextContent(itemEl)).toMatchSnapshot();
    });
  });
};
