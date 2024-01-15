/** @jsx jsx */
import React, { useContext } from 'react';
import { jsx } from '@emotion/react';
import Heading from '#app/components/Heading';
import Text from '#app/components/Text';
import { ServiceContext } from '#contexts/ServiceContext';
import VisuallyHiddenText from '#app/components/VisuallyHiddenText';
import Image from '#app/components/Image';
import { createSrcsets } from '#app/lib/utilities/srcSet';
import styles from './styles';

const Header = ({
  showLiveLabel,
  title,
  description,
  imageUrl,
  // imageUrlTemplate,
  imageWidth,
}: // imageHeight,
{
  showLiveLabel: boolean;
  title: string;
  description?: string;
  imageUrl?: string;
  imageUrlTemplate?: string;
  imageWidth?: number;
  imageHeight?: number;
}) => {
  const {
    translations: {
      liveExperiencePage: { liveLabel = 'Live' },
    },
  } = useContext(ServiceContext);

  const { primarySrcset, primaryMimeType, fallbackSrcset, fallbackMimeType } =
    createSrcsets({
      originCode: 'cpsdevpb', // hard code,
      locator: '1d5b/test/5f969ec0-c4d8-11ed-8319-9b394d8ed0dd.jpg', // hard code- check Image readme,
      originalImageWidth: imageWidth,
    });

  return (
    <div css={styles.canvas}>
      <div css={styles.backgroundContainer}>
        <div css={styles.backgroundColor} />
      </div>
      <div css={styles.contentWrapper}>
        {imageUrl ? (
          <>
            <div css={styles.backgroundImage}>
              <Image
                alt=""
                // attribution={copyright}
                src={imageUrl}
                // height={height}
                // width={width}
                // lazyLoad={lazyLoad}
                // preload={shouldPreloadLeadImage}
                srcSet={primarySrcset || undefined}
                fallbackSrcSet={fallbackSrcset || undefined}
                mediaType={primaryMimeType || undefined}
                fallbackMediaType={fallbackMimeType || undefined}
                sizes="(max-width: 1008px) 645px, 100vw" // I don't get what this is supposed to do?
                // isAmp={isAmp}
                // placeholder
              />
            </div>
          </>
        ) : null}
        <div css={styles.outerWrapper}>
          <div css={imageUrl && styles.innerWrapper}>
            <Heading size="trafalgar" level={1} id="content" tabIndex={-1}>
              {/* role="text" is required to correct a text splitting bug on iOS VoiceOver. */}
              {/*  eslint-disable-next-line jsx-a11y/aria-role */}
              <span role="text" css={!imageUrl && styles.flex}>
                {showLiveLabel ? (
                  <>
                    <span
                      css={styles.label}
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
                    !imageUrl &&
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
