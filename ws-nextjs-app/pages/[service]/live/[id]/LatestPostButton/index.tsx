import type { RefObject } from 'react';
import { use, useEffect, useState, useRef } from 'react';
import { ServiceContext } from '#app/contexts/ServiceContext';
import VisuallyHiddenText from '#app/components/VisuallyHiddenText';
import styles from './styles';

const RefreshSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
    <path d="M31.1 2.5H1v2.8h30.1zM14.3 13.3 31 29.5v-6.7L16 8.1.9 22.8v6.7l16.8-16.2z" />
  </svg>
);

interface LatestPostButtonProps {
  streamRef: RefObject<HTMLDivElement>;
  isFirstPostVisible: boolean;
  hasPendingUpdate: boolean;
}

const LatestPostButton = ({
  streamRef,
  isFirstPostVisible,
  hasPendingUpdate,
}: LatestPostButtonProps) => {
  const [leftPosition, setLeftPosition] = useState('50%');
  const buttonRef = useRef<HTMLButtonElement>(null);

  const {
    translations: {
      liveExperiencePage: { refreshButtonText = 'Latest Post' },
    },
  } = use(ServiceContext);

  useEffect(() => {
    const updatePosition = () => {
      const streamContainerWidth = streamRef.current.clientWidth;
      const streamContainerLeftPosition =
        streamRef.current.getBoundingClientRect().x;

      if (streamContainerWidth !== 0) {
        setLeftPosition(
          `${streamContainerLeftPosition + streamContainerWidth / 2}px`,
        );
      }
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    return () => {
      window.removeEventListener('resize', updatePosition);
    };
  }, [streamRef]);

  const handleClick = async () => {
    const hasReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    const streamContainer = document.getElementById('stream-container');
    if (streamContainer) {
      streamContainer.scrollIntoView({
        behavior: hasReducedMotion ? 'auto' : 'smooth',
      });
    }
  };

  console.log(isFirstPostVisible, hasPendingUpdate);
  const showButton = !isFirstPostVisible && hasPendingUpdate;

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={handleClick}
      css={styles.button}
      tabIndex={showButton ? 0 : -1}
      aria-live="polite"
      aria-atomic="true"
      style={{
        left: `${leftPosition}`,
        display: showButton ? 'inline-flex' : 'none',
        transform:
          leftPosition === '50%' ? 'translateX(-50%)' : 'translateX(-50%)',
      }}
    >
      <RefreshSvg />
      <span>{refreshButtonText}</span>
      <VisuallyHiddenText>,is now available.</VisuallyHiddenText>
    </button>
  );
};

export default LatestPostButton;
