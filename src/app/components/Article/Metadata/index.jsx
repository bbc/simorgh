import React from 'react';
import Helmet from 'react-helmet';
import { shape, string } from 'prop-types';

const Metadata = ({ canonicalLink, htmlAttributes, title }) => (
  <Helmet htmlAttributes={htmlAttributes}>
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, minimum-scale=1"
    />
    <title>{title}</title>
    <link rel="canonical" href={canonicalLink} />
  </Helmet>
);

Metadata.propTypes = {
  canonicalLink: string.isRequired,
  htmlAttributes: shape({}).isRequired,
  title: string.isRequired,
};
export default Metadata;
