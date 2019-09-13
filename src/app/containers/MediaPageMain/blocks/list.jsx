import React, { Fragment } from 'react';
import InlineLink from '@bbc/psammead-inline-link';
import Paragraph from '@bbc/psammead-paragraph';

// eslint-disable-next-line react/prop-types
const ListContainer = ({ items }) => {
  return (
    <ul>
      {/* eslint-disable-next-line react/prop-types */}
      {items.map(({ text, id }) => (
        <Paragraph as="li" key={id}>
          {text.map(({ href, text: textText, textId }) => {
            if (href) {
              return (
                <InlineLink key={textId} href={href}>
                  {textText}
                </InlineLink>
              );
            }

            return <Fragment key={textId}>{textText}</Fragment>;
          })}
        </Paragraph>
      ))}
    </ul>
  );
};

export default ListContainer;
