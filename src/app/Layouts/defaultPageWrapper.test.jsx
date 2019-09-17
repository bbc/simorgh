import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import DefaultPageWrapper from './defaultPageWrapper';
import { ServiceContextProvider } from '../contexts/ServiceContext';
import { ToggleContext } from '../contexts/ToggleContext';
import { RequestContext } from '../contexts/RequestContext';

jest.mock('../containers/MPulseBeacon', () => () => (
  <p>I am the mPulse component</p>
));

describe('defaultPageWrapper', () => {
  const propsWithChildren = {
    children: <h2>Child element</h2>,
  };

  const defaultToggles = {
    test: {
      mpulse: {
        enabled: true, // or maybe false
      },
    },
  };

  shouldMatchSnapshot(
    'should render default page wrapper with children',
    <ServiceContextProvider service="news">
      <RequestContext.Provider value={{ env: 'test' }}>
        <ToggleContext.Provider value={{ toggleState: defaultToggles }}>
          <DefaultPageWrapper {...propsWithChildren} />,
        </ToggleContext.Provider>
      </RequestContext.Provider>
    </ServiceContextProvider>,
  );
});
