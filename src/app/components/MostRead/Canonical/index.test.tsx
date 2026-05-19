import type { EventTrackingData } from '#app/lib/analyticsUtils/types';
import { data as arabicMostReadData } from '../../../../../data/arabic/mostRead/index.json';
import { data as pidginMostReadData } from '../../../../../data/pidgin/mostRead/index.json';
import { data as kyrgyzMostReadData } from '../../../../../data/kyrgyz/mostRead/index.json';
import { data as ukrainianMostReadData } from '../../../../../data/ukrainian/mostRead/index.json';
import { ToggleContextProvider } from '../../../contexts/ToggleContext';
import * as viewTracking from '../../../hooks/useViewTracker';
import * as clickTracking from '../../../hooks/useClickTrackerHandler';
import { render } from '../../react-testing-library-with-providers';
import { ServiceContextProvider } from '../../../contexts/ServiceContext';
import CanonicalMostRead from '.';
import type { Services } from '../../../models/types/global';
import type { MostReadData } from '../types';
import {
  setFreshPromoTimestamp,
  setStalePromoTimestamp,
} from '../utilities/testHelpers';

interface MostReadCanonicalProps {
  service: Services;
  data: MostReadData;
  eventTrackingData?: {
    componentName: string;
  };
  pageLang?: string;
}

const MostReadCanonicalWithContext = ({
  service,
  data,
  eventTrackingData,
  pageLang = '',
}: MostReadCanonicalProps) => (
  <ServiceContextProvider service={service} pageLang={pageLang}>
    <ToggleContextProvider
      toggles={{
        eventTracking: { enabled: true },
      }}
    >
      <CanonicalMostRead
        data={data}
        eventTrackingData={eventTrackingData}
        size="default"
      />
    </ToggleContextProvider>
  </ServiceContextProvider>
);

describe('MostRead Canonical', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the live label only for items with isLive: true', () => {
    const testData = {
      items: [
        {
          id: '1',
          rank: 1,
          title: 'Live News',
          href: '/news/live',
          isLive: true,
          timestamp: 1686821815000,
        },
        {
          id: '2',
          rank: 2,
          title: 'Ancient News',
          href: '/news/ancient',
          timestamp: 1686821815001,
        },
      ],
      lastRecordTimeStamp: '2026-05-03T14:42:00Z',
      firstRecordTimeStamp: '2026-05-03T14:27:00Z',
      generated: '2026-05-03T14:44:35.496Z',
    };

    const { container } = render(
      <MostReadCanonicalWithContext service="pidgin" data={testData} />,
    );

    const items = container.querySelectorAll('li');
    // First item should have the live label
    expect(
      items[0].querySelector('[data-e2e="most-read-live-pulse"]'),
    ).toBeInTheDocument();
    // Second item should not have the live label
    expect(
      items[1].querySelector('[data-e2e="most-read-live-pulse"]'),
    ).toBeNull();
  });

  [
    {
      description: 'should render 10 list items for arabic from fetched data',
      service: 'arabic',
      numberOfItems: 10,
      mostReadData: arabicMostReadData,
    },
    {
      description: 'should render 5 list items for kyrgyz from fetched data',
      service: 'kyrgyz',
      numberOfItems: 5,
      mostReadData: kyrgyzMostReadData,
    },
  ].forEach(({ description, service, numberOfItems, mostReadData }) => {
    it(description, async () => {
      const { container } = render(
        <MostReadCanonicalWithContext
          service={service as Services}
          data={mostReadData}
        />,
      );

      expect(container.querySelectorAll('li a').length).toEqual(numberOfItems);
    });
  });

  [
    {
      service: 'pidgin',
      expectedTime: 'De one we dem update for: 11th January 1970',
      mostReadData: pidginMostReadData,
    },
    {
      service: 'arabic',
      expectedTime: 'آخر تحديث 11 يناير/ كانون الثاني 1970',
      mostReadData: arabicMostReadData,
    },
  ].forEach(({ service, expectedTime, mostReadData }) => {
    it(`should render last updated ${service} when promo timestamp is stale`, async () => {
      const { container } = render(
        <MostReadCanonicalWithContext
          service={service as Services}
          data={setStalePromoTimestamp(mostReadData)}
        />,
      );

      expect(container.querySelectorAll('time')[0].textContent).toEqual(
        expectedTime,
      );
    });
  });

  [
    {
      service: 'pidgin',
      mostReadData: pidginMostReadData,
    },
    {
      service: 'arabic',
      mostReadData: arabicMostReadData,
    },
  ].forEach(({ service, mostReadData }) => {
    it(`should not render last updated for ${service} when promo timestamp is fresh`, async () => {
      const { container } = render(
        <MostReadCanonicalWithContext
          service={service as Services}
          data={setFreshPromoTimestamp(mostReadData)}
        />,
      );

      expect(container.querySelectorAll('time').length).toEqual(0);
    });
  });

  it(`should render ukrainian in russian most read with an overridden datetime locale`, async () => {
    const { container } = render(
      <MostReadCanonicalWithContext
        service="ukrainian"
        pageLang="ru"
        data={setStalePromoTimestamp(ukrainianMostReadData)}
      />,
    );

    expect(container.querySelectorAll('time')[0].textContent).toEqual(
      'Останнє оновлення: 11 січня 1970',
    );
  });

  describe('Event Tracking', () => {
    it('should call the view tracking hook with the correct params', () => {
      const viewTrackerSpy = jest.spyOn(viewTracking, 'default');

      render(
        <MostReadCanonicalWithContext
          service="pidgin"
          data={pidginMostReadData}
          eventTrackingData={{ componentName: 'most-read' }}
        />,
      );
      expect(viewTrackerSpy).toHaveBeenCalled();

      const calls: EventTrackingData[] = viewTrackerSpy.mock.calls.map(
        ([arg]) => arg as EventTrackingData,
      );

      const hasValidCall = calls.some(
        call =>
          call?.componentName === 'most-read' &&
          (call?.groupTracker === undefined ||
            typeof call.groupTracker === 'object'),
      );

      expect(hasValidCall).toBe(true);
    });

    it('should call the click tracking hook with enriched item params', () => {
      const clickTrackerSpy = jest.spyOn(clickTracking, 'default');

      const { container } = render(
        <MostReadCanonicalWithContext
          service="pidgin"
          data={pidginMostReadData}
          eventTrackingData={{ componentName: 'most-read' }}
        />,
      );

      const linkCount = container.querySelectorAll('li a').length;

      // strict mode in tests may double-invoke renders
      expect(clickTrackerSpy.mock.calls.length).toBeGreaterThanOrEqual(
        linkCount,
      );

      // type the argument so TS knows componentName/itemTracker exist
      const calls: EventTrackingData[] = clickTrackerSpy.mock.calls.map(
        ([arg]) => arg as EventTrackingData,
      );

      // check we have one valid payload per expected position (1..linkCount)
      Array.from({ length: linkCount }, (_, i) => i + 1).forEach(position => {
        const match = calls.some(
          call =>
            call?.componentName === 'most-read' &&
            call?.itemTracker?.type === 'most-read-promo' &&
            call?.itemTracker?.position === position &&
            typeof call?.itemTracker?.text === 'string' &&
            typeof call?.itemTracker?.resourceId === 'string',
        );
        expect(match).toBe(true);
      });
    });
  });
});
