import React from 'react';
import { shouldMatchSnapshot } from '#psammead/psammead-test-helpers/src';
import DefaultPageWrapper from './defaultPageWrapper';
import { ServiceContextProvider } from '../contexts/ServiceContext';
import { ToggleContext } from '../contexts/ToggleContext';
import { RequestContext } from '../contexts/RequestContext';

jest.mock('#psammead/psammead-styles/src/global-styles', () => () => (
  <p>I am the GlobalStyles component</p>
));

jest.mock('../legacy/containers/ServiceWorker', () => () => (
  <p>I am the ServiceWorker component</p>
));

global.performance.getEntriesByName = jest.fn(() => []);

describe('defaultPageWrapper', () => {
  const propsWithChildren = {
    children: <h2>Child element</h2>,
  };

  const defaultToggles = {
    test: {},
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
