/** @jsx jsx */
/* @jsxFrag React.Fragment */
import React, { useContext } from 'react';
import { jsx } from '@emotion/react';
import getOriginCode from '#app/lib/utilities/imageSrcHelpers/originCode';
import { Summary } from '#app/models/types/curationData';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { createSrcsets } from '#lib/utilities/srcSet';
import getLocator from '#lib/utilities/imageSrcHelpers/locator';
import Heading from '../Heading';
import Image from '../Image';
import styles from './index.styles';

interface SocialLinksProps {
  position: number;
  title: string;
  summaries: Summary[];
}

const SocialLink = ({ summary }: { summary: Summary }) => {
  const DEFAULT_IMAGE_SIZE = styles.IMAGE_SIZE_GROUP_1;
  const DEFAULT_IMAGE_SIZE_2X = DEFAULT_IMAGE_SIZE * 2;

  const imageTemplateUrl = summary.imageUrl;
  const imagePath = imageTemplateUrl.split('{width}')[1];

  const { primarySrcset, primaryMimeType, fallbackSrcset, fallbackMimeType } =
    createSrcsets({
      originCode: getOriginCode(imagePath),
      locator: getLocator(imagePath),
      imageResolutions: [DEFAULT_IMAGE_SIZE, DEFAULT_IMAGE_SIZE_2X],
      originalImageWidth: DEFAULT_IMAGE_SIZE_2X,
    });

  return (
    <>
      {imagePath ? (
        <Image
          css={styles.image}
          src={imageTemplateUrl.replace('{width}', String(DEFAULT_IMAGE_SIZE))}
          srcSet={imagePath ? primarySrcset : undefined}
          mediaType={primaryMimeType || undefined}
          fallbackSrcSet={imagePath ? fallbackSrcset : undefined}
          fallbackMediaType={fallbackMimeType || undefined}
          lazyLoad
          alt=""
        />
      ) : (
        <div
          css={[styles.image, styles.placeholder]}
          aria-hidden="true"
          data-testid="social-link-image-placeholder"
        />
      )}

      <a href={summary.link} css={styles.link}>
        {summary.title}
      </a>
    </>
  );
};

const SocialLinks = ({ summaries = [], position, title }: SocialLinksProps) => {
  const { dir } = useContext(ServiceContext);

  if (!summaries.length) {
    return null;
  }

  const hasMultipleItems = summaries.length > 1;

  return (
    <section
      role="region"
      aria-labelledby={`social-links-${position}`}
      css={styles.container}
    >
      <Heading level={2} id={`social-links-${position}`} css={styles.heading}>
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
