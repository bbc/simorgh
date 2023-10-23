/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/react';
import { Helmet } from 'react-helmet';
import styles from './index.styles';
import { OEmbedData } from '../types';

const EmbedIFrame = (props: OEmbedData) => {
  const { width, height, iFrameSrc, iFrameTitle, iFrameId, sizeAdjustScript } =
    props;

  if (iFrameSrc == null) {
    return null;
  }

  return (
    <React.Fragment>
      <h1>TEST</h1>
      <Helmet>
        <script>{sizeAdjustScript}</script>
      </Helmet>
      <iframe
        css={styles.iframe}
        src={iFrameSrc}
        id={iFrameId}
        frameBorder="0"
        scrolling="no"
        height={height}
        width={width}
        title={iFrameTitle}
      />
    </React.Fragment>
  );
};

export default EmbedIFrame;
