/* eslint-disable camelcase */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import { use } from 'react';
import pathOr from 'ramda/src/pathOr';
import { RequestContext } from '../../../contexts/RequestContext';
import { ServiceContext } from '../../../contexts/ServiceContext';
import EmbedError from '../EmbedError';

const UnsupportedEmbed = () => {
  const { isAmp, canonicalLink } = use(RequestContext);
  const { translations } = use(ServiceContext);

  if (isAmp) {
    const errorMessage = pathOr(
      'Sorry, we can’t display this part of the story on this lightweight mobile page.',
      ['include', 'errorMessage'],
      translations,
    );

    const linkText = pathOr(
      'View the full version of the page to see all the content.',
      ['include', 'linkText'],
      translations,
    );

    return (
      <EmbedError
        message={errorMessage}
        link={{
          text: linkText,
          href: canonicalLink,
        }}
      />
    );
  }

  return null;
};

export default UnsupportedEmbed;
