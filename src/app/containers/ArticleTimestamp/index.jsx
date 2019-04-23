import React from 'react';
import { number } from 'prop-types';
import { GridItemConstrainedMedium } from '../../lib/styledGrid';
import Timestamp from '../Timestamp';
import { formatDateNumeric } from './timeFormats';
import { isRelative, formatType } from './helpers'; 

const ArticleTimestamp = ({ firstPublished, lastPublished }) => {
  const makeRelative = isRelative(firstPublished, lastPublished);

  return (
    <GridItemConstrainedMedium>
      <Timestamp
        timestamp={firstPublished}
        dateTimeFormat={formatDateNumeric}
        format={formatType(firstPublished)}
        isRelative={makeRelative}
      />
      {firstPublished !== lastPublished ? (
        <Timestamp
          timestamp={lastPublished}
          dateTimeFormat={formatDateNumeric}
          format={formatType(lastPublished)}
          isRelative={makeRelative}
          prefix="Updated"
        />
      ) : null}
    </GridItemConstrainedMedium>
  );
};

ArticleTimestamp.propTypes = {
  firstPublished: number.isRequired,
  lastPublished: number.isRequired,
};

export default ArticleTimestamp;
