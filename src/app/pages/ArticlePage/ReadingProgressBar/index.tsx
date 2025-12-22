import { useEffect, useRef, useState, RefObject } from 'react';
import { useTheme } from '@emotion/react';

type ReadingProgressBarProps = {
  targetRef: RefObject<HTMLElement | null>;
  showAllContent?: boolean;
  hasContinueReadingButton?: boolean;
};

const barWrapperStyles = {
  position: 'sticky',
  top: 0,
  left: 0,
  width: '100%',
  zIndex: 9999,
  background: 'transparent',
  height: 4,
};

const progressBarStyles = (palette, width: number) => ({
  display: 'block',
  height: 4,
  width: `${width}%`,
  background: palette.POSTBOX,
  borderRadius: 2,
  transition: 'width 0.06s ease-in',
});

const ReadingProgressBar = ({
  targetRef,
  showAllContent = true,
  hasContinueReadingButton = false,
}: ReadingProgressBarProps) => {
  // Initialises state to track the progress percentage.
  const [progress, setProgress] = useState(0);
  const { palette } = useTheme();
  const ticking = useRef(false);

  useEffect(() => {
    // Defines a function to calculate progress, exiting if the ref is not set.
    const handleScroll = () => {
      if (!targetRef.current) return;

      // getBoundingClientRect is a DOM method that returns the size and position of an element relative to the viewport.
      // it provides an object with properties like top, right, bottom, left, width, and height
      // in this component it is used to measure the article's height and position
      const rect = targetRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const articleHeight = rect.height;
      const totalScrollable = articleHeight - windowHeight;

      // Calculates the article’s position and the total scrollable distance.
      // If there is a continue reading button and content is not expanded, keep progress at 0
      if (hasContinueReadingButton && !showAllContent) {
        setProgress(0);
        ticking.current = false;
        return;
      }
      // If the article is collapsed and has a continue reading button, progress stays at 0.
      const scrolled = Math.min(
        Math.max(-rect.top, 0),
        totalScrollable > 0 ? totalScrollable : 1,
      );
      // Calculates the progress percentage, ensuring it never exceeds 100%.
      const percent =
        totalScrollable > 0
          ? Math.min((scrolled / totalScrollable) * 100, 100)
          : 0;
      // Updates the progress state and resets the ticking flag.
      setProgress(percent);
      ticking.current = false;
    };
    // this is called whenver a scroll or resize event happens. It checks if an aniimation frame is already scheduled (ticking.current)
    // if not, it schedules handleScroll to tun on the next animation frame using window.requestAnimationFrame
    // it then sets ticking.curent to true to prevent scheduling another frame before the current one runs
    // this approach means that handleScroll tuns at most once per animation frame even if many
    // scroll/resize events fire rapidly
    const onScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(handleScroll);
        ticking.current = true;
      }
    };

    // Adds event listeners for scroll and resize, and triggers an initial calculation.
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [targetRef, showAllContent, hasContinueReadingButton]);

  return (
    <div css={barWrapperStyles} aria-hidden>
      <span
        css={progressBarStyles(palette, progress)}
        data-testid="article-progress-bar"
      />
    </div>
  );
};

export default ReadingProgressBar;
