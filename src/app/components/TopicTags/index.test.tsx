import { render, screen } from '../react-testing-library-with-providers';
import { TopicTags } from '.';

describe('TopicTags', () => {
  it('should correctly render a single topic tag', () => {
    const tags = [{ topicName: 'test1', topicId: 'test1' }];

    render(<TopicTags tags={tags} />, {
      service: 'news',
    });

    const multipleContainer = screen.queryByTestId('topic-tags-multiple');
    expect(multipleContainer).not.toBeInTheDocument();

    const singleContainer = screen.queryByTestId('topic-tags-single');
    expect(singleContainer).toBeInTheDocument();
  });

  it('should correctly render multiple topic tags', () => {
    const tags = [
      { topicName: 'test1', topicId: 'test1' },
      { topicName: 'test2', topicId: 'test2' },
      { topicName: 'test3', topicId: 'test3' },
      { topicName: 'test4', topicId: 'test4' },
    ];

    render(<TopicTags tags={tags} />, {
      service: 'news',
    });

    const multipleContainer = screen.queryByTestId('topic-tags-multiple');
    expect(multipleContainer).toBeInTheDocument();

    const singleContainer = screen.queryByTestId('topic-tags-single');
    expect(singleContainer).not.toBeInTheDocument();
  });

  it('should not render any topic tags if there are none', () => {
    render(<TopicTags tags={[]} />, { service: 'news' });

    const multipleContainer = screen.queryByTestId('topic-tags-multiple');
    expect(multipleContainer).not.toBeInTheDocument();

    const singleContainer = screen.queryByTestId('topic-tags-single');
    expect(singleContainer).not.toBeInTheDocument();
  });
});
