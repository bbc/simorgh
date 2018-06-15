import React from 'react';
import styled from 'styled-components';

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
        {type}: {blockString}
      </Element>
    );
  });

const MainContent = ({ data }) => {
  const renderedContent = render(data);
  return <div>{renderedContent}</div>;
};

export default MainContent;
