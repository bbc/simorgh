import React from 'react';
import { bool, string, shape } from 'prop-types';
import { ServiceContextConsumer } from '../../components/ServiceContext';
import Metadata from '../../components/Metadata';
import metadataPropTypes from '../../models/propTypes/metadata';
import promoPropTypes from '../../models/propTypes/promo';

/* An array of each thingLabel from tags.about & tags.mention */
const allTags = tags => {
  const { about, mentions } = tags;
  const aboutTags = about ? about.map(thing => thing.thingLabel) : [];
  const mentionTags = mentions ? mentions.map(thing => thing.thingLabel) : [];
  return aboutTags.concat(mentionTags);
};

const MetadataContainer = ({ isAmp, metadata, promo, service }) => {
  const { id: aresArticleId } = metadata;

  if (!aresArticleId) {
    return null;
  }

  const id = aresArticleId.split(':').pop();
  /* Canonical link generated from servicename and id */
  const canonicalLink = `https://www.bbc.com/${service}/articles/${id}`;
  const timeFirstPublished = new Date(metadata.firstPublished).toISOString();
  const timeLastUpdated = new Date(metadata.lastUpdated).toISOString();

  return (
    <ServiceContextConsumer>
      {({
        brandName,
        articleAuthor,
        defaultImage,
        defaultImageAltText,
        locale,
        twitterCreator,
        twitterSite,
      }) => (
        <Metadata
          isAmp={isAmp}
          articleAuthor={articleAuthor}
          articleSection={metadata.passport.genre}
          brandName={brandName}
          canonicalLink={canonicalLink}
          defaultImage={defaultImage}
          defaultImageAltText={defaultImageAltText}
          description={promo.summary}
          facebookAdmin={100004154058350}
          facebookAppID={1609039196070050}
          lang={metadata.passport.language}
          locale={locale}
          metaTags={allTags(metadata.tags)}
          timeFirstPublished={timeFirstPublished}
          timeLastUpdated={timeLastUpdated}
          title={promo.headlines.seoHeadline}
          twitterCreator={twitterCreator}
          twitterSite={twitterSite}
          type={metadata.type}
        />
      )}
    </ServiceContextConsumer>
  );
};

MetadataContainer.propTypes = {
  isAmp: bool.isRequired,
  metadata: shape(metadataPropTypes).isRequired,
  promo: shape(promoPropTypes).isRequired,
  service: string.isRequired,
};

export default MetadataContainer;
