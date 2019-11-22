import React from 'react';
import styled from 'styled-components';
import Blocks from '../Blocks';
import paragraph from '../Paragraph';
import { paragraphBlockPropTypes } from '#models/propTypes/paragraph';

const componentsToRender = { paragraph };

const Wrapper = styled.div`
  display: inline-block;
`;

const BulletedListItemContainer = ({ blocks }) => {
  return (
    <li>
      <Wrapper>
        <Blocks blocks={blocks} componentsToRender={componentsToRender} />
      </Wrapper>
    </li>
  );
};

BulletedListItemContainer.propTypes = { ...paragraphBlockPropTypes };

export default BulletedListItemContainer;
