import React from 'react';
import { number } from 'prop-types';
import { Headline } from '@bbc/psammead-headings';
import Paragraph from '@bbc/psammead-paragraph';
import { Wrapper, GridItemConstrained } from '../../lib/styledGrid';

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
