import React, { useContext } from 'react';
import { RequestContext } from '#contexts/RequestContext';
import useToggle from '#hooks/useToggle';
import { getMostReadEndpoint } from '#app/lib/utilities/getUrlHelpers/getMostReadUrls';
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
  renderCanonicalOnAmp?: boolean;
}

const MostRead = ({
  data,
  columnLayout = 'multiColumn',
  size = 'default',
  mobileDivider = false,
  headingBackgroundColour = WHITE,
  renderCanonicalOnAmp = false,
}: MostReadProps) => {
  const { isAmp, pageType, variant } = useContext(RequestContext);
  const {
    service,
    mostRead: { hasMostRead },
  } = useContext(ServiceContext);

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

  // Do not render on Canonical if data is not provided
  const CanonicalMostRead = () =>
    data ? (
      <MostReadSection>
        <MostReadSectionLabel
          mobileDivider={mobileDivider}
          backgroundColor={headingBackgroundColour}
        />
        <Canonical
          data={data}
          columnLayout={columnLayout}
          size={size}
          eventTrackingData={blockLevelEventTrackingData}
        />
      </MostReadSection>
    ) : null;

  // We render amp on ONLY STY, CSP and ARTICLE pages using amp-list.
  let AmpMostRead = () =>
    mostReadAmpPageTypes.includes(pageType) ? (
      <MostReadSection>
        <MostReadSectionLabel
          mobileDivider={mobileDivider}
          backgroundColor={headingBackgroundColour}
        />
        <Amp
          endpoint={`${process.env.SIMORGH_MOST_READ_CDN_URL}${endpoint}`}
          size={size}
        />
      </MostReadSection>
    ) : null;

  /**
   * If renderComponentOnAmp is true, then use the canonical version of the component instead of the AMP version.
   *
   * This is to prevent double fetching of most read data.
   */
  if (isAmp && renderCanonicalOnAmp) {
    AmpMostRead = CanonicalMostRead;
  }

  return isAmp ? <AmpMostRead /> : <CanonicalMostRead />;
};

export default MostRead;
