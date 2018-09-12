import React from 'react';
import Metadata from './index';
import { shouldShallowMatchSnapshot } from '../../helpers/tests/testHelpers';

const metadataSnapshotTest = (
  testDescription,
  canonicalLink,
  title,
  lang,
  amp,
) =>
  describe(testDescription, () => {
    shouldShallowMatchSnapshot(
      'should render correctly',
      <Metadata
        amp={amp}
        canonicalLink={canonicalLink}
        lang={lang}
        title={title}
      />,
    );
  });

describe('Metadata', () => {
  metadataSnapshotTest(
    'News article',
    'https://www.bbc.com/news/articles/c0000000001o',
    'An article title',
    'en-GB',
    false,
  );

  metadataSnapshotTest(
    'News AMP article',
    'https://www.bbc.com/news/articles/amp/c0000000001o',
    'An article title',
    'en-GB',
    true,
  );

  metadataSnapshotTest(
    'Persian article',
    'https://www.bbc.com/persian/articles/c0000000028o',
    'پهپادی که برایتان قهوه می‌آورد',
    'fa',
    false,
  );

  metadataSnapshotTest(
    'Persian AMP article',
    'https://www.bbc.com/persian/articles/amp/c0000000028o',
    'پهپادی که برایتان قهوه می‌آورد',
    'fa',
    true,
  );
});
