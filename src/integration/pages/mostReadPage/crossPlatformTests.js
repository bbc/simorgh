import { runCommonCrossPlatformTests } from '../../common';

export default service => {
  runCommonCrossPlatformTests(service);

  it('I can see the headline', () => {
    const h1El = document.querySelector('h1');

    expect(h1El).toBeInTheDocument();
    expect(h1El.innerText).toBeTruthy();
    expect(h1El.innerText).toMatchSnapshot();
  });

  it('I can see the list items', () => {
    const listItemElements = document.querySelectorAll('main ol li');

    listItemElements.forEach(itemEl => {
      expect(itemEl).toBeInTheDocument();
      expect(itemEl.innerText).toBeTruthy();
      expect(itemEl.innerText).toMatchSnapshot();
    });
  });
};
