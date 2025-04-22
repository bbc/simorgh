/** @jsx jsx */
import { PropsWithChildren, useMemo } from 'react';
import { jsx } from '@emotion/react';
import useClickTrackerHandler from '#app/hooks/useClickTrackerHandler';
import { EventTrackingMetadata } from '#app/models/types/eventTracking';
import { FontVariant, GelFontSize } from '../../models/types/theming';
import Chevron from './Chevron';
import ButtonLikeWrapper from './ButtonLikeWrapper';
import Text from './Text';
import styles from './index.styles';
import CallToActionLinkContext from './CallToActionLinkContext';

type CallToActionLinkProps = {
  url: string;
  className?: string;
  eventTrackingData?: EventTrackingMetadata;
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
  fontVariant,
  size,
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
      onClick={clickTrackerHandler}
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
