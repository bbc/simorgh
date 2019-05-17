import React from 'react';
import FrontPageMain from '.';
import { shouldShallowMatchSnapshot } from '../../helpers/tests/testHelpers';
import { articleDataNews, articleDataPersian } from '../Article/fixtureData';

// temporary: will be removed with https://github.com/bbc/simorgh/issues/836
const articleDataNewsNoHeadline = JSON.parse(JSON.stringify(articleDataNews));
articleDataNewsNoHeadline.content.model.blocks.shift();

describe('FrontPageMain', () => {
  shouldShallowMatchSnapshot(
    'should render a news article correctly',
    <FrontPageMain service="news" frontPageData={articleDataNews} />,
  );

  shouldShallowMatchSnapshot(
    'should render a persian article correctly',
    <FrontPageMain service="persian" frontPageData={articleDataPersian} />,
  );
});
