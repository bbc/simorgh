import React from 'react';
import { shouldMatchSnapshot } from '../../../../testHelpers';
import { RequestContextProvider } from '../../../contexts/RequestContext';
import { ServiceContextProvider } from '../../../contexts/ServiceContext';
import { ToggleContext } from '../../../contexts/ToggleContext';
import WithPageWrapper from '.';

const dataProps = {
  isAmp: false,
  service: 'news',
  route: { pageType: 'article' },
};

const defaultToggleState = {
  test: {
    navOnArticles: {
      enabled: true,
    },
  },
  live: {
    navOnArticles: {
      enabled: false,
    },
  },
};

const mockToggleDispatch = jest.fn();

describe('with pageWrapper', () => {
  const PageWrapperContainer = () => <h1>Holla</h1>;
  const PageWrapperHOC = WithPageWrapper(PageWrapperContainer);
  shouldMatchSnapshot(
    `should render correctly`,
    <ToggleContext.Provider
      value={{
        toggleState: defaultToggleState,
        toggleDispatch: mockToggleDispatch,
      }}
    >
      <ServiceContextProvider service="news">
        <RequestContextProvider
          isAmp={false}
          pageType="article"
          service="news"
          bbcOrigin="https://www.test.bbc.com"
        >
          <PageWrapperHOC {...dataProps} />
        </RequestContextProvider>
      </ServiceContextProvider>
    </ToggleContext.Provider>,
  );
});
