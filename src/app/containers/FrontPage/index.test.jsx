import React from 'react';
import { render } from '@testing-library/react';
import { shouldMatchSnapshot } from '../../../testHelpers';
import FrontPageContainer from './index';
import igboConfig from '../../lib/config/services/igbo';
import igboData from '../../../../data/igbo/frontpage';
import toggleReducer from '../../reducers/ToggleReducer';
import defaultToggles from '../../lib/config/toggles';

// explicitly ignore console.log errors for Article/index:getInitialProps() error logging
global.console.log = jest.fn();

jest.mock('../PageHandlers/withPageWrapper', () => Component => {
  const PageWrapperContainer = props => (
    <div id="PageWrapperContainer">
      <Component {...props} />
    </div>
  );

  return PageWrapperContainer;
});

jest.mock('../PageHandlers/withLoading', () => Component => {
  const LoadingContainer = props => (
    <div id="LoadingContainer">
      <Component {...props} />
    </div>
  );

  return LoadingContainer;
});

jest.mock('../PageHandlers/withError', () => Component => {
  const ErrorContainer = props => (
    <div id="ErrorContainer">
      <Component {...props} />
    </div>
  );

  return ErrorContainer;
});

jest.mock('../PageHandlers/withData', () => Component => {
  const DataContainer = props => (
    <div id="DataContainer">
      <Component {...props} />
    </div>
  );

  return DataContainer;
});

jest.mock('../FrontPageMain', () => {
  return jest.fn().mockReturnValue(<div>FrontPageMain</div>);
});

describe('FrontPageContainer', () => {
  describe('Component', () => {
    describe('Composing the Front Page Container using the page handlers', () => {
      shouldMatchSnapshot(
        'should compose frontPageContainer with the Page Handler in the correct order',
        <FrontPageContainer />,
      );
    });
    describe('Assertions', () => {
      let FrontPageComponent;
      beforeAll(() => {
        jest.resetModules();
        jest.unmock('../PageHandlers/withError');
        jest.unmock('../PageHandlers/withLoading');
        jest.unmock('../PageHandlers/withData');

        jest.mock('react', () => {
          const original = jest.requireActual('react');
          return {
            ...original,
            useContext: jest.fn(),
            useReducer: jest.fn(),
          };
        });

        const { useContext, useReducer } = jest.requireMock('react');
        useContext.mockReturnValue(igboConfig);
        FrontPageComponent = jest.requireActual('.').default;
        useReducer.mockReturnValue([toggleReducer, defaultToggles]);
      });

      it('should not render frontpage if still loading', () => {
        const { container } = render(<FrontPageComponent loading />);
        const { textContent } = container.querySelector('main');

        expect(textContent).toEqual('');
        expect(textContent).not.toContain('FrontPageMain');
      });

      it('should render error page when an error occurs', () => {
        const { container } = render(
          <FrontPageComponent error="An error Occured" />,
        );

        const { textContent } = container.querySelector('main');
        expect(textContent).toContain('Mperi');
        expect(textContent).not.toContain('FrontPageMain');
      });

      it('should render the frontpage with data', () => {
        const data = {
          pageData: igboData,
          status: 200,
        };

        const frontPageMainMock = jest.requireMock('../FrontPageMain');
        const { container } = render(
          <FrontPageComponent error="" data={data} service="igbo" />,
        );

        expect(frontPageMainMock.mock.calls).toHaveLength(1);
        expect(frontPageMainMock.mock.calls[0][0]).toEqual({
          frontPageData: igboData,
        });
        expect(container.textContent).toEqual('FrontPageMain');
      });
    });
  });
});
