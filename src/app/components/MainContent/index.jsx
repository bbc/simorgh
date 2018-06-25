import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';

const Headline = styled.h1`
  color: #222;
  font-family: ReithSans, Arial, Helvetica, freesans, sans-serif;
  font-size: 2em;
`;

const render = ({ blocks }) =>
  blocks.map(block => {
    const { type, blockId } = block;
    const blockString = JSON.stringify(block);

    let Element = 'p';
    if (type === 'headline') {
      Element = Headline;
    }

    return (
      <Element key={blockId}>
        {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
        {type}: {blockString}
      </Element>
    );
  });

const MainContent = ({ data }) => {
  const renderedContent = render(data);
  return (
    <div>
      {renderedContent}
    </div>
);
};

MainContent.propTypes = {
  data: propTypes.shape({
    model: propTypes.shape({
      blocks: propTypes.arrayOf(propTypes.any),
    }),
  }).isRequired,
};

export default MainContent;
