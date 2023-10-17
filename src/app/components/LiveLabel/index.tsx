/** @jsx jsx */
/** @jsxRuntime classic */
import { PropsWithChildren, useContext } from 'react';
import { jsx } from '@emotion/react';
import VisuallyHiddenText from '../VisuallyHiddenText';
import { ServiceContext } from '../../contexts/ServiceContext';
import styles from './index.styles';
import Text from '../Text';

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
  id,
  children,
}: PropsWithChildren<LiveLabelProps>) => {
  const { dir } = useContext(ServiceContext);

  return (
    // eslint-disable-next-line jsx-a11y/aria-role
    <Text as="span" id={id} fontVariant="sansBold" role="text">
      <span
        css={styles.liveLabel}
        dir={dir}
        {...(ariaHidden && { 'aria-hidden': 'true' })}
      >
        {`${liveText} `}
      </span>
      {offScreenText && (
        <VisuallyHiddenText lang={lang}>
          {`${offScreenText}, `}
        </VisuallyHiddenText>
      )}

      {children}
    </Text>
  );
};

export default LiveLabel;
