import React, { useContext } from 'react';
import { number } from 'prop-types';
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
  const {
    articleTimestampPrefix,
    datetimeLocale,
    script,
    service,
  } = useContext(ServiceContext);

  if (!isValidDateTime(firstPublished) || !isValidDateTime(lastPublished)) {
    return null;
  }

  const timestampProps = {
    dateTimeFormat: formatDateNumeric,
    script,
    locale: datetimeLocale,
    service,
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
    prefix: articleTimestampPrefix,
  };

  return (
    <PopOutGridItemMedium>
      <p>Timestamp</p>
    </PopOutGridItemMedium>
  );
};

ArticleTimestamp.propTypes = {
  firstPublished: number.isRequired,
  lastPublished: number.isRequired,
};

export default ArticleTimestamp;
