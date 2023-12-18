/** @jsx jsx */
/* @jsxFrag React.Fragment */
import React, { useContext } from 'react';
import { jsx } from '@emotion/react';
import VisuallyHiddenText from '#app/components/VisuallyHiddenText';
import ATIAnalytics from '../../components/ATIAnalytics';
import {
  CurationData,
  VisualProminence,
  VisualStyle,
} from '../../models/types/curationData';
import { ATIData } from '../../components/ATIAnalytics/types';
import Curation from '../../components/Curation';
import Ad from '../../components/Ad';
import MPU from '../../components/Ad/MPU';
import { ServiceContext } from '../../contexts/ServiceContext';
import styles from './index.styles';
import MetadataContainer from '../../components/Metadata';
import LinkedData from '../../components/LinkedData';
import getItemList from '../../lib/seoUtils/getItemList';
import ChartbeatAnalytics from '../../components/ChartbeatAnalytics';

export interface HomePageProps {
  pageData: {
    id?: string;
    title: string;
    curations: CurationData[];
    description: string;
    metadata: {
      atiAnalytics: ATIData;
      type: string;
    };
  };
}

const HomePage = ({ pageData }: HomePageProps) => {
  const {
    translations,
    product,
    serviceLocalizedName,
    frontPageTitle,
    lang,
    brandName,
  } = useContext(ServiceContext);
  const { topStoriesTitle, home } = translations;
  const {
    title,
    description,
    curations,
    metadata: { atiAnalytics },
  } = pageData;

  const itemList = getItemList({ curations, name: brandName });

  const positionsOfCurationsByStyleAndProminence = new Map();

  curations.forEach(
    ({ visualStyle, visualProminence, position, summaries, mostRead }) => {
      // If the curation has content i.e more than 1 summary, or a most read item
      // Please note we might need to add a radio schedule when this data becomes available
      if ((summaries?.length || 0) > 0 || mostRead) {
        const key = `${visualStyle}_${visualProminence}`;

        const positions =
          positionsOfCurationsByStyleAndProminence.get(key) || [];

        // Captures the positions of each curation by visual style and prominence
        positionsOfCurationsByStyleAndProminence.set(key, [
          ...positions,
          position,
        ]);
      }
    },
  );

  return (
    <>
      <ChartbeatAnalytics title={title} />
      <MetadataContainer
        title={frontPageTitle}
        lang={lang}
        description={description}
        openGraphType="website"
        hasAmpPage={false}
      />
      <LinkedData
        type="CollectionPage"
        seoTitle={title}
        headline={title}
        entities={[itemList]}
      />
      <Ad slotType="leaderboard" />
      <main css={styles.main}>
        <ATIAnalytics atiData={atiAnalytics} />
        <VisuallyHiddenText id="content" tabIndex={-1} as="h1">
          {/* eslint-disable-next-line jsx-a11y/aria-role */}
          <span role="text">
            <span lang="en-GB">{product}</span>, {serviceLocalizedName} - {home}
          </span>
        </VisuallyHiddenText>
        <div css={styles.inner}>
          <div css={styles.margins}>
            {curations.map(
              (
                {
                  visualProminence,
                  summaries,
                  curationId,
                  title: curationTitle,
                  link,
                  position,
                  visualStyle,
                  mostRead,
                },
                index,
              ) => {
                const positions = positionsOfCurationsByStyleAndProminence.get(
                  `${visualStyle}_${visualProminence}`,
                );
                const nthCurationByStyleAndProminence =
                  positions?.findIndex((x: number) => x === position) + 1;

                return (
                  <React.Fragment key={`${curationId}-${position}`}>
                    <Curation
                      headingLevel={curationTitle ? 3 : 2}
                      visualStyle={visualStyle as VisualStyle}
                      visualProminence={visualProminence as VisualProminence}
                      promos={summaries || []}
                      title={curationTitle}
                      topStoriesTitle={topStoriesTitle}
                      position={position}
                      link={link}
                      curationLength={curations && curations.length}
                      mostRead={mostRead}
                      nthCurationByStyleAndProminence={
                        nthCurationByStyleAndProminence
                      }
                    />
                    {index === 0 && <MPU />}
                  </React.Fragment>
                );
              },
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default HomePage;
