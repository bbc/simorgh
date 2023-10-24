/** @jsx jsx */
import { jsx } from '@emotion/react';
import { useContext } from 'react';
import pathOr from 'ramda/src/pathOr';
import { ServiceContext } from '../../../contexts/ServiceContext';
import EmbedError from '../EmbedError';
import VjAmp from '../../../legacy/containers/Include/amp/VjAmp';
import styles from '../EmbedHtml/index.styles';

export type ampParams = {
  'amp-clickable': boolean;
  'amp-image-height': number;
  'amp-image-width': number;
  'amp-image': string;
};

export type OEmbedAmpProps = {
  isVDJEmbed: boolean;
  canonicalLink: string;
  parameters?: ampParams;
  url?: string;
};

const EmbedAmp = ({
  isVDJEmbed,
  canonicalLink,
  parameters,
  url,
}: OEmbedAmpProps) => {
  const { translations } = useContext(ServiceContext);

  if (isVDJEmbed) {
    if (!parameters) return null;

    const ampMetadata = {
      imageWidth: parameters['amp-image-width']?.toString(),
      imageHeight: parameters['amp-image-height']?.toString(),
      image: parameters['amp-image'],
      src: url,
    };

    return (
      <div css={styles.embedDiv}>
        <VjAmp ampMetadata={ampMetadata} />
      </div>
    );
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
};

export default EmbedAmp;
