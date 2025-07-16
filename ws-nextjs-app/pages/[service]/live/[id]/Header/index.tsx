import Heading from '#app/components/Heading';
import Text from '#app/components/Text';
import LiveHeaderMedia from '#app/components/LiveHeaderMedia';
import { MediaCollection } from '#app/components/MediaLoader/types';

import MaskedImage from '#app/components/MaskedImage';
import { useState } from 'react';
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
}: {
  showLiveLabel: boolean;
  title: string;
  description?: string;
  imageUrl?: string;
  imageUrlTemplate?: string;
  imageWidth?: number;
  mediaCollections?: MediaCollection[] | null;
}) => {
  const [isMediaOpen, setLiveMediaOpen] = useState(false);
  const isHeaderImage = !!imageUrl && !!imageUrlTemplate && !!imageWidth;
  const isWithImageLayout = isHeaderImage || !!mediaCollections;

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

  return (
    <div className={styles.headerContainer}>
      <div className={styles.backgroundContainer}>
        <div className={styles.backgroundColor} />
      </div>
      <div className={styles.contentContainer}>
        <div css={[isMediaOpen && styles.hideMaskedImage]}>
          {isHeaderImage ? (
            <MaskedImage
              imageUrl={imageUrl}
              imageUrlTemplate={imageUrlTemplate}
              imageWidth={imageWidth}
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
            className={styles.heading}
          >
            {showLiveLabel ? (
              <LiveLabelHeader isHeaderImage={isWithImageLayout}>
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
          <div className={[styles.liveMedia].filter(Boolean).join(' ')}>
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
