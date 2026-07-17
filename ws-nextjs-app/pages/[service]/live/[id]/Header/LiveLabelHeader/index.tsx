import { PropsWithChildren } from 'react';
import { LiveLabelProps } from '#app/components/LiveLabel/types';
import LivePulse from '#app/components/LivePulse';
import LiveText from '#app/components/LiveText';
import styles from './index.styles';

interface LiveLabelPromoProps extends LiveLabelProps {
  isHeaderImage: boolean;
  showSportData?: boolean;
}

const LiveLabelHeader = ({
  lang = 'en-GB',
  id,
  children,
  offScreenText,
  className,
  isHeaderImage,
  showSportData,
}: PropsWithChildren<LiveLabelPromoProps>) => {
  return (
    <div
      data-testid="live-label"
      css={showSportData && styles.liveLabelContainer}
    >
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
        css={[
          styles.liveLabelText,
          !showSportData && isHeaderImage && styles.liveLabelTextWithImage,
          !showSportData && !isHeaderImage && styles.liveLabelTextWithoutImage,
        ]}
      >
        {children}
      </LiveText>
    </div>
  );
};

export default LiveLabelHeader;
