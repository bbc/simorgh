import React, { useContext } from 'react';
import { number } from 'prop-types';
import Timestamp from '@bbc/psammead-timestamp-container';
import { GridItemConstrainedMedium } from '../../lib/styledGrid';
import { ServiceContext } from '../../contexts/ServiceContext';
import { formatDateNumeric } from './timeFormats';
import {
  isFirstRelative,
  isLastRelative,
  formatType,
  isValidDateTime,
} from './helpers';

const ArticleTimestamp = ({ firstPublished, lastPublished }) => {
  const { script, datetimeLocale } = useContext(ServiceContext);

  if (!isValidDateTime(firstPublished) || !isValidDateTime(lastPublished)) {
    return null;
  }

  const timestampProps = {
    dateTimeFormat: formatDateNumeric,
    script,
    locale: datetimeLocale,
  };

  const firstPublishedProps = {
    timestamp: firstPublished,
    format: formatType({ firstPublished }),
    isRelative: isFirstRelative(firstPublished, lastPublished),
  };

  const lastPublishedProps = {
    timestamp: lastPublished,
    format: formatType({ lastPublished, firstPublished }),
    isRelative: isLastRelative(lastPublished),
    prefix: 'Updated',
  };

  return (
    <GridItemConstrainedMedium>
      <Timestamp {...timestampProps} {...firstPublishedProps} />
      {firstPublished !== lastPublished && (
        <Timestamp {...timestampProps} {...lastPublishedProps} />
      )}
    </GridItemConstrainedMedium>
  );
};

ArticleTimestamp.propTypes = {
  firstPublished: number.isRequired,
  lastPublished: number.isRequired,
};

export default ArticleTimestamp;
