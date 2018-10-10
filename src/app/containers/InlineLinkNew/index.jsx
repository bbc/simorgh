import React from 'react';
import { Link } from 'react-router-dom';
import InlineLink from '../../components/InlineLink';
import Blocks from '../Blocks';
import fragment from '../Fragment';
import { inlineLinkModelPropTypes } from '../../models/propTypes/inlineLink';

const InternalInlineLink = InlineLink.withComponent(Link);

const componentsToRender = { fragment };

const InlineLinkContainer = ({ locator, blocks }) => {
  const InlineLinkComponent = {
    Component: InlineLink,
    props: { href: locator },
  };

  const regex = '^/news/articles/c[a-zA-Z0-9]{10}o$';
  // if URL matches a valid route, use a react-router link
  if (locator.match(regex)) {
    InlineLinkComponent.Component = InternalInlineLink;
    InlineLinkComponent.props = { to: locator };
  }

  // else return a normal hyperlink
  return (
    <InlineLinkComponent.Component {...InlineLinkComponent.props}>
      <Blocks blocks={blocks} componentsToRender={componentsToRender} />
    </InlineLinkComponent.Component>
  );
};

InlineLinkContainer.propTypes = inlineLinkModelPropTypes;

export default InlineLinkContainer;
