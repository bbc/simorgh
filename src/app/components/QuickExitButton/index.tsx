/** @jsx jsx */
import { useEffect, useRef } from 'react';
import { jsx } from '@emotion/react';
import styles from './index.styles';

const quickExitUrls = [
  'https://www.bbc.co.uk/weather',
  'https://www.bbc.co.uk/food',
  'https://www.google.com/search?q=supermarkets+near+me',
];

// Stops the page remaining visible while navigation is in progress
const blankPage = () => {
  document.body.innerHTML = '';
  document.body.style.backgroundColor = '#fff';
  document.title = '';
};

const QuickExitButton = () => {
  const shiftPressCount = useRef(0);
  const lastPressTime = useRef(0);
  const tapCount = useRef(0);
  const lastTapTime = useRef(0);

  const triggerQuickExit = () => {
    console.log('Quick exit triggered');
    localStorage.clear();
    sessionStorage.clear();
    blankPage();
    // navigates the browser to the specified URL
    // and replaces the current page in the session history.
    // This means the current page is removed from the browser's history stack,
    // so if the user tries to go back (using the back button),
    // they will not return to the sensitive page,
    // they will go to the page before it (if any).

    const randomIndex = Math.floor(Math.random() * quickExitUrls.length);
    window.location.replace(quickExitUrls[randomIndex]);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // esc did not work when I first tried. gov.uk uses 3 shift clicks but
      // how would people know todo this?
      if (event.key === 'Shift') {
        const now = Date.now();
        // Check if the Shift key was pressed within 1 second of the last press
        // like sticky keys
        if (now - lastPressTime.current < 1000) {
          shiftPressCount.current += 1;
        } else {
          shiftPressCount.current = 1;
        }
        lastPressTime.current = now;

        if (shiftPressCount.current === 3) {
          triggerQuickExit();
        }
      }
    };
    // users can tap the screen three times to trigger the quick exit
    const handleTouchStart = () => {
      const now = Date.now();
      if (now - lastTapTime.current < 1000) {
        tapCount.current += 1;
      } else {
        tapCount.current = 1;
      }
      lastTapTime.current = now;

      if (tapCount.current === 3) {
        triggerQuickExit();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
    };
  }, []);

  return (
    <button
      type="button"
      onClick={triggerQuickExit}
      css={styles.quickExitButton}
      aria-label="Quick exit"
      data-testid="quick-exit-button"
    >
      Quick Exit
    </button>
  );
};

export default QuickExitButton;
