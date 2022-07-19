import React, { Fragment } from 'react';
import { oneOfType, oneOf, arrayOf, shape, number, string } from 'prop-types';
import { scriptPropType } from '#psammead/gel-foundations/src/prop-types';
import MediaIndicator from '#psammead/psammead-media-indicator/src';
import {
  IndexAlsos,
  IndexAlso,
  IndexAlsosUl,
  IndexAlsosLi,
} from '../src/IndexAlsos/index';

const MAX_NUM_INDEX_ALSOS = 3; // Cap the number of Index Alsos at 3.

const getMediaType = (cpsType, mediaType) => {
  const isPGL = cpsType === 'PGL';
  const isMedia = cpsType === 'MAP';
  const media = mediaType || 'Video';

  if (!isPGL && !isMedia) {
    return null;
  }

  const type = isPGL ? 'photogallery' : media.toLowerCase();

  return type;
};

const buildIndexAlsosMediaIndicator = ({
  cpsType,
  mediaType,
  script,
  service,
  dir,
}) => {
  const indexAlsosMediaType = getMediaType(cpsType, mediaType);

  return indexAlsosMediaType ? (
    <MediaIndicator
      type={indexAlsosMediaType}
      script={script}
      service={service}
      dir={dir}
      isInline
    />
  ) : null;
};

buildIndexAlsosMediaIndicator.propTypes = {
  cpsType: string.isRequired,
  mediaType: string.isRequired,
  script: shape({}).isRequired,
  service: string.isRequired,
  dir: oneOf(['ltr', 'rtl']).isRequired,
};

/*
 * When there are more than one Index Alsos, they should be wrapped in a list item `IndexAlsosLi` within an unordered list `IndexAlsosUl`.
 * On the other hand, when there is exactly one Index Also, it should use the `IndexAlso` component and it should not be contained within a list.
 */
const IndexAlsosContainer = ({ alsoItems, script, service, dir }) => {
  const IndexAlsosWrapper = alsoItems.length > 1 ? IndexAlsosUl : Fragment;
  const IndexAlsoItem = alsoItems.length > 1 ? IndexAlsosLi : IndexAlso;

  return (
    <IndexAlsos offScreenText="Related content" data-e2e="index-alsos">
      <IndexAlsosWrapper>
        {alsoItems.slice(0, MAX_NUM_INDEX_ALSOS).map(item => {
          const { id, cpsType, mediaType } = item;
          const { headline } = item.headlines;
          const url = item.locators.assetUri;
          const indexAlsoMediaIndicator = buildIndexAlsosMediaIndicator({
            cpsType,
            mediaType,
            script,
            service,
            dir,
          });
          const indexAlsoMediaType = getMediaType(cpsType, mediaType);

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
              {headline}
            </IndexAlsoItem>
          );
        })}
      </IndexAlsosWrapper>
    </IndexAlsos>
  );
};

const alsoItemsPropTypes = shape({
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

IndexAlsosContainer.propTypes = {
  alsoItems: oneOfType([arrayOf(alsoItemsPropTypes), alsoItemsPropTypes])
    .isRequired,
  script: shape(scriptPropType).isRequired,
  service: string.isRequired,
  dir: oneOf(['ltr', 'rtl']),
};

IndexAlsosContainer.defaultProps = {
  dir: 'ltr',
};

export default IndexAlsosContainer;
