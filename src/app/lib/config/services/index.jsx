/*
  This file includes data for the Service Context
  It will be used by the ServiceContext Component
*/
import React from 'react';
import news from './news';
import persian from './persian';
import igbo from './igbo';
import pidgin from './pidgin';
import thai from './thai';
import yoruba from './yoruba';

export default {
  default: {
    brandName: 'Default Brand Name',
    externalLinkText: ', default external link suffix',
    imageCaptionOffscreenText: 'Default image caption prefix, ',
    imageCopyrightOffscreenText: 'Default image copyright text, ',
    service: 'default',
    themeColor: '#000',
    svg: {
      group: (
        <g fillRule="evenodd">
          <path d="M84.32" />
        </g>
      ),
      viewbox: { height: 24, width: 167.95 },
      ratio: 6.9979,
    },
  },
  news,
  persian,
  igbo,
  pidgin,
  thai,
  yoruba,
};
