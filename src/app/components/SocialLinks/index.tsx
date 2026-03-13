import { use, useId } from 'react';
import getOriginCode from '#app/lib/utilities/imageSrcHelpers/originCode';
import { Summary } from '#app/models/types/curationData';
import { RequestContext } from '#app/contexts/RequestContext';
import { createSrcsets } from '#lib/utilities/srcSet';
import getLocator from '#lib/utilities/imageSrcHelpers/locator';
import VisuallyHiddenText from '#app/components/VisuallyHiddenText';
import { EventTrackingData } from '#app/lib/analyticsUtils/types';
import useViewTracker from '#app/hooks/useViewTracker';
import useClickTrackerHandler from '#app/hooks/useClickTrackerHandler';

import Heading from '../Heading';
import Image from '../Image';
import styles from './index.styles';

interface SocialLinksProps {
  id?: string;
  title: string;
  summaries: Summary[];
  eventTrackingData?: EventTrackingData;
}

const SocialLinkImage = ({ imageUrl }: { imageUrl: string }) => {
  const { isLite } = use(RequestContext);
  const DEFAULT_IMAGE_SIZE = styles.IMAGE_SIZE_GROUP_1;
  const DEFAULT_IMAGE_SIZE_2X = DEFAULT_IMAGE_SIZE * 2;

  const [, imagePath] = imageUrl?.split('{width}') || [];

  if (isLite) {
    return null;
  }

  if (!imagePath) {
    return (
      <div
        css={[styles.image, styles.placeholder]}
        aria-hidden="true"
        data-testid="social-link-image-placeholder"
      />
    );
  }

  const { primarySrcset, primaryMimeType, fallbackSrcset, fallbackMimeType } =
    createSrcsets({
      originCode: getOriginCode(imagePath),
      locator: getLocator(imagePath),
      imageResolutions: [DEFAULT_IMAGE_SIZE, DEFAULT_IMAGE_SIZE_2X],
      originalImageWidth: DEFAULT_IMAGE_SIZE_2X,
    });

  return (
    <Image
      css={[styles.image]}
      width={DEFAULT_IMAGE_SIZE}
      src={imageUrl.replace('{width}', String(DEFAULT_IMAGE_SIZE))}
      srcSet={primarySrcset}
      mediaType={primaryMimeType || ''}
      fallbackSrcSet={fallbackSrcset || ''}
      fallbackMediaType={fallbackMimeType || ''}
      lazyLoad
      alt=""
    />
  );
};

const SocialLink = ({
  summary,
  clickTrackerHandler,
}: {
  summary: Summary;
  clickTrackerHandler?: ReturnType<typeof useClickTrackerHandler>;
}) => {
  const linkLabelId = useId();
  const hasDescription = Boolean(summary.description);

  return (
    <>
      <SocialLinkImage imageUrl={summary.imageUrl} />
      <a
        href={summary.link}
        css={styles.link}
        {...(hasDescription && { 'aria-labelledby': linkLabelId })}
        {...clickTrackerHandler}
      >
        {hasDescription ? (
          // eslint-disable-next-line jsx-a11y/aria-role
          <span id={linkLabelId}>
            {summary.title}
            <VisuallyHiddenText>{`, ${summary.description}`}</VisuallyHiddenText>
          </span>
        ) : (
          summary.title
        )}
      </a>
    </>
  );
};

const SocialLinks = ({
  title,
  summaries = [],
  id = 'social-links-1',
  eventTrackingData = { componentName: 'social-links' },
}: SocialLinksProps) => {
  const viewTracker = useViewTracker(eventTrackingData);
  const getClickTrackerHandler = useClickTrackerHandler;
  if (!summaries.length) {
    return null;
  }

  const hasMultipleItems = summaries.length > 1;

  const buildPromoEventTrackingData = (promo: Summary, index: number) => {
    const itemTracker = {
      type: 'social-link-promo',
      text: promo.title,
      position: index + 1,
      resourceId: promo.id,
    };
    return {
      itemTracker,
      ...eventTrackingData,
    };
  };

  return (
    <section
      role="region"
      aria-labelledby={id}
      data-testid={id}
      css={styles.container}
      {...viewTracker}
    >
      <Heading level={2} id={id} css={styles.heading}>
        {title}
      </Heading>
      {hasMultipleItems ? (
        <ul css={styles.unorderedList} role="list">
          {summaries.map((summary, index) => {
            const promoEventTrackingData = buildPromoEventTrackingData(
              summary,
              index,
            );
            const clickTrackerHandler = getClickTrackerHandler(
              promoEventTrackingData,
            );
            return (
              <li css={styles.item} key={summary.title}>
                <SocialLink
                  summary={summary}
                  clickTrackerHandler={clickTrackerHandler}
                />
              </li>
            );
          })}
        </ul>
      ) : (
        <div css={styles.item}>
          <SocialLink
            summary={summaries[0]}
            clickTrackerHandler={getClickTrackerHandler(
              buildPromoEventTrackingData(summaries[0], 0),
            )}
          />
        </div>
      )}
    </section>
  );
};

export default SocialLinks;
