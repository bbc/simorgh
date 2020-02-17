import React, { useContext } from 'react';
import { string } from 'prop-types';
import { RequestContext } from '#contexts/RequestContext';
import { ServiceContext } from '#contexts/ServiceContext';
import useToggle from '../Toggle/useToggle';
import Canonical from './Canonical';

const getMostReadEndpoint = ({ service, variant }) =>
  variant
    ? `/${service}/mostread/${variant}.json`
    : `/${service}/mostread.json`;

const MostReadContainer = ({ endpointOverride }) => {
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
    endpointOverride || getMostReadEndpoint({ service, variant });

  return <Canonical endpoint={endpoint} />;
};

MostReadContainer.propTypes = {
  endpointOverride: string,
};

MostReadContainer.defaultProps = {
  endpointOverride: null,
};

export default MostReadContainer;
