/** @jsx jsx */
/* @jsxFrag React.Fragment */
import React, { useContext } from 'react';
import { jsx } from '@emotion/react';
import { Summary } from '#app/models/types/curationData';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { createSrcsets } from '#lib/utilities/srcSet';
import getOriginCode from '#app/lib/utilities/imageSrcHelpers/originCode';

import getLocator from '#lib/utilities/imageSrcHelpers/locator';
import Heading from '../Heading';
import Image from '../Image';
import InlineLink from '../InlineLink';
import styles from './index.styles';

interface SocialLinksProps {
  position: number;
  title: string;
  summaries: Summary[];
}

/**
 * TODO:
 * 3. Img size - src/srcset;
 * 2. Handle media queries
 *    - Paddings
 * 3. Link style
    - ul/li for multiple items
    - styling
 * 4. RTL feature
 * 5. Single item
 * 6. Odd number of items;
 */

const SocialLink = ({ summary }: { summary: Summary }) => {
  console.log(`SocialLink`, summary);

  // TODO:
  // 1. check if webp
  // 2.

  const DEFAULT_IMAGE_RES = styles.IMAGE_SIZE_GROUP_1;
  const IMAGE_DENSITY = 2;
  const imageResolutions = [
    styles.IMAGE_SIZE_GROUP_1 * IMAGE_DENSITY,
    styles.IMAGE_SIZE_GROUP_2 * IMAGE_DENSITY,
    styles.IMAGE_SIZE_GROUP_3 * IMAGE_DENSITY,
    styles.IMAGE_SIZE_GROUP_4 * IMAGE_DENSITY,
  ];
  const url = summary.imageUrl.split('{width}')[1];
  const originCode = getOriginCode(url);
  const locator = getLocator(url);

  console.log({
    originCode,
    locator,
    url,
    imageResolutions,
  });

  const { primarySrcset, primaryMimeType, fallbackSrcset, fallbackMimeType } =
    createSrcsets({
      originCode,
      locator,
      imageResolutions,
      originalImageWidth: imageResolutions[0],
    });

  console.log({ primarySrcset, fallbackSrcset });

  return (
    <>
      <Image
        css={styles.image}
        src={summary.imageUrl.replace('{width}', String(DEFAULT_IMAGE_RES))}
        srcSet={primarySrcset}
        mediaType={primaryMimeType || undefined}
        fallbackSrcSet={fallbackSrcset || undefined}
        fallbackMediaType={fallbackMimeType || undefined}
        alt=""
      />

      <InlineLink
        to={summary.link}
        text={summary.title}
        fontVariant="sansBold"
        css={styles.link}
      />
    </>
  );
};

const SocialLinks = ({ summaries, position, title }: SocialLinksProps) => {
  const hasMultipleItems = summaries.length > 1;

  console.group('📦 SocialLinks ');
  const { dir } = useContext(ServiceContext);
  const isRtl = dir === 'rtl';

  console.log({ isRtl });
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
        <ul css={styles.unorderedList}>
          {summaries.map(summary => {
            return (
              <li css={styles.item}>
                <SocialLink summary={summary} />
              </li>
            );
          })}
        </ul>
      ) : (
        <div css={styles.item}>
          <SocialLink summary={summaries[0]} />
        </div>
      )}
    </section>
  );
};
export default SocialLinks;
