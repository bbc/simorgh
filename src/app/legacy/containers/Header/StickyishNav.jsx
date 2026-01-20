import { useEffect, useRef, useState } from 'react';

const headerWrapperStyles = isVisible => ({
  position: 'sticky',
  top: 0,
  left: 0,
  width: '100%',
  zIndex: 10000,
  transition: 'transform 0.3s ease',
  transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
  willChange: 'transform',
});

const StickyishNav = ({ children }) => {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingUp = currentScrollY < lastScrollY.current;
      const isNearTop = currentScrollY < 10;

      setIsVisible(isScrollingUp || isNearTop);
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div css={headerWrapperStyles(isVisible)} aria-live="polite">
      {children}
    </div>
  );
};

export default StickyishNav;
