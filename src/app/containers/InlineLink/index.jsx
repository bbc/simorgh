import React from 'react';
import { Link } from 'react-router-dom';
import { string, node } from 'prop-types';
import InlineLink from '../../components/InlineLink';

const InternalInlineLink = InlineLink.withComponent(Link);

const InlineLinkContainer = ({ href, children, ...rest }) => {
  const regex = '^/news/articles/c[a-zA-Z0-9]{10}o$';

  // if URL matches a valid route, use a react-router link
  if (href.match(regex)) {
    return (
      <InternalInlineLink to={href} {...rest}>
        {children}
      </InternalInlineLink>
    );
  }

  // else return a normal hyperlink
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
