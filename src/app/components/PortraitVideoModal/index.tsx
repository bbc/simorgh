/** @jsx jsx */
/* @jsxFrag React.Fragment */
import { Global, jsx } from '@emotion/react';
import React, { use, useCallback, useEffect, useRef, useState } from 'react';
import moment from 'moment-timezone';
import MediaLoader from '#app/components/MediaLoader';
import {
  PortraitClipMediaBlock,
  SMPEvent,
} from '#app/components/MediaLoader/types';
import { navigationIcons } from '#psammead/psammead-assets/src/svgs';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { EventTrackingData } from '#app/lib/analyticsUtils/types';
import useViewTracker from '../../hooks/useViewTracker';
import useSwipeTracker from '../../hooks/useSwipeTracker';
import styles from './index.styles';
import VisuallyHiddenText from '../VisuallyHiddenText';
import { DownArrowIcon, UpArrowIcon } from '../icons';

type ModalTrackingParameters = {
  eventTrackingData: EventTrackingData;
  selectedVideo: PortraitClipMediaBlock;
  selectedVideoIndex: number;
};

const getEventTrackingData = ({
  eventTrackingData,
  selectedVideo,
  selectedVideoIndex,
}: ModalTrackingParameters) => {
  const {
    id,
    title,
    version: { duration },
  } = selectedVideo.model.video;

  return {
    componentName: 'portrait-video-modal',
    alwaysInView: true,
    groupTracker: {
      ...eventTrackingData.groupTracker,
      type: 'portrait-video-modal',
    },
    itemTracker: {
      type: 'portrait-video',
      text: title,
      mediaType: 'video',
      position: selectedVideoIndex + 1,
      duration: moment.duration(duration).asMilliseconds(),
      resourceId: id,
    },
  };
};

const getPlayerInstance = () =>
  window?.embeddedMedia?.api?.players()?.bbcMediaPlayer0;

export const playlistLoadedCallback = (
  e: SMPEvent,
  blocks: PortraitClipMediaBlock[],
) => {
  const player = getPlayerInstance();

  if (!player) return;

  const { playlist } = e || {};
  const [currentItem] = playlist?.items || [];
  const currentId = currentItem?.vpid || currentItem?.versionID;

  const currentIndex = blocks?.findIndex(
    item =>
      item.model.video.id === currentId ||
      item.model.video.version.id === currentId,
  );

  console.log('$$$$$$$$$$$$$$$$$$%%%%%%%%%%%%%%%%%%');
  console.log(`PLAYLIST\n ${Object.keys(e.playlist)}`);
  console.log(`PLAYLIST ITEMS\n ${Object.keys(e.playlist?.items[0])}`);
  console.log(`versionID\n ${e.playlist?.items[0].versionID}`);
  console.log(`vpid\n ${e.playlist?.items[0].vpid}`);
  console.log(`currentIndex\n ${JSON.stringify(blocks[currentIndex])}`);
  console.log('$$$$$$$$$$$$$$$$$$%%%%%%%%%%%%%%%%%%');

  const prevVideoButton = document.getElementById('previous-video-button');
  const nextVideoButton = document.getElementById('next-video-button');

  // Handle disabling buttons based on current index
  if (currentIndex === 0) {
    prevVideoButton?.setAttribute('disabled', 'true');
    nextVideoButton?.removeAttribute('disabled');
  } else if (currentIndex === blocks.length - 1) {
    prevVideoButton?.removeAttribute('disabled');
    nextVideoButton?.setAttribute('disabled', 'true');
  } else {
    prevVideoButton?.removeAttribute('disabled');
    nextVideoButton?.removeAttribute('disabled');
  }

  const previous = blocks?.[currentIndex - 1]?.model;
  const next = blocks?.[currentIndex + 1]?.model;

  if (previous) {
    player.setPreviousPlaylist(
      {
        title: previous?.video?.title ?? '',
        holdingImageURL: previous?.video?.holdingImageURL ?? '',
        items: [{ versionID: previous?.video?.version?.id }],
      },
      { statsObject: { clipPID: previous?.video?.id } },
    );
  }

  if (next) {
    player.queuePlaylist(
      {
        title: next?.video?.title ?? '',
        holdingImageURL: next?.video?.holdingImageURL ?? '',
        items: [{ versionID: next?.video?.version?.id }],
      },
      { statsObject: { clipPID: next?.video?.id } },
    );
  }
};

