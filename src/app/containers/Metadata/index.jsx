import React from 'react';
import { shape } from 'prop-types';
import { ServiceContextConsumer } from '../../contexts/ServiceContext';
import { PlatformContextConsumer } from '../../contexts/PlatformContext';
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

const MetadataContainer = ({ metadata, promo }) => {
  const { id: aresArticleId } = metadata;

  if (!aresArticleId) {
    return null;
  }

  const id = aresArticleId.split(':').pop();
  const timeFirstPublished = new Date(metadata.firstPublished).toISOString();
  const timeLastPublished = new Date(metadata.lastPublished).toISOString();

  return (
    <PlatformContextConsumer>
      {platform => (
        <ServiceContextConsumer>
          {({
            service,
            brandName,
            articleAuthor,
            defaultImage,
            defaultImageAltText,
            locale,
            themeColor,
            twitterCreator,
            twitterSite,
          }) => {
            /* Canonical link generated from servicename and id */
            const canonicalLink = `https://www.bbc.com/${service}/articles/${id}`;

            return (
              <Metadata
                isAmp={platform === 'amp'}
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
                themeColor={themeColor}
                timeFirstPublished={timeFirstPublished}
                timeLastPublished={timeLastPublished}
                title={promo.headlines.seoHeadline}
                twitterCreator={twitterCreator}
                twitterSite={twitterSite}
                type={metadata.type}
              />
            );
          }}
        </ServiceContextConsumer>
      )}
    </PlatformContextConsumer>
  );
};

MetadataContainer.propTypes = {
  metadata: shape(metadataPropTypes).isRequired,
  promo: shape(promoPropTypes).isRequired,
};

export default MetadataContainer;
