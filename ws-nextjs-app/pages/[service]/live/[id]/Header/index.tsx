import { use, useState } from 'react';
import Heading from '#app/components/Heading';
import Text from '#app/components/Text';
import LiveHeaderMedia from '#app/components/LiveHeaderMedia';
import { MediaCollection } from '#app/components/MediaLoader/types';
import VisuallyHiddenText from '#app/components/VisuallyHiddenText';
import { ServiceContext } from '#app/contexts/ServiceContext';
import Image from '#app/components/Image';
import buildIChefURL from '#app/lib/utilities/ichefURL';
import { createSrcsets } from '#app/lib/utilities/srcSet';
import getOriginCode from '#app/lib/utilities/imageSrcHelpers/originCode';
import getLocator from '#app/lib/utilities/imageSrcHelpers/locator';
import styles from './styles';
import LiveLabelHeader from './LiveLabelHeader';

const Header = ({
  showLiveLabel,
  title,
  description,
  imageUrl,
  imageUrlTemplate,
  imageWidth,
  mediaCollections,
  showSportData,
  sportDataTitle,
}: {
  showLiveLabel: boolean;
  title: string;
  description?: string;
  imageUrl?: string;
  imageUrlTemplate?: string;
  imageWidth?: number;
  mediaCollections?: MediaCollection[] | null;
  showSportData?: boolean;
  sportDataTitle?: string;
}) => {
  const [isMediaOpen, setLiveMediaOpen] = useState(false);
  const isHeaderImage = !!imageUrl && !!imageUrlTemplate && !!imageWidth;
  const isWithImageLayout = isHeaderImage || !!mediaCollections;
  const {
    translations: { sport: { matchSummary = 'Match Summary' } = {} },
  } = use(ServiceContext);
  const watchVideoClickHandler = () => {
    setLiveMediaOpen(!isMediaOpen);
  };
  const url = imageUrlTemplate?.split('{width}')[1];

  const originCode = getOriginCode(url);
  const locator = getLocator(url);

  const { primarySrcset, primaryMimeType, fallbackSrcset, fallbackMimeType } =
    createSrcsets({
      originCode,
      locator,
      originalImageWidth: imageWidth,
    });

  const DEFAULT_IMAGE_RES = 480;
  const srcWebp = buildIChefURL({
    originCode,
    locator,
    resolution: DEFAULT_IMAGE_RES,
  });

  const Title = (
    <span
      css={isWithImageLayout ? styles.titleWithImage : styles.titleWithoutImage}
    >
      {title}
    </span>
  );

  if (showSportData) {
    const SportTitle = sportDataTitle ? (
      <div css={styles.sportTitleText}>{sportDataTitle}</div>
    ) : (
      <VisuallyHiddenText>{title}</VisuallyHiddenText>
    );

    return (
      <div css={styles.headerContainer}>
        <div css={styles.backgroundContainer}>
          <div
            css={[styles.backgroundColor, styles.backgroundColorSportData]}
          />
        </div>
        <div css={styles.contentContainer}>
          <Heading
            size="trafalgar"
            level={1}
            id="content"
            tabIndex={-1}
            css={styles.heading}
          >
            <div css={styles.sportTitleRow}>
              {showLiveLabel && (
                <LiveLabelHeader
                  isHeaderImage={isWithImageLayout}
                  showSportData={showSportData}
                />
              )}
              {SportTitle}
            </div>
          </Heading>
          <VisuallyHiddenText as="h2">{matchSummary}</VisuallyHiddenText>
        </div>
      </div>
    );
  }

  return (
    <div css={[styles.headerContainer, styles.headerContainerForcedColours]}>
      <div css={styles.backgroundContainer}>
        <div css={styles.backgroundColor} />
      </div>
      <div
        css={[
          isWithImageLayout
            ? styles.contentWithImageContainer
            : styles.contentContainer,
          !isMediaOpen && isWithImageLayout && { gap: '2rem' },
        ]}
      >
        {isHeaderImage ? (
          <div css={[isMediaOpen ? styles.hideImage : styles.headerImage]}>
            <Image
              alt=""
              src={srcWebp}
              srcSet={primarySrcset || undefined}
              fallbackSrcSet={fallbackSrcset || undefined}
              mediaType={primaryMimeType || undefined}
              fallbackMediaType={fallbackMimeType || undefined}
              sizes="(min-width: 1008px) 660px, 100vw"
              fetchPriority="high"
              preload
              placeholder
              style={{ display: 'block' }}
            />
          </div>
        ) : null}

        <div
          css={[
            mediaCollections && styles.liveMediaAndTextContainer,
            isWithImageLayout && !isMediaOpen && styles.textWrapper,
          ]}
        >
          <div
            css={[
              isWithImageLayout
                ? styles.textContainerWithImage
                : styles.textContainerWithoutImage,
              mediaCollections && [styles.fixedHeight, { width: '100%' }],
            ]}
          >
            <Heading
              size="trafalgar"
              level={1}
              id="content"
              tabIndex={-1}
              css={styles.heading}
            >
              {showLiveLabel ? (
                <LiveLabelHeader
                  isHeaderImage={isWithImageLayout}
                  showSportData={false}
                >
                  {Title}
                </LiveLabelHeader>
              ) : (
                Title
              )}
            </Heading>
            {description && (
              <Text
                as="p"
                css={[
                  styles.description,
                  showLiveLabel &&
                    !isWithImageLayout &&
                    styles.layoutWithLiveLabelNoImage,
                ]}
              >
                {description}
              </Text>
            )}
          </div>
          {mediaCollections && (
            <div css={[styles.liveMedia, isMediaOpen && styles.liveMediaOpen]}>
              <LiveHeaderMedia
                mediaCollection={mediaCollections}
                clickCallback={watchVideoClickHandler}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
