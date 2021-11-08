import React, { useContext } from 'react';
import { string, bool, number } from 'prop-types';

import EmbedError from '@bbc/psammead-embed-error';
import nodeLogger from '#lib/logger.node';
import { INCLUDE_RENDERED } from '#lib/logger.const';
import { RequestContext } from '#contexts/RequestContext';
import { ServiceContext } from '#contexts/ServiceContext';
import useToggle from '#hooks/useToggle';
import { GridItemMedium } from '#app/components/Grid';

import Canonical from './canonical';
import Idt2Canonical from './canonical/Idt2';
import Idt2Amp from './amp/Idt2Amp';
import VjAmp from './amp/VjAmp';

const logger = nodeLogger(__filename);

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
  const { isAmp, canonicalLink } = useContext(RequestContext);
  const { translations } = useContext(ServiceContext);
  const { enabled } = useToggle('include');

  const errorMessage =
    translations?.include?.errorMessage ||
    'Sorry, we can’t display this part of the story on this lightweight mobile page.';

  const linkText =
    translations?.include?.linkText ||
    'View the full version of the page to see all the content.';

  if (!enabled) return null;
  const { isAmpSupported, href, type, index } = props;

  if (!isAmpSupported && isAmp) {
    return (
      <GridItemMedium>
        <EmbedError
          message={errorMessage}
          link={{
            text: linkText,
            href: `${canonicalLink}#include-${index + 1}`,
          }}
        />
      </GridItemMedium>
    );
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
  isAmpSupported: bool,
  href: string.isRequired,
  type: string.isRequired,
  index: number,
};

IncludeContainer.defaultProps = {
  isAmpSupported: false,
  index: null,
};

export default IncludeContainer;
