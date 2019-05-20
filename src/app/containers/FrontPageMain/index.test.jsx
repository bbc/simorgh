import React from 'react';
import FrontPageMain from '.';
import { shouldShallowMatchSnapshot } from '../../helpers/tests/testHelpers';
import frontPageDataPersian from '../../../../data/prod/pidgin/frontpage';

describe('FrontPageMain', () => {
  shouldShallowMatchSnapshot(
    'should render a persian article correctly',
    <FrontPageMain service="persian" frontPageData={frontPageDataPersian} />,
  );
});
