import React, { useContext } from 'react';
import { string, bool } from 'prop-types';
import { RequestContext } from '#contexts/RequestContext';
import { ServiceContext } from '#contexts/ServiceContext';
import useToggle from '../Toggle/useToggle';
import Canonical from './Canonical';

const getMostReadEndpoint = ({ service, variant }) =>
  variant
    ? `/${service}/mostread/${variant}.json`
    : `/${service}/mostread.json`;

const MostReadContainer = ({ mostReadEndpointOverride, forceMostRead }) => {
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

  const isTestOrLocal =
    process.env.SIMORGH_APP_ENV === 'test' ||
    process.env.SIMORGH_APP_ENV === 'local';

  const endpoint =
    mostReadEndpointOverride || getMostReadEndpoint({ service, variant });

  return (
    <Canonical
      endpoint={endpoint}
      forceMostRead={forceMostRead || isTestOrLocal}
    />
  );
};

MostReadContainer.propTypes = {
  mostReadEndpointOverride: string,
  forceMostRead: bool,
};

MostReadContainer.defaultProps = {
  mostReadEndpointOverride: null,
  forceMostRead: false,
};

export default MostReadContainer;
