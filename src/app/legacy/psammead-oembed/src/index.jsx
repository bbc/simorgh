import React from 'react';
import { string, shape } from 'prop-types';
import DOMPurify from 'dompurify';

const DOMPURIFY_CONFIG = {
  ADD_TAGS: ['iframe'],
};

const OEmbed = ({ oEmbed, className }) => {
  const { html } = oEmbed;
  const sanitizedHtml = DOMPurify.sanitize(html, DOMPURIFY_CONFIG);

  return (
    <div
      className={className}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  );
};

OEmbed.defaultProps = {
  className: null,
};

OEmbed.propTypes = {
  oEmbed: shape({
    html: string.isRequired,
  }).isRequired,
  className: string,
};

export default OEmbed;
