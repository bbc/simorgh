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

//  gonna use title, link, linktext, image (optional), subtitle(optional),
// PropsWithChildren

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

  console.log(summaries, '______');
  return (
    <section css={styles.card}>
      <Heading level={2} size="paragon">
        {title}
      </Heading>
      {summaries.map(summary => {
        return (
          <>
            <div css={styles.linkbackground}>
              <Text size="pica">
                <a href={summary.link} css={styles.link}>
                  {summary.title}
                </a>
                {isRtl ? <LeftChevron /> : <RightChevron />}
              </Text>
            </div>
            <Paragraph size="longPrimer">{summary.description}</Paragraph>
            {summary.imageUrl && (
              <Image
                alt={summary.imageAlt}
                src={summary.imageUrl.replace('{width}', '600')}
                placeholder={false}
                css={styles.image}
              >
                {summary.imageUrl}
              </Image>
            )}
          </>
        );
      })}
    </section>
  );
};

export default MessageBanner;
