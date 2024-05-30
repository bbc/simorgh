import React, { useContext, Fragment } from 'react';
import pathOr from 'ramda/src/pathOr';
import MediaIndicator from '#psammead/psammead-media-indicator/src';
import {
  IndexAlsos,
  IndexAlso,
  IndexAlsosUl,
  IndexAlsosLi,
} from '#psammead/psammead-story-promo/src/IndexAlsos';
import {
  MEDIA_ASSET_PAGE,
  PHOTO_GALLERY_PAGE,
} from '#app/routes/utils/pageTypes';
import { ServiceContext } from '../../../../contexts/ServiceContext';

const MAX_NUM_INDEX_ALSOS = 3; // Cap the number of Index Alsos at 3.

const getMediaType = (cpsType, mediaType) => {
  const isPGL = cpsType === PHOTO_GALLERY_PAGE;
  const isMedia = cpsType === MEDIA_ASSET_PAGE;
  const media = mediaType || 'Video';

  if (!isPGL && !isMedia) {
    return null;
  }

  return isPGL ? 'photogallery' : media.toLowerCase();
};

const buildIndexAlsosMediaIndicator = ({
  cpsType,
  mediaType,
  script,
  service,
  dir = 'ltr',
}) => {
  const indexAlsosMediaType = getMediaType(cpsType, mediaType);

  return (
    indexAlsosMediaType && (
      <MediaIndicator
        type={indexAlsosMediaType}
        script={script}
        service={service}
        dir={dir}
        isInline
      />
    )
  );
};

const extractLinkPromoData = item => {
  const indexAlsoItem = {};
  indexAlsoItem.id = pathOr(null, ['uri'], item);
  indexAlsoItem.indexAlsoHeadline = pathOr(null, ['name'], item);
  indexAlsoItem.url = pathOr(null, ['uri'], item);

  return indexAlsoItem;
};

const extractAssetPromoData = item => {
  const indexAlsoItem = {};
  indexAlsoItem.id = pathOr(null, ['id'], item);
  const assetHeadline = pathOr(null, ['headlines', 'headline'], item);
  const overtypedHeadline = pathOr(null, ['headlines', 'overtyped'], item);
  indexAlsoItem.indexAlsoHeadline = overtypedHeadline || assetHeadline;
  indexAlsoItem.url = pathOr(null, ['locators', 'assetUri'], item);

  return indexAlsoItem;
};

/*
 * When there are more than one Index Alsos, they should be wrapped in a list item `IndexAlsosLi` within an unordered list `IndexAlsosUl`.
 * On the other hand, when there is exactly one Index Also, it should use the `IndexAlso` component and it should not be contained within a list.
 */
const IndexAlsosContainer = ({ alsoItems, script, service, dir = 'ltr' }) => {
  const {
    translations: { media: mediaTranslations, relatedContent },
  } = useContext(ServiceContext);

  const IndexAlsosWrapper = alsoItems.length > 1 ? IndexAlsosUl : Fragment;
  const IndexAlsoItem = alsoItems.length > 1 ? IndexAlsosLi : IndexAlso;

  return (
    <IndexAlsos offScreenText={relatedContent} data-e2e="index-alsos">
      <IndexAlsosWrapper>
        {alsoItems.slice(0, MAX_NUM_INDEX_ALSOS).map(item => {
          const { cpsType, mediaType } = item;

          let indexAlsoData;
          if (item.type === 'link') {
            indexAlsoData = extractLinkPromoData(item);
          } else {
            indexAlsoData = extractAssetPromoData(item);
          }
          const { id, indexAlsoHeadline, url } = indexAlsoData;

          const indexAlsoMediaIndicator = buildIndexAlsosMediaIndicator({
            cpsType,
            mediaType,
            script,
            service,
            dir,
          });
          const indexAlsoMediaType =
            mediaTranslations[getMediaType(cpsType, mediaType)];

          return (
            <IndexAlsoItem
              key={id}
              script={script}
              service={service}
              url={url}
              dir={dir}
              mediaIndicator={indexAlsoMediaIndicator}
              mediaType={indexAlsoMediaType}
            >
              {indexAlsoHeadline}
            </IndexAlsoItem>
          );
        })}
      </IndexAlsosWrapper>
    </IndexAlsos>
  );
};

export default IndexAlsosContainer;
