import { LatestMedia } from '#app/pages/MediaArticlePage/PagePromoSections/LatestMediaSection/types';
import {
  fireEvent,
  render,
  screen,
} from '../react-testing-library-with-providers';
import PortraitVideoEndScreen from '.';

const content: LatestMedia[] = [
  {
    type: 'video',
    duration: 'PT5M53S',
    firstPublished: '2025-04-07T18:02:43.847Z',
    id: 'video-1',
    imageUrl: 'https://ichef.test/{width}/video-1.jpg',
    imageAlt: 'Video one',
    link: '/video-1',
    title: 'Video one',
    description: 'Video one description',
  },
  {
    type: 'audio',
    duration: 'PT4M',
    firstPublished: '2025-04-07T18:02:43.847Z',
    id: 'audio-1',
    imageUrl: 'https://ichef.test/{width}/audio-1.jpg',
    link: '/audio-1',
    title: 'Audio one',
    description: 'Audio one description',
  },
  {
    type: 'video',
    duration: 'PT2M',
    firstPublished: '2025-04-07T18:02:43.847Z',
    id: 'video-2',
    imageUrl: 'https://ichef.test/{width}/video-2.jpg',
    link: '/video-2',
    title: 'Video two',
    description: 'Video two description',
  },
  {
    type: 'video',
    duration: 'PT1M',
    firstPublished: '2025-04-07T18:02:43.847Z',
    id: 'video-3',
    imageUrl: 'https://ichef.test/{width}/video-3.jpg',
    link: '/video-3',
    title: 'Video three',
    description: 'Video three description',
  },
  {
    type: 'video',
    duration: 'PT30S',
    firstPublished: '2025-04-07T18:02:43.847Z',
    id: 'video-4',
    imageUrl: 'https://ichef.test/{width}/video-4.jpg',
    link: '/video-4',
    title: 'Video four',
    description: 'Video four description',
  },
];

describe('PortraitVideoEndScreen', () => {
  it('renders up to three video promos and excludes the current article', () => {
    render(
      <PortraitVideoEndScreen
        content={content}
        currentArticleId="urn:bbc:ares::article:video-1"
        onClose={jest.fn()}
      />,
    );

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      'Latest',
    );
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
    expect(screen.queryByText('Audio one')).not.toBeInTheDocument();
    expect(screen.queryByText('Video one')).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Video two/ })).toHaveAttribute(
      'href',
      '/video-2',
    );
    expect(screen.getByRole('link', { name: /Video four/ })).toHaveAttribute(
      'href',
      '/video-4',
    );
  });

  it('renders nothing when there are no video promos', () => {
    const { container } = render(
      <PortraitVideoEndScreen
        content={content.filter(item => item.type !== 'video')}
        onClose={jest.fn()}
      />,
    );

    expect(container.firstChild).toBeNull();
  });

  it('calls onClose when the close control is activated', () => {
    const onClose = jest.fn();

    render(<PortraitVideoEndScreen content={content} onClose={onClose} />);

    fireEvent.click(
      screen.getByRole('button', { name: 'End of content. Close' }),
    );

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
