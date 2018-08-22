import React from 'react';
import { Link } from 'react-router-dom';
import { string, node } from 'prop-types';
import InlineLink from '../../components/InlineLink';

const InternalInlineLink = InlineLink.withComponent(Link);

const InlineLinkContainer = ({ href, children, ...rest }) => {
  if (href.match('^/news/articles/c0{8}[0-9]{2}o$')) {
    return (
      <InternalInlineLink to={href} {...rest}>
        {children}
      </InternalInlineLink>
    );
  }

  return (
    <InlineLink href={href} {...rest}>
      {children}
    </InlineLink>
  );
};

InlineLinkContainer.propTypes = {
  href: string.isRequired,
  children: node.isRequired,
};

export default InlineLinkContainer;
