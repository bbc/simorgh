/** @jsx jsx */
import { PropsWithChildren } from 'react';
import { jsx } from '@emotion/react';
import { LiveLabelProps } from '#app/components/LiveLabel/types';
import LivePulse from '#app/components/LivePulse';
import LiveText from '#app/components/LiveText';
import styles from './index.styles';

interface LiveLabelPromoProps extends LiveLabelProps {
  isHeaderImage: boolean;
}

const LiveLabelHeader = ({
  lang = 'en-GB',
  id,
  children,
  offScreenText,
  className,
  isHeaderImage,
}: PropsWithChildren<LiveLabelPromoProps>) => {
  return (
    <div data-testid="live-label">
      <LivePulse
        className={className}
        width="24"
        height="24"
        css={styles.liveLabelPulse}
      />
      <LiveText
        lang={lang}
        id={id}
        offScreenText={offScreenText}
        css={
          isHeaderImage
            ? styles.liveLabelTextWithImage
            : styles.liveLabelTextWithoutImage
        }
      >
        {children}
      </LiveText>
    </div>
  );
};

export default LiveLabelHeader;
