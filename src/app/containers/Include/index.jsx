import React, { useContext } from 'react';
import { string } from 'prop-types';
import styled from 'styled-components';
import { pathOr } from 'ramda';

import EmbedError from '@bbc/psammead-embed-error';
import nodeLogger from '#lib/logger.node';
import { INCLUDE_RENDERED } from '#lib/logger.const';
import { RequestContext } from '#contexts/RequestContext';
import { ServiceContext } from '#contexts/ServiceContext';
import useToggle from '#hooks/useToggle';
import { GridItemConstrainedMedium } from '#lib/styledGrid';

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

const FallbackGrid = styled(GridItemConstrainedMedium)`
  display: grid;
`;

const IncludeContainer = props => {
  const { isAmp, canonicalLink } = useContext(RequestContext);
  const { translations } = useContext(ServiceContext);
  const { enabled } = useToggle('include');

  const errorMessage = pathOr(
    'Test',
    ['include', 'errorMessage'],
    translations,
  );

  const linkText = pathOr('Test', ['include', 'linkText'], translations);

  if (!enabled) return null;
  const { isAmpSupported, href, type, index } = props;

  if (!isAmpSupported && isAmp) {
    return (
      <FallbackGrid>
        <EmbedError
          message={errorMessage}
          link={{
            text: linkText,
            href: `${canonicalLink}#include-${index + 1}`,
          }}
        />
      </FallbackGrid>
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
  href: string.isRequired,
  type: string.isRequired,
};

export default IncludeContainer;
