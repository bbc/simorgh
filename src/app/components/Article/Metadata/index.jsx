import React from 'react';
import Helmet from 'react-helmet';
import { bool, string } from 'prop-types';

const Metadata = ({ amp, canonicalLink, lang, title }) => {
  const htmlAttributes = { lang };

  if (amp) {
    htmlAttributes.amp = amp;
  }

  return (
    <Helmet htmlAttributes={htmlAttributes}>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, minimum-scale=1"
      />
      <title>{title}</title>
      <link rel="canonical" href={canonicalLink} />
    </Helmet>
  );
};

Metadata.propTypes = {
  amp: bool.isRequired,
  canonicalLink: string.isRequired,
  lang: string.isRequired,
  title: string.isRequired,
};
export default Metadata;
