/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/react';
import Heading from '#app/components/Heading';
import Text from '#app/components/Text';
import VisuallyHiddenText from '#app/components/VisuallyHiddenText';
import styles from './styles';

const Header = ({
  showLiveLabel,
  title,
  description,
}: {
  showLiveLabel: boolean;
  title: string;
  description?: string;
}) => {
  return (
    <div css={styles.backgroundColor}>
      <div css={styles.outerGrid}>
        <Heading
          size="trafalgar"
          level={1}
          css={styles.heading}
          id="content"
          tabIndex={-1}
        >
          {/* role="text" is required to correct a text splitting bug on iOS VoiceOver. */}
          {/*  eslint-disable-next-line jsx-a11y/aria-role */}
          <span role="text" css={styles.innerGrid}>
            {showLiveLabel ? (
              <>
                <span css={styles.label} aria-hidden="true">
                  LIVE
                </span>
                <VisuallyHiddenText lang="en-GB">Live, </VisuallyHiddenText>
              </>
            ) : null}
            <span
              css={[styles.title, showLiveLabel && styles.layoutWithLiveLabel]}
            >
              {title}
            </span>
          </span>
        </Heading>
        {description && (
          <Text
            as="p"
            css={[
              styles.description,
              showLiveLabel && styles.layoutWithLiveLabel,
            ]}
          >
            {description}
          </Text>
        )}
      </div>
    </div>
  );
};

export default Header;
