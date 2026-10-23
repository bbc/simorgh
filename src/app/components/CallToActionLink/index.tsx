import { PropsWithChildren, Ref, useMemo } from 'react';
import clsx from 'clsx';
import useClickTrackerHandler from '#app/hooks/useClickTrackerHandler';
import { EventTrackingData } from '#app/lib/analyticsUtils/types';
import { FontVariant, GelFontSize } from '../../models/types/theming';
import Chevron from './Chevron';
import ButtonLikeWrapper from './ButtonLikeWrapper';
import Text from './Text';
import styles from './index.module.scss';
import CallToActionLinkContext from './CallToActionLinkContext';

type CallToActionLinkProps = {
  id?: string;
  url: string;
  className?: string;
  eventTrackingData?: EventTrackingData;
  alignWithMargin?: boolean;
  download?: boolean;
  fontVariant?: FontVariant;
  size?: GelFontSize;
  ref?: Ref<HTMLAnchorElement>;
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
  ref,
  ...htmlAttributes
}: PropsWithChildren<CallToActionLinkProps>) => {
  const clickTrackerHandler = useClickTrackerHandler(eventTrackingData);

  const callToActionLinkContextValue = useMemo(
    () => ({
      fontVariant,
      size,
    }),
    [fontVariant, size],
  );

  if (!url) return null;

  return (
    <a
      ref={ref}
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
