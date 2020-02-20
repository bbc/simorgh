import React from 'react';
import { string } from 'prop-types';

import { GridItemConstrainedMedium } from '#lib/styledGrid';

const SocialEmbed = ({ className }) => (
  <GridItemConstrainedMedium className={className}>
    <h1>Hello, World!</h1>
  </GridItemConstrainedMedium>
);

SocialEmbed.defaultProps = {
  className: '',
};

SocialEmbed.propTypes = {
  className: string,
};

export default SocialEmbed;
