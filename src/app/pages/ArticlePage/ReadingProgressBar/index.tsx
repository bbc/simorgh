import { useEffect, useRef, useState, RefObject } from 'react';
import { css, useTheme } from '@emotion/react';

type ReadingProgressBarProps = {
  targetRef: RefObject<HTMLElement | null>;
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

const ReadingProgressBar = ({ targetRef }: ReadingProgressBarProps) => {
  const [progress, setProgress] = useState(0);
  const { palette } = useTheme();
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!targetRef.current) return;
      const rect = targetRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const articleHeight = rect.height;

      // Calculate how much of the article has been scrolled
      const totalScrollable = articleHeight - windowHeight;
      const scrolled = Math.min(
        Math.max(-rect.top, 0),
        totalScrollable > 0 ? totalScrollable : 1,
      );

      const percent =
        totalScrollable > 0
          ? Math.min((scrolled / totalScrollable) * 100, 100)
          : 0;

      setProgress(percent);
      ticking.current = false;
    };

    const onScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(handleScroll);
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [targetRef]);

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
