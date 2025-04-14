/** @jsx jsx */
import { PropsWithChildren } from 'react';
import { jsx } from '@emotion/react';
import useClickTrackerHandler from '#app/hooks/useClickTrackerHandler';
import { EventTrackingMetadata } from '#app/models/types/eventTracking';
import Chevron from './Chevron';
import ButtonLikeWrapper from './ButtonLikeWrapper';
import Text from './Text';
import styles from './index.styles';

type CallToActionLinkProps = {
  url: string;
  className?: string;
  eventTrackingData?: EventTrackingMetadata;
  alignWithMargin?: boolean;
  download?: boolean;
};

const CallToActionLink = ({
  url,
  children,
  eventTrackingData,
  alignWithMargin,
  download = false,
  className,
  ...htmlAttributes
}: PropsWithChildren<CallToActionLinkProps>) => {
  const clickTrackerHandler = useClickTrackerHandler(eventTrackingData);

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
      {children}
    </a>
  );
};

CallToActionLink.Chevron = Chevron;
CallToActionLink.ButtonLikeWrapper = ButtonLikeWrapper;
CallToActionLink.Text = Text;

export default CallToActionLink;
