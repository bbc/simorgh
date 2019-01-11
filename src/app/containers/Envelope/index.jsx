import React, { Fragment } from 'react';
import Helmet from 'react-helmet';
import { string, array, object } from 'prop-types';
import { PlatformContextConsumer } from '../../contexts/PlatformContext';

/**
 * @TODO There MUST be a library that does this...
 */
const stringToJsx = head => {
  const convertTags = tag => {
    if (tag.startsWith('<link')) {
      const cssUrl = tag.match(/<link(?:.)*href="(.+)"/)[1];
      return (
        <link
          rel="stylesheet"
          key={cssUrl} // React component needs `key` when iterating
          href={cssUrl}
        />
      );
    } else {
      throw `Tag "${tag}" not a recognised <head> element.`;
    }
  };
  return head.map(convertTags);
};

const Envelope = ({ head, bodyInline, bodyLast }) => (
  <Fragment>
    {head.length > 0 ? <Helmet>{stringToJsx(head)}</Helmet> : null}
    <div dangerouslySetInnerHTML={{ __html: bodyInline }} />
    {/* @TODO - need a 'footer' solution for `bodyLast` */}
  </Fragment>
);

const AmpVjEnvelope = ({ canonicalUrl, img }) => (
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
      width={img.width}
      height={img.height}
      layout="fill"
      src={img.url}
      placeholder=""
    />
    <div overflow="" tabIndex="0" role="button" aria-label="Read more">
      Read more
    </div>
  </amp-iframe>
);

const EnvelopeContainer = ({ blocks }) => {
  const envelope = blocks.find(block => block.type === 'rawEnvelope').model;
  const meta = blocks.find(block => block.type === 'meta').model;

  return (
    <PlatformContextConsumer>
      {platform =>
        platform === 'amp' ? (
          <AmpVjEnvelope {...meta} />
        ) : (
          <Envelope {...envelope} />
        )
      }
    </PlatformContextConsumer>
  );
};

Envelope.propTypes = {
  head: array.isRequired,
  bodyInline: string.isRequired,
  bodyLast: array.isRequired,
};

AmpVjEnvelope.propTypes = {
  canonicalUrl: string.isRequired,
  img: object.isRequired,
};

export default EnvelopeContainer;
