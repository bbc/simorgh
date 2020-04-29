import React, { useContext } from 'react';
import { bool, string, oneOf } from 'prop-types';
import { RequestContext } from '#contexts/RequestContext';
import { ServiceContext } from '#contexts/ServiceContext';
import useToggle from '#hooks/useToggle';
import Canonical from './Canonical';

const getMostReadEndpoint = ({ service, variant }) =>
  variant
    ? `/${service}/mostread/${variant}.json`
    : `/${service}/mostread.json`;

const MostReadContainer = ({
  mostReadEndpointOverride,
  columnLayout,
  constrainMaxWidth,
  isOnFrontPage,
  size,
}) => {
  const { variant, isAmp } = useContext(RequestContext);
  const {
    service,
    mostRead: { hasMostRead },
  } = useContext(ServiceContext);

  const { enabled } = useToggle('mostRead');

  const mostReadEnabled = !isAmp && enabled && hasMostRead;

  if (!mostReadEnabled) {
    return null;
  }

  const endpoint =
    mostReadEndpointOverride || getMostReadEndpoint({ service, variant });

  return (
    <Canonical
      endpoint={endpoint}
      constrainMaxWidth={constrainMaxWidth}
      columnLayout={columnLayout}
      isOnFrontPage={isOnFrontPage}
      size={size}
    />
  );
};

MostReadContainer.propTypes = {
  mostReadEndpointOverride: string,
  constrainMaxWidth: bool,
  columnLayout: oneOf(['oneColumn', 'twoColumn', 'multiColumn']),
  isOnFrontPage: bool,
  size: oneOf(['default', 'small']),
};

MostReadContainer.defaultProps = {
  mostReadEndpointOverride: null,
  constrainMaxWidth: false,
  columnLayout: 'multiColumn',
  isOnFrontPage: false,
  size: 'default',
};

export default MostReadContainer;
