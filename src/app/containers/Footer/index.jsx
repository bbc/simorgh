import React, { useContext, Fragment } from 'react';
import { ServiceContext } from '../../contexts/ServiceContext';
import BrandContainer from '../Brand';

const currentYear = () => new Date().getFullYear();
const getCopyrightText = text => (
  <Fragment>
    <span lang="en-GB">{`\u00A9`} </span>
    {`${currentYear()} ${text}`}
  </Fragment>
);

const FooterContainer = () => {
  const { footer, service } = useContext(ServiceContext);

  if (!footer) {
    return null;
  }

  const { externalLink, links, copyrightText } = footer;

  return <footer role="contentinfo">footer</footer>;
};

export default FooterContainer;
