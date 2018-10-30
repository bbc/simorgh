import React from 'react';
import { node } from 'prop-types';

const MainContent = ({ children }) => <main role="main">{children}</main>;

MainContent.propTypes = {
  children: node.isRequired,
};

export default MainContent;
