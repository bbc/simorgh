import { RefObject, use, useEffect, useState } from 'react';
import { ServiceContext } from '#app/contexts/ServiceContext';
import VisuallyHiddenText from '#app/components/VisuallyHiddenText';
import styles from './styles';

const TEN_SECONDS = 10 * 1000;

const RefreshSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
    <path d="M31.1 2.5H1v2.8h30.1zM14.3 13.3 31 29.5v-6.7L16 8.1.9 22.8v6.7l16.8-16.2z" />
  </svg>
);

interface LatestPostButtonProps {
  isFirstPostVisible: boolean;
  hasPendingUpdate: boolean;
  streamRef: RefObject<HTMLDivElement> | null;
}

const LatestPostButton = ({
  isFirstPostVisible,
  hasPendingUpdate,
  streamRef,
}: LatestPostButtonProps) => {
  const {
    translations: {
      liveExperiencePage: {
        refreshButtonText = 'Latest Post',
        visuallyHiddenButtonText = 'New post available',
      },
    },
  } = use(ServiceContext);

  const [showButton, setShowButton] = useState(false);

  const handleClick = async () => {
    const hasReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (streamRef) {
      const streamContainer = streamRef.current;
      streamContainer.scrollIntoView({
        behavior: hasReducedMotion ? 'auto' : 'smooth',
      });
    }
  };

  useEffect(() => {
    const updateShowButton = !isFirstPostVisible && hasPendingUpdate;
    if (updateShowButton) {
      setShowButton(updateShowButton);
      setTimeout(() => {
        setShowButton(false);
      }, TEN_SECONDS);
    } else {
      setShowButton(updateShowButton);
    }
  }, [isFirstPostVisible, hasPendingUpdate]);

  return (
    <div css={styles.container}>
      <VisuallyHiddenText aria-live="polite">
        {showButton && <span>{visuallyHiddenButtonText}</span>}
      </VisuallyHiddenText>
      {showButton ? (
        <button
          data-testid="latest-post-button"
          type="button"
          onClick={handleClick}
          css={styles.button}
          tabIndex={showButton ? 0 : -1}
          aria-live="polite"
          aria-atomic="true"
        >
          <RefreshSvg />
          <span>{refreshButtonText}</span>
        </button>
      ) : null}
    </div>
  );
};

export default LatestPostButton;
