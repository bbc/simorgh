/** @jsx jsx */
/** @jsxRuntime classic */
/* @jsxFrag React.Fragment */
import { PropsWithChildren } from 'react';
import { jsx } from '@emotion/react';
import { LiveLabelProps } from '#app/components/LiveLabel/types';
import LiveLabel from '#app/components/LiveLabel';
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
      <LiveLabel.Text
        lang={lang}
        id={id}
        offScreenText={offScreenText}
        isHeaderImage={isHeaderImage}
        pulse={
          <LiveLabel.Pulse
            className={className}
            width="24"
            height="24"
            css={styles.liveLabelPulse}
          />
        }
      >
        {children}
      </LiveLabel.Text>
    </div>
  );
};

export default LiveLabelHeader;
