import { Global } from '@emotion/react';
import { createPortal } from 'react-dom';
import { type RefObject, use, useEffect, useRef } from 'react';
import { navigationIcons } from '#psammead/psammead-assets/src/svgs';
import MediaLoader from '#app/components/MediaLoader';
import { MediaBlock, Player } from '#app/components/MediaLoader/types';
import { ServiceContext } from '#app/contexts/ServiceContext';
import useHydrationDetection from '#app/hooks/useHydrationDetection';
import VisuallyHiddenText from '#app/components/VisuallyHiddenText';
import styles from './MediaArticleVideoModal.styles';

const modalId = 'media-article-video-modal';

const getAllPlayerInstances = () => {
  if (typeof window === 'undefined') return [];

  const playerInstances = window.embeddedMedia?.api?.players();
  if (!playerInstances) return [];

  return Object.values(playerInstances) as Player[];
};

type Props = {
  pageContentRef: RefObject<HTMLDivElement | null>;
  blocks: MediaBlock[];
  onClose: () => void;
};

const MediaArticleVideoModal = ({ pageContentRef, blocks, onClose }: Props) => {
  const {
    translations: {
      media: {
        closeVideo = 'Close',
        modalLabel = 'Media player',
        endOfContentClose = 'End of content. Close',
      },
    },
  } = use(ServiceContext);
  const isHydrated = useHydrationDetection();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const endOfContentButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isHydrated) return undefined;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }

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

    const modal = document.getElementById(modalId);
    const pageContent = pageContentRef.current;

    closeButtonRef.current?.focus();
    pageContent?.setAttribute('inert', 'true');
    modal?.addEventListener('keydown', handleKeyDown);

    return () => {
      pageContent?.removeAttribute('inert');
      modal?.removeEventListener('keydown', handleKeyDown);

      getAllPlayerInstances().forEach(player => {
        player.pause();
      });
    };
  }, [isHydrated, onClose, pageContentRef]);

  if (!isHydrated) return null;

  return createPortal(
    <>
      <Global styles={styles.bodyOverflowHidden} />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={modalLabel}
        id={modalId}
        css={styles.modal}
      >
        <div css={styles.modalContent}>
          <button
            ref={closeButtonRef}
            type="button"
            css={styles.closeButton}
            className="focusIndicatorInvert"
            onClick={onClose}
          >
            {navigationIcons.cross}
            <VisuallyHiddenText>{closeVideo}</VisuallyHiddenText>
          </button>
          <div css={styles.mediaWrapper}>
            <MediaLoader blocks={blocks} />
          </div>
        </div>
        <button
          ref={endOfContentButtonRef}
          type="button"
          css={styles.visuallyHiddenCloseButton}
          onClick={onClose}
          className="focusIndicatorInvert"
        >
          {endOfContentClose}
        </button>
      </div>
    </>,
    document.body,
  );
};

export default MediaArticleVideoModal;
