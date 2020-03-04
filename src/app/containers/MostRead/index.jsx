import React, { useContext } from 'react';
import { bool, string } from 'prop-types';
import { RequestContext } from '#contexts/RequestContext';
import { ServiceContext } from '#contexts/ServiceContext';
import useToggle from '../Toggle/useToggle';
import Canonical from './Canonical';

const getMostReadEndpoint = ({ service, variant }) =>
  variant
    ? `/${service}/mostread/${variant}.json`
    : `/${service}/mostread.json`;

const MostReadContainer = ({ mostReadEndpointOverride, maxTwoColumns }) => {
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

  return <Canonical endpoint={endpoint} maxTwoColumns={maxTwoColumns} />;
};

MostReadContainer.propTypes = {
  mostReadEndpointOverride: string,
  maxTwoColumns: bool,
};

MostReadContainer.defaultProps = {
  mostReadEndpointOverride: null,
  maxTwoColumns: false,
};

export default MostReadContainer;
