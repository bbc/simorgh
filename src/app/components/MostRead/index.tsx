import React, { useContext } from 'react';
import { RequestContext } from '#contexts/RequestContext';
import useToggle from '#hooks/useToggle';
import { getMostReadEndpoint } from '#app/lib/utilities/getUrlHelpers/getMostReadUrls';
import { getEnvConfig } from '#app/lib/utilities/getEnvConfig';
import useOptimizelyVariation from '#app/hooks/useOptimizelyVariation';
import { ReactSDKClient } from '@optimizely/react-sdk';
import { ServiceContext } from '../../contexts/ServiceContext';
import Canonical from './Canonical';
import Amp from './Amp';
import { ColumnLayout, Size, MostReadData } from './types';
import MostReadSection from './Section';
import MostReadSectionLabel from './Label';
import { WHITE } from '../ThemeProvider/palette';
import isLocal from '../../lib/utilities/isLocal';
import {
  STORY_PAGE,
  CORRESPONDENT_STORY_PAGE,
  ARTICLE_PAGE,
} from '../../routes/utils/pageTypes';
import { PageTypes } from '../../models/types/global';

const blockLevelEventTrackingData = {
  componentName: 'most-read',
};

const mostReadAmpPageTypes: PageTypes[] = [
  STORY_PAGE,
  CORRESPONDENT_STORY_PAGE,
  ARTICLE_PAGE,
];

interface MostReadProps {
  data?: MostReadData;
  columnLayout?: ColumnLayout;
  size?: Size;
  mobileDivider?: boolean;
  headingBackgroundColour?: string;
  className?: string;
  sendOptimizelyEvents?: boolean;
}

// We render amp on ONLY STY, CSP and ARTICLE pages using amp-list.
const AmpMostRead = ({
  pageType,
  className,
  mobileDivider,
  headingBackgroundColour,
  endpoint,
  size,
}: {
  pageType: PageTypes;
  className: string;
  mobileDivider: boolean;
  headingBackgroundColour: string;
  endpoint: string;
  size: Size;
}) =>
  mostReadAmpPageTypes.includes(pageType) ? (
    <MostReadSection {...(className ? { className } : undefined)}>
      <MostReadSectionLabel
        mobileDivider={mobileDivider}
        backgroundColor={headingBackgroundColour}
      />
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
}: {
  data: MostReadData | undefined;
  className: string;
  mobileDivider: boolean;
  headingBackgroundColour: string;
  columnLayout?: ColumnLayout;
  size: Size;
  eventTrackingData: {
    optimizely?: ReactSDKClient | null | undefined;
    componentName: string;
    optimizelyVariation?: string | undefined;
  };
}) =>
  data ? (
    <MostReadSection className={className}>
      <MostReadSectionLabel
        mobileDivider={mobileDivider}
        backgroundColor={headingBackgroundColour}
      />
      <Canonical
        data={data}
        columnLayout={columnLayout}
        size={size}
        eventTrackingData={eventTrackingData}
      />
    </MostReadSection>
  ) : null;

const MostRead = ({
  data,
  columnLayout = 'multiColumn',
  size = 'default',
  mobileDivider = false,
  headingBackgroundColour = WHITE,
  className = '',
  sendOptimizelyEvents = true,
}: MostReadProps) => {
  const { isAmp, pageType, variant } = useContext(RequestContext);
  const {
    service,
    mostRead: { hasMostRead },
  } = useContext(ServiceContext);

  const experimentFlagKey = 'dummy_experiment';
  const myExperiementVariation = useOptimizelyVariation(experimentFlagKey);

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

  const eventTrackingData = {
    ...blockLevelEventTrackingData,
    sendOptimizelyEvents,
    experimentName: experimentFlagKey,
    optimizelyVariation: myExperiementVariation,
  };

  return isAmp ? (
    <AmpMostRead
      pageType={pageType}
      className={className}
      mobileDivider={mobileDivider}
      headingBackgroundColour={headingBackgroundColour}
      endpoint={endpoint}
      size={size}
    />
  ) : (
    <CanonicalMostRead
      data={data}
      className={className}
      mobileDivider={mobileDivider}
      headingBackgroundColour={headingBackgroundColour}
      columnLayout={columnLayout}
      size={size}
      eventTrackingData={eventTrackingData}
    />
  );
};

export default MostRead;
