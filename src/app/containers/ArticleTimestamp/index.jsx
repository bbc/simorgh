import React, { useContext, Fragment } from 'react';
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

const ArticleTimestamp = ({ firstPublished, lastPublished, withGridWrapper = true }) => {
  const {
    articleTimestampPrefix,
    datetimeLocale,
    script,
    service,
    timezone,
  } = useContext(ServiceContext);

  if (!isValidDateTime(firstPublished) || !isValidDateTime(lastPublished)) {
    return null;
  }

  const timestampProps = {
    dateTimeFormat: formatDateNumeric,
    script,
    locale: datetimeLocale,
    service,
    timezone,
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

  const Wrapper = withGridWrapper ? PopOutGridItemMedium : Fragment;

  return (
    <Wrapper>
      <Timestamp {...timestampProps} {...firstPublishedProps} />
      {firstPublished !== lastPublished && (
        <Timestamp {...timestampProps} {...lastPublishedProps} />
      )}
    </Wrapper>
  );
};

ArticleTimestamp.propTypes = {
  firstPublished: number.isRequired,
  lastPublished: number.isRequired,
};

export default ArticleTimestamp;
