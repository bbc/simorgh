import React from 'react';
import { shouldMatchSnapshot } from '../../helpers/tests/testHelpers';
import WithPageWrapper from './withPageWrapper';

const dataProps = {
  isAmp: false,
  service: 'news',
};

describe('with pageWarpper', () => {
  const PageWrapperContainer = () => <h1>Holla</h1>;
  const PageWrapperHOC = WithPageWrapper(PageWrapperContainer);
  shouldMatchSnapshot(
    `should render correctly`,
    <PageWrapperHOC data={dataProps} />,
  );
});
