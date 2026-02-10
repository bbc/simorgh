import { useEffect, useState } from 'react';
import ShareButton from '../../ShareButton';
import styles from './index.styles';

const ShareToolComponent = ({ shareUrlPath, title }) => {
  const [shareUrl, setShareUrl] = useState('');

  useEffect(() => {
    setShareUrl(`https://bbc.com${shareUrlPath}`);
  }, [shareUrlPath]);
  return (
    <div key={shareUrlPath} css={styles.shareToolWrapper}>
      <ShareButton title={title} url={shareUrl} />
    </div>
  );
};

const VideoOverlay = ({ currentItem, controlsDisplayed }) => {
  const { shareUrl, title } = currentItem?.model?.video || {};

  return (
    <div css={styles.overlayWrapper}>
      <div
        className="video-overlay-footer fadedIn fadedOut"
        // The video-overlay plugin will use this attribute to instruct SMP not to render subtitles in the space occupied by this div.
        data-region-exclude-subtitles
        css={[
          styles.overlayFooter,
          controlsDisplayed ? 'opacity: 1' : 'opacity: 0',
        ]}
      >
        <div
          className="video-overlay-footer-contents"
          css={styles.overlayFooterContents}
        >
          <ShareToolComponent shareUrlPath={shareUrl} title={title} />
        </div>
      </div>
    </div>
  );
};

export default VideoOverlay;
