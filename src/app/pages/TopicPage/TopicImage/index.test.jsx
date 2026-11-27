import { render } from '#app/components/react-testing-library-with-providers';
import TopicImage from '.';

describe('TopicImage', () => {
  it.each([
    'https://ichef.bbci.co.uk/ace/standard/480/example.jpg',
    'https://ichef.bbci.co.uk/ace/standard/480/example.jpg.webp',
  ])('eagerly loads a 128px WebP badge for %s', image => {
    const { getByTestId } = render(<TopicImage image={image} />);
    const badge = getByTestId('topic-badge');

    expect(badge).toHaveAttribute(
      'src',
      'https://ichef.bbci.co.uk/ace/standard/128/example.jpg.webp',
    );
    expect(badge).toHaveAttribute('loading', 'eager');
    expect(badge).toHaveAttribute('alt', '');
  });
});
