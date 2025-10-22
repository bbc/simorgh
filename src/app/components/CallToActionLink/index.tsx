import { PropsWithChildren, useMemo } from 'react';
import useClickTrackerHandler from '#app/hooks/useClickTrackerHandler';
import { EventTrackingData } from '#app/lib/analyticsUtils/types';
import { FontVariant, GelFontSize } from '../../models/types/theming';
import Chevron from './Chevron';
import ButtonLikeWrapper from './ButtonLikeWrapper';
import Text from './Text';
import styles from './index.styles';
import CallToActionLinkContext from './CallToActionLinkContext';

type CallToActionLinkProps = {
  url: string;
  className?: string;
  eventTrackingData?: EventTrackingData;
  alignWithMargin?: boolean;
  download?: boolean;
  fontVariant?: FontVariant;
  size?: GelFontSize;
};

const CallToActionLink = ({
  url,
  children,
  eventTrackingData,
  alignWithMargin,
  download = false,
  className,
  fontVariant = 'sansBold',
  size = 'pica',
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
      href={url}
      {...(eventTrackingData && clickTrackerHandler)}
      className={className}
      download={download}
      {...htmlAttributes}
      css={[styles.link, alignWithMargin && styles.alignWithMargin]}
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
