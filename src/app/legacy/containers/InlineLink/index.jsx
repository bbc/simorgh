import React, { useContext } from 'react';
import InlineLink from '#psammead/psammead-inline-link/src';
import pathOr from 'ramda/src/pathOr';
import makeRelativeUrlPath from '#lib/utilities/makeRelativeUrlPath';
import { ServiceContext } from '../../../contexts/ServiceContext';
import Blocks from '../Blocks';
import fragment from '../Fragment';

const componentsToRender = { fragment };

const InlineLinkContainer = ({ locator, isExternal, blocks, onClick }) => {
  const { externalLinkText } = useContext(ServiceContext);

  const linkText = pathOr(null, [0, 'model', 'text'], blocks);
  return (
    <InlineLink
      href={makeRelativeUrlPath(locator)}
      className="focusIndicatorReducedWidth"
      aria-label={isExternal ? `${linkText}${externalLinkText}` : null}
      onClick={event => {
        if (onClick) {
          onClick(event);
        }
      }}
    >
      <Blocks blocks={blocks} componentsToRender={componentsToRender} />
    </InlineLink>
  );
};

export default InlineLinkContainer;
