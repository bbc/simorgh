/** @jsx jsx */
/** @jsxRuntime classic */
import { PropsWithChildren, useContext } from 'react';
import { jsx } from '@emotion/react';
import VisuallyHiddenText from '../VisuallyHiddenText';
import { ServiceContext } from '../../contexts/ServiceContext';
import styles from './index.styles';

interface LiveLabelProps {
  ariaHidden?: boolean;
  liveText?: string;
  offScreenText?: string;
  lang?: string;
  id?: string;
}

const LiveLabel = ({
  ariaHidden = false,
  liveText = 'LIVE',
  offScreenText = '',
  lang = 'en-GB',
  id = '',
  children,
}: PropsWithChildren<LiveLabelProps>) => {
  const { dir } = useContext(ServiceContext);


  return (
    // lines 27, 56,66, 31 concerning with id are a temporary fix for the a11y nested span's bug experienced in TalkBack, refer to the following issue: https://github.com/bbc/simorgh/issues/9652
    // eslint-disable-next-line jsx-a11y/aria-role
    <span role="text" id={id}>
      <span
        css={styles.liveLabel}
        dir={dir}
        {...(ariaHidden && { 'aria-hidden': 'true' })}
      >
        {`${liveText} `}

        {offScreenText && (
          <VisuallyHiddenText lang={lang}>
            {`${offScreenText}, `}
          </VisuallyHiddenText>
        )}
      </span>
      {children}
    </span>
  );
};

export default LiveLabel;
