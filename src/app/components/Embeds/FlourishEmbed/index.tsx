import React from 'react';
import { Helmet } from 'react-helmet';
import { OEmbedData } from '../types';

const FlourishEmbed = (props: OEmbedData) => {
  const { width, height, iFrameSrc, iFrameTitle, iFrameId, sizeAdjustScript } =
    props;

  if (iFrameSrc == null) {
    return null;
  }

  return (
    <React.Fragment>
      <Helmet>
        <script>{sizeAdjustScript}</script>
      </Helmet>
      <iframe
        className="max-w-full px-full mb-triple group-2:px-double group-4:px-0"
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

export default FlourishEmbed;
