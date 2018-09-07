import React from 'react';
import Metadata from './index';
import { shouldShallowMatchSnapshot } from '../../../helpers/tests/testHelpers';

const metadataSnapshotTest = (
  testDescription,
  canonicalLink,
  title,
  htmlAttributes,
) =>
  describe(testDescription, () => {
    shouldShallowMatchSnapshot(
      'should render correctly',
      <Metadata
        canonicalLink={canonicalLink}
        htmlAttributes={htmlAttributes}
        title={title}
      />,
    );
  });

describe('Metadata', () => {
  metadataSnapshotTest(
    'News article',
    'https://www.bbc.com/news/articles/c0000000001o',
    'An article title',
    {
      lang: 'en-GB',
    },
  );

  metadataSnapshotTest(
    'News AMP article',
    'https://www.bbc.com/news/articles/amp/c0000000001o',
    'An article title',
    {
      amp: true,
      lang: 'en-GB',
    },
  );

  metadataSnapshotTest(
    'Persian article',
    'https://www.bbc.com/persian/articles/c0000000028o',
    'پهپادی که برایتان قهوه می‌آورد',
    {
      lang: 'fa',
    },
  );

  metadataSnapshotTest(
    'Persian AMP article',
    'https://www.bbc.com/persian/articles/amp/c0000000028o',
    'پهپادی که برایتان قهوه می‌آورد',
    {
      amp: true,
      lang: 'fa',
    },
  );
});
