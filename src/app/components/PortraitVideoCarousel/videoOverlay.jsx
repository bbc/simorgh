import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { resetCss } from './resetCss';

const convertStringToNumber = val => parseInt(val, 10);

const createSize = sizeInPixels => {
  const size =
    typeof sizeInPixels === 'string'
      ? convertStringToNumber(sizeInPixels)
      : sizeInPixels;

  return `${size / 16}rem`;
};

// See: https://confluence.dev.bbc.co.uk/display/mp/Writing+HTML5+Plugins
// Needs to be above the subtitles so the share-tools popover is not obscured by the subtitles.
const Z_INDEX_ABOVE_SMP_CONTROLS = '200';
const SPACING_4 = '16px';
const SPACING_2 = '8px';
const SPACING_7 = '28px';

const VideoOverlayWrapper = styled.div`
  z-index: ${Z_INDEX_ABOVE_SMP_CONTROLS};
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  container-type: inline-size;
`;

const VideoOverlayFooterContents = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: ${SPACING_4};
  max-width: ${createSize(1240)};
  margin: auto;
  align-items: flex-end;
`;

const VideoOverlayFooter = styled.div`
  position: absolute;
  left: ${SPACING_2};
  right: ${SPACING_2};
  bottom: 0;
  padding-bottom: ${createSize(16)};
  opacity: ${({ controlsDisplayed }) => (controlsDisplayed ? '1' : '0')};

  @supports not (container-type: inline-size) {
    display: none;
  }

  @container (min-width: ${createSize(320)}) {
    padding-bottom: ${createSize(80)};
    left: ${SPACING_4};
    right: ${SPACING_4};
  }

  @container (min-width: ${createSize(500)}) {
    left: ${SPACING_7};
    right: ${SPACING_7};
  }

  @container (min-width: ${createSize(860)}) {
    padding-bottom: ${createSize(140)};
    left: ${SPACING_4};
    right: ${SPACING_4};
  }
`;

const ShareTool = styled.div`
  margin-left: auto;
  pointer-events: auto;
  color: pink;
`;

const ShareToolWrapper = styled.div`
  margin-left: auto;
  pointer-events: auto;
`;

const ShareToolComponent = ({ shareUrlPath }) => {
  const [shareUrl, setShareUrl] = useState();

  useEffect(() => {
    setShareUrl(`https://bbc.com${shareUrlPath}`);
  }, [shareUrlPath]);
  return (
    <ShareToolWrapper key={shareUrlPath}>
      <ShareTool>
        <a href={shareUrl}>SHARE</a>
      </ShareTool>
    </ShareToolWrapper>
  );
};

const VideoOverlay = ({ blocks, index }) => {
  const currentItem = blocks?.[index];
  const { shareUrl } = currentItem?.model?.video || {};

  return (
    <>
      {/*
        Apply a CSS reset as this component is rendered inside of an SMP plugin using shadow-dom.
        For webcore components to be displayed correctly, we must apply the CSS reset that is normally available on the page.
      */}
      <style>{resetCss}</style>
      <VideoOverlayWrapper>
        <VideoOverlayFooter
          className="video-overlay-footer fadedIn fadedOut"
          controlsDisplayed
          // The video-overlay plugin will use this attribute to instruct SMP not to render subtitles in the space occupied by this div.
          data-region-exclude-subtitles
        >
          <VideoOverlayFooterContents className="video-overlay-footer-contents">
            <ShareToolComponent shareUrlPath={shareUrl} />
          </VideoOverlayFooterContents>
        </VideoOverlayFooter>
      </VideoOverlayWrapper>
    </>
  );
};

export default VideoOverlay;
