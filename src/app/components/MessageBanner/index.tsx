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
  }[];
  title: string;
}
const MessageBanner = ({ summaries, title }: MessageBanner) => {
  const { dir } = useContext(ServiceContext);
  const isRtl = dir === 'rtl';
  return (
    <div css={styles.container}>
      <section css={styles.card}>
        {summaries.map(summary => {
          return (
            <>
              <Heading level={2} size="paragon" css={styles.heading}>
                {title}
              </Heading>
              <Paragraph size="longPrimer" css={styles.paragraph}>
                {summary.description}
              </Paragraph>
              <div css={styles.flex}>
                {summary.imageUrl && (
                  <div css={styles.image}>
                    <Image
                      alt={summary.imageAlt}
                      src={summary.imageUrl.replace('{width}', '600')}
                      placeholder={false}
                    >
                      {summary.imageUrl}
                    </Image>
                  </div>
                )}
                <div css={styles.linkbackground}>
                  <div css={styles.linkAndChevron}>
                    <Text size="pica" fontVariant="sansBold">
                      <a href={summary.link} css={styles.link}>
                        {summary.title}
                      </a>
                      {isRtl ? <LeftChevron /> : <RightChevron />}
                    </Text>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </section>
    </div>
  );
};
export default MessageBanner;
