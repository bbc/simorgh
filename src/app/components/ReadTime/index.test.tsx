import { render } from '#app/components/react-testing-library-with-providers';
import { ServiceContext } from '#app/contexts/ServiceContext';
import type { Services } from '#app/models/types/global';
import type { ServiceConfig } from '#app/models/types/serviceConfig';
import * as viewTracking from '../../hooks/useViewTracker';
import ReadTimeArticle from '.';

const ReadTimeWithContext = ({
  readTimeValue,
  contextStub,
}: {
  readTimeValue: number;
  contextStub: ServiceConfig;
}) =>
  render(
    <ServiceContext.Provider value={contextStub}>
      <ReadTimeArticle readTimeValue={readTimeValue} />
    </ServiceContext.Provider>,
  );

const generateServiceContextStub = (
  service: Services,
  {
    translations: {
      readTime = { minute: 'mins', readTimePrefix: 'Read' },
    } = {},
  } = {},
  datetimeLocale = '',
) => ({ datetimeLocale, service, translations: { readTime } }) as ServiceConfig;

describe('ReadTime', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('formatting behaviour', () => {
    it(`should format with 'minutes' before number for specific services`, () => {
      const { getByText } = ReadTimeWithContext({
        readTimeValue: 5,
        contextStub: generateServiceContextStub('hausa'),
      });

      expect(getByText('Read: mins 5')).toBeInTheDocument();
    });

    it(`should format with 'minutes' before number and no colon for specific services`, () => {
      const { getByText } = ReadTimeWithContext({
        readTimeValue: 2,
        contextStub: generateServiceContextStub('igbo'),
      });

      expect(getByText('Read mins 2')).toBeInTheDocument();
    });

    it(`should format with 'minutes' after number`, () => {
      const { getByText } = ReadTimeWithContext({
        readTimeValue: 7,
        contextStub: generateServiceContextStub('news'),
      });

      expect(getByText('Read: 7 mins')).toBeInTheDocument();
    });

    it.each([
      {
        readTimeValue: 3,
        serviceName: 'persian',
        serviceConfig: {
          translations: {
            readTime: {
              readTimePrefix: 'زمان مطالعه',
              minute: 'دقیقه',
            },
          },
        },
        locale: 'fa',
        expectedReadTime: 'زمان مطالعه: ۳ دقیقه',
      },
      {
        readTimeValue: 5,
        serviceName: 'dari',
        serviceConfig: {
          translations: {
            readTime: {
              readTimePrefix: 'زمان مطالعه',
              minute: 'دقیقه',
            },
          },
        },
        locale: 'fa-af',
        expectedReadTime: 'زمان مطالعه: ۵ دقیقه',
      },
      {
        readTimeValue: 7,
        serviceName: 'pashto',
        serviceConfig: {
          translations: {
            readTime: {
              readTimePrefix: 'د لوستلو وخت',
              minute: 'دقیقې',
            },
          },
        },
        locale: 'ps',
        expectedReadTime: 'د لوستلو وخت: ۷ دقیقې',
      },
      {
        readTimeValue: 9,
        serviceName: 'bengali',
        serviceConfig: {
          translations: {
            readTime: {
              readTimePrefix: 'পড়ার সময়',
              minute: 'মিনিট',
            },
          },
        },
        locale: 'bn',
        expectedReadTime: 'পড়ার সময়: ৯ মিনিট',
      },
    ])('should format the read time to its localized $serviceName version', ({
      readTimeValue,
      serviceName,
      serviceConfig,
      locale,
      expectedReadTime,
    }) => {
      const { getByText } = ReadTimeWithContext({
        readTimeValue,
        contextStub: generateServiceContextStub(
          serviceName as Services,
          serviceConfig,
          locale,
        ),
      });

      expect(getByText(expectedReadTime)).toBeInTheDocument();
    });

    it('should not render when translations are missing', () => {
      const { queryByTestId } = ReadTimeWithContext({
        readTimeValue: 3,
        contextStub: generateServiceContextStub('pidgin', {
          translations: { readTime: { readTimePrefix: '', minute: '' } },
        }),
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
