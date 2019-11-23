import React from 'react';
import styled from 'styled-components';
import Blocks from '../Blocks';
import paragraph from '../Paragraph';
import { listItemPropTypes } from '#models/propTypes/list';

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

BulletedListItemContainer.propTypes = { ...listItemPropTypes };

export default BulletedListItemContainer;
