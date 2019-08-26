import React from 'react';
import { shouldMatchSnapshot } from '../../../../testHelpers';
import { ServiceContextProvider } from '../../../contexts/ServiceContext';
import { UserContextProvider } from '../../../contexts/UserContext';
import WithPageWrapper from '.';

const dataProps = {
  isAmp: false,
  service: 'news',
  route: { pageType: 'article' },
};

// eslint-disable-next-line react/prop-types
jest.mock('../../../Layouts/defaultPageWrapper', () => ({ children }) => (
  <div id="defaultPageWrapper">{children}</div>
));

describe('with pageWrapper', () => {
  const PageWrapperContainer = () => <h1>Holla</h1>;
  const PageWrapperHOC = WithPageWrapper(PageWrapperContainer);
  shouldMatchSnapshot(
    `should render correctly`,
    <ServiceContextProvider service="news">
      <UserContextProvider>
        <PageWrapperHOC {...dataProps} />
      </UserContextProvider>
    </ServiceContextProvider>,
  );
});
