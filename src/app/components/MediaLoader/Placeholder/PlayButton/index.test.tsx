/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';
import { render } from '#app/components/react-testing-library-with-providers';
import PlayButton from './index';

describe('PlayButton', () => {
  it('should render video by default', () => {
    const { container } = render(
      <PlayButton title="Dog chases cat." onClick={() => {}} />,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render video indicator correctly', () => {
    const { container } = render(
      <PlayButton
        title="Dog chases cat."
        onClick={() => {}}
        duration="2:30"
        durationSpoken="2 minutes 30 seconds"
        datetime="PT2M30S"
        className="foo"
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render video correctly without duration details', () => {
    const { container } = render(
      <PlayButton title="Dog chases cat." onClick={() => {}} />,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render audio indicator correctly', () => {
    const { container } = render(
      <PlayButton
        title="Dog barks at cat."
        onClick={() => {}}
        duration="2:30"
        durationSpoken="2 minutes 30 seconds"
        datetime="PT2M30S"
        type="audio"
        className="foo"
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render audio correctly without duration details', () => {
    const { container } = render(
      <PlayButton title="Dog barks at cat." onClick={() => {}} type="audio" />,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render video correctly with duration and guidance message', () => {
    const { container } = render(
      <PlayButton
        title="Dog chases cat."
        onClick={() => {}}
        duration="2:30"
        durationSpoken="2 minutes 30 seconds"
        datetime="PT2M30S"
        guidanceMessage="Guidance: May contain strong language that may offend."
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
