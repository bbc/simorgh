import React from 'react';
import { shouldMatchSnapshot } from '../../../../testHelpers';
import { ServiceContextProvider } from '../../../contexts/ServiceContext';
import WithPageWrapper from '.';

const dataProps = {
  isAmp: false,
  service: 'news',
  route: { pageType: 'article' },
};

describe('with pageWrapper', () => {
  const PageWrapperContainer = () => <h1>Holla</h1>;
  const PageWrapperHOC = WithPageWrapper(PageWrapperContainer);
  shouldMatchSnapshot(
    `should render correctly`,
    <ServiceContextProvider service="news">
      <PageWrapperHOC {...dataProps} />,
    </ServiceContextProvider>,
  );
});
