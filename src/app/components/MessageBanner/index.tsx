/** @jsx jsx */
/* @jsxFrag React.Fragment */
import React, { useContext } from 'react';
import { jsx } from '@emotion/react';
import Paragraph from '../Paragraph';
import Heading from '../Heading';
import Image from '../Image';
import Text from '../Text';
import { LeftChevron, RightChevron } from '../icons';
import styles from './index.styles';
import { ServiceContext } from '../../contexts/ServiceContext';

interface MessageBanner {
  summaries: {
    imageUrl?: string;
    link: string;
    imageAlt: string;
    description?: string;
    title: string;
    id: string;
  }[];
  title: string;
}
const MessageBanner = ({ summaries, title }: MessageBanner) => {
  const { dir } = useContext(ServiceContext);
  const isRtl = dir === 'rtl';

  return (
    <section
      css={styles.container}
      role="region"
      aria-labelledby="message-banner"
      data-testid="message-banner-test-id"
    >
      <div css={styles.card}>
        {summaries.map(summary => {
          return (
            <React.Fragment key={summary.id}>
              <div css={styles.textWrap}>
                <Heading
                  level={2}
                  size="paragon"
                  css={styles.heading}
                  id="message-banner"
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
                  <div
                    data-testid="image-test-id"
                    css={isRtl ? styles.imageRtl : styles.imageLtr}
                  >
                    <Image
                      alt=""
                      src={summary.imageUrl.replace('{width}', 'raw')}
                      placeholder={false}
                    >
                      {summary.imageUrl}
                    </Image>
                  </div>
                )}
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </section>
  );
};
export default MessageBanner;
