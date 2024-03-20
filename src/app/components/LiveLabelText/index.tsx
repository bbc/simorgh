/** @jsx jsx */
import { PropsWithChildren, useContext } from 'react';
import { jsx } from '@emotion/react';
import VisuallyHiddenText from '../VisuallyHiddenText';
import { ServiceContext } from '../../contexts/ServiceContext';
import styles from './index.styles';
import { TextProps } from '../LiveLabel/types';

const Text = ({
  lang = 'en-GB',
  id,
  children,
  offScreenText,
  className,
}: PropsWithChildren<TextProps>) => {
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
    screenReaderText = ` ${offScreenText}`;
    ariaHidden = true;
    // If the translated phrase for "LIVE" is English (and offscreen text has not already been provided), then the screenreader text should be the word "Live" followed by a comma and a space (to tell the screenreader to pause) - "Live" will be read out correctly (i.e. rhymes with "hive" and not "give")
  } else if (liveLabelIsEnglish) {
    screenReaderText = ' Live';
  }
  // comma is added to screenReaderText in the cases of there being children, only time we do not want a comma is if live label is alone (rare)
  if (children) {
    // Otherwise, the screenreader will pause after reading the word / translation of "Live"
    screenReaderText += ', ';
  }

  return (
    <span
      // The id below is a temporary fix for the a11y nested span's bug experienced in TalkBack, refer to the following issue: https://github.com/bbc/simorgh/issues/9652
      id={id}
      // eslint-disable-next-line jsx-a11y/aria-role
      role="text"
      className={className}
    >
      <span
        css={styles.liveLabelText}
        dir={dir}
        {...(ariaHidden && { 'aria-hidden': 'true' })}
      >
        {`${liveLabel}`}
      </span>
      {screenReaderText && (
        <VisuallyHiddenText lang={lang}>{screenReaderText}</VisuallyHiddenText>
      )}
      {children}
    </span>
  );
};

export default Text;
