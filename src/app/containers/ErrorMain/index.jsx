import React from 'react';
import { number } from 'prop-types';
import { Headline } from '@bbc/psammead-headings';
import Paragraph from '@bbc/psammead-paragraph';
import { GhostWrapper, GridItemConstrained } from '../../lib/styledGrid';

const ErrorMain = ({ status }) => (
  <main role="main">
    <GhostWrapper>
      <GridItemConstrained>
        <Headline>Oops: something went wrong!</Headline>
        <Paragraph>Response code: {status}</Paragraph>
      </GridItemConstrained>
    </GhostWrapper>
  </main>
);

ErrorMain.propTypes = {
  status: number.isRequired,
};

export default ErrorMain;
