import React from 'react';
import { arrayOf, element } from 'prop-types';

const MainContent = ({ children }) => <main role="main">{children}</main>;

MainContent.propTypes = {
  children: arrayOf(element).isRequired,
};

export default MainContent;
