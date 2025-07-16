/* eslint-disable react/destructuring-assignment */
import AmpIframe from '../../AmpIframe';
import { ampParams } from '../types';
import styles from './index.module.css';

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
    <div className={styles.embedDiv}>
      <AmpIframe ampMetadata={{ imageWidth, imageHeight, image, src: url }} />
    </div>
  );
};

export default AmpIframeEmbed;
