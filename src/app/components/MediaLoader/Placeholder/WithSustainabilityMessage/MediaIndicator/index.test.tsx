import React from 'react';
import { render } from '../../../../react-testing-library-with-providers';
import MediaIcon from '.';

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
        service: 'mundo',
      },
    );
    const guidanceMessage = container?.querySelector('strong')?.innerHTML;
    const time = container?.querySelector('time')?.innerHTML;

    expect(guidanceMessage).toEqual('Video, "My Video", 2 minutes 30 seconds');
    expect(time).toEqual('2:30');
  });
});
