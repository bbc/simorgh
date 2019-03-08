import React from 'react';
import { shouldMatchSnapshot } from '../../helpers/tests/testHelpers';
import LinkData from '.';

describe('LinkData', () => {
  const props = {
    seoHeadline: 'Royal wedding 2018: Bouquet laid on tomb of unknown warrior',
    type: 'article',
    optimoUrn: 'urn:bbc:optimo:asset:c9rpqy7pmypo',
    service: 'news',
    lastUpdated: 1551180310555,
    firstPublished: 1539188371344,
  };

  shouldMatchSnapshot(
    'should correctly render metadata for links',
    <LinkData {...props} />,
  );
});
