import React from 'react';
import { shouldMatchSnapshot } from '#psammead/psammead-test-helpers/src';
import relatedItems from '../../testHelpers/relatedItems';
import IndexAlsosContainer from '../../testHelpers/IndexAlsosContainer';
import latin from '../../../../../components/ThemeProvider/fontScripts/latin';

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
