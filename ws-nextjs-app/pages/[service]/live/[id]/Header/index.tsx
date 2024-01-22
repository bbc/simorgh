/** @jsx jsx */
import React, { useContext } from 'react';
import { jsx } from '@emotion/react';
import Heading from '#app/components/Heading';
import Text from '#app/components/Text';
import { ServiceContext } from '#contexts/ServiceContext';
import VisuallyHiddenText from '#app/components/VisuallyHiddenText';
import Image from '#app/components/Image';
import { createSrcsets } from '#app/lib/utilities/srcSet';
import getOriginCode from '#app/lib/utilities/imageSrcHelpers/originCode';
import getLocator from '#app/lib/utilities/imageSrcHelpers/locator';
import styles from './styles';

const HeaderImage = ({
  imageUrl,
  imageUrlTemplate,
  imageWidth = 480, // is this a good fallback?
}: {
  imageUrl: string;
  imageUrlTemplate: string;
  imageWidth?: number;
}) => {
  const url = imageUrlTemplate.split('{width}')[1];

  const originCode = getOriginCode(url);
  const locator = getLocator(url);

  const { primarySrcset, primaryMimeType, fallbackSrcset, fallbackMimeType } =
    createSrcsets({
      originCode,
      locator,
      originalImageWidth: imageWidth,
    });

  return (
    <div css={styles.headerImage}>
      <Image
        alt=""
        src={imageUrl}
        aspectRatio={[16, 9]}
        srcSet={primarySrcset || undefined}
        fallbackSrcSet={fallbackSrcset || undefined}
        mediaType={primaryMimeType || undefined}
        fallbackMediaType={fallbackMimeType || undefined}
        sizes="(max-width: 1008px) 645px, 100vw" // To update
      />
    </div>
  );
};

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

  const isHeaderImage = !!imageUrl && !!imageUrlTemplate;

  return (
    <div css={styles.headerContainer}>
      <div css={styles.backgroundContainer}>
        <div css={styles.backgroundColor} />
      </div>
      <div css={styles.contentWrapper}>
        {isHeaderImage ? (
          <HeaderImage
            imageUrl={imageUrl}
            imageUrlTemplate={imageUrlTemplate}
            imageWidth={imageWidth}
          />
        ) : null}
        <div css={styles.textContainer}>
          <div css={isHeaderImage && styles.textStylesWithImage}>
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
    </div>
  );
};

export default Header;
