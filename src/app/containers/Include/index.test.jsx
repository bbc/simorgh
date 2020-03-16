import React from 'react';
import { render, wait } from '@testing-library/react';
import IncludeContainer from '.';
import { ToggleContext } from '#contexts/ToggleContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import fakeInclude from './fixtures';

const responseText = fakeInclude;

// eslint-disable-next-line react/prop-types
const IncludeContainerWithMockContext = ({ toggleState }) => (
  <RequestContextProvider
    bbcOrigin="https://www.test.bbc.com"
    isAmp={false}
    pageType="STY"
    service="news"
    statusCode={200}
    pathname="/pathname"
  >
    <ToggleContext.Provider value={{ toggleState, toggleDispatch: jest.fn() }}>
      <IncludeContainer href="/vj.html" />
    </ToggleContext.Provider>
  </RequestContextProvider>
);

describe('IncludeContainer', () => {
  afterEach(() => {
    fetch.resetMocks();
  });
  it('should render HTML when include toggle is enabled', async () => {
    fetch.mockResponse(() => Promise.resolve(responseText));

    const mockToggles = {
      test: {
        include: {
          enabled: true,
        },
      },
    };
    const { container } = render(
      <IncludeContainerWithMockContext toggleState={mockToggles} />,
    );
    await wait(() => {
      expect(fetch).toHaveBeenCalledWith('/vj.html');
      expect(container).toMatchSnapshot();
    });
  });

  it('should not render any HTML when include toggle is disabled', async () => {
    fetch.mockResponse(() => Promise.resolve('nothing to see here'));
    const mockToggles = {
      test: {
        include: {
          enabled: false,
        },
      },
    };
    const { container } = render(
      <IncludeContainerWithMockContext toggleState={mockToggles} />,
    );
    await wait(() => {
      expect(fetch).not.toHaveBeenCalled();
      expect(container).toMatchSnapshot();
    });
  });

  it('should not render any HTML when response returns with a status other than 200', async () => {
    fetch.mockResponse(() => Promise.resolve({ status: 304 }));
    const mockToggles = {
      test: {
        include: {
          enabled: true,
        },
      },
    };
    const { container } = render(
      <IncludeContainerWithMockContext toggleState={mockToggles} />,
    );
    await wait(() => {
      expect(fetch).toHaveBeenCalled();
      expect(container).toMatchSnapshot();
    });
  });
});
