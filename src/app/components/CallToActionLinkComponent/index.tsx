/** @jsx jsx */
import { PropsWithChildren } from 'react';
import { jsx } from '@emotion/react';
import useClickTrackerHandler from '#app/hooks/useClickTrackerHandler';
import { EventTrackingMetadata } from '#app/models/types/eventTracking';
import Chevron from './Chevron';
import FlexWrapper from './FlexWrapper';
import Text from './Text';
import styles from './index.styles';

type CallToActionLinkProps = {
  to?: string;
  className?: string;
  eventTrackingData?: EventTrackingMetadata;
  alignWithMargin?: boolean;
};

const CallToActionLink = ({
  to,
  children,
  eventTrackingData,
  alignWithMargin,
  ...htmlAttributes // handles LiteSiteCta
}: PropsWithChildren<CallToActionLinkProps>) => {
  const clickTrackerHandler = useClickTrackerHandler(eventTrackingData);
  const onClick = eventTrackingData ? clickTrackerHandler : () => null;

  return (
    <a
      href={to}
      onClick={onClick}
      {...htmlAttributes}
      css={[styles.link, alignWithMargin && styles.alignWithMargin]}
    >
      {children}
    </a>
  );
};

CallToActionLink.Chevron = Chevron;
CallToActionLink.FlexWrapper = FlexWrapper;
CallToActionLink.Text = Text;

export default CallToActionLink;
