import React from 'react';
import { render } from '@testing-library/react';
import DefaultPageWrapper from './defaultPageWrapper';
import { ServiceContextProvider } from '../contexts/ServiceContext';
import { ToggleContext } from '../contexts/ToggleContext';
import { RequestContext } from '../contexts/RequestContext';

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

  describe('DefaultPageWrapper', () => {
    it('should render correctly', () => {
      const { container } = render(
        <ServiceContextProvider service="news">
          <RequestContext.Provider value={{ env: 'test' }}>
            <ToggleContext.Provider value={{ toggleState: defaultToggles }}>
              <DefaultPageWrapper {...propsWithChildren} />,
            </ToggleContext.Provider>
          </RequestContext.Provider>
        </ServiceContextProvider>,
      );
      expect(container).toMatchSnapshot();
    });
  });
});
