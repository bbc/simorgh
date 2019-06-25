import React, { useContext } from 'react';
import { number } from 'prop-types';
import Timestamp from '@bbc/psammead-timestamp-container';
import { PopOutGridItemMedium } from '../../lib/styledGrid';
import { ServiceContext } from '../../contexts/ServiceContext';
import { formatDateNumeric } from './timeFormats';
import {
  isFirstRelative,
  isLastRelative,
  formatType,
  isValidDateTime,
} from './helpers';

const ArticleTimestamp = ({ firstPublished, lastPublished }) => {
  const { script } = useContext(ServiceContext);

  if (!isValidDateTime(firstPublished) || !isValidDateTime(lastPublished)) {
    return null;
  }

  return (
    <PopOutGridItemMedium>
      <Timestamp
        timestamp={firstPublished}
        dateTimeFormat={formatDateNumeric}
        format={formatType({ firstPublished })}
        isRelative={isFirstRelative(firstPublished, lastPublished)}
        script={script}
      />
      {firstPublished !== lastPublished ? (
        <Timestamp
          timestamp={lastPublished}
          dateTimeFormat={formatDateNumeric}
          format={formatType({ lastPublished, firstPublished })}
          isRelative={isLastRelative(lastPublished)}
          prefix="Updated"
          script={script}
        />
      ) : null}
    </PopOutGridItemMedium>
  );
};

ArticleTimestamp.propTypes = {
  firstPublished: number.isRequired,
  lastPublished: number.isRequired,
};

export default ArticleTimestamp;
