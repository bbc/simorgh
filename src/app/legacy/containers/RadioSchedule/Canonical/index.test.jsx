import arabicRadioScheduleData from '#data/arabic/bbc_arabic_radio/schedule.json';
import { RequestContextProvider } from '#contexts/RequestContext';
import { HOME_PAGE } from '#app/routes/utils/pageTypes';
import {
  render,
  act,
} from '../../../../components/react-testing-library-with-providers';
import { ServiceContextProvider } from '../../../../contexts/ServiceContext';
import RadioSchedule from '.';
import processRadioSchedule from '../utilities/processRadioSchedule';

const timeOnServer = Date.parse('2020-03-26T12:00:00Z');

const RadioScheduleWithContext = ({ radioSchedule, lang }) => (
  <RequestContextProvider
    isAmp={false}
    pageType={HOME_PAGE}
    service="arabic"
    pathname="/arabic"
    timeOnServer={timeOnServer}
  >
    <ServiceContextProvider service="arabic">
      <RadioSchedule radioSchedule={radioSchedule} lang={lang} />
    </ServiceContextProvider>
  </RequestContextProvider>
);

describe('RadioSchedule', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('With initial data', () => {
    it('renders correctly for a service', async () => {
      const initialData = processRadioSchedule(
        arabicRadioScheduleData,
        'arabic',
        timeOnServer,
      );
      let container;
      await act(async () => {
        container = render(
          <RadioScheduleWithContext radioSchedule={initialData} />,
          { service: 'arabic' },
        ).container;
      });
      expect(container.querySelectorAll('li').length).toEqual(4);
    });

    it('contains four programs for a service with a radio schedule', async () => {
      const initialData = processRadioSchedule(
        arabicRadioScheduleData,
        'arabic',
        timeOnServer,
      );
      let container;

      await act(async () => {
        container = render(
          <RadioScheduleWithContext radioSchedule={initialData} />,
          { service: 'arabic' },
        ).container;
      });
      expect(container.querySelectorAll('li').length).toEqual(4);
    });

    it('does not render when data contains less than 4 programs', async () => {
      const radioSchedule2Programmes = { ...arabicRadioScheduleData };
      radioSchedule2Programmes.schedules =
        radioSchedule2Programmes.schedules.slice(0, 2);

      const initialData = processRadioSchedule(
        radioSchedule2Programmes,
        'arabic',
        timeOnServer,
      );

      jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        json: async () => radioSchedule2Programmes,
      });

      let container;

      await act(async () => {
        container = render(
          <RadioScheduleWithContext initialData={initialData} />,
          { service: 'arabic' },
        ).container;
      });
      expect(container).toBeEmptyDOMElement();
    });

    it('does not render when data contains no programs', async () => {
      jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        json: async () => [],
      });
      const initialData = processRadioSchedule(
        { schedules: [] },
        'arabic',
        timeOnServer,
      );
      let container;

      await act(async () => {
        container = render(
          <RadioScheduleWithContext initialData={initialData} />,
          { service: 'arabic' },
        ).container;
      });
      expect(container).toBeEmptyDOMElement();
    });
  });
});
