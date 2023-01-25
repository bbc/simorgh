/** @jsx jsx */
/* @jsxFrag React.Fragment */
import React, { useContext } from 'react';
import { jsx } from '@emotion/react';
import useToggle from '#hooks/useToggle';
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
    imageAlt?: string;
    description?: string;
    title: string;
    id: string;
  }[];
  title: string;
}
const MessageBanner = ({ summaries, title }: MessageBanner) => {
  const { enabled: messageBannerEnabled } = useToggle('messageBanner');

  const { dir } = useContext(ServiceContext);
  const isRtl = dir === 'rtl';

  if (messageBannerEnabled) {
    return (
      <section
        css={styles.container}
        role="region"
        aria-labelledby="message-banner"
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
                      <Text
                        size="pica"
                        fontVariant="sansBold"
                        css={isRtl ? styles.linkRtl : styles.linkLtr}
                      >
                        {summary.title}
                        {isRtl ? (
                          <LeftChevron css={styles.chevronRtl} />
                        ) : (
                          <RightChevron css={styles.chevronLtr} />
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
            );
          })}
        </div>
      </section>
    );
  }
  return null;
};
export default MessageBanner;
