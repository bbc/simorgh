import React from 'react';
import { Link } from 'react-router-dom';
import InlineLink from '@bbc/psammead-inline-link';
import Blocks from '../Blocks';
import fragment from '../Fragment';
import { inlineLinkModelPropTypes } from '../../models/propTypes/inlineLink';
import { articleRegexPath } from '../../routes';
import pathIfMatching from './pathIfMatching';

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

const InlineLinkContainer = ({ locator: url, blocks }) => {
  const path = pathIfMatching(articleRegexPath, url);

  if (process.env.TOGGLE_ENABLE_CLIENTSIDE_ROUTING === 'true' && path) {
    return reactRouterLink(path, blocks);
  }

  console.log('IAMASTANDARDLINK');

  return (
    <InlineLink href={url}>
      <Blocks blocks={blocks} componentsToRender={componentsToRender} />
    </InlineLink>
  );
};

InlineLinkContainer.propTypes = inlineLinkModelPropTypes;

export default InlineLinkContainer;
