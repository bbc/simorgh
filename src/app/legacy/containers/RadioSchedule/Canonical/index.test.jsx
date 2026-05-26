import { HOME_PAGE } from '#app/routes/utils/pageTypes';
import { RequestContextProvider } from '#contexts/RequestContext';
import arabicRadioScheduleData from '#data/arabic/bbc_arabic_radio/schedule.json';
import {
  act,
  render,
} from '../../../../components/react-testing-library-with-providers';
import { ServiceContextProvider } from '../../../../contexts/ServiceContext';
import processRadioSchedule from '../utilities/processRadioSchedule';
import RadioSchedule from '.';

const RadioScheduleWithContext = ({ radioSchedule, lang }) => (
  <RequestContextProvider
    isAmp={false}
    pageType={HOME_PAGE}
    service="arabic"
    pathname="/arabic"
    timeOnServer={Date.now()}
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
        Date.now(),
      );
      let container;
      await act(async () => {
        container = render(
          <RadioScheduleWithContext radioSchedule={initialData} />,
          { service: 'arabic' },
        ).container;
      });
      expect(container).toMatchSnapshot();
    });

    it('contains four programs for a service with a radio schedule', async () => {
      const initialData = processRadioSchedule(
        arabicRadioScheduleData,
        'arabic',
        Date.now(),
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
        Date.now(),
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
        Date.now(),
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
