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
  const populatedChildren = Boolean(children);
  return (
    <div data-testid="live-label" aria-labelledby="live-label">
      <LiveLabel.Container
        css={isHeaderImage && styles.liveLabelContainerWithoutImage}
      >
        <LiveLabel.Pulse
          className={className}
          width="24"
          height="24"
          css={styles.liveLabelPulse}
        />
        <LiveLabel.Text
          lang={lang}
          id={id}
          offScreenText={offScreenText}
          populatedChildren={populatedChildren}
        />
      </LiveLabel.Container>
      <LiveLabel.Title>{children}</LiveLabel.Title>
    </div>
  );
};

export default LiveLabelHeader;
