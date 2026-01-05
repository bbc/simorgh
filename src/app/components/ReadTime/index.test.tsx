import { render } from '#app/components/react-testing-library-with-providers';
import { ServiceContext } from '#app/contexts/ServiceContext';
import * as viewTracking from '../../hooks/useViewTracker';
import ReadTimeArticle from '.';

const renderReadTime = ({ readTimeValue, service, translations }) => {
  const context = {};
  return render(
    <ServiceContext.Provider
      // @ts-expect-error require partial data for testing purposes
      value={{ service, translations, ...context }}
    >
      <ReadTimeArticle readTimeValue={readTimeValue} />
    </ServiceContext.Provider>,
  );
};

describe('ReadTime', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('formatting behaviour', () => {
    it('should format with minutes before number for specific services', () => {
      const { getByText } = renderReadTime({
        readTimeValue: 5,
        service: 'hausa',
        translations: {
          readTime: { minute: 'mins', readTimePrefix: 'Read' },
        },
      });

      expect(getByText('Read: mins 5')).toBeInTheDocument();
    });

    it('should format with minutes before number and no colon for specific services', () => {
      const { getByText } = renderReadTime({
        readTimeValue: 2,
        service: 'igbo',
        translations: {
          readTime: { minute: 'mins', readTimePrefix: 'Read' },
        },
      });

      expect(getByText('Read mins 2')).toBeInTheDocument();
    });

    it('should format with minutes after number', () => {
      const { getByText } = renderReadTime({
        readTimeValue: 7,
        service: 'news',
        translations: {
          readTime: { minute: 'mins', readTimePrefix: 'Read' },
        },
      });

      expect(getByText('Read: 7 mins')).toBeInTheDocument();
    });

    it('should not render when translations are missing', () => {
      const { queryByTestId } = renderReadTime({
        readTimeValue: 3,
        service: 'pidgin',
        translations: {
          readTime: { minute: undefined, readTimePrefix: undefined },
        },
      });
      expect(queryByTestId('read-time')).toBeNull();
    });
  });

  describe('view tracking', () => {
    const viewTrackerSpy = jest.spyOn(viewTracking, 'default');

    it('should register view tracker with correct duration', () => {
      render(<ReadTimeArticle readTimeValue={1} />);

      expect(viewTrackerSpy).toHaveBeenCalledWith({
        componentName: 'read-time-on-article',
        itemTracker: {
          duration: 60000,
          label: 'Read time: 1 min',
          type: 'read-time',
        },
      });
    });
  });
});
