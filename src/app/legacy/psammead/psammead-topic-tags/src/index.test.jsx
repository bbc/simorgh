import React from 'react';
import { shouldMatchSnapshot } from '#psammead/psammead-test-helpers/src';
import { render } from '@testing-library/react';
import latin from '../../../../components/ThemeProvider/fontScripts/latin';
import burmeseTypography from '../../../../components/ThemeProvider/fontScripts/burmese';
import arabicTypography from '../../../../components/ThemeProvider/fontScripts/arabic';
import { TopicTags, TopicTag } from './index';

describe('TopicTags', () => {
  const newsProps = {
    service: 'news',
    script: latin,
  };

  shouldMatchSnapshot(
    'should correctly render a single topic for news',
    <TopicTags {...newsProps}>
      <TopicTag name="test1" link="#" />
    </TopicTags>,
  );

  shouldMatchSnapshot(
    'should correctly render multiple topic tags for news',
    <TopicTags {...newsProps}>
      <TopicTag name="test1" link="#" />
      <TopicTag name="test2" link="#" />
      <TopicTag name="test3" link="#" />
      <TopicTag name="test4" link="#" />
    </TopicTags>,
  );

  shouldMatchSnapshot(
    'should correctly render a single topic tag for burmese',
    <TopicTags service="burmese" script={burmeseTypography}>
      <TopicTag name="test1" link="#" />
    </TopicTags>,
  );

  shouldMatchSnapshot(
    'should correctly render a single topic tag for persian',
    <TopicTags service="persian" script={arabicTypography}>
      <TopicTag name="test1" link="#" />
    </TopicTags>,
  );

  shouldMatchSnapshot(
    'should correctly render multiple topic tags for arabic',
    <TopicTags service="arabic" script={arabicTypography}>
      <TopicTag name="test1" link="#" />
      <TopicTag name="test2" link="#" />
      <TopicTag name="test3" link="#" />
      <TopicTag name="test4" link="#" />
    </TopicTags>,
  );

  shouldMatchSnapshot(
    'should ignore non-TopicTag children',
    <TopicTags {...newsProps}>
      <TopicTag name="test1" link="#" />
      <div>
        <p>ignore</p>
      </div>
      <TopicTag name="test2" link="#" />
    </TopicTags>,
  );

  it('should ignore non-TopicTag children', () => {
    const { container } = render(
      <TopicTags {...newsProps}>
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
    const { container } = render(<TopicTags {...newsProps} />);

    expect(container.querySelector('a > span')).toBeNull();
  });
});
