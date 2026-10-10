import { use, useState, useEffect, useRef } from 'react';
import { RequestContext } from '#app/contexts/RequestContext';
import useToggle from '#app/hooks/useToggle';
import Heading from '#app/components/Heading';
import Text from '#app/components/Text';
import LiveHeaderMedia from '#app/components/LiveHeaderMedia';
import { MediaCollection } from '#app/components/MediaLoader/types';
import VisuallyHiddenText from '#app/components/VisuallyHiddenText';
import { ServiceContext } from '#app/contexts/ServiceContext';
import Image from '#app/components/Image';
import ElectionBanner from '#app/components/ElectionBanner';
import isElectionBannerVisible from '#app/components/ElectionBanner/utilities';
import { createIchefSrcSet } from '#app/utilities/imageSrcSets';
import getOriginCode from '#app/lib/utilities/imageSrcHelpers/originCode';
import getLocator from '#app/lib/utilities/imageSrcHelpers/locator';
import styles from './styles';
import LiveLabelHeader from './LiveLabelHeader';

const getBackgroundStyle = ({
  electionBannerPosition,
}: {
  electionBannerPosition?: string | null;
}) => {
  if (!electionBannerPosition) return styles.backgroundColorDefault;

  return electionBannerPosition === 'above'
    ? styles.backgroundColorElectionBannerWithMedia
    : styles.backgroundColorElectionBanner;
};

const Header = ({
  showLiveLabel,
  title,
  description,
  imageUrl,
  imageUrlTemplate,
  imageWidth,
  mediaCollections,
  showSportData,
  // withElectionBanner,
  passportTaggings,
}: {
  showLiveLabel: boolean;
  title: string;
  description?: string;
  imageUrl?: string;
  imageUrlTemplate?: string;
  imageWidth?: number;
  mediaCollections?: MediaCollection[] | null;
  showSportData?: boolean;
  // withElectionBanner?: boolean;
  passportTaggings?: any; // to refactor
}) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const [isHeaderImageAlreadyLoaded, setIsHeaderImageAlreadyLoaded] =
    useState(false);

  const [isMediaOpen, setLiveMediaOpen] = useState(false);
  const { isLite } = use(RequestContext);
  const { enabled: electionBannerEnabled } = useToggle('electionBanner');
  const isHeaderImage = !!imageUrl && !!imageUrlTemplate && !!imageWidth;
  const isWithImageLayout = isHeaderImage || !!mediaCollections;
  const {
    translations: { sport: { matchSummary = 'Match Summary' } = {} },
    electionBanner,
  } = use(ServiceContext);
  const watchVideoClickHandler = () => {
    setLiveMediaOpen(!isMediaOpen);
  };
  const url = imageUrlTemplate?.split('{width}')[1];

  const originCode = getOriginCode(url);
  const locator = getLocator(url);

  const shouldShowElectionBanner = isElectionBannerVisible({
    electionBannerEnabled,
    electionThingIds: electionBanner?.electionThingIds,
    isLite,
    taggings: passportTaggings,
  });

  const {
    src: srcWebp,
    primarySrcset,
    primaryMimeType,
    fallbackSrcset,
    fallbackMimeType,
  } = createIchefSrcSet({
    originCode,
    locator,
    originalImageWidth: imageWidth ?? 0,
    srcResolution: 480,
  });

  useEffect(() => {
    const image = imageRef.current;

    setIsHeaderImageAlreadyLoaded(
      Boolean(image?.complete && image.naturalWidth > 0),
    );
  }, [srcWebp, primarySrcset, isHeaderImage, showSportData]);

  let electionBannerPosition: string | null = null;

  if (shouldShowElectionBanner && mediaCollections) {
    electionBannerPosition = 'above';
  } else if (shouldShowElectionBanner && !mediaCollections && isHeaderImage) {
    electionBannerPosition = 'above';
  } else if (shouldShowElectionBanner && !mediaCollections && !isHeaderImage) {
    electionBannerPosition = 'below';
  }

  const backgroundStyle = getBackgroundStyle({
    electionBannerPosition,
  });

  const Title = (
    <span
      css={isWithImageLayout ? styles.titleWithImage : styles.titleWithoutImage}
    >
      {title}
    </span>
  );

  if (showSportData) {
    return (
      <div css={styles.headerContainer}>
        <div css={styles.backgroundContainer}>
          <div
            css={[
              styles.background,
              styles.backgroundColorDefault,
              styles.backgroundColorSportData,
            ]}
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
              <div css={styles.sportTitleText}>{title}</div>
            </div>
          </Heading>
          <VisuallyHiddenText as="h2">{matchSummary}</VisuallyHiddenText>
        </div>
      </div>
    );
  }

  return (
    <>
      {electionBannerPosition === 'above' && (
        <ElectionBanner taggings={passportTaggings} />
      )}
      <div css={[styles.headerContainer, styles.headerContainerForcedColours]}>
        <div css={styles.backgroundContainer}>
          <div css={[styles.background, backgroundStyle]} />
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
                placeholder={!isHeaderImageAlreadyLoaded}
                imageRef={imageRef}
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
              <div
                css={[styles.liveMedia, isMediaOpen && styles.liveMediaOpen]}
              >
                <LiveHeaderMedia
                  mediaCollection={mediaCollections}
                  clickCallback={watchVideoClickHandler}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      {electionBannerPosition === 'below' && (
        <ElectionBanner taggings={passportTaggings} />
      )}
    </>
  );
};

export default Header;
