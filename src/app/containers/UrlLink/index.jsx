import React from 'react';
import { string } from 'prop-types';
import InlineLink from '../../components/InlineLink';
import Blocks from '../Blocks';
import fragment from '../Fragment';
import { arrayOfSpecificBlocks } from '../../models/propTypes/general';

const componentsToRender = { fragment };

const UrlLink = ({ blocks, locator, type }) => {
  if (!blocks || type !== 'urlLink') {
    return null;
  }
  const href = locator || '#';
  return (
    <InlineLink href={href}>
      <Blocks blocks={blocks} componentsToRender={componentsToRender} />
    </InlineLink>
  );
};

UrlLink.propTypes = {
  locator: string.isRequired,
  type: string.isRequired,
  blocks: arrayOfSpecificBlocks('fragment'),
};

UrlLink.defaultProps = {
  blocks: null,
};

export default UrlLink;
