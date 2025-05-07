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
      <Image
        css={styles.image}
        src={imageTemplateUrl.replace('{width}', String(DEFAULT_IMAGE_SIZE))}
        srcSet={primarySrcset}
        mediaType={primaryMimeType || undefined}
        fallbackSrcSet={fallbackSrcset || undefined}
        fallbackMediaType={fallbackMimeType || undefined}
        alt=""
      />

      <a href={summary.link} css={styles.link}>
        {summary.title}
      </a>
    </>
  );
};

const SocialLinks = ({ summaries = [], position, title }: SocialLinksProps) => {
  const hasMultipleItems = summaries.length > 1;

  const { dir } = useContext(ServiceContext);

  console.group('📦 SocialLinks ');
  console.log({ summaries });
  console.groupEnd();

  return (
    <section
      role="region"
      aria-labelledby={`useful-links-${position}`}
      css={styles.container}
    >
      <Heading level={2} id={`useful-links-${position}`} css={styles.heading}>
        {title}
      </Heading>
      {hasMultipleItems ? (
        <ul css={styles.unorderedList} dir={dir} role="list">
          {summaries.map(summary => {
            return (
              <li css={styles.item} role="listitem" key={summary.title}>
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
