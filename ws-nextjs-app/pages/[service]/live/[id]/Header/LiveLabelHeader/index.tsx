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
      <span // eslint-disable-next-line jsx-a11y/aria-role
        role="text"
      >
        <time dateTime="09 May 2023" style={{ color: '#ffffff' }}>
          9 May 2023
        </time>
        {children}
      </span>
    </div>
  );
};

export default LiveLabelHeader;
