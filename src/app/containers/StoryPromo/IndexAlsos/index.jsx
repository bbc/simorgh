import React, { useContext, Fragment } from 'react';
import { arrayOf, shape, oneOf, number, string, oneOfType } from 'prop-types';
import { scriptPropType } from '@bbc/gel-foundations/prop-types';
import MediaIndicator from '@bbc/psammead-media-indicator';
import {
  IndexAlsos,
  IndexAlso,
  IndexAlsosUl,
  IndexAlsosLi,
} from '@bbc/psammead-story-promo/index-alsos';
import { ServiceContext } from '#contexts/ServiceContext';
import {
  MEDIA_ASSET_PAGE,
  PHOTO_GALLERY_PAGE,
} from '#app/routes/utils/pageTypes';

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
  dir,
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

buildIndexAlsosMediaIndicator.propTypes = {
  cpsType: string.isRequired,
  mediaType: string.isRequired,
  script: string.isRequired,
  service: string.isRequired,
  dir: oneOf(['ltr', 'rtl']),
};

buildIndexAlsosMediaIndicator.defaultProps = {
  dir: 'ltr',
};

const extractLinkPromoData = item => {
  const indexAlsoItem = {};
  indexAlsoItem.id = item?.uri || null;
  indexAlsoItem.indexAlsoHeadline = item?.name || null;
  indexAlsoItem.url = item?.uri || null;

  return indexAlsoItem;
};

const extractAssetPromoData = item => {
  const indexAlsoItem = {};
  indexAlsoItem.id = item?.id || null;
  const assetHeadline = item?.headlines?.headline || null;
  const overtypedHeadline = item?.headlines?.overtyped || null;
  indexAlsoItem.indexAlsoHeadline = overtypedHeadline || assetHeadline;
  indexAlsoItem.url = item?.locators?.assetUri || null;

  return indexAlsoItem;
};

/*
 * When there are more than one Index Alsos, they should be wrapped in a list item `IndexAlsosLi` within an unordered list `IndexAlsosUl`.
 * On the other hand, when there is exactly one Index Also, it should use the `IndexAlso` component and it should not be contained within a list.
 */
const IndexAlsosContainer = ({ alsoItems, script, service, dir }) => {
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

const assetPromoAlsoItemsPropTypes = shape({
  headlines: shape({
    headline: string.isRequired,
  }).isRequired,
  locators: shape({
    assetUri: string.isRequired,
    cpsUrn: string,
  }).isRequired,
  summary: string,
  timestamp: number,
  cpsType: string.isRequired,
  id: string.isRequired,
  type: string,
});

const linkPromoAlsoItemsPropTypes = shape({
  name: string.isRequired,
  url: string.isRequired,
  id: string.isRequired,
});

IndexAlsosContainer.propTypes = {
  alsoItems: arrayOf(
    oneOfType([assetPromoAlsoItemsPropTypes, linkPromoAlsoItemsPropTypes]),
  ).isRequired,
  script: shape(scriptPropType).isRequired,
  service: string.isRequired,
  dir: oneOf(['ltr', 'rtl']),
};

IndexAlsosContainer.defaultProps = {
  dir: 'ltr',
};

export default IndexAlsosContainer;
