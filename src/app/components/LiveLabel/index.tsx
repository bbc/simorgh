/** @jsx jsx */
/** @jsxRuntime classic */
/* @jsxFrag React.Fragment */
import React, { PropsWithChildren, useContext } from 'react';
import { jsx } from '@emotion/react';
import VisuallyHiddenText from '../VisuallyHiddenText';
import { ServiceContext } from '../../contexts/ServiceContext';
import styles from './index.styles';

interface LiveLabelProps {
  offScreenText?: string;
  lang?: string;
  id?: string;
  className?: string;
}

const LiveLabel = ({
  lang = 'en-GB',
  id,
  children,
  offScreenText,
  className,
}: PropsWithChildren<LiveLabelProps>) => {
  const { dir, translations } = useContext(ServiceContext);

  const { liveLabel } = translations.media;

  // As screenreaders mispronounce the word 'LIVE', we use visually hidden
  // text to read 'Live' instead, which screenreaders pronounce correctly.
  const liveLabelIsEnglish = liveLabel === 'LIVE';

  let screenReaderText = '';
  let ariaHidden = false;

  // If the translated phrase for "LIVE" is English, we don't want this to be read out by the screenreader, as it is often pronounced incorrectly (rhyming with "give" instead of "hive"), hence why we set ariaHidden to true
  if (liveLabelIsEnglish) {
    ariaHidden = true;
  }
  // If offscreenText has been provided as a prop to the LiveLabel component then we want to include a pause after the offscreen text (hence the addition of a comma and a space to the text)
  if (offScreenText) {
    screenReaderText = `${offScreenText}`;
    ariaHidden = true;
    // If the translated phrase for "LIVE" is English (and offscreen text has not already been provided), then the screenreader text should be the word "Live" followed by a comma and a space (to tell the screenreader to pause) - "Live" will be read out correctly (i.e. rhymes with "hive" and not "give")
  } else if (liveLabelIsEnglish) {
    screenReaderText = 'Live';
  }
  // comma is added to screenReaderText in the cases of there being children, only time we do not want a comma is if live label is alone (rare)
  if (children) {
    // Otherwise, the screenreader will pause after reading the word / translation of "Live"
    screenReaderText += ', ';
  }

  const circle = [
    styles.pulseContainer,
    className === 'first-promo' && styles.firstPromo,
  ];

  return (
    <>
      <svg
        css={circle}
        fill="currentColor"
        focusable="false"
        aria-hidden="true"
        viewBox="0 0 32 32"
        width="16"
        height="16"
      >
        <path d="M16 4c6.6 0 12 5.4 12 12s-5.4 12-12 12S4 22.6 4 16 9.4 4 16 4zm0-4C7.2 0 0 7.2 0 16s7.2 16 16 16 16-7.2 16-16S24.8 0 16 0z" />
        <circle css={styles.pulseInnerCircle} cx="16" cy="16" r="8.5" />
      </svg>

      <span
        // The id below is a temporary fix for the a11y nested span's bug experienced in TalkBack, refer to the following issue: https://github.com/bbc/simorgh/issues/9652
        id={id}
        // eslint-disable-next-line jsx-a11y/aria-role
        role="text"
      >
        <span
          css={styles.liveLabelText}
          dir={dir}
          {...(ariaHidden && { 'aria-hidden': 'true' })}
        >
          {`${liveLabel} `}
        </span>
        {screenReaderText && (
          <VisuallyHiddenText lang={lang}>
            {screenReaderText}
          </VisuallyHiddenText>
        )}
        {children}
      </span>
    </>
  );
};

export default LiveLabel;
