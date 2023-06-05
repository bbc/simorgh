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
import {
  STORY_PAGE,
  CORRESPONDENT_STORY_PAGE,
  ARTICLE_PAGE,
} from '../../routes/utils/pageTypes';

const blockLevelEventTrackingData = {
  componentName: 'most-read',
};

const mostReadAmpPageTypes = [
  STORY_PAGE,
  CORRESPONDENT_STORY_PAGE,
  ARTICLE_PAGE,
];

interface MostReadProps {
  data?: MostReadData;
  columnLayout?: ColumnLayout;
  size?: Size;
  mobileDivider?: boolean;
  backgroundColour?: string;
}

const MostRead = ({
  data,
  columnLayout = 'multiColumn',
  size = 'default',
  mobileDivider = false,
  backgroundColour = WHITE,
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

  const endpoint = getMostReadEndpoint({
    service,
    variant,
  });

  // We render amp on ONLY STY, CSP and ARTICLE pages using amp-list.
  const AmpMostRead = () =>
    // @ts-expect-error not all page types are supported for most read on amp
    mostReadAmpPageTypes.includes(pageType) ? (
      <MostReadSection>
        <MostReadSectionLabel
          mobileDivider={mobileDivider}
          backgroundColor={backgroundColour}
        />
        <Amp
          endpoint={`${process.env.SIMORGH_MOST_READ_CDN_URL}${endpoint}`}
          size={size}
        />
      </MostReadSection>
    ) : null;

  // Do not render on Canonical if data is not provided
  const CanonicalMostRead = () =>
    data ? (
      <MostReadSection>
        <MostReadSectionLabel
          mobileDivider={mobileDivider}
          backgroundColor={backgroundColour}
        />
        <Canonical
          data={data}
          columnLayout={columnLayout}
          size={size}
          eventTrackingData={blockLevelEventTrackingData}
        />
      </MostReadSection>
    ) : null;

  return isAmp ? <AmpMostRead /> : <CanonicalMostRead />;
};

export default MostRead;
