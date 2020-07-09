import React, { useContext } from 'react';
import { string } from 'prop-types';

import nodeLogger from '#lib/logger.node';
import { INCLUDE_RENDERED } from '#lib/logger.const';
import { RequestContext } from '#contexts/RequestContext';
import useToggle from '#hooks/useToggle';

import Canonical from './canonical';
import Idt2Canonical from './canonical/Idt2';
import Idt2Amp from './amp/Idt2Amp';
import VjAmp from './amp/VjAmp';
import AmpFallback from './amp/AmpFallback';

const logger = nodeLogger(__filename);

const FALLBACK_CLASSIFICATIONS = ['vj-amp-not-supported', 'idt1-amp'];

const componentsToRender = {
  amp: {
    idt2: props => <Idt2Amp {...props} />,
    vj: props => <VjAmp {...props} />,
  },
  canonical: {
    idt1: props => <Canonical {...props} />,
    idt2: props => <Idt2Canonical {...props} />,
    vj: props => <Canonical {...props} />,
  },
};

const IncludeContainer = props => {
  const { isAmp } = useContext(RequestContext);
  const { enabled } = useToggle('include');

  if (!enabled) return null;
  const { classification, href, type } = props;

  if (FALLBACK_CLASSIFICATIONS.includes(classification)) {
    return <AmpFallback />;
  }

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
