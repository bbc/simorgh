import React from 'react';
import { number } from 'prop-types';
import styled from 'styled-components';
import { Headline } from '@bbc/psammead-headings';
import Paragraph from '@bbc/psammead-paragraph';
import {
  layoutGridWrapper,
  layoutGridItemConstrained,
} from '../../lib/layoutGrid';

const Wrapper = styled.div`
  ${layoutGridWrapper};
`;

const GridItemConstrained = styled.div`
  ${layoutGridItemConstrained};
`;

const ErrorMain = ({ status }) => (
  <main role="main">
    <Wrapper>
      <GridItemConstrained>
        <Headline>Oops: something went wrong!</Headline>
        <Paragraph>Response code: {status}</Paragraph>
      </GridItemConstrained>
    </Wrapper>
  </main>
);

ErrorMain.propTypes = {
  status: number.isRequired,
};

export default ErrorMain;
