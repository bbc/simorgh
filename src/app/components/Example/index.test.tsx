import {
  act,
  render,
} from '#app/components/react-testing-library-with-providers';
import HelloWorld from '.';

jest.useFakeTimers();

describe('Example', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Should format text correctly', () => {
    it.each([
      { text: 'Hello World' },
      { text: 'Goodbye World' },
      { text: 'Good Evening World' },
    ])(`should render the service and the text $text`, async ({ text }) => {
      const { container } = await act(async () => {
        return render(<HelloWorld textToRender={text} renderAfter={1000} />, {
          service: 'pidgin',
        });
      });

      act(() => {
        jest.runAllTimers();
      });

      const resultingHeading = container.querySelector('h2');
      const resultingText = container.querySelector('span');

      expect(resultingHeading?.innerHTML).toBe('You are on pidgin');
      expect(resultingText?.innerHTML).toBe(text);
    });
  });
});