const pluginLoadedCallback = () => {
  const player = getPlayerInstance();
  player.dispatchEvent('fullScreenPlugin.launchFullscreen');
};

const statsNavigationCallback = async (
  e,
  blocks,
  eventTrackingData,
  swipeTracker,
) => {
  const { direction, method } = e;

  if (['swipe', 'wheel'].includes(method)) {
    const { playlist } = e || {};
    const [currentItem] = playlist?.items || [];
    const currentId = currentItem?.vpid || currentItem?.versionID;
    const currentIndex = blocks?.findIndex(
      item =>
        item.model.video.id === currentId ||
        item.model.video.version.id === currentId,
    );

    const newIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;

    const newEventTrackingData = getEventTrackingData({
      eventTrackingData,
      selectedVideo: blocks?.[newIndex],
      selectedVideoIndex: newIndex,
    });

    console.log('$$$$$$$$$$$$$$$$$$%%%%%%%%%%%%%%%%%%');
    console.log(`NEW DATA\n ${JSON.stringify(blocks?.[newIndex])}`);
    console.log('$$$$$$$$$$$$$$$$$$%%%%%%%%%%%%%%%%%%');

    await swipeTracker(newEventTrackingData);
  }
};

const playbackEndedCallback = async (
  e,
  blocks,
  eventTrackingData,
  swipeTracker,
) => {
  //   https://html.spec.whatwg.org/multipage/media.html#ended-playback
  //   https://confluence.dev.bbc.co.uk/spaces/mp/pages/73323849/Common+Problems+and+Questions+embedding+SMP#CommonProblemsandQuestionsembeddingSMP-Didyouknowthere'sapauseeventjustbeforetheend%3F
  //   https://confluence.dev.bbc.co.uk/spaces/mp/pages/73309931/SMP+Events
  //   SMP Event: pause
  //   IF autoplay: true, IN SMP CONFIG AND VIDEO HAS ENDED
  //   THEN ASSUME THE NEXT VIDEO WILL BE PLAYED
  //   AND FIRE OFF VIEW EVENT
  //   NOTE
  //   CONSIDER FIRING THE BEACON ON playlistLoaded EVENT IF THE VIDEO WASN'T TRIGGERED VIA SWIPING
  const player = getPlayerInstance();
  const { ended } = e;
  const { autoplay } = player.settings();

  // console.log('$$$$$$$$$$$$$$$$$$%%%%%%%%%%%%%%%%%%');
  // console.log(`THE VIDEO HAS PLAYBACK HAS ENDED --- ENDED: ${ended}`);
  // console.log(
  //   `VIDEO DETAILS --- PLAYLIST: ${JSON.stringify(player.playlist().items[0].versionID)}`,
  // );
  // console.log(
  //   `VIDEO DETAILS --- PLAYLIST: ${JSON.stringify(player.playlist().items[0].vpid)}`,
  // );
  // console.log('$$$$$$$$$$$$$$$$$$%%%%%%%%%%%%%%%%%%');

  if (ended && autoplay) {
    const playlist = player.playlist();
    const [currentItem] = playlist.items || [];
    const currentId = currentItem?.vpid || currentItem?.versionID;
    const currentIndex = blocks?.findIndex(
      item =>
        item.model.video.id === currentId ||
        item.model.video.version.id === currentId,
    );

    const newIndex = currentIndex + 1;

    const newEventTrackingData = getEventTrackingData({
      eventTrackingData,
      selectedVideo: blocks?.[newIndex],
      selectedVideoIndex: newIndex,
    });

    console.log('$$$$$$$$$$$$$$$$$$%%%%%%%%%%%%%%%%%%');
    console.log(`NEW DATA\n ${JSON.stringify(blocks?.[newIndex])}`);
    console.log('$$$$$$$$$$$$$$$$$$%%%%%%%%%%%%%%%%%%');

    await swipeTracker(newEventTrackingData);
  }
};

const handlePrevNextVideo = (direction: 'previous' | 'next') => {
  const player = getPlayerInstance();

  player?.[direction]?.();
};

export interface PortraitVideoModalProps {
  blocks: PortraitClipMediaBlock[];
  onClose: () => void;
  selectedVideoIndex: number;
  eventTrackingData: EventTrackingData;
}

