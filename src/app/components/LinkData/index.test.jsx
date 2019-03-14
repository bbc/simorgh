import React from 'react';
import { shouldShallowMatchSnapshot } from '../../helpers/tests/testHelpers';
import LinkData from '.';

describe('LinkData', () => {
  const props = {
    isAmp: false,
    lang: 'en-GB',
    seoHeadline: 'Royal wedding 2018: Bouquet laid on tomb of unknown warrior',
    type: 'article',
    optimoId: 'urn:bbc:optimo:asset:c9rpqy7pmypo',
    service: 'news',
    lastUpdated: '2019-02-26T11:25:10.555Z',
    firstPublished: '2018-10-10T16:19:31.344Z',
  };

  shouldShallowMatchSnapshot(
    'should correctly render metadata for links',
    <LinkData {...props} />,
  );
});
