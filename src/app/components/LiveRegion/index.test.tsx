import React from 'react';
import userEvent from '@testing-library/user-event';
import { act, render, screen } from '../react-testing-library-with-providers';
import LiveRegion from '.';
import {
  LiveRegionContext,
  LiveRegionContextProvider,
} from './LiveRegionContext';

describe('LiveRegion', () => {
  it('should update text when state is changed in context', async () => {
    const user = userEvent.setup();

    const LIVE_REGION_TEXT_1 = 'foo';
    const LIVE_REGION_TEXT_2 = 'bar';

    const { container } = await act(async () => {
      return render(
        <LiveRegionContextProvider>
          <LiveRegion />
          <LiveRegionContext.Consumer>
            {({ replaceLiveRegionWith }) => (
              <>
                <button
                  type="button"
                  onClick={() => replaceLiveRegionWith(LIVE_REGION_TEXT_1)}
                >
                  foo
                </button>
                <button
                  type="button"
                  onClick={() => replaceLiveRegionWith(LIVE_REGION_TEXT_2)}
                >
                  bar
                </button>
              </>
            )}
          </LiveRegionContext.Consumer>
        </LiveRegionContextProvider>,
      );
    });

    const firstButton = screen.getByRole('button', {
      name: /foo/i,
    });
    const secondButton = screen.getByRole('button', {
      name: /bar/i,
    });
    const liveRegion = container.querySelector('[aria-live="polite"]');

    expect(liveRegion).toHaveTextContent('');
    await act(() => user.click(firstButton));
    expect(liveRegion).toHaveTextContent(LIVE_REGION_TEXT_1);
    await act(() => user.click(secondButton));
    expect(liveRegion).toHaveTextContent(LIVE_REGION_TEXT_2);
  });
});
