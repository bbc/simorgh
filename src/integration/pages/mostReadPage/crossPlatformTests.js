import { runCommonCrossPlatformTests, runHeadlineTests } from '../../common';

export default () => {
  runCommonCrossPlatformTests();

  runHeadlineTests();

  describe('List items', () => {
    const listItemElements = document.querySelectorAll('main ol li');

    listItemElements.forEach(itemEl => {
      it('should be in the document', () => {
        expect(itemEl).toBeInTheDocument();
      });

      it('should have text', () => {
        expect(itemEl).toBeTruthy();
      });

      it('should match text', () => {
        expect(itemEl.textContent).toMatchSnapshot();
      });
    });
  });
};
