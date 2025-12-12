import { render } from '../react-testing-library-with-providers';
import { TopicTags, TopicTag } from '.';

describe('TopicTags', () => {
  it('should correctly render a single topic tag', () => {
    const { container } = render(
      <TopicTags>
        <TopicTag name="test1" link="#" />
      </TopicTags>,
      { service: 'news' },
    );
    expect(container).toMatchSnapshot();
  });

  it('should correctly render multiple topic tags', () => {
    const { container } = render(
      <TopicTags>
        <TopicTag name="test1" link="#" />
        <TopicTag name="test2" link="#" />
        <TopicTag name="test3" link="#" />
        <TopicTag name="test4" link="#" />
      </TopicTags>,
      { service: 'news' },
    );
    expect(container).toMatchSnapshot();
  });

  it('should correctly render a single topic tag for an rtl service', () => {
    const { container } = render(
      <TopicTags>
        <TopicTag name="test1" link="#" />
      </TopicTags>,
      { service: 'arabic' },
    );
    expect(container).toMatchSnapshot();
  });

  it('should ignore non-TopicTag children', () => {
    const { container } = render(
      <TopicTags>
        <TopicTag name="test1" link="#" />
        <div>
          <p>ignore</p>
        </div>
        <TopicTag name="test2" link="#" />
      </TopicTags>,
      { service: 'news' },
    );

    expect(container.querySelector('div div')).toBeNull();
    expect(container.querySelector('p')).toBeNull();
  });

  it('should not render any topic tags if there are none', () => {
    const { container } = render(<TopicTags />, { service: 'news' });

    expect(container.firstChild).toBeNull();
  });
});
