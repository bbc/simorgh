import React from 'react';
import {
  render,
  fireEvent,
  getByText,
} from '#app/components/react-testing-library-with-providers';
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

  it('should render a video placeholder', () => {
    const { container } = render(
      <Placeholder
        onClick={mockOnClick}
        src="http://foo.bar/placeholder.png"
        mediaInfo={{ title: 'Dog chases cat.', ...withDuration }}
        noJsMessage="no js"
      />,
      { service: 'news' },
    );
    expect(container).toMatchSnapshot();
  });

  it('should render a video placeholder without duration', () => {
    const { container } = render(
      <Placeholder
        onClick={mockOnClick}
        src="http://foo.bar/placeholder.png"
        mediaInfo={{ title: 'Dog chases cat.' }}
        noJsMessage="no js"
      />,
      { service: 'news' },
    );
    expect(container).toMatchSnapshot();
  });

  it('should render an audio placeholder', () => {
    const { container } = render(
      <Placeholder
        onClick={mockOnClick}
        src="http://foo.bar/placeholder.png"
        mediaInfo={{
          type: 'audio',
          title: 'Dog barks at cat.',
          ...withDuration,
        }}
        noJsMessage="no js"
      />,
      { service: 'news' },
    );
    expect(container).toMatchSnapshot();
  });

  it('should render an audio placeholder without duration', () => {
    const { container } = render(
      <Placeholder
        onClick={mockOnClick}
        src="http://foo.bar/placeholder.png"
        mediaInfo={{ type: 'audio', title: 'Dog barks at cat.' }}
        noJsMessage="no js"
      />,
      { service: 'news' },
    );
    expect(container).toMatchSnapshot();
  });

  it('should call onClick when the placeholder and play button is clicked', () => {
    const { container } = render(
      <Placeholder
        onClick={mockOnClick}
        src="http://foo.bar/placeholder.png"
        mediaInfo={{ title: 'Dog chases cat.', ...withDuration }}
        noJsMessage="no js"
      />,
      { service: 'news' },
    );
    fireEvent.click(container.firstChild as HTMLElement);
    fireEvent.click(getByText(container.firstChild as HTMLElement, '2:30'));
    expect(mockOnClick).toHaveBeenCalledTimes(2);
  });

  it('should render a video placeholder with guidance', () => {
    const { container } = render(
      <Placeholder
        onClick={mockOnClick}
        src="http://foo.bar/placeholder.png"
        mediaInfo={{
          title: 'Dog chases cat.',
          guidanceMessage:
            'Guidance: May contain strong language, sexual or violent content that may offend.',
          ...withDuration,
        }}
        noJsMessage="no js"
      />,
      { service: 'news' },
    );
    expect(container).toMatchSnapshot();
  });

  it('should render no-js styles when noJsClassName prop is used', () => {
    const { container } = render(
      <Placeholder
        onClick={mockOnClick}
        src="http://foo.bar/placeholder.png"
        mediaInfo={{
          title: 'Dog chases cat.',
          guidanceMessage:
            'Guidance: May contain strong language, sexual or violent content that may offend.',
          ...withDuration,
        }}
        noJsMessage="no js"
      />,
      { service: 'news' },
    );
    expect(container).toMatchSnapshot();
  });
});
