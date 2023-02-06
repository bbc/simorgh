/** @jsx jsx */
/* @jsxFrag React.Fragment */
import React, { useContext } from 'react';
import { jsx } from '@emotion/react';
import { Summary } from '#app/models/types/promoData';
import Paragraph from '../Paragraph';
import Heading from '../Heading';
import Image from '../Image';
import Text from '../Text';
import { LeftChevron, RightChevron } from '../icons';
import styles from './index.styles';
import { ServiceContext } from '../../contexts/ServiceContext';

interface MessageBannerProps {
  heading: string;
  position: number;
  description: string;
  link: string;
  linkText: string;
  image: string;
}

const MessageBanner = ({
  heading,
  description,
  position,
  link,
  linkText,
  image,
}: MessageBannerProps) => {
  const { dir } = useContext(ServiceContext);
  const isRtl = dir === 'rtl';

  return (
    <section
      css={styles.container}
      role="region"
      aria-labelledby={`message-banner-${position}`}
    >
      <div css={styles.card}>
        <div css={styles.textWrap}>
          <Heading
            level={2}
            size="paragon"
            css={styles.heading}
            id={`message-banner-${position}`}
          >
            {heading}
          </Heading>
          <Paragraph size="longPrimer" css={styles.paragraph}>
            {description}
          </Paragraph>
        </div>
        <div css={styles.flex}>
          <a href={link} css={styles.linkBackground}>
            <div css={styles.linkAndChevron}>
              <Text size="pica" fontVariant="sansBold" css={styles.link}>
                {linkText}
                {isRtl ? (
                  <LeftChevron css={styles.chevron} />
                ) : (
                  <RightChevron css={styles.chevron} />
                )}
              </Text>
            </div>
          </a>
          {image && (
            <div css={isRtl ? styles.imageRtl : styles.imageLtr}>
              <Image
                alt=""
                src={image.replace('{width}', 'raw')}
                placeholder={false}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
export default MessageBanner;
