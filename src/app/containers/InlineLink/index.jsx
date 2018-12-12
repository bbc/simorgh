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

const pathIfMatching = (regexString, url) => {
  const regexp = pathToRegexp(regexString, [], {
    start: false,
    end: false,
  });
  const regexResultArray = regexp.exec(url);
  if (!regexResultArray) {
    return null;
  }
  const path = regexResultArray[0];
  return path;
};

const InlineLinkContainer = ({ locator, blocks }) => {
  const path = pathIfMatching(articleRegexPath, locator);

  if (path) {
    return reactRouterLink(path, blocks);
  }

  console.log('IAMASTANDARDLINK');

  return (
    <InlineLink href={locator}>
      <Blocks blocks={blocks} componentsToRender={componentsToRender} />
    </InlineLink>
  );
};

InlineLinkContainer.propTypes = inlineLinkModelPropTypes;

export default InlineLinkContainer;
