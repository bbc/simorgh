import React, { PropsWithChildren, useMemo } from 'react';
import useClickTrackerHandler from '#app/hooks/useClickTrackerHandler';
import { EventTrackingMetadata } from '#app/models/types/eventTracking';
import { FontVariant, GelFontSize } from '../../models/types/theming';
import Chevron from './Chevron';
import ButtonLikeWrapper from './ButtonLikeWrapper';
import Text from './Text';
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

  const linkClasses = `text-grey-10 no-underline visited:text-metal hover:text-postbox hover:no-underline focus:text-postbox focus:no-underline ${alignWithMargin ? 'inline-block' : ''} ${className || ''}`;

  return (
    <a
      href={url}
      {...(eventTrackingData && clickTrackerHandler)}
      className={linkClasses}
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
