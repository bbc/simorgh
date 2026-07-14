import {
  render,
  screen,
  fireEvent,
} from '#app/components/react-testing-library-with-providers';
import PlainTextFormatter from '.';

const CHAPTER_TEXT = '00:00 Introduction\n00:43 Chapter one\n06:25 Chapter two';

describe('PlainTextFormatter', () => {
  it('renders nothing when given an empty string', () => {
    const { container } = render(<PlainTextFormatter text="" />);
    expect(container.firstChild).toBeNull();
  });

  it('renders a single paragraph for plain text without blank lines', () => {
    render(<PlainTextFormatter text="This is a simple description." />);
    expect(
      screen.getByText('This is a simple description.'),
    ).toBeInTheDocument();
    expect(screen.getByText('This is a simple description.').tagName).toBe('P');
  });

  it('renders multiple paragraphs for blank-line-separated text', () => {
    const text = 'First paragraph.\n\nSecond paragraph.';
    // p elements don't have an implicit role; check by tag name
    const { container } = render(<PlainTextFormatter text={text} />);
    const ps = container.querySelectorAll('p');
    expect(ps).toHaveLength(2);
    expect(ps[0]).toHaveTextContent('First paragraph.');
    expect(ps[1]).toHaveTextContent('Second paragraph.');
  });

  it('renders a chapter list when all lines start with timecodes', () => {
    const { container } = render(<PlainTextFormatter text={CHAPTER_TEXT} />);
    const list = container.querySelector('ol');
    expect(list).toBeInTheDocument();
    const items = container.querySelectorAll('li');
    expect(items).toHaveLength(3);
  });

  it('renders timestamps inside <time> elements in a chapter list', () => {
    const text = '00:00 Introduction\n00:43 Chapter one';
    const { container } = render(<PlainTextFormatter text={text} />);
    const timeElements = container.querySelectorAll('time');
    expect(timeElements).toHaveLength(2);
    expect(timeElements[0]).toHaveTextContent('00:00');
    expect(timeElements[1]).toHaveTextContent('00:43');
  });

  it('renders timestamps as plain <time> elements when no playerId is provided', () => {
    const { container } = render(<PlainTextFormatter text={CHAPTER_TEXT} />);
    expect(container.querySelector('button')).toBeNull();
    expect(container.querySelectorAll('time')).toHaveLength(3);
  });

  it('renders timestamps as buttons when a playerId is provided', () => {
    const { container } = render(
      <PlainTextFormatter text={CHAPTER_TEXT} playerId="test-player" />,
    );
    expect(container.querySelectorAll('button')).toHaveLength(3);
  });

  it('seeks the player and calls play() when a timestamp button is clicked', () => {
    const mockPlay = jest.fn();
    const mockPlayer = { currentTime: 0, play: mockPlay };
    window.mediaPlayers = { 'test-player': mockPlayer as never };

    render(<PlainTextFormatter text={CHAPTER_TEXT} playerId="test-player" />);

    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[1]); // "00:43 Chapter one" → 43 seconds

    expect(mockPlayer.currentTime).toBe(43);
    expect(mockPlay).toHaveBeenCalledTimes(1);

    delete window.mediaPlayers;
  });

  it('converts H:MM:SS timecodes correctly when seeking', () => {
    const mockPlay = jest.fn();
    const mockPlayer = { currentTime: 0, play: mockPlay };
    window.mediaPlayers = { 'test-player': mockPlayer as never };

    const { container } = render(
      <PlainTextFormatter
        text="1:23:45 One chapter only"
        playerId="test-player"
      />,
    );

    // 1:23:45 → 1*3600 + 23*60 + 45 = 5025s
    fireEvent.click(container.querySelector('button')!);
    expect(mockPlayer.currentTime).toBe(5025);

    delete window.mediaPlayers;
  });

  it('does not throw when player is not yet ready on timestamp click', () => {
    window.mediaPlayers = {};
    render(
      <PlainTextFormatter text={CHAPTER_TEXT} playerId="missing-player" />,
    );
    expect(() =>
      fireEvent.click(screen.getAllByRole('button')[0]),
    ).not.toThrow();
    delete window.mediaPlayers;
  });

  it('renders a paragraph (not chapter list) when not all lines have timecodes', () => {
    const text = '00:00 Intro\nThis line has no timecode.';
    const { container } = render(<PlainTextFormatter text={text} />);
    expect(container.querySelector('ol')).toBeNull();
    expect(container.querySelector('p')).toBeInTheDocument();
  });

  it('supports H:MM:SS timecode format in chapter lists', () => {
    const text = '1:00:00 First hour\n1:23:45 Later';
    const { container } = render(<PlainTextFormatter text={text} />);
    expect(container.querySelector('ol')).toBeInTheDocument();
  });

  it('auto-links raw URLs in paragraph text', () => {
    const text = 'Find us here https://www.bbc.co.uk/russian';
    render(<PlainTextFormatter text={text} />);
    const link = screen.getByRole('link', {
      name: 'https://www.bbc.co.uk/russian',
    });
    expect(link).toHaveAttribute('href', 'https://www.bbc.co.uk/russian');
  });

  it('adds rel="noopener noreferrer" and target="_blank" to auto-linked URLs', () => {
    const text = 'Watch on YouTube https://bit.ly/abc123';
    render(<PlainTextFormatter text={text} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('auto-links URLs in chapter label text', () => {
    const text = '00:00 Visit https://www.bbc.co.uk';
    render(<PlainTextFormatter text={text} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', 'https://www.bbc.co.uk');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders correctly with no timecodes at all (fallback to paragraphs)', () => {
    const text = 'A programme description.\n\nPodcast team: producer, editor.';
    const { container } = render(<PlainTextFormatter text={text} />);
    const ps = container.querySelectorAll('p');
    expect(ps).toHaveLength(2);
    expect(container.querySelector('ol')).toBeNull();
  });

  it('does not use dangerouslySetInnerHTML', () => {
    const text = '<script>alert("xss")</script>';
    render(<PlainTextFormatter text={text} />);
    expect(
      screen.getByText('<script>alert("xss")</script>'),
    ).toBeInTheDocument();
    expect(document.querySelector('script[src]')).toBeNull();
  });

  it('applies the data-testid attribute', () => {
    render(<PlainTextFormatter text="Hello" data-testid="synopsis" />);
    expect(screen.getByTestId('synopsis')).toBeInTheDocument();
  });
});
