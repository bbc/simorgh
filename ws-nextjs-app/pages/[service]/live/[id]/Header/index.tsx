/** @jsx jsx */
import React, { useContext } from 'react';
import { jsx } from '@emotion/react';
import Heading from '#app/components/Heading';
import Text from '#app/components/Text';
import { ServiceContext } from '#contexts/ServiceContext';
import VisuallyHiddenText from '#app/components/VisuallyHiddenText';
import MaskedImage from './MaskedImage';
import styles from './styles';

const Header = ({
  showLiveLabel,
  title,
  description,
  imageUrl,
  imageUrlTemplate,
  imageWidth,
}: {
  showLiveLabel: boolean;
  title: string;
  description?: string;
  imageUrl?: string;
  imageUrlTemplate?: string;
  imageWidth?: number;
}) => {
  const {
    translations: {
      liveExperiencePage: { liveLabel = 'Live' },
    },
  } = useContext(ServiceContext);

  const isHeaderImage = !!imageUrl && !!imageUrlTemplate && !!imageWidth;

  return (
    <div css={styles.headerContainer}>
      <div css={styles.backgroundContainer}>
        <div css={styles.backgroundColor} />
      </div>
      <div css={styles.contentContainer}>
        {isHeaderImage ? (
          <MaskedImage
            imageUrl={imageUrl}
            imageUrlTemplate={imageUrlTemplate}
            imageWidth={imageWidth}
          />
        ) : null}
        <div
          css={
            isHeaderImage
              ? styles.textContainerWithImage
              : styles.textContainerWithoutImage
          }
        >
          <Heading size="trafalgar" level={1} id="content" tabIndex={-1}>
            {/* role="text" is required to correct a text splitting bug on iOS VoiceOver. */}
            {/*  eslint-disable-next-line jsx-a11y/aria-role */}
            <span role="text" css={!isHeaderImage && styles.rowAlign}>
              {showLiveLabel ? (
                <>
                  <span
                    css={[
                      styles.label,
                      !isHeaderImage && styles.removeLabelMargin,
                    ]}
                    aria-hidden="true"
                    data-testid="live-label"
                  >
                    {liveLabel}
                  </span>
                  <VisuallyHiddenText lang="en-GB">
                    {`${liveLabel}, `}
                  </VisuallyHiddenText>
                </>
              ) : null}
              <span css={styles.title}>{title}</span>
            </span>
          </Heading>
          {description && (
            <Text
              as="p"
              css={[
                styles.description,
                showLiveLabel &&
                  !isHeaderImage &&
                  styles.layoutWithLiveLabelNoImage,
              ]}
            >
              {description}
            </Text>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
