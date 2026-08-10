/* eslint-disable @typescript-eslint/no-empty-function */
import {
  render,
  screen,
} from '#app/components/react-testing-library-with-providers';
import PlayButton from './index';

describe('PlayButton', () => {
  it('should render video by default', () => {
    const { container } = render(
      <PlayButton title="Dog chases cat." onClick={() => {}} />,
    );

    expect(
      screen.getByRole('button', { name: 'Play video, "Dog chases cat."' }),
    ).toBeInTheDocument();
    expect(container.querySelector('time')).not.toBeInTheDocument();
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

    const button = screen.getByRole('button', {
      name: 'Play video, "Dog chases cat.", 2 minutes 30 seconds',
    });
    const time = container.querySelector('time');

    expect(button).toHaveClass('foo');
    expect(time).toHaveAttribute('datetime', 'PT2M30S');
    expect(time).toHaveTextContent('2:30');
  });

  it('should render video correctly without duration details', () => {
    const { container } = render(
      <PlayButton title="Dog chases cat." onClick={() => {}} />,
    );

    expect(
      screen.getByRole('button', { name: 'Play video, "Dog chases cat."' }),
    ).toBeInTheDocument();
    expect(container.querySelector('time')).not.toBeInTheDocument();
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

    const button = screen.getByRole('button', {
      name: 'Play audio, "Dog barks at cat.", 2 minutes 30 seconds',
    });
    const time = container.querySelector('time');

    expect(button).toHaveClass('foo');
    expect(time).toHaveAttribute('datetime', 'PT2M30S');
    expect(time).toHaveTextContent('2:30');
  });

  it('should render audio correctly without duration details', () => {
    const { container } = render(
      <PlayButton title="Dog barks at cat." onClick={() => {}} type="audio" />,
    );

    expect(
      screen.getByRole('button', { name: 'Play audio, "Dog barks at cat."' }),
    ).toBeInTheDocument();
    expect(container.querySelector('time')).not.toBeInTheDocument();
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

    const button = screen.getByRole('button', {
      name: 'Guidance: May contain strong language that may offend. Play video, "Dog chases cat.", 2 minutes 30 seconds',
    });
    const time = container.querySelector('time');

    expect(button).toBeInTheDocument();
    expect(time).toHaveAttribute('datetime', 'PT2M30S');
    expect(time).toHaveTextContent('2:30');
  });
});
