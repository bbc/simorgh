import React, { useContext } from 'react';
import { string, bool, number } from 'prop-types';
import pathOr from 'ramda/src/pathOr';

import EmbedError from '#psammead/psammead-embed-error/src';
import { RequestContext } from '#contexts/RequestContext';
import useToggle from '#hooks/useToggle';
import { GridItemMedium } from '#components/Grid';
import { ServiceContext } from '../../../contexts/ServiceContext';

import Canonical from './canonical';
import Idt2Canonical from './canonical/Idt2';
import Idt2Amp from './amp/Idt2Amp';
import VjAmp from './amp/VjAmp';

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

  const errorMessage = pathOr(
    'Sorry, we can’t display this part of the story on this lightweight mobile page.',
    ['include', 'errorMessage'],
    translations,
  );

  const linkText = pathOr(
    'View the full version of the page to see all the content.',
    ['include', 'linkText'],
    translations,
  );

  if (!enabled) return null;
  const { isAmpSupported, type, index } = props;

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

  const platform = isAmp ? 'amp' : 'canonical';

  return componentsToRender[platform][type]
    ? componentsToRender[platform][type](props)
    : null;
};

IncludeContainer.propTypes = {
  isAmpSupported: bool,
  type: string.isRequired,
  index: number,
};

IncludeContainer.defaultProps = {
  isAmpSupported: false,
  index: null,
};

export default IncludeContainer;
