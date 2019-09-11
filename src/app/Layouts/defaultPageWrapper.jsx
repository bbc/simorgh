import React from 'react';
import { node } from 'prop-types';
import HeaderContainer from '../containers/Header';
import FooterContainer from '../containers/Footer';

const PageWrapper = ({ children }) => (
  <>
    <HeaderContainer />
    {children}
    <FooterContainer />
  </>
);

PageWrapper.propTypes = {
  children: node.isRequired,
};

export default PageWrapper;
