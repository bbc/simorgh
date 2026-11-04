import {
  PropsWithChildren,
  Ref,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import clsx from 'clsx';
import useClickTrackerHandler from '#app/hooks/useClickTrackerHandler';
import useComponentView from '#app/hooks/useComponentView';
import { EventTrackingData } from '#app/lib/analyticsUtils/types';
import { FontVariant, GelFontSize } from '../../models/types/theming';
import Chevron from './Chevron';
import ButtonLikeWrapper from './ButtonLikeWrapper';
import Text from './Text';
import styles from './index.module.scss';
import CallToActionLinkContext from './CallToActionLinkContext';

const GLOW_DELAY_MS = 5000;

type CallToActionLinkProps = {
  id?: string;
  url: string;
  className?: string;
  eventTrackingData?: EventTrackingData;
  alignWithMargin?: boolean;
  download?: boolean;
  fontVariant?: FontVariant;
  size?: GelFontSize;
  enableGlow?: boolean;
  ref?: Ref<HTMLAnchorElement>;
};

const setRef = <T,>(ref: Ref<T> | undefined, value: T | null) => {
  if (typeof ref === 'function') {
    ref(value);
  } else if (ref) {
    const refObject = ref;
    refObject.current = value;
  }
};

const CallToActionLink = ({
  id,
  url,
  children,
  eventTrackingData,
  alignWithMargin,
  download = false,
  className,
  fontVariant = 'sansBold',
  size = 'pica',
  enableGlow = false,
  ref,
  ...htmlAttributes
}: PropsWithChildren<CallToActionLinkProps>) => {
  const clickTrackerHandler = useClickTrackerHandler(eventTrackingData);
  const [hasGlowed, setHasGlowed] = useState(false);
  const { isInView, ref: componentViewRef } = useComponentView({
    enabled: enableGlow && !hasGlowed,
  });

  useEffect(() => {
    if (!enableGlow || hasGlowed || !isInView) return undefined;

    const glowTimer = setTimeout(() => {
      setHasGlowed(true);
    }, GLOW_DELAY_MS);

    return () => clearTimeout(glowTimer);
  }, [enableGlow, hasGlowed, isInView]);

  const mergedRef = useCallback(
    (element: HTMLAnchorElement | null) => {
      componentViewRef(element);
      setRef(ref, element);
    },
    [componentViewRef, ref],
  );

  const callToActionLinkContextValue = useMemo(
    () => ({
      fontVariant,
      size,
      isGlowing: hasGlowed,
    }),
    [fontVariant, hasGlowed, size],
  );

  if (!url) return null;

  return (
    <a
      ref={mergedRef}
      {...(id && { id })}
      href={url}
      {...(eventTrackingData && clickTrackerHandler)}
      className={clsx(
        styles.link,
        alignWithMargin && styles.alignWithMargin,
        className,
      )}
      download={download}
      {...htmlAttributes}
    >
      <CallToActionLinkContext.Provider value={callToActionLinkContextValue}>
        {children}
      </CallToActionLinkContext.Provider>
    </a>
  );
};

CallToActionLink.Chevron = Chevron;
CallToActionLink.ButtonLikeWrapper = ButtonLikeWrapper;
CallToActionLink.Text = Text;

export default CallToActionLink;
