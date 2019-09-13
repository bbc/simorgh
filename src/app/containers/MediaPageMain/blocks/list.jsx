import React from 'react';
import InlineLink from '@bbc/psammead-inline-link';
import Paragraph from '@bbc/psammead-paragraph';

// eslint-disable-next-line react/prop-types
const ListContainer = ({ items }) => {
  return (
    <ul>
      {items.map(({ text }) => (
        <Paragraph as="li">
          {text.map(({ href, text: textText }) => {
            if (href) {
              return <InlineLink href={href}>{textText}</InlineLink>;
            }

            return textText;
          })}
        </Paragraph>
      ))}
    </ul>
  );
};

export default ListContainer;
