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
  linkTypography,
  rankTypography,
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
      linkTypography={linkTypography}
      rankTypography={rankTypography}
    />
  );
};

MostReadContainer.propTypes = {
  mostReadEndpointOverride: string,
  constrainMaxWidth: bool,
  columnLayout: oneOf(['oneColumn', 'twoColumn', 'multiColumn']),
  isOnFrontPage: bool,
  linkTypography: oneOf(['greatprimer', 'pica']),
  rankTypography: oneOf(['foolscap', 'trafalgar']),
};

MostReadContainer.defaultProps = {
  mostReadEndpointOverride: null,
  constrainMaxWidth: false,
  columnLayout: 'multiColumn',
  isOnFrontPage: false,
  linkTypography: 'greatprimer',
  rankTypography: 'foolscap',
};

export default MostReadContainer;
