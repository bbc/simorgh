import React, { Fragment } from 'react';
import { shape } from 'prop-types';
import { ServiceContextConsumer } from '../../contexts/ServiceContext';
import { RequestContextConsumer } from '../../contexts/RequestContext';
import Metadata from '../../components/Metadata';
import LinkedData from '../../components/LinkedData';
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
    <RequestContextConsumer>
      {({ origin, platform }) => (
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
            publishingPrinciples,
            noBylinesPolicy,
          }) => {
            /* Canonical link generated from servicename and id */
            const canonicalLink = `${origin}/${service}/articles/${id}`;
            const ampLink = `${origin}/${service}/articles/${id}.amp`;

            return (
              <Fragment>
                <LinkedData
                  isAmp={platform === 'amp'}
                  lang={metadata.passport.language}
                  type={metadata.type}
                  seoHeadline={promo.headlines.seoHeadline}
                  firstPublished={timeFirstPublished}
                  lastUpdated={timeLastPublished}
                  optimoId={id}
                  service={metadata.createdBy}
                  publishingPrinciples={publishingPrinciples}
                  noBylinesPolicy={noBylinesPolicy}
                  logoUrl={defaultImage}
                />
                <Metadata
                  isAmp={platform === 'amp'}
                  ampLink={ampLink}
                  articleAuthor={articleAuthor}
                  articleSection={metadata.passport.genre}
                  brandName={brandName}
                  canonicalLink={canonicalLink}
                  defaultImage={defaultImage}
                  defaultImageAltText={defaultImageAltText}
                  description={promo.summary || promo.headlines.seoHeadline}
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
              </Fragment>
            );
          }}
        </ServiceContextConsumer>
      )}
    </RequestContextConsumer>
  );
};

MetadataContainer.propTypes = {
  metadata: shape(metadataPropTypes).isRequired,
  promo: shape(promoPropTypes).isRequired,
};

export default MetadataContainer;
