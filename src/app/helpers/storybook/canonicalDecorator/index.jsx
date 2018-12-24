import React from 'react';
import GlobalStyle from '../../../lib/globalStyles';

const CanonicalDecorator = storyFn => (
  <React.Fragment>
    <GlobalStyle />
    {storyFn()}
  </React.Fragment>
);

export default CanonicalDecorator;
