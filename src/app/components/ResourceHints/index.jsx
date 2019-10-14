import React, { Fragment } from 'react';
import { any, objectOf, string } from 'prop-types';

const ResourceHints = ({ assetOrigins, service }) => {
  // eslint-disable-next-line global-require,import/no-dynamic-require
  const serviceConfig = require(`../../lib/config/services/${service}`);
  const { fonts } = serviceConfig.service.default;
  const { fontsOrigins, ...rest } = assetOrigins;
  let origins = Object.values(rest).flat();

  if (fonts && fonts.length > 0) {
    origins = origins.concat(fontsOrigins);
  }

  return (
    <>
      {origins.map(origin => (
        <Fragment key={origin}>
          <link rel="preconnect" href={origin} crossOrigin="anonymous" />
          <link rel="dns-prefetch" href={origin} />
        </Fragment>
      ))}
    </>
  );
};

ResourceHints.propTypes = {
  assetOrigins: objectOf(any).isRequired,
  service: string.isRequired,
};

export default ResourceHints;
