import React, { useContext } from 'react';
import { bool, string, elementType } from 'prop-types';
import { RequestContext } from '#contexts/RequestContext';
import { ServiceContext } from '#contexts/ServiceContext';
import useToggle from '../Toggle/useToggle';
import Canonical from './Canonical';

const getMostReadEndpoint = ({ service, variant }) =>
  variant
    ? `/${service}/mostread/${variant}.json`
    : `/${service}/mostread.json`;

const MostReadContainer = ({
  mostReadEndpointOverride,
  maxTwoColumns,
  wrapper,
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
      maxTwoColumns={maxTwoColumns}
      wrapper={wrapper}
    />
  );
};

MostReadContainer.propTypes = {
  mostReadEndpointOverride: string,
  wrapper: elementType.isRequired,
  maxTwoColumns: bool,
};

MostReadContainer.defaultProps = {
  mostReadEndpointOverride: null,
  maxTwoColumns: false,
};

export default MostReadContainer;
