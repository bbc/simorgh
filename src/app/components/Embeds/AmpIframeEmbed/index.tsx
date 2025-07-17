/* eslint-disable react/destructuring-assignment */
import React from 'react';
import AmpIframe from '../../AmpIframe';
import { ampParams } from '../types';

type Props = {
  parameters: ampParams;
  url: string;
};
const AmpIframeEmbed = ({ parameters, url }: Props) => {
  const {
    'amp-image-width': imageWidth,
    'amp-image-height': imageHeight,
    'amp-image': image,
  } = parameters;

  return (
    <div className="max-w-full pb-triple">
      <AmpIframe ampMetadata={{ imageWidth, imageHeight, image, src: url }} />
    </div>
  );
};

export default AmpIframeEmbed;
