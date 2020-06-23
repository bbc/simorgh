import React, { useContext } from 'react';
import { string } from 'prop-types';
import nodeLogger from '#lib/logger.node';
import { INCLUDE_RENDERED } from '#lib/logger.const';
import { RequestContext } from '#contexts/RequestContext';
import Canonical from './canonical';
import useToggle from '#hooks/useToggle';
import Idt2Amp from './amp/Idt2Amp';

const logger = nodeLogger(__filename);

const componentsToRender = {
  amp: {
    idt2: props => <Idt2Amp {...props} />,
  },
  canonical: {
    idt1: props => <Canonical {...props} />,
    idt2: props => <Canonical {...props} />,
    vj: props => <Canonical {...props} />,
  },
};

const IncludeContainer = props => {
  const { isAmp } = useContext(RequestContext);
  const { enabled } = useToggle('cpsRecommendations');

  if (!enabled) return null;
  const { href, type } = props;

  logger.info(INCLUDE_RENDERED, {
    includeUrl: href,
    type,
  });

  const platform = isAmp ? 'amp' : 'canonical';

  return componentsToRender[platform][type]
    ? componentsToRender[platform][type](props)
    : null;
};

IncludeContainer.propTypes = {
  href: string.isRequired,
  type: string.isRequired,
};

export default IncludeContainer;
