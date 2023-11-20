/* eslint-disable camelcase */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import { useContext } from 'react';
import pathOr from 'ramda/src/pathOr';
import { RequestContext } from '../../../contexts/RequestContext';
import { ServiceContext } from '../../../contexts/ServiceContext';
import Uploader from '../Uploader';
import EmbedError from '../EmbedError';
import { UnsupportedEmbedProps } from '../types';

const UnsupportedEmbed = (props: UnsupportedEmbedProps) => {
  const { blocks, provider } = props;
  const { isAmp, canonicalLink } = useContext(RequestContext);
  const { translations } = useContext(ServiceContext);

  // delete this if() statement once BFF PR WSTEAM1-313-handle-unsupported-embeds is promoted to live
  if (provider === 'ugc-uploader') {
    return <Uploader blocks={blocks} />;
  }

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
