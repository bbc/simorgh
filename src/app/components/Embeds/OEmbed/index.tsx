/* eslint-disable camelcase */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import { useContext } from 'react';
import pathOr from 'ramda/src/pathOr';
import { RequestContext } from '../../../contexts/RequestContext';
import { ServiceContext } from '../../../contexts/ServiceContext';
import EmbedHtml from '../EmbedHtml';
import EmbedError from '../EmbedError';
import VjAmp from '../../AmpIframe';
import styles from '../EmbedHtml/index.styles';
import { OEmbedProps, ampParams } from '../types';
import FlourishEmbed from '../FlourishEmbed';

export type OEmbedAmpProps = {
  isVDJEmbed: boolean;
  canonicalLink: string;
  parameters?: ampParams;
  url?: string;
};

const OEmbedLoader = ({ oembed }: OEmbedProps) => {
  const { isAmp, canonicalLink } = useContext(RequestContext);
  const { translations } = useContext(ServiceContext);
  const { html, provider_name, oEmbedType, parameters, url } = oembed;
  const isVDJEmbed = oEmbedType === 'vdj-embed';

  if (isAmp) {
    if (isVDJEmbed) {
      if (parameters && url) {
        const ampMetadata = {
          imageWidth: parameters['amp-image-width'],
          imageHeight: parameters['amp-image-height'],
          image: parameters['amp-image'],
          src: url,
        };

        return (
          <div css={styles.embedDiv}>
            <VjAmp ampMetadata={ampMetadata} />
          </div>
        );
      }
    }

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

  if (html == null) {
    return null;
  }

  if (provider_name === 'Flourish') {
    return <FlourishEmbed {...oembed} />;
  }

  return <EmbedHtml embeddableContent={html} />;
};

export default OEmbedLoader;
