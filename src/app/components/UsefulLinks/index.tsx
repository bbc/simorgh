/** @jsx jsx */
/* @jsxFrag React.Fragment */
import React, { useContext } from 'react';
import { jsx } from '@emotion/react';
import { VISUAL_PROMINANCE } from '#app/pages/TopicPage/Curation';
import isLive from '#lib/utilities/isLive';
import { Summary } from '#app/models/types/promoData';
import styles from './index.styles';
import InlineLink from '../InlineLink';
import Image from '../Image';
import Heading from '../Heading';
import { ServiceContext } from '../../contexts/ServiceContext';

interface UsefulLinksProps {
  position: number;
  title: string;
  visualProminence: string;
  summaries: Summary[];
}

const UsefulLinks = ({
  summaries,
  position,
  title,
  visualProminence,
}: UsefulLinksProps) => {
  const { dir } = useContext(ServiceContext);
  const isRtl = dir === 'rtl';

  // eslint-disable-next-line no-console
  console.log({ isRtl });

  // Do not render on live yet - only local + test
  if (isLive()) {
    return null;
  }

  return (
    <section
      css={styles.container}
      role="region"
      aria-labelledby={`useful-links-${position}`}
    >
      <>
        <Heading
          level={2}
          size="doublePica"
          css={styles.heading}
          id={`useful-links-${position}`}
        >
          {title}
        </Heading>
        <ul css={styles.unorderedList}>
          {summaries.map(summary => {
            return (
              <li>
                {summary.imageUrl &&
                  visualProminence === VISUAL_PROMINANCE.NORMAL && (
                    <Image
                      alt=""
                      src={summary.imageUrl.replace('{width}', 'raw')}
                      placeholder={false}
                    />
                  )}

                <InlineLink
                  to={summary.link}
                  text={summary.title}
                  size="pica"
                  fontVariant="sansBold"
                />
              </li>
            );
          })}
        </ul>
      </>
    </section>
  );
  //   <div css={styles.card}>
  //     {summaries.map(summary => {
  //       return (
  //         <React.Fragment key={summary.id}>
  //           <div css={styles.textWrap}>
};

export default UsefulLinks;
