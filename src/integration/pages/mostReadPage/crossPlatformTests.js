import getTextContent from '../../utils/getTextContent';
import { runCommonCrossPlatformTests } from '../../common';

export default service => {
  runCommonCrossPlatformTests(service);

  it('I can see the headline', () => {
    const h1El = document.querySelector('h1');

    expect(h1El).toBeInTheDocument();
    expect(getTextContent(h1El)).toBeTruthy();
    expect(getTextContent(h1El)).toMatchSnapshot();
  });

  it('I can see the list items', () => {
    const listItemElements = document.querySelectorAll('main ol li');

    listItemElements.forEach(itemEl => {
      expect(itemEl).toBeInTheDocument();
      expect(getTextContent(itemEl)).toBeTruthy();
      expect(getTextContent(itemEl)).toMatchSnapshot();
    });
  });
};
