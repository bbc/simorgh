import React from 'react';
import { render } from '../../../../components/react-testing-library-with-providers';
import { TopicTags, TopicTag } from './index';

describe('TopicTags', () => {
  it('should correctly render a single topic tag for news', () => {
    const { container } = render(
      <TopicTags>
        <TopicTag name="test1" link="#" />
      </TopicTags>,
    );
    expect(container).toMatchSnapshot();
  });

  it('should correctly render multiple topic tags for news', () => {
    const { container } = render(
      <TopicTags>
        <TopicTag name="test1" link="#" />
        <TopicTag name="test2" link="#" />
        <TopicTag name="test3" link="#" />
        <TopicTag name="test4" link="#" />
      </TopicTags>,
    );
    expect(container).toMatchSnapshot();
  });

  it('should correctly render a single topic tag for burmese', () => {
    const { container } = render(
      <TopicTags>
        <TopicTag name="test1" link="#" />
      </TopicTags>,
      { service: 'burmese' },
    );
    expect(container).toMatchSnapshot();
  });

  it('should correctly render a single topic tag for persian', () => {
    const { container } = render(
      <TopicTags>
        <TopicTag name="test1" link="#" />
      </TopicTags>,
      { service: 'persian' },
    );
    expect(container).toMatchSnapshot();
  });

  it('should correctly render multiple topic tags for arabic', () => {
    const { container } = render(
      <TopicTags>
        <TopicTag name="test1" link="#" />
        <TopicTag name="test2" link="#" />
        <TopicTag name="test3" link="#" />
        <TopicTag name="test4" link="#" />
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
    );

    expect(container.querySelector('div')).toBeNull();
    expect(container.querySelector('p')).toBeNull();
  });

  it('should not render any topic tags if there are none', () => {
    const { container } = render(<TopicTags />);

    expect(container.querySelector('a > span')).toBeNull();
  });
});
