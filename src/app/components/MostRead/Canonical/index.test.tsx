import React from 'react';
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
import { Services } from '../../../models/types/global';
import { MostReadData } from '../types';
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
    const blockLevelEventTrackingData = {
      componentName: 'most-read',
    };

    it('should call the view tracking hook with the correct params', () => {
      const viewTrackerSpy = jest.spyOn(viewTracking, 'default');
      render(
        <MostReadCanonicalWithContext
          service="pidgin"
          data={pidginMostReadData}
          eventTrackingData={blockLevelEventTrackingData}
        />,
      );

      expect(viewTrackerSpy).toHaveBeenCalledWith(blockLevelEventTrackingData);
    });

    it('should call the click tracking hook with the correct params', () => {
      const clickTrackerSpy = jest.spyOn(clickTracking, 'default');
      render(
        <MostReadCanonicalWithContext
          service="pidgin"
          data={pidginMostReadData}
          eventTrackingData={blockLevelEventTrackingData}
        />,
      );

      expect(clickTrackerSpy).toHaveBeenCalledWith(blockLevelEventTrackingData);
    });
  });
});
