import React, { useContext } from 'react';
import { oneOf, string, elementType } from 'prop-types';
import { RequestContext } from '#contexts/RequestContext';
import { ServiceContext } from '#contexts/ServiceContext';
import useToggle from '#hooks/useToggle';
import mostReadShape from './utilities/mostReadShape';
import { getMostReadEndpoint } from '#lib/utilities/getMostReadUrls';
import Amp from './Amp';
import Canonical from './Canonical';

const MostReadContainer = ({
  mostReadEndpointOverride,
  initialData,
  columnLayout,
  wrapper,
}) => {
  const { variant, isAmp } = useContext(RequestContext);
  const {
    service,
    mostRead: { hasMostRead },
  } = useContext(ServiceContext);

  const { enabled } = useToggle('mostRead');

  const mostReadEnabled = enabled && hasMostRead;

  if (!mostReadEnabled) {
    return null;
  }

  const endpoint =
    mostReadEndpointOverride || getMostReadEndpoint({ service, variant });

  const MostRead = isAmp ? Amp : Canonical;

  return (
    <MostRead
      initialData={initialData}
      endpoint={endpoint}
      wrapper={wrapper}
      columnLayout={columnLayout}
    />
  );
};

MostReadContainer.propTypes = {
  mostReadEndpointOverride: string,
  columnLayout: oneOf(['oneColumn', 'twoColumn', 'multiColumn']),
  initialData: mostReadShape,
  wrapper: elementType,
};

MostReadContainer.defaultProps = {
  mostReadEndpointOverride: undefined,
  columnLayout: 'multiColumn',
  initialData: undefined,
  wrapper: undefined,
};

export default MostReadContainer;
