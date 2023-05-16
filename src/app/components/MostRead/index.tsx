import React, { useContext } from 'react';
import { RequestContext } from '#contexts/RequestContext';
import useToggle from '#hooks/useToggle';
import { ServiceContext } from '../../contexts/ServiceContext';
import Canonical from './Canonical';
import Amp from './Amp';
import { ColumnLayout, Size, MostReadData } from './types';
import MostReadSection from './Section';
import MostReadSectionLabel from './Label';
import { WHITE } from '../ThemeProvider/palette';

const blockLevelEventTrackingData = {
  componentName: 'most-read',
};

const mostReadAmpPageTypes = ['STY', 'CSP', 'article', 'home'];

interface MostReadProps {
  data?: MostReadData;
  columnLayout?: ColumnLayout;
  size?: Size;
  endpoint?: string;
  mobileDivider?: boolean;
  backgroundColour?: string;
}

const MostRead = ({
  data,
  columnLayout = 'multiColumn',
  size = 'default',
  endpoint,
  mobileDivider = false,
  backgroundColour = WHITE,
}: MostReadProps) => {
  const { isAmp, pageType } = useContext(RequestContext);
  const {
    mostRead: { hasMostRead },
  } = useContext(ServiceContext);

  const { enabled } = useToggle('mostRead');

  const mostReadToggleEnabled = enabled && hasMostRead;

  // Do not render most read when a toggle is disabled
  if (!mostReadToggleEnabled) {
    return null;
  }

  // We render amp on ONLY STY, CSP and ARTICLE pages using amp-list.
  const AmpMostRead = () =>
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
