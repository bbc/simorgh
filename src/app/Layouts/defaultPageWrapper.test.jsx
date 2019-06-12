import React from 'react';
import DefaultPageWrapper from './defaultPageWrapper';
import { shouldShallowMatchSnapshot } from '../../testHelpers/testHelpers';
import getOriginContext from '../contexts/RequestContext/getOriginContext';
import getStatsDestination from '../contexts/RequestContext/getStatsDestination';
import getStatsPageIdentifier from '../contexts/RequestContext/getStatsPageIdentifier';

jest.mock('../contexts/RequestContext/getOriginContext', () => jest.fn());

getOriginContext.mockImplementation(origin => ({
  isUK: true,
  origin,
}));

jest.mock('../contexts/RequestContext/getStatsDestination', () => jest.fn());

getStatsDestination.mockImplementation(() => 'NEWS_PS_TEST');

jest.mock('../contexts/RequestContext/getStatsPageIdentifier', () => jest.fn());

getStatsPageIdentifier.mockImplementation(
  () => 'news.articles.c0000000000o.page',
);

describe('defaultPageWrapper', () => {
  const propsWithChildren = {
    bbcOrigin: 'https://www.bbc.com',
    children: <h2>Child element</h2>,
    id: 'c0000000000o',
    service: 'news',
    isAmp: true,
  };
  shouldShallowMatchSnapshot(
    'should render with children',
    <DefaultPageWrapper {...propsWithChildren} />,
  );
});
