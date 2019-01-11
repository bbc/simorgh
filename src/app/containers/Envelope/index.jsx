import React, { Fragment } from 'react';
import Helmet from 'helmet';
import { string, array } from 'prop-types';

// @TODO - use `canonicalUrl` to create the AMP version markup
const Envelope = ({ canonicalUrl, head, bodyInline, bodyLast }) => (
  <Fragment>
    {head.length > 0 ? (
      <Helmet>
        {head.map(style => (
          <link rel="stylesheet" href={style} />
        ))}
      </Helmet>
    ) : null}
    <div dangerouslySetInnerHTML={{ __html: bodyInline }} />
    {/* @TODO - need a 'footer' solution for `bodyLast` */}
  </Fragment>
);

const EnvelopeContainer = ({ blocks }) => {
  const attributes = blocks[0].model;
  return <Envelope {...attributes} />;
};

Envelope.propTypes = {
  canonicalUrl: string.isRequired,
  head: array.isRequired,
  bodyInline: string.isRequired,
  bodyLast: array.isRequired,
};

export default EnvelopeContainer;
