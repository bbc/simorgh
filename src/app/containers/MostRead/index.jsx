import React, { useContext } from 'react';
import { oneOf, elementType, bool } from 'prop-types';
import { RequestContext } from '#contexts/RequestContext';
import { ServiceContext } from '#contexts/ServiceContext';
import useToggle from '#hooks/useToggle';
import Canonical from './Canonical';
import mostReadShape from './utilities/mostReadShape';
import getMostReadEndpoint from '#lib/utilities/getMostReadUrls';

const MostReadContainer = ({
  initialData,
  columnLayout,
  size,
  wrapper,
  serverRenderOnAmp,
}) => {
  const { variant, isAmp } = useContext(RequestContext);
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

  // Do not render on AMP when it is not the most read page
  // We only want to render most read on AMP for the "/popular/read" pages
  if (isAmp && !serverRenderOnAmp) {
    return null;
  }

  const endpoint = getMostReadEndpoint({ service, variant });

  return (
    <Canonical
      initialData={initialData}
      endpoint={endpoint}
      wrapper={wrapper}
      columnLayout={columnLayout}
      size={size}
    />
  );
};

MostReadContainer.propTypes = {
  columnLayout: oneOf(['oneColumn', 'twoColumn', 'multiColumn']),
  size: oneOf(['default', 'small']),
  initialData: mostReadShape,
  wrapper: elementType,
  serverRenderOnAmp: bool,
};

MostReadContainer.defaultProps = {
  columnLayout: 'multiColumn',
  size: 'default',
  initialData: undefined,
  wrapper: undefined,
  serverRenderOnAmp: false,
};

export default MostReadContainer;
