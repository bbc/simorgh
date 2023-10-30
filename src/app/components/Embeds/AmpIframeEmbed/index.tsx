/* eslint-disable react/destructuring-assignment */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import AmpIframe from '../../AmpIframe';
import { ampParams } from '../types';
import styles from './index.styles';

type Props = {
  parameters: ampParams;
  url: string;
};
const AmpIframeEmbed = ({ parameters, url }: Props) => {
  return (
    <div css={styles.embedDiv}>
      <AmpIframe
        ampMetadata={{
          imageWidth: parameters['amp-image-width'],
          imageHeight: parameters['amp-image-height'],
          image: parameters['amp-image'],
          src: url,
        }}
      />
    </div>
  );
};

export default AmpIframeEmbed;
