import { arrayOf, shape, string } from 'prop-types';
import React from 'react';

import CpsSocialEmbed from './Cps';

const SocialEmbed = ({ blocks, source }) => {
  console.log(blocks, source);
  return <a href={source}>Tweet</a>;
};

SocialEmbed.defaultProps = {
  blocks: [],
};

SocialEmbed.propTypes = {
  blocks: arrayOf(shape({})),
  source: string.isRequired,
};

export { CpsSocialEmbed, SocialEmbed };
