import { runCommonCrossPlatformTests } from '../../common';

export default () => {
  runCommonCrossPlatformTests();

  it('I can see at least one section', () => {
    const sect = document.querySelector('section');

    expect(sect).toBeInTheDocument();
  });

  it('I can see Index Alsos', () => {
    const serviceHasIndexAlsos = service === 'thai';

    if (serviceHasIndexAlsos) {
      const topStories = document.querySelector(
        '[aria-labelledby="Top-stories"]',
      );

      if (topStories) {
        const indexAlsos = topStories.querySelector('[data-e2e=index-alsos]');

        if (indexAlsos) {
          const h4 = indexAlsos.querySelector('h4');
          expect(h4.textContent).toEqual('อ่านข่าวนี้เพิ่มเติม');
        }
      }
    }
  });

  it('I can see Useful Links', () => {
    const usefulLinks = document.querySelector('[data-e2e=useful-links]');

    if (usefulLinks) {
      const links = usefulLinks.querySelectorAll('a');

      links.forEach(linkEl => {
        expect(linkEl).toBeInTheDocument();
        expect(linkEl.textContent).toBeTruthy();
        expect(linkEl.textContent).toMatchSnapshot();
      });
    }
  });
};
