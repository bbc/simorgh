import React from 'react';
import { render } from '@testing-library/react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import FrontPageContainer from './index';
import { service as igboConfig } from '#lib/config/services/igbo';
import igboData from '#data/igbo/frontpage';
import toggleReducer from '../../reducers/ToggleReducer';
import defaultToggles from '#lib/config/toggles';

// explicitly ignore console.log errors for Article/index:getInitialProps() error logging
global.console.log = jest.fn();

const defaultProps = {
  isAmp: false,
  pageType: 'frontPage',
  service: 'news',
  pathname: '/pathname',
  data: { status: 200 },
};

jest.mock('../../containers/PageHandlers/withVariant', () => Component => {
  const VariantContainer = props => (
    <div id="VariantContainer">
      <Component {...props} />
    </div>
  );

  return VariantContainer;
});

jest.mock('../../containers/PageHandlers/withContexts', () => Component => {
  const DataContainer = props => (
    <div id="ContextsContainer">
      <Component {...props} />
    </div>
  );

  return DataContainer;
});

jest.mock('../../containers/PageHandlers/withPageWrapper', () => Component => {
  const PageWrapperContainer = props => (
    <div id="PageWrapperContainer">
      <Component {...props} />
    </div>
  );

  return PageWrapperContainer;
});

jest.mock('../../containers/PageHandlers/withLoading', () => Component => {
  const LoadingContainer = props => (
    <div id="LoadingContainer">
      <Component {...props} />
    </div>
  );

  return LoadingContainer;
});

jest.mock('../../containers/PageHandlers/withError', () => Component => {
  const ErrorContainer = props => (
    <div id="ErrorContainer">
      <Component {...props} />
    </div>
  );

  return ErrorContainer;
});

jest.mock('../../containers/PageHandlers/withData', () => Component => {
  const DataContainer = props => (
    <div id="DataContainer">
      <Component {...props} />
    </div>
  );

  return DataContainer;
});

jest.mock('../../containers/PageHandlers/withContexts', () => Component => {
  const ContextsContainer = props => (
    <div id="ContextsContainer">
      <Component {...props} />
    </div>
  );

  return ContextsContainer;
});

jest.mock('../../containers/FrontPageMain', () => {
  return jest.fn().mockReturnValue(<div>FrontPageMain</div>);
});

describe('FrontPageContainer', () => {
  describe('Component', () => {
    describe('Composing the Front Page Container using the page handlers', () => {
      shouldMatchSnapshot(
        'should compose frontPageContainer with the Page Handler in the correct order',
        <FrontPageContainer {...defaultProps} />,
      );
    });

    describe('Assertions', () => {
      let FrontPageComponent;
      beforeAll(() => {
        jest.resetModules();
        jest.unmock('../../containers/PageHandlers/withError');
        jest.unmock('../../containers/PageHandlers/withLoading');
        jest.unmock('../../containers/PageHandlers/withData');

        jest.mock('react', () => {
          const original = jest.requireActual('react');
          return {
            ...original,
            useContext: jest.fn(),
            useReducer: jest.fn(),
            useState: jest.fn(),
          };
        });

        const { useContext, useReducer, useState } = jest.requireMock('react');
        useContext.mockReturnValue(igboConfig.default);
        FrontPageComponent = jest.requireActual('.').default;
        useReducer.mockReturnValue([toggleReducer, defaultToggles]);
        useState.mockImplementation(input => [input, () => {}]);
      });

      it('should not render frontpage if still loading', () => {
        const { container } = render(
          <FrontPageComponent {...defaultProps} loading />,
        );
        const { textContent } = container.querySelector('main');

        expect(textContent).toEqual('');
        expect(textContent).not.toContain('FrontPageMain');
      });

      it('should render error page when an error occurs', () => {
        const { container } = render(
          <FrontPageComponent {...defaultProps} error={new Error('oh no')} />,
        );

        const { textContent } = container.querySelector('main');
        expect(textContent).toContain('Mperi');
        expect(textContent).not.toContain('FrontPageMain');
      });

      it('should render the frontpage with data', () => {
        const pageData = igboData;
        const status = 200;

        const frontPageMainMock = jest.requireMock(
          '../../containers/FrontPageMain',
        );
        const { container } = render(
          <FrontPageComponent
            {...defaultProps}
            error={null}
            service="igbo"
            pageData={pageData}
            status={status}
          />,
        );

        const expectedProps = {
          frontPageData: igboData,
          mostReadEndpointOverride: null,
          forceMostRead: false,
        };

        expect(frontPageMainMock.mock.calls).toHaveLength(1);
        expect(frontPageMainMock.mock.calls[0][0]).toEqual(expectedProps);
        expect(container.textContent).toEqual('FrontPageMain');
      });
    });
  });
});
