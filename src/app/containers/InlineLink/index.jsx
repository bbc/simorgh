import React from 'react';
import { Link } from 'react-router-dom';
import pathToRegexp from 'path-to-regexp';
import InlineLink from '@bbc/psammead-inline-link';
import Blocks from '../Blocks';
import fragment from '../Fragment';
import { inlineLinkModelPropTypes } from '../../models/propTypes/inlineLink';
import { articleRegexPath } from '../../routes';

const componentsToRender = { fragment };

const reactRouterLink = (path, blocks) => {
  const ReactRouterLink = InlineLink.withComponent(Link);

  console.log('IAMAREACTROUTERLINK');

  return (
    <ReactRouterLink to={path}>
      <Blocks blocks={blocks} componentsToRender={componentsToRender} />
    </ReactRouterLink>
  );
};

const InlineLinkContainer = ({ locator, blocks }) => {
  const regexp = pathToRegexp(articleRegexPath, [], {
    start: false,
    end: false,
  });

  const result = regexp.exec(locator);
  // if URL matches a valid route, use a react-router link
  if (result) {
    // the path is the first item in the array
    const path = result[0];

    return reactRouterLink(path, blocks);
  }

  console.log('IAMASTANDARDLINK');

  // else return a normal hyperlink
  return (
    <InlineLink href={locator}>
      <Blocks blocks={blocks} componentsToRender={componentsToRender} />
    </InlineLink>
  );
};

InlineLinkContainer.propTypes = inlineLinkModelPropTypes;

export default InlineLinkContainer;
