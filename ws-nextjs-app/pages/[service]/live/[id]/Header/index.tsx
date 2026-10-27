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
import isElectionBannerVisible from '#app/components/ElectionBanner/utilities';
import { createIchefSrcSet } from '#app/utilities/imageSrcSets';
import getOriginCode from '#app/lib/utilities/imageSrcHelpers/originCode';
import getLocator from '#app/lib/utilities/imageSrcHelpers/locator';
import { MetadataTaggings } from '#app/models/types/metadata';
import styles from './styles';
import LiveLabelHeader from './LiveLabelHeader';
import LiveElectionBanner from './LiveElectionBanner';
import isLive from '#app/lib/utilities/isLive';

const Header = ({
  showLiveLabel,
  title,
  description,
  imageUrl,
  imageUrlTemplate,
  imageWidth,
  mediaCollections,
  showSportData,
  taggings,
}: {
  showLiveLabel: boolean;
  title: string;
  description?: string;
  imageUrl?: string;
  imageUrlTemplate?: string;
  imageWidth?: number;
  mediaCollections?: MediaCollection[] | null;
  showSportData?: boolean;
  taggings?: MetadataTaggings;
}) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const [isHeaderImageAlreadyLoaded, setIsHeaderImageAlreadyLoaded] =
    useState(false);

  const [isMediaOpen, setLiveMediaOpen] = useState(false);
  const { isLite } = use(RequestContext);
  const { enabled: electionBannerEnabled } = useToggle('electionBanner');
  const hasHeaderImage = !!imageUrl && !!imageUrlTemplate && !!imageWidth;
  const hasLiveMediaStream = Boolean(mediaCollections?.length);
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

  // isLite is checked here (rather than inside isElectionBannerVisible) because this
  // page also needs it to decide its own layout, not just whether to render the banner.
  const shouldShowElectionBanner =
    !isLive() &&
    !isLite &&
    isElectionBannerVisible({
      electionBannerEnabled,
      electionThingIds: electionBanner?.electionThingIds,
      taggings,
    }) &&
    !hasLiveMediaStream;

  const isHeaderImage = hasHeaderImage && !shouldShowElectionBanner;
  const isWithImageLayout = isHeaderImage || hasLiveMediaStream;

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

  const Title = (
    <span
      css={isWithImageLayout ? styles.titleWithImage : styles.titleWithoutImage}
    >
      {title}
    </span>
  );

  if (shouldShowElectionBanner || showSportData) {
    return (
      <>
        <div css={styles.headerContainer}>
          <div css={styles.backgroundContainer}>
            <div
              css={[
                styles.backgroundColor,
                showSportData && styles.backgroundColorSportData,
                shouldShowElectionBanner &&
                  styles.backgroundColorElectionBanner,
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
              <div
                css={[
                  styles.singleColumnTitleRow,
                  showSportData && styles.sportTitleRow,
                ]}
              >
                {showLiveLabel && (
                  <LiveLabelHeader
                    isHeaderImage={isWithImageLayout}
                    showSportData={showSportData || shouldShowElectionBanner}
                  />
                )}
                <div css={styles.singleColumnTitleText}>{title}</div>
              </div>
            </Heading>
            {showSportData && (
              <VisuallyHiddenText as="h2">{matchSummary}</VisuallyHiddenText>
            )}
          </div>
        </div>
        {shouldShowElectionBanner && <LiveElectionBanner />}
      </>
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
              placeholder={!isHeaderImageAlreadyLoaded}
              imageRef={imageRef}
              style={{ display: 'block' }}
            />
          </div>
        ) : null}

        <div
          css={[
            hasLiveMediaStream && styles.liveMediaAndTextContainer,
            isWithImageLayout && !isMediaOpen && styles.textWrapper,
          ]}
        >
          <div
            css={[
              isWithImageLayout
                ? styles.textContainerWithImage
                : styles.textContainerWithoutImage,
              hasLiveMediaStream && [styles.fixedHeight, { width: '100%' }],
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
          {hasLiveMediaStream && (
            <div css={[styles.liveMedia, isMediaOpen && styles.liveMediaOpen]}>
              <LiveHeaderMedia
                mediaCollection={mediaCollections ?? null}
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
