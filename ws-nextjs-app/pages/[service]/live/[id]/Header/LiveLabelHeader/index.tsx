/** @jsx jsx */
/** @jsxRuntime classic */
/* @jsxFrag React.Fragment */
import { PropsWithChildren, useContext } from 'react';
import { jsx } from '@emotion/react';
import { LiveLabelProps } from '#app/components/LiveLabel/types';
import LiveLabel from '#app/components/LiveLabel';
import { ServiceContext } from '#app/contexts/ServiceContext';
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
  const { service } = useContext(ServiceContext);
  const isBurmese = service === 'burmese';

  return (
    <div data-testid="live-label">
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
        css={
          isHeaderImage
            ? styles.liveLabelTextWithImage
            : [
                styles.liveLabelTextWithoutImage,
                !isBurmese && {
                  'span:first-of-type': { verticalAlign: 'middle' },
                },
              ]
        }
      >
        {children}
      </LiveLabel.Text>
    </div>
  );
};

export default LiveLabelHeader;
