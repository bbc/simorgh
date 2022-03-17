import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import { latin } from '@bbc/gel-foundations/scripts';
import relatedItems from '../../testHelpers/relatedItems';
import IndexAlsosContainer from '../../testHelpers/IndexAlsosContainer';

describe('Index Alsos', () => {
  shouldMatchSnapshot(
    'should render multiple correctly',
    <IndexAlsosContainer
      alsoItems={relatedItems}
      script={latin}
      service="news"
    />,
  );

  shouldMatchSnapshot(
    'should render one correctly',
    <IndexAlsosContainer
      alsoItems={[relatedItems[0]]}
      script={latin}
      service="news"
    />,
  );
});
