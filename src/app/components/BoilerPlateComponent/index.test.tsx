import { render } from '#app/components/react-testing-library-with-providers';
import HelloWorld from '.';

describe('BoilerPlateComponent', () => {
  describe('formatting behaviour', () => {
    it.each([
      { text: 'Hello World' },
      { text: 'Goodbye World' },
      { text: 'Good Evevning World' },
    ])(`should render the service and the text $text`, ({ text }) => {
      const { container } = render(<HelloWorld textToRender={text} />, {
        service: 'pidgin',
      });

      const resultingHeading = container.querySelector('h2');
      const resultingText = container.querySelector('span');

      expect(resultingHeading?.innerHTML).toBe('You are on pidgin');
      expect(resultingText?.innerHTML).toBe(text);
    });
  });
});
