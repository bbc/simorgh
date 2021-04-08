import React from 'react';
import { render, fireEvent, getByText } from '@testing-library/react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import Placeholder from '.';

describe('Media Player: Placeholder', () => {
  const mockOnClick = jest.fn();
  const withDuration = {
    duration: '2:30',
    durationSpoken: '2 minutes 30 seconds',
    datetime: 'PT2M30S',
  };

  afterEach(() => {
    jest.resetModules();
  });

  shouldMatchSnapshot(
    'should render a video placeholder',
    <Placeholder
      onClick={mockOnClick}
      src="http://foo.bar/placeholder.png"
      service="news"
      mediaInfo={{ title: 'Dog chases cat.', ...withDuration }}
      noJsMessage="no js"
    />,
  );

  shouldMatchSnapshot(
    'should render a video placeholder without duration',
    <Placeholder
      onClick={mockOnClick}
      src="http://foo.bar/placeholder.png"
      service="news"
      mediaInfo={{ title: 'Dog chases cat.' }}
      noJsMessage="no js"
    />,
  );

  shouldMatchSnapshot(
    'should render an audio placeholder',
    <Placeholder
      onClick={mockOnClick}
      src="http://foo.bar/placeholder.png"
      service="news"
      mediaInfo={{ type: 'audio', title: 'Dog barks at cat.', ...withDuration }}
      noJsMessage="no js"
    />,
  );

  shouldMatchSnapshot(
    'should render an audio placeholder without duration',
    <Placeholder
      onClick={mockOnClick}
      src="http://foo.bar/placeholder.png"
      service="news"
      mediaInfo={{ type: 'audio', title: 'Dog barks at cat.' }}
      noJsMessage="no js"
    />,
  );

  it('should call onClick when the placeholder and play button is clicked', () => {
    const { container } = render(
      <Placeholder
        onClick={mockOnClick}
        src="http://foo.bar/placeholder.png"
        service="news"
        mediaInfo={{ title: 'Dog chases cat.', ...withDuration }}
        noJsMessage="no js"
      />,
    );
    fireEvent.click(container.firstChild);
    fireEvent.click(getByText(container.firstChild, '2:30'));
    expect(mockOnClick).toHaveBeenCalledTimes(2);
  });

  shouldMatchSnapshot(
    'should render a video placeholder with guidance',
    <Placeholder
      onClick={mockOnClick}
      src="http://foo.bar/placeholder.png"
      service="news"
      mediaInfo={{
        title: 'Dog chases cat.',
        guidanceMessage:
          'Guidance: May contain strong language, sexual or violent content that may offend.',
        ...withDuration,
      }}
      noJsMessage="no js"
    />,
  );

  shouldMatchSnapshot(
    'should render no-js styles when noJsClassName prop is used',
    <Placeholder
      onClick={mockOnClick}
      src="http://foo.bar/placeholder.png"
      service="news"
      mediaInfo={{
        title: 'Dog chases cat.',
        guidanceMessage:
          'Guidance: May contain strong language, sexual or violent content that may offend.',
        ...withDuration,
      }}
      noJsMessage="no js"
      noJsClassName="no-js"
    />,
  );
});
