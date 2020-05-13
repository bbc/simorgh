import React, { useContext } from 'react';
import { string, number } from 'prop-types';
import ParagraphComponent from '@bbc/psammead-paragraph';
import { formatUnixTimestamp } from '@bbc/psammead-timestamp-container/utilities';
import { ServiceContext } from '#contexts/ServiceContext';

const Datestamp = ({ idAttr, timestamp }) => {
  const { script, service, timezone, locale } = useContext(ServiceContext);

  if (!timestamp) return null;

  const formattedTimestamp = formatUnixTimestamp({
    timestamp,
    format: 'LL',
    timezone,
    locale,
    isRelative: false,
  });

  return (
    <ParagraphComponent script={script} service={service} id={idAttr}>
      {formattedTimestamp}
    </ParagraphComponent>
  );
};

Datestamp.propTypes = {
  idAttr: string,
  timestamp: number.isRequired,
};

Datestamp.defaultProps = {
  idAttr: null,
};

export default Datestamp;
