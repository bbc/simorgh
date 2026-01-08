import { render } from '#app/components/react-testing-library-with-providers';
import * as viewTracking from '../../hooks/useViewTracker';
import ReadTimeArticle from '.';

describe('ReadTime', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe('On Article Page', () => {
    it('should render when readTime is supplied', () => {
      const { getByTestId } = render(<ReadTimeArticle readTimeValue={4} />, {
        service: 'pidgin',
      });
      const readTime = getByTestId('read-time');
      expect(readTime).toBeInTheDocument();
    });
    describe('view tracking', () => {
      const viewTrackerSpy = jest.spyOn(viewTracking, 'default');

      it('should register view tracker', () => {
        render(<ReadTimeArticle readTimeValue={4} />, {
          service: 'pidgin',
        });

        const expected = {
          componentName: 'read-time-on-article',
          itemTracker: {
            duration: 240000,
            label: 'Read time: 4 min',
            type: 'read-time',
          },
        };

        expect(viewTrackerSpy).toHaveBeenCalledWith(expected);
      });
    });
  });
});
