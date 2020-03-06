import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import IncludeContainer from '.';
import { ToggleContext } from '#contexts/ToggleContext';
import { RequestContextProvider } from '#contexts/RequestContext';

const markup = `<!DOCTYPE html><html lang="en"> <script type="text/javascript">var count=0; function incrementCount(cnt){count=cnt + 1; document.getElementById('count').innerHTML=count;}; function decrementCount(cnt){count=cnt - 1; document.getElementById('count').innerHTML=count;}; </script> <head> <style>html{display: inline-flex;}span{background-color: #333; border-radius: 3px; color: #fff; padding: 1px 5px;}button{background-color: #fff; border: 1px solid currentColor; border-radius: 3px; cursor: pointer; outline: 0;}button:active{background-color: #333; color: #fff;}button, span{margin: 0 2px;}</style> </head> <body> <div> <span id="count">0</span> <button onClick="incrementCount(count)">Increase Count</button> <button onClick="decrementCount(count)">Decrease Count</button> </div></body></html>`;

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
      <IncludeContainer html={markup} />
    </ToggleContext.Provider>
  </RequestContextProvider>
);

describe('IncludeContainer', () => {
  describe('when styIncludes toggle is enabled', () => {
    const mockToggles = {
      test: {
        styIncludes: {
          enabled: true,
        },
      },
    };
    shouldMatchSnapshot(
      'should dangerously render a an html markup',
      <IncludeContainerWithMockContext toggleState={mockToggles} />,
    );
  });
  describe('when styIncludes toggle is disabled', () => {
    const mockToggles = {
      test: {
        styIncludes: {
          enabled: false,
        },
      },
    };
    shouldMatchSnapshot(
      'should not render any markup',
      <IncludeContainerWithMockContext toggleState={mockToggles} />,
    );
  });
});
