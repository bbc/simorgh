import { render } from '../../../components/react-testing-library-with-providers';
import { renderRadioSchedule } from './testHelpers/helper';
import * as viewTracking from '../../../hooks/useViewTracker';
import * as clickTracking from '../../../hooks/useClickTrackerHandler';

describe('RadioSchedule', () => {
  it('should render ltr radio schedules correctly', () => {
    const { container } = render(renderRadioSchedule({ service: 'news' }));
    expect(container).toMatchSnapshot();
  });

  it('should render rtl radio schedules correctly', () => {
    const { container } = render(
      renderRadioSchedule({
        service: 'arabic',
        dir: 'rtl',
        locale: 'ar',
      }),
      { service: 'arabic' },
    );
    expect(container).toMatchSnapshot();
  });

  it('should render with passed component', () => {
    const { container } = render(
      renderRadioSchedule({
        service: 'news',
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
      groupTracker: {
        itemCount: 4,
      },
    };

    it('should call the view tracking hook with the correct params', () => {
      const viewTrackerSpy = jest.spyOn(viewTracking, 'default');
      render(
        renderRadioSchedule({
          dir: 'ltr',
          locale: 'ha',
          service: 'hausa',
        }),
      );

      expect(viewTrackerSpy).toHaveBeenCalledWith(eventTrackingData);
    });

    it('should call the click tracking hook with the correct params', () => {
      const clickTrackerSpy = jest.spyOn(clickTracking, 'default');
      render(
        renderRadioSchedule({
          service: 'hausa',
          dir: 'ltr',
          locale: 'ha',
        }),
      );

      expect(clickTrackerSpy).toHaveBeenNthCalledWith(1, {
        componentName: 'radio-schedule',
        groupTracker: {
          itemCount: 4,
        },
        itemTracker: {
          duration: 3600000,
          mediaType: 'audio',
          position: 1,
          resourceId: 'p0',
          text: '27 August 2019',
          type: 'radio-schedule-live',
        },
      });
      expect(clickTrackerSpy).toHaveBeenNthCalledWith(2, {
        componentName: 'radio-schedule',
        groupTracker: {
          itemCount: 4,
        },
        itemTracker: {
          duration: 3600000,
          mediaType: 'audio',
          position: 2,
          resourceId: 'p1',
          text: '27 August 2019',
          type: 'radio-schedule-onDemand',
        },
      });
    });
  });
});