const PortraitVideoModal = ({
  blocks,
  onClose,
  selectedVideoIndex,
  eventTrackingData,
}: PortraitVideoModalProps) => {
  const {
    translations: {
      media: {
        closeVideo = 'Close',
        modalLabel = 'Media player',
        endOfContentClose = 'End of content. Close',
      },
    },
  } = use(ServiceContext);

  const viewTracker = useViewTracker(
    getEventTrackingData({
      eventTrackingData,
      selectedVideo: blocks?.[selectedVideoIndex],
      selectedVideoIndex,
    }),
  );

  const swipeTracker = useSwipeTracker(
    getEventTrackingData({
      eventTrackingData,
      selectedVideo: blocks?.[selectedVideoIndex],
      selectedVideoIndex,
    }),
  );

  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const endOfContentButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleBackdropClick = (event: MouseEvent | TouchEvent) => {
      if (event.target === event.currentTarget) {
        onClose();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
      // - Tab/Shift+Tab loops focus between the close button and the end-of-content button
      if (event.key === 'Tab') {
        if (
          document.activeElement === closeButtonRef.current &&
          event.shiftKey
        ) {
          event.preventDefault();
          endOfContentButtonRef.current?.focus();
        } else if (
          document.activeElement === endOfContentButtonRef.current &&
          !event.shiftKey
        ) {
          event.preventDefault();
          closeButtonRef.current?.focus();
        }
      }
    };

    const modal = document.getElementById('portrait-video-modal-container');
    const reactRootElement = document.getElementById('root');

    if (modal) {
      closeButtonRef.current?.focus();
      // Prevent tabbing to elements outside the modal
      reactRootElement?.setAttribute('inert', 'true');
      modal.addEventListener('mousedown', handleBackdropClick);
      modal.addEventListener('touchstart', handleBackdropClick);
      modal.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      reactRootElement?.removeAttribute('inert');
      modal?.removeEventListener('mousedown', handleBackdropClick);
      modal?.removeEventListener('touchstart', handleBackdropClick);
      modal?.removeEventListener('keydown', handleKeyDown);

      const player = getPlayerInstance();
      // Pause any player if the modal is closed instantly
      if (player) player.pause();
    };
  }, [onClose]);

  return (
    <>
      <Global styles={styles.bodyOverflowHidden} />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={modalLabel}
        css={styles.modal}
        id="portrait-video-modal-container"
        {...viewTracker}
      >
        <button
          ref={closeButtonRef}
          type="button"
          data-testid="close-modal-button"
          css={styles.closeButton}
          className="focusIndicatorInvert"
          onClick={onClose}
        >
          {navigationIcons.cross}
          <VisuallyHiddenText>{closeVideo}</VisuallyHiddenText>
        </button>
        {/* Navigation Buttons */}
        <div css={styles.navButtonColumn}>
          <button
            id="previous-video-button"
            type="button"
            onClick={() => handlePrevNextVideo('previous')}
            css={styles.navButton}
            aria-label="Previous video"
            data-testid="previous-video-button"
            className="focusIndicatorInvert"
          >
            <UpArrowIcon />
          </button>
          <button
            id="next-video-button"
            type="button"
            onClick={() => handlePrevNextVideo('next')}
            css={styles.navButton}
            aria-label="Next video"
            data-testid="next-video-button"
            className="focusIndicatorInvert"
          >
            <DownArrowIcon />
          </button>
        </div>
        <MediaLoader
          css={styles.mediaWrapper}
          blocks={[blocks?.[selectedVideoIndex]]}
          eventMapping={{
            playlistLoaded: e => playlistLoadedCallback(e, blocks),
            pluginLoaded: pluginLoadedCallback,
            fullscreenExit: onClose,
            statsNavigation: e =>
              statsNavigationCallback(
                e,
                blocks,
                eventTrackingData,
                swipeTracker,
              ),
            pause: e =>
              playbackEndedCallback(e, blocks, eventTrackingData, swipeTracker),
          }}
        />
        <button
          ref={endOfContentButtonRef}
          type="button"
          data-testid="close-modal-visually-hidden"
          css={styles.visuallyHiddenCloseButton}
          onClick={onClose}
          className="focusIndicatorInvert"
          aria-label="End of content. Close"
        >
          {endOfContentClose}
        </button>
      </div>
    </>
  );
};

export default PortraitVideoModal;
