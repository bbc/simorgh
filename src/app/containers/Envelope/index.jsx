import React, { Fragment } from 'react';
import Helmet from 'helmet';
import { string, array } from 'prop-types';
import { PlatformContextConsumer } from '../../contexts/PlatformContext';

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

const AmpVjEnvelope = ({ canonicalUrl }) => (
  <amp-iframe
    width="640"
    height="360"
    sandbox="allow-scripts allow-same-origin allow-top-navigation-by-user-activation allow-forms"
    layout="responsive"
    frameborder="0"
    resizable=""
    src={canonicalUrl + '/amp'}
  >
    <amp-img
      width="640"
      height="360"
      layout="fill"
      {/* @TODO make fallback image dynamic - think about block structure */}
      src="https://c.files.bbci.co.uk/11763/production/_104632517_mp_vote_app_prom-nc.jpg"
      placeholder=""
    />
    <div overflow="" tabindex="0" role="button" aria-label="Read more">
      Read more
    </div>
  </amp-iframe>
);

const EnvelopeContainer = ({ blocks }) => {
  const attributes = blocks[0].model;
  return (
    <PlatformContextConsumer>
      {platform =>
        platform === 'amp' ? (
          <AmpVjEnvelope {...attributes} />
        ) : (
          <Envelope {...attributes} />
        )
      }
    </PlatformContextConsumer>
  );
};

Envelope.propTypes = {
  canonicalUrl: string.isRequired,
  head: array.isRequired,
  bodyInline: string.isRequired,
  bodyLast: array.isRequired,
};

export default EnvelopeContainer;
