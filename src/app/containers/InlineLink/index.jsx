import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { pathToRegexp } from 'path-to-regexp';
import InlineLink from '@bbc/psammead-inline-link';
import pathOr from 'ramda/src/pathOr';
import { ServiceContext } from '#contexts/ServiceContext';
import Blocks from '../Blocks';
import fragment from '../Fragment';
import { inlineLinkModelPropTypes } from '#models/propTypes/inlineLink';
import { articlePath } from '../../routes/utils/regex';

const InternalInlineLink = InlineLink.withComponent(Link);

const componentsToRender = { fragment };

const InlineLinkContainer = ({ locator, isExternal, blocks }) => {
  const { externalLinkText } = useContext(ServiceContext);
  const regexp = pathToRegexp(articlePath, [], {
    start: false,
    end: false,
  });

  const result = regexp.exec(locator);
  // if URL matches a valid route, use a react-router link
  if (result) {
    // the path is the first item in the array
    const path = result[0];
    const { hash = null } = new URL(locator);
    const handleClick = () => {
      // if there is an anchor,
      // scroll to the anchored element with the id and focus on it for screen readers
      if (hash) {
        document.querySelector(hash)?.scrollIntoView();
        document.querySelector(hash)?.focus();
      }
    };
    return (
      <InternalInlineLink to={{ pathname: path, hash }} onClick={handleClick}>
        <Blocks blocks={blocks} componentsToRender={componentsToRender} />
      </InternalInlineLink>
    );
  }

  const linkText = pathOr(null, [0, 'model', 'text'], blocks);
  return (
    <InlineLink
      href={locator}
      aria-label={isExternal ? `${linkText}${externalLinkText}` : null}
    >
      <Blocks blocks={blocks} componentsToRender={componentsToRender} />
    </InlineLink>
  );
};

InlineLinkContainer.propTypes = inlineLinkModelPropTypes;

export default InlineLinkContainer;
