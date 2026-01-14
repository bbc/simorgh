import { use } from 'react';
// import styled from '@emotion/styled';
import { ServiceContext } from '#app/contexts/ServiceContext';
import ShareButton from '../ShareButton';

// See: https://confluence.dev.bbc.co.uk/display/mp/Writing+HTML5+Plugins
// Needs to be above the subtitles so the share-tools popover is not obscured by the subtitles.
// const Z_INDEX_ABOVE_SMP_CONTROLS = '200';

// const VideoOverlayWrapper = styled.div`
//   z-index: ${Z_INDEX_ABOVE_SMP_CONTROLS};
//   position: absolute;
//   top: 0;
//   bottom: 0;
//   left: 0;
//   right: 0;
//   container-type: inline-size;
// `;

// const VideoOverlayHeader = styled.div`
//   position: absolute;
//   top: 0;
//   left: 0;
//   right: 0;
// `;

// const VideoOverlayFooterContents = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: space-between;
//   gap: '16px';
//   max-width: '77.5rem';
//   margin: auto;
//   align-items: flex-end;
// `;

// const Description = styled.div`
//   display: none;
//   a,
//   button {
//     pointer-events: auto;
//   }

//   @container (min-width: 20rem) {
//     display: block;
//   }
// `;

// const VideoOverlayFooter = styled.div`
//   position: absolute;
//   left: '8px';
//   right: '8px';
//   bottom: 0;
//   padding-bottom: '1rem';
//   @supports not (container-type: inline-size) {
//     display: none;
//   }

//   @container (min-width: '20rem}) {
//     padding-bottom: '5rem'
//     left: '8px';
//     right: '8px';
//   }

//   @container (min-width: '31.25rem) {
//     left: '32px';
//     right: '32px';
//   }

//   @container (min-width: '53.75rem') {
//     padding-bottom: '8.75rem';
//     left: '8px';
//     right: '8px';
//   }
// `;

// const ShareToolWrapper = styled.div`
//   margin-left: auto;
//   pointer-events: auto;
// `;

// const ShareToolComponent = ({
//   shareUrlPath,
//   currentlyPlayingKey,
//   shareTracking,
//   experimentTracking,
// }) => {
//   const [shareUrl, setShareUrl] = useState();

//   useEffect(() => {
//     const baseUrl = window.location.host;
//     setShareUrl(`https://${baseUrl}${shareUrlPath}`);
//   }, [shareUrlPath]);

//   return (
//     <ShareToolWrapper key={currentlyPlayingKey}>
//       <ShareTool
//         dismissBehaviour="manual"
//         mode="icon-only"
//         buttonEmphasis="high"
//         verticalAlignment="top"
//         horizontalAlignment="right"
//         url={shareUrl}
//         trackingMetadata={shareTracking}
//         experimentTracking={experimentTracking}
//       />
//     </ShareToolWrapper>
//   );
// };

const VideoOverlay = ({ blocks, selectedVideoIndex, hasShareApi }) => {
  const { service } = use(ServiceContext);
  let shareUrl = '';
  const { id: urn = '', title = '' } =
    blocks?.[selectedVideoIndex]?.model.video || {};

  if (hasShareApi) {
    const id = urn.split(':')[4];
    shareUrl = `https://www.bbc.com/${service}/articles/${id}`;
  }
  console.log('IN THE OVERLAY ', hasShareApi);

  return (
    <>
      {/*
        Apply a CSS reset as this component is rendered inside of an SMP plugin using shadow-dom.
        For webcore components to be displayed correctly, we must apply the CSS reset that is normally available on the page.
      */}
      <style>
        {`
    *, *::before, *::after {
      box-sizing: border-box;
    }
  `}
      </style>
      {/* <VideoOverlayWrapper>
        <VideoOverlayFooter
          className="video-overlay-footer fadedIn fadedOut"
          // The video-overlay plugin will use this attribute to instruct SMP not to render subtitles in the space occupied by this div.
          data-region-exclude-subtitles
        >
          <VideoOverlayFooterContents className="video-overlay-footer-contents"> */}
      <div
        data-region-exclude-subtitles
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 200,
          pointerEvents: 'none',
        }}
      >
        <div style={{ pointerEvents: 'auto' }}>
          {hasShareApi && (
            <ShareButton
              eventTrackingData={{
                componentName: urn,
              }}
              contentId={urn}
              headline={title}
              shareUrl={shareUrl}
              modal
            />
          )}
        </div>
      </div>
      {/* </VideoOverlayFooterContents>
        </VideoOverlayFooter>
      </VideoOverlayWrapper> */}
    </>
  );
};

export default VideoOverlay;
