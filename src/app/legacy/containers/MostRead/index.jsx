import React, { useContext } from 'react';
import { oneOf, string, elementType, bool } from 'prop-types';
import { RequestContext } from '#contexts/RequestContext';
import useToggle from '#hooks/useToggle';
import { getMostReadEndpoint } from '#lib/utilities/getUrlHelpers/getMostReadUrls';
import { ServiceContext } from '../../../contexts/ServiceContext';
import Canonical from './Canonical';
import mostReadShape from './utilities/mostReadShape';
import AmpMostRead from './Amp';

const blockLevelEventTrackingData = {
  componentName: 'most-read',
};

const mostReadAmpPageTypes = ['STY', 'CSP', 'article'];

const MostReadContainer = ({
  mostReadEndpointOverride,
  initialData,
  columnLayout,
  size,
  wrapper,
  serverRenderOnAmp,
}) => {
  const { variant, isAmp, pageType } = useContext(RequestContext);
  const {
    service,
    mostRead: { hasMostRead },
  } = useContext(ServiceContext);

  const { enabled } = useToggle('mostRead');

  const mostReadToggleEnabled = enabled && hasMostRead;
  const endpoint =
    mostReadEndpointOverride || getMostReadEndpoint({ service, variant });

  // Do not render most read when a toggle is disabled
  if (!mostReadToggleEnabled) {
    return null;
  }

  // We render amp on ONLY STY, CSP and ARTICLE pages using amp-list.
  // We also want to render most read on AMP for the "/popular/read" pages
  if (isAmp && !serverRenderOnAmp && mostReadAmpPageTypes.includes(pageType)) {
    const mostReadUrl = `${process.env.SIMORGH_MOST_READ_CDN_URL}${endpoint}`;
    return <AmpMostRead endpoint={mostReadUrl} size={size} wrapper={wrapper} />;
  }

  return (
    <Canonical
      initialData={initialData}
      endpoint={endpoint}
      wrapper={wrapper}
      columnLayout={columnLayout}
      size={size}
      eventTrackingData={blockLevelEventTrackingData}
    />
  );
};

MostReadContainer.propTypes = {
  mostReadEndpointOverride: string,
  columnLayout: oneOf(['oneColumn', 'twoColumn', 'multiColumn']),
  size: oneOf(['default', 'small']),
  initialData: mostReadShape,
  wrapper: elementType,
  serverRenderOnAmp: bool,
};

MostReadContainer.defaultProps = {
  mostReadEndpointOverride: undefined,
  columnLayout: 'multiColumn',
  size: 'default',
  initialData: undefined,
  wrapper: undefined,
  serverRenderOnAmp: false,
};

export default MostReadContainer;
