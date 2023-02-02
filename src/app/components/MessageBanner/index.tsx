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
  summary: Summary;
  title: string;
  position: number;
}

const MessageBanner = ({ summary, title, position }: MessageBannerProps) => {
  const { dir } = useContext(ServiceContext);
  const isRtl = dir === 'rtl';

  return (
    <section
      css={styles.container}
      role="region"
      aria-labelledby={`message-banner-${position}`}
    >
      <div css={styles.card}>
        <React.Fragment key={summary.id}>
          <div css={styles.textWrap}>
            <Heading
              level={2}
              size="paragon"
              css={styles.heading}
              id={`message-banner-${position}`}
            >
              {title}
            </Heading>
            <Paragraph size="longPrimer" css={styles.paragraph}>
              {summary.description}
            </Paragraph>
          </div>
          <div css={styles.flex}>
            <a href={summary.link} css={styles.linkBackground}>
              <div css={styles.linkAndChevron}>
                <Text size="pica" fontVariant="sansBold" css={styles.link}>
                  {summary.title}
                  {isRtl ? (
                    <LeftChevron css={styles.chevron} />
                  ) : (
                    <RightChevron css={styles.chevron} />
                  )}
                </Text>
              </div>
            </a>
            {summary.imageUrl && (
              <div css={isRtl ? styles.imageRtl : styles.imageLtr}>
                <Image
                  alt=""
                  src={summary.imageUrl.replace('{width}', 'raw')}
                  placeholder={false}
                />
              </div>
            )}
          </div>
        </React.Fragment>
      </div>
    </section>
  );
};
export default MessageBanner;
