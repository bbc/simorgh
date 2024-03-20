/** @jsx jsx */
import { PropsWithChildren } from 'react';
import { jsx } from '@emotion/react';
import { LiveLabelProps } from '#app/components/LiveLabel/types';
import LiveLabelPulse from '#app/components/LiveLabelPulse';
import LiveLabelText from '#app/components/LiveLabelText';
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
      <LiveLabelPulse
        className={className}
        width="24"
        height="24"
        css={styles.liveLabelPulse}
      />
      <LiveLabelText
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
      </LiveLabelText>
    </div>
  );
};

export default LiveLabelHeader;
