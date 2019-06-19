import React, { useContext } from 'react';
import { func } from 'prop-types';
import { render } from '@testing-library/react';
import DefaultPageWrapper from './defaultPageWrapper';
import { shouldShallowMatchSnapshot } from '../../testHelpers';
import getOriginContext from '../contexts/RequestContext/getOriginContext';
import getStatsDestination from '../contexts/RequestContext/getStatsDestination';
import getStatsPageIdentifier from '../contexts/RequestContext/getStatsPageIdentifier';
import { RequestContext } from '../contexts/RequestContext';

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

// Turns out it's difficult to test that a component correctly
// sets a React.Context. This ugliness is a way to access the
// RequestContext set by a parent component. Pass in a function
// that stores its single argument somewhere useful for your tests.
const GetThingsFromRequestContext = ({ fn }) => {
  const rc = useContext(RequestContext);
  fn(rc);
  return <p>Placeholder element</p>;
};

GetThingsFromRequestContext.propTypes = {
  fn: func.isRequired,
};

describe('defaultPageWrapper', () => {
  const propsWithChildren = {
    bbcOrigin: 'https://www.bbc.com',
    children: <h2>Child element</h2>,
    id: 'c0000000000o',
    service: 'news',
    isAmp: true,
    route: { pageType: 'article' },
  };

  shouldShallowMatchSnapshot(
    'should render with children',
    <DefaultPageWrapper {...propsWithChildren} />,
  );

  it('passing pageType==article should pass along', () => {
    const fixture = {
      bbcOrigin: 'https://www.bbc.com',
      id: 'c0000000000o',
      service: 'news',
      isAmp: true,
      route: { pageType: 'article' },
    };

    let rc;
    const getRc = foreign => {
      rc = foreign;
    };

    render(
      <DefaultPageWrapper {...fixture}>
        <GetThingsFromRequestContext fn={getRc} />
      </DefaultPageWrapper>,
    );

    expect(rc.pageType).toBe('article');
  });

  it('passing pageType==frontPage should pass along', () => {
    const fixture = {
      bbcOrigin: 'https://www.bbc.com',
      id: 'c0000000000o',
      service: 'news',
      isAmp: true,
      route: { pageType: 'frontPage' },
    };

    let rc;
    const getRc = foreign => {
      rc = foreign;
    };

    render(
      <DefaultPageWrapper {...fixture}>
        <GetThingsFromRequestContext fn={getRc} />
      </DefaultPageWrapper>,
    );

    expect(rc.pageType).toBe('frontPage');
  });
});
