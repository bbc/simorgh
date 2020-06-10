import React, { useContext } from 'react';
import { string } from 'prop-types';
import nodeLogger from '#lib/logger.node';
import { INCLUDE_RENDERED } from '#lib/logger.const';
import { RequestContext } from '#contexts/RequestContext';
import Canonical from './index.canonical';
import Amp from './index.amp';
import useToggle from '#hooks/useToggle';

const logger = nodeLogger(__filename);

const IncludeContainer = props => {
  const { isAmp } = useContext(RequestContext);
  const { enabled } = useToggle('include');

  if (!enabled) return null;
  const { href, type } = props;

  logger.info(INCLUDE_RENDERED, {
    includeUrl: href,
    type,
  });

  console.log('logging', props);

  const Container = isAmp ? Amp : Canonical;

  return <Container {...props} />;
};

IncludeContainer.propTypes = {
  href: string.isRequired,
  type: string.isRequired,
};

export default IncludeContainer;
