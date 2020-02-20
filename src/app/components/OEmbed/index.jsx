/* eslint-disable react/no-danger */
import React from 'react';
import { string } from 'prop-types';
import DOMPurify from 'dompurify';

const OEmbed = ({ html }) => {
  const sanitizedHtml = DOMPurify.sanitize(html);
  return <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />;
};

OEmbed.propTypes = {
  html: string.isRequired,
};

export default OEmbed;
