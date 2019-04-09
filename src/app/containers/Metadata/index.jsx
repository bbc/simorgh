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

const checkType = types => {
  if (types.length > 1 && types.includes('Thing')) {
    return 'Thing';
  }
  return types[0];
};

const checkSameAs = uris => {
  if (uris.length > 0) {
    return uris.filter(uri => uri.includes('http://dbpedia.org'));
  }
  return uris;
};

const aboutTagsContent = aboutTags => {
  const content = [];

  if (aboutTags) {
    aboutTags.forEach(tag => {
      const about = {
        '@type': checkType(tag.thingType),
        name: tag.thingLabel,
        alternateName: tag['skos:altLabel'] ? tag['skos:altLabel'] : '',
      };

      if (tag.thingSameAs.length > 0) {
        about.sameAs = checkSameAs(tag.thingSameAs);
      }

      content.push(about);
    });
  }

  return content;
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
            const canonicalLink = `${origin}/${service}/articles/${id}`;
            const ampLink = `${origin}/${service}/articles/${id}.amp`;
            const appleTouchIcon = `${
              process.env.SIMORGH_PUBLIC_STATIC_ASSETS_ORIGIN
            }${
              process.env.SIMORGH_PUBLIC_STATIC_ASSETS_PATH
            }/${service}/images/icons/icon-192x192.png`;

            return (
              <Fragment>
                <LinkedData
                  firstPublished={timeFirstPublished}
                  lastUpdated={timeLastPublished}
                  logoUrl={defaultImage}
                  noBylinesPolicy={noBylinesPolicy}
                  optimoId={id}
                  publishingPrinciples={publishingPrinciples}
                  seoHeadline={promo.headlines.seoHeadline}
                  service={metadata.createdBy}
                  type={metadata.type}
                  about={aboutTagsContent(metadata.tags.about)}
                />
                <Metadata
                  isAmp={platform === 'amp'}
                  ampLink={ampLink}
                  appleTouchIcon={appleTouchIcon}
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
