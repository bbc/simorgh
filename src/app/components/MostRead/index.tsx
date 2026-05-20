import { use } from 'react';

import type { EventTrackingData } from '#app/lib/analyticsUtils/types';
import { getEnvConfig } from '#app/lib/utilities/getEnvConfig';
import { getMostReadEndpoint } from '#app/lib/utilities/getUrlHelpers/getMostReadUrls';
import { RequestContext } from '#contexts/RequestContext';
import useToggle from '#hooks/useToggle';
import { ServiceContext } from '../../contexts/ServiceContext';
import isLocal from '../../lib/utilities/isLocal';
import type {
  ComponentExperimentProps,
  PageTypes,
} from '../../models/types/global';
import {
  ARTICLE_PAGE,
  CORRESPONDENT_STORY_PAGE,
  STORY_PAGE,
} from '../../routes/utils/pageTypes';
import { WHITE } from '../ThemeProvider/palette';
import Amp from './Amp';
import Canonical from './Canonical';
import MostReadSectionLabel from './Label';
import MostReadSection from './Section';
import type { ColumnLayout, MostReadData, Size } from './types';

const mostReadAmpPageTypes: PageTypes[] = [
  STORY_PAGE,
  CORRESPONDENT_STORY_PAGE,
  ARTICLE_PAGE,
];

interface MostReadProps {
  showSectionLabel?: boolean;
  data?: MostReadData;
  columnLayout?: ColumnLayout;
  size?: Size;
  mobileDivider?: boolean;
  headingBackgroundColour?: string;
  className?: string;
  eventTrackingData?: EventTrackingData;
  experimentProps?: ComponentExperimentProps;
}

// We render amp on ONLY STY, CSP and ARTICLE pages using amp-list.
const AmpMostRead = ({
  pageType,
  className,
  mobileDivider,
  headingBackgroundColour,
  endpoint,
  size,
  showSectionLabel,
}: {
  pageType: PageTypes;
  className: string;
  mobileDivider: boolean;
  headingBackgroundColour: string;
  endpoint: string;
  size: Size;
  showSectionLabel: boolean;
}) =>
  mostReadAmpPageTypes.includes(pageType) ? (
    <MostReadSection {...(className ? { className } : undefined)}>
      {showSectionLabel && (
        <MostReadSectionLabel
          mobileDivider={mobileDivider}
          backgroundColor={headingBackgroundColour}
        />
      )}
      <Amp
        endpoint={`${getEnvConfig().SIMORGH_MOST_READ_CDN_URL}${endpoint}`}
        size={size}
      />
    </MostReadSection>
  ) : null;

// Do not render on Canonical if data is not provided
const CanonicalMostRead = ({
  data,
  className,
  mobileDivider,
  headingBackgroundColour,
  columnLayout,
  size,
  eventTrackingData,
  showSectionLabel,
}: {
  data: MostReadData | undefined;
  className: string;
  mobileDivider: boolean;
  headingBackgroundColour: string;
  showSectionLabel: boolean;
  size: Size;
  columnLayout?: ColumnLayout;
  eventTrackingData?: EventTrackingData;
}) =>
  data ? (
    <MostReadSection className={className} showSectionLabel={showSectionLabel}>
      {showSectionLabel && (
        <MostReadSectionLabel
          mobileDivider={mobileDivider}
          backgroundColor={headingBackgroundColour}
        />
      )}
      <Canonical
        data={data}
        columnLayout={columnLayout}
        size={size}
        eventTrackingData={eventTrackingData}
      />
    </MostReadSection>
  ) : null;

const MostRead = ({
  showSectionLabel = true,
  data,
  columnLayout = 'multiColumn',
  size = 'default',
  mobileDivider = false,
  headingBackgroundColour = WHITE,
  className = '',
  experimentProps,
  eventTrackingData,
}: MostReadProps) => {
  const { isAmp, pageType, variant } = use(RequestContext);
  const {
    service,
    mostRead: { hasMostRead },
  } = use(ServiceContext);

  const { enabled } = useToggle('mostRead');

  const mostReadToggleEnabled = enabled && hasMostRead;

  // Do not render most read when a toggle is disabled
  if (!mostReadToggleEnabled) {
    return null;
  }

  // If not in local environment, use the BFF, otherwise use fixture data
  const isBff = !isLocal();

  const endpoint = getMostReadEndpoint({
    service,
    variant,
    isBff,
  });

  const trackingData = eventTrackingData || {
    componentName: 'most-read',
    ...(experimentProps && experimentProps),
  };

  return isAmp ? (
    <AmpMostRead
      showSectionLabel={showSectionLabel}
      pageType={pageType}
      className={className}
      mobileDivider={mobileDivider}
      headingBackgroundColour={headingBackgroundColour}
      endpoint={endpoint}
      size={size}
    />
  ) : (
    <CanonicalMostRead
      showSectionLabel={showSectionLabel}
      data={data}
      className={className}
      mobileDivider={mobileDivider}
      headingBackgroundColour={headingBackgroundColour}
      columnLayout={columnLayout}
      size={size}
      eventTrackingData={trackingData}
    />
  );
};

export default MostRead;
