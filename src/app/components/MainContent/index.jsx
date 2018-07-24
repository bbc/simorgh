import React from 'react';
import { arrayOf, element } from 'prop-types';

const MainContent = ({ children }) => <div>{children}</div>;

MainContent.propTypes = {
  children: arrayOf(element).isRequired,
};

export default MainContent;
