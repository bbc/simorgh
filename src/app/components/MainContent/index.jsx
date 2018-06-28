import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';
import { C_EBON, FF_NEWS_SANS_REG } from '../../../lib/constants/styles';

const Headline = styled.h1`
  color: ${C_EBON};
  font-family: ${FF_NEWS_SANS_REG};
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
