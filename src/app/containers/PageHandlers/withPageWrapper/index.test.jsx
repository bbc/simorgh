import React from 'react';
import { shouldMatchSnapshot } from '../../../../testHelpers';
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
    <PageWrapperHOC {...dataProps} />,
  );
});
