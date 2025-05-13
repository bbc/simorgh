/** @jsx jsx */
/* @jsxFrag React.Fragment */
import React, { useContext } from 'react';
import { jsx } from '@emotion/react';
import getOriginCode from '#app/lib/utilities/imageSrcHelpers/originCode';
import { Summary } from '#app/models/types/curationData';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { RequestContext } from '#app/contexts/RequestContext';
import { createSrcsets } from '#lib/utilities/srcSet';
import getLocator from '#lib/utilities/imageSrcHelpers/locator';
import VisuallyHiddenText from '#app/components/VisuallyHiddenText';
import Heading from '../Heading';
import Image from '../Image';
import styles from './index.styles';

interface SocialLinksProps {
  id?: string;
  title: string;
  summaries: Summary[];
}

const SocialLinkImage = ({ imageUrl }: { imageUrl: string }) => {
  const { isLite } = useContext(RequestContext);
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

const SocialLink = ({ summary }: { summary: Summary }) => {
  return (
    <>
      <SocialLinkImage imageUrl={summary.imageUrl} />
      <a href={summary.link} css={styles.link}>
        {summary.title}

        {summary.description ? (
          <VisuallyHiddenText>{`, ${summary.description}`}</VisuallyHiddenText>
        ) : null}
      </a>
    </>
  );
};

const SocialLinks = ({
  title,
  summaries = [],
  id = 'social-links-1',
}: SocialLinksProps) => {
  const { dir } = useContext(ServiceContext);

  if (!summaries.length) {
    return null;
  }

  const hasMultipleItems = summaries.length > 1;

  return (
    <section
      role="region"
      aria-labelledby={id}
      data-testid={id}
      css={styles.container}
    >
      <Heading level={2} id={id} css={styles.heading}>
        {title}
      </Heading>
      {hasMultipleItems ? (
        <ul css={styles.unorderedList} dir={dir} role="list">
          {summaries.map(summary => {
            return (
              <li css={styles.item} key={summary.title}>
                <SocialLink summary={summary} />
              </li>
            );
          })}
        </ul>
      ) : (
        <div css={styles.item} dir={dir}>
          <SocialLink summary={summaries[0]} />
        </div>
      )}
    </section>
  );
};

export default SocialLinks;
