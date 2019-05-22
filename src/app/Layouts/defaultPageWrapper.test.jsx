import React from 'react';
import DefaultPageWrapper from './defaultPageWrapper';
import { shouldShallowMatchSnapshot } from '../helpers/tests/testHelpers';
import getEnv from '../contexts/RequestContext/getEnv';
import getOrigin from '../contexts/RequestContext/getOrigin';
import getStatsDestination from '../contexts/RequestContext/getStatsDestination';
import getStatsPageIdentifier from '../contexts/RequestContext/getStatsPageIdentifier';

jest.mock('../contexts/RequestContext/getOrigin', () => jest.fn());

getOrigin.mockImplementation(() => 'https://www.bbc.co.uk');

jest.mock('../contexts/RequestContext/getEnv', () => jest.fn());

getEnv.mockImplementation(() => 'live');

jest.mock('../contexts/RequestContext/getStatsDestination', () => jest.fn());

getStatsDestination.mockImplementation(() => 'NEWS_PS_TEST');

jest.mock('../contexts/RequestContext/getStatsPageIdentifier', () => jest.fn());

getStatsPageIdentifier.mockImplementation(
  () => 'news.articles.c0000000000o.page',
);

describe('defaultPageWrapper', () => {
  const propsWithChildren = {
    bbcOrigin: 'https://www.bbc.co.uk',
    children: <h2>Child element</h2>,
    env: 'live',
    id: 'c0000000000o',
    service: 'news',
    isAmp: true,
  };
  shouldShallowMatchSnapshot(
    'should render with children',
    <DefaultPageWrapper {...propsWithChildren} />,
  );
});
