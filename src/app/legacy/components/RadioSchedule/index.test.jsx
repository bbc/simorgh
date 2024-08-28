import { render } from '#components/react-testing-library-with-providers';
import arabic from '#components/ThemeProvider/fontScripts/arabic';
import latin from '#components/ThemeProvider/fontScripts/latin';
import { renderRadioSchedule } from './testHelpers/helper';
import * as viewTracking from '../../../hooks/useViewTracker';
import * as clickTracking from '../../../hooks/useClickTrackerHandler';

describe('RadioSchedule', () => {
  it('should render ltr radio schedules correctly', () => {
    const { container } = render(renderRadioSchedule({}));
    expect(container).toMatchSnapshot();
  });

  it('should render rtl radio schedules correctly', () => {
    const { container } = render(
      renderRadioSchedule({
        service: 'arabic',
        script: arabic,
        dir: 'rtl',
        locale: 'ar',
        selectedService: 'arabic',
      }),
      { service: 'arabic' },
    );
    expect(container).toMatchSnapshot();
  });

  it('should render with passed component', () => {
    const { container } = render(
      renderRadioSchedule({
        linkComponent: 'aside',
        linkComponentAttr: 'to',
      }),
    );
    expect(
      container.getElementsByTagName('aside')[0].getAttribute('to'),
    ).toEqual('/news/articles/cn7k01xp8kxo');
  });

  describe('Event Tracking', () => {
    const eventTrackingData = {
      componentName: 'radio-schedule',
    };

    it('should call the view tracking hook with the correct params', () => {
      const viewTrackerSpy = jest.spyOn(viewTracking, 'default');
      render(
        renderRadioSchedule({
          service: 'hausa',
          script: latin,
          dir: 'ltr',
          locale: 'ha',
          selectedService: 'hausa',
        }),
      );

      expect(viewTrackerSpy).toHaveBeenCalledWith(eventTrackingData);
    });

    it('should call the click tracking hook with the correct params', () => {
      const clickTrackerSpy = jest.spyOn(clickTracking, 'default');
      render(
        renderRadioSchedule({
          service: 'hausa',
          script: latin,
          dir: 'ltr',
          locale: 'ha',
          selectedService: 'hausa',
        }),
      );

      expect(clickTrackerSpy).toHaveBeenNthCalledWith(1, {
        componentName: 'radio-schedule-live',
      });
      expect(clickTrackerSpy).toHaveBeenNthCalledWith(2, {
        componentName: 'radio-schedule-onDemand',
      });
    });
  });
});
