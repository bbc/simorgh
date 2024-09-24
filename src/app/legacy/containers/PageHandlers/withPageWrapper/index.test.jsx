import React from 'react';
import { RequestContextProvider } from '#contexts/RequestContext';
import { UserContextProvider } from '#contexts/UserContext';
import { ToggleContext } from '#contexts/ToggleContext';
import { ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
import { shouldMatchSnapshot } from '#psammead/psammead-test-helpers/src';
import { ServiceContextProvider } from '../../../../contexts/ServiceContext';
import WithPageWrapper from '.';

const dataProps = {
  isAmp: false,
  service: 'news',
  status: 200,
  route: { pageType: ARTICLE_PAGE },
};

jest.mock('../../../../components/PageLayoutWrapper', () => ({ children }) => (
  <div id="defaultPageWrapper">{children}</div>
));

const mockToggleDispatch = jest.fn();

describe('with pageWrapper', () => {
  const PageWrapperContainer = () => <h1>Hola</h1>;
  const PageWrapperHOC = WithPageWrapper(PageWrapperContainer);
  shouldMatchSnapshot(
    `should render correctly`,
    <ToggleContext.Provider
      value={{
        toggleState: {},
        toggleDispatch: mockToggleDispatch,
      }}
    >
      <ServiceContextProvider service="news">
        <RequestContextProvider
          isAmp={false}
          pageType={ARTICLE_PAGE}
          service="news"
          statusCode={200}
          bbcOrigin="https://www.test.bbc.com"
          pathname="/pathname"
        >
          <UserContextProvider>
            <PageWrapperHOC {...dataProps} />
          </UserContextProvider>
        </RequestContextProvider>
      </ServiceContextProvider>
    </ToggleContext.Provider>,
  );
});
