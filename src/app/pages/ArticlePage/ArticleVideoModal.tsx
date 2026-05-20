import { Global } from '@emotion/react';
import { createPortal } from 'react-dom';
import { type RefObject, use, useEffect, useMemo, useRef } from 'react';
import { navigationIcons } from '#psammead/psammead-assets/src/svgs';
import MediaLoader from '#app/components/MediaLoader';
import { MediaBlock, Player } from '#app/components/MediaLoader/types';
import { ServiceContext } from '#app/contexts/ServiceContext';
import {
  RequestContext,
  type RequestContextProps,
} from '#app/contexts/RequestContext';
import { MEDIA_ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
import useHydrationDetection from '#app/hooks/useHydrationDetection';
import VisuallyHiddenText from '#app/components/VisuallyHiddenText';
import styles from './ArticleVideoModal.styles';

const getAllPlayerInstances = () => {
  if (typeof window === 'undefined') return [];

  const playerInstances = window.embeddedMedia?.api?.players();
  if (!playerInstances) return [];

  return Object.values(playerInstances) as Player[];
};

type Props = {
  articleContentRef: RefObject<HTMLDivElement | null>;
  blocks: MediaBlock[];
  onClose: () => void;
};

const ArticleVideoModal = ({ articleContentRef, blocks, onClose }: Props) => {
  const requestContext = use(RequestContext);
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

  const mediaRequestContext = useMemo<RequestContextProps>(
    () => ({
      ...requestContext,
      pageType: MEDIA_ARTICLE_PAGE,
    }),
    [requestContext],
  );

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

    const modal = document.getElementById('article-video-modal');
    const articleContent = articleContentRef.current;

    closeButtonRef.current?.focus();
    articleContent?.setAttribute('inert', 'true');
    modal?.addEventListener('keydown', handleKeyDown);

    return () => {
      articleContent?.removeAttribute('inert');
      modal?.removeEventListener('keydown', handleKeyDown);

      getAllPlayerInstances().forEach(player => {
        player.pause();
      });
    };
  }, [articleContentRef, isHydrated, onClose]);

  if (!isHydrated) return null;

  return createPortal(
    <>
      <Global styles={styles.bodyOverflowHidden} />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={modalLabel}
        id="article-video-modal"
        css={styles.modal}
      >
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
          {/* Reuse mediaArticle behaviour so /watch opens SMP rather than the article placeholder. */}
          <RequestContext.Provider value={mediaRequestContext}>
            <MediaLoader blocks={blocks} />
          </RequestContext.Provider>
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

export default ArticleVideoModal;
