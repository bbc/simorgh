/** @jsx jsx */
/* @jsxFrag React.Fragment */
import React, { useContext } from 'react';
import { jsx } from '@emotion/react';
import VisuallyHiddenText from '#app/components/VisuallyHiddenText';
import ATIAnalytics from '#app/components/ATIAnalytics';
import { ATIData } from '#app/components/ATIAnalytics/types';
import {
  VisualProminence,
  VisualStyle,
  CurationData,
} from '../../models/types/curationData';
import Curation from '../../components/Curation';
import { ServiceContext } from '../../contexts/ServiceContext';
import styles from './index.styles';
import MetadataContainer from '../../components/Metadata';
import LinkedData from '../../components/LinkedData';
import getItemList from '../../lib/seoUtils/getItemList';
import ChartbeatAnalytics from '../../components/ChartbeatAnalytics';

interface HomePageProps {
  pageData: {
    pageType: string;
    id?: string;
    title: string;
    curations: CurationData[];
    description: string;
    metadata: ATIData;
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
  const { title, description, curations, metadata } = pageData;

  const itemList = getItemList({ curations, name: brandName });

  return (
    <>
      <ChartbeatAnalytics title={title} />
      <MetadataContainer
        title={frontPageTitle}
        lang={lang}
        description={description}
        openGraphType="website"
        hasAmpPage
      />
      <LinkedData
        type="CollectionPage"
        seoTitle={title}
        headline={title}
        entities={[itemList]}
      />
      <main css={styles.main}>
        <ATIAnalytics atiData={{ ...metadata, title }} />
        <VisuallyHiddenText id="content" tabIndex={-1} as="h1">
          {/* eslint-disable-next-line jsx-a11y/aria-role */}
          <span role="text">
            <span lang="en-GB">{product}</span>, {serviceLocalizedName} - {home}
          </span>
        </VisuallyHiddenText>
        <div css={styles.inner}>
          {curations.map(
            ({
              visualProminence,
              summaries,
              curationId,
              title: curationTitle,
              link,
              position,
              visualStyle,
              mostRead,
            }) => {
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
                  />
                </React.Fragment>
              );
            },
          )}
        </div>
      </main>
    </>
  );
};

export default HomePage;
