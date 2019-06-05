import React from 'react';
import { shouldMatchSnapshot } from '../../helpers/tests/testHelpers';
import WithPageWrapper from './withPageWrapper';
import { ServiceContextProvider } from '../../contexts/ServiceContext';

const dataProps = {
  isAmp: false,
  service: 'news',
};

describe('with pageWarpper', () => {
  const PageWrapperContainer = () => <h1>Holla</h1>;
  const PageWrapperHOC = WithPageWrapper(PageWrapperContainer);
  shouldMatchSnapshot(
    `should render correctly`,
    <ServiceContextProvider service={dataProps.service}>
    	<PageWrapperHOC data={dataProps} />
    </ServiceContextProvider>,
  );
});
