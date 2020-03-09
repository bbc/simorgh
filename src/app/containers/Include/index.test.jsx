import React from 'react';
import { render, wait } from '@testing-library/react';
import IncludeContainer from '.';
import { ToggleContext } from '#contexts/ToggleContext';
import { RequestContextProvider } from '#contexts/RequestContext';

const responseText = `<!DOCTYPE html><html lang="en"> <script type="text/javascript">var count=0; function incrementCount(cnt){count=cnt + 1; document.getElementById('count').innerHTML=count;}; function decrementCount(cnt){count=cnt - 1; document.getElementById('count').innerHTML=count;}; </script> <head> <style>html{display: inline-flex;}span{background-color: #333; border-radius: 3px; color: #fff; padding: 1px 5px;}button{background-color: #fff; border: 1px solid currentColor; border-radius: 3px; cursor: pointer; outline: 0;}button:active{background-color: #333; color: #fff;}button, span{margin: 0 2px;}</style> </head> <body> <div> <span id="count">0</span> <button onClick="incrementCount(count)">Increase Count</button> <button onClick="decrementCount(count)">Decrease Count</button> </div></body></html>`;

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
});
