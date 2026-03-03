import { Helmet } from 'react-helmet';
import styles from './index.styles';
import { OEmbedData } from '../types';

const FlourishEmbed = (props: OEmbedData, nonce?: string | null) => {
  const { width, height, iFrameSrc, iFrameTitle, iFrameId, sizeAdjustScript } =
    props;

  if (iFrameSrc == null) {
    return null;
  }

  return (
    <>
      <Helmet>
        <script {...(nonce ? { nonce } : {})}>{sizeAdjustScript}</script>
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
    </>
  );
};

export default FlourishEmbed;
