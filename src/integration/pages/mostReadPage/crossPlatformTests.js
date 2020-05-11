import { runCommonCrossPlatformTests } from '../../common';

export default () => {
  runCommonCrossPlatformTests();

  it('I can see the headline', () => {
    const h1El = document.querySelector('h1');

    expect(h1El).toBeInTheDocument();
    expect(h1El).toBeTruthy();
    expect(h1El.textContent).toMatchSnapshot();
  });

  it('I can see the list items', () => {
    const listItemElements = document.querySelectorAll('main ol li');

    listItemtElements.forEach(itemEl => {
      expect(itemEl).toBeInTheDocument();
      expect(itemEl).toBeTruthy();
      expect(itemEl.textContent).toMatchSnapshot();
    });
  });
};
