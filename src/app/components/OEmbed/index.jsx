import React from 'react';
import { string } from 'prop-types';

const OEmbed = ({ html }) => {
  // eslint-disable-next-line react/no-danger
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};

OEmbed.propTypes = {
  html: string.isRequired,
};

export default OEmbed;
