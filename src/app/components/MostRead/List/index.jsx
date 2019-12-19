import React from 'react';
import styled from 'styled-components';
import { oneOf, node } from 'prop-types';
import Grid from '@bbc/psammead-grid';

const MostReadListProps = {
  enableGelGutters: true,
  enableGelMargins: true,
  columns: {
    group0: 18,
    group1: 18,
    group2: 18,
    group3: 18,
    group4: 24,
    group5: 60,
  },
};

const StyledOl = styled.ol.attrs({
  role: 'list',
})`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const MostReadList = ({ dir, children }) => (
  <StyledOl>
    <Grid {...MostReadListProps} dir={dir}>
      {children}
    </Grid>
  </StyledOl>
);

MostReadList.propTypes = {
  dir: oneOf(['rtl', 'ltr']),
  children: node.isRequired,
};

MostReadList.defaultProps = {
  dir: 'ltr',
};

export default MostReadList;
