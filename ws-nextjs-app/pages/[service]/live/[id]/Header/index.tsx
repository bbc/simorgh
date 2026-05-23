import { use, useState } from 'react';

import Heading from '#app/components/Heading';
import LiveHeaderMedia from '#app/components/LiveHeaderMedia';
import MaskedImage from '#app/components/MaskedImage';
import { MediaCollection } from '#app/components/MediaLoader/types';
import Text from '#app/components/Text';
import VisuallyHiddenText from '#app/components/VisuallyHiddenText';
import { ServiceContext } from '#app/contexts/ServiceContext';
import LiveLabelHeader from './LiveLabelHeader';
import styles from './styles';

const Header = ({
  showLiveLabel,
  title,
  description,
  imageUrl,
  imageUrlTemplate,
  imageWidth,
  mediaCollections,
  showSportData,
}: {
  showLiveLabel: boolean;
  title: string;
  description?: string;
  imageUrl?: string;
  imageUrlTemplate?: string;
  imageWidth?: number;
  mediaCollections?: MediaCollection[] | null;
  showSportData?: boolean;
}) => {
  const [isMediaOpen, setLiveMediaOpen] = useState(false);
  const isHeaderImage = !!imageUrl && !!imageUrlTemplate && !!imageWidth;
  const isWithImageLayout = isHeaderImage || !!mediaCollections;
  const {
    translations: { matchSummary = 'Match Summary' },
  } = use(ServiceContext);

  const watchVideoClickHandler = () => {
    setLiveMediaOpen(!isMediaOpen);
  };

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
            {showLiveLabel ? (
              <LiveLabelHeader
                isHeaderImage={isWithImageLayout}
                showSportData={showSportData}
              >
                <VisuallyHiddenText>{title}</VisuallyHiddenText>
              </LiveLabelHeader>
            ) : (
              <VisuallyHiddenText>{title}</VisuallyHiddenText>
            )}
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
      <div css={styles.contentContainer}>
        <div css={[isMediaOpen && styles.hideMaskedImage]}>
          {isHeaderImage ? (
            <MaskedImage
              imageUrl={imageUrl}
              imageUrlTemplate={imageUrlTemplate}
              imageWidth={imageWidth}
              isLivePageHeaderImage
            />
          ) : null}
        </div>
        <div
          css={[
            isWithImageLayout && styles.textContainerWithImage,
            !isWithImageLayout && styles.textContainerWithoutImage,
            mediaCollections && styles.fixedHeight,
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
  );
};

export default Header;
