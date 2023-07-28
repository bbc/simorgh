import { runCommonCrossPlatformTests, runMostReadTests } from '../../common';

export default service => {
  runCommonCrossPlatformTests(service);
  runMostReadTests();

  it('I can see the headline', () => {
    const h1El = document.querySelector('h1');

    expect(h1El).toBeInTheDocument();
    expect(h1El.textContent).toBeTruthy();
    expect(h1El.textContent).toMatchSnapshot();
  });

  it('I can see the list items', () => {
    const listItemElements = document.querySelectorAll('main ol li');

    listItemElements.forEach(itemEl => {
      expect(itemEl).toBeInTheDocument();
      expect(itemEl.textContent).toBeTruthy();
      expect(itemEl.textContent).toMatchSnapshot();
    });
  });
};
