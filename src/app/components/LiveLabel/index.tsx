import React, { useContext } from 'react';
import VisuallyHiddenText from '../VisuallyHiddenText';
import { ServiceContext } from '../../contexts/ServiceContext';

interface LiveLabelProps {
  service: string;
  dir?: string;
  ariaHidden?: boolean;
  liveText?: string;
  offScreenText?: string;
  lang?: string;
  id?: string;
}

const LiveLabel = ({
  service,
  ariaHidden = false,
  liveText = 'LIVE',
  offScreenText = '',
  lang = 'en-GB',
  id = '',
}: LiveLabelProps) => {
  const { dir } = useContext(ServiceContext);
  const isRtl = dir === 'rtl';

  return (
    // lines 27, 56,66, 31 concerning with id are a temporary fix for the a11y nested span's bug experienced in TalkBack, refer to the following issue: https://github.com/bbc/simorgh/issues/9652
    // eslint-disable-next-line jsx-a11y/aria-role
    <span role="text" id={id}>
      <div
        // service={service}
        dir={dir}
        {...(ariaHidden && { 'aria-hidden': 'true' })}
      >
        {`${liveText} `}
      </div>
      {offScreenText && (
        <VisuallyHiddenText lang={lang}>
          {`${offScreenText}, `}
        </VisuallyHiddenText>
      )}
    </span>
  );
};

export default LiveLabel;
