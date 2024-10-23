import React from 'react';
import { render } from '../../react-testing-library-with-providers';
import * as ScreenGroupHook from '../hooks/useScreenGroup';
import MediaIcon from '.';
import { ScreenGroup } from '../hooks/useScreenGroup';

describe('MediaIcon', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it(`should render a mini play button`, () => {
    const { container } = render(
      <MediaIcon
        title="My Video"
        duration="2:30"
        durationSpoken="2 minutes 30 seconds"
        datetime="PT2M30S"
        guidanceMessage="Guidance: May contain strong language that may offend."
      />,
      {
        service: 'news',
      },
    );
    const guidanceMessage = container?.querySelector('span')?.innerHTML;
    const time = container?.querySelector('time')?.innerHTML;

    expect(guidanceMessage).toEqual(
      'Guidance: May contain strong language that may offend. Play video, "My Video", 2 minutes 30 seconds',
    );
    expect(time).toEqual('2:30');
  });

  it(`should NOT render a mini play button for small screensizes`, () => {
    jest
      .spyOn(ScreenGroupHook, 'default')
      .mockImplementation(() => ScreenGroup.GROUP_0);

    const { container } = render(
      <MediaIcon
        title="My Video"
        duration="2:30"
        durationSpoken="2 minutes 30 seconds"
        datetime="PT2M30S"
        guidanceMessage="Guidance: May contain strong language that may offend."
      />,
      {
        service: 'news',
      },
    );
    const guidanceMessage = container?.querySelector('span');
    const time = container?.querySelector('time');

    expect(guidanceMessage).toBe(null);
    expect(time).toBe(null);
  });
});
