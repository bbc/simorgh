import { Services } from '#app/models/types/global';
import { render } from '../react-testing-library-with-providers';
import latin from '../ThemeProvider/fontScripts/latin';
import burmeseTypography from '../ThemeProvider/fontScripts/burmese';
import arabicTypography from '../ThemeProvider/fontScripts/arabic';
import { TopicTags, TopicTag } from '.';

describe('TopicTags', () => {
  const newsProps: { service: Services; script: object } = {
    service: 'news',
    script: latin,
  };

  it('should correctly render a single topic tag for news', () => {
    const { container } = render(
      <TopicTags {...newsProps}>
        <TopicTag name="test1" link="#" />
      </TopicTags>,
    );
    expect(container).toMatchSnapshot();
  });

  it('should correctly render multiple topic tags for news', () => {
    const { container } = render(
      <TopicTags {...newsProps}>
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
      <TopicTags service={'burmese' as Services} script={burmeseTypography}>
        <TopicTag name="test1" link="#" />
      </TopicTags>,
      { service: 'burmese' },
    );
    expect(container).toMatchSnapshot();
  });

  it('should correctly render a single topic tag for persian', () => {
    const { container } = render(
      <TopicTags service={'persian' as Services} script={arabicTypography}>
        <TopicTag name="test1" link="#" />
      </TopicTags>,
      { service: 'persian' },
    );
    expect(container).toMatchSnapshot();
  });

  it('should correctly render multiple topic tags for arabic', () => {
    const { container } = render(
      <TopicTags service={'arabic' as Services} script={arabicTypography}>
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
      <TopicTags {...newsProps}>
        <TopicTag name="test1" link="#" />
        <div>
          <p>ignore</p>
        </div>
        <TopicTag name="test2" link="#" />
      </TopicTags>,
    );

    expect(container.querySelector('div div')).toBeNull();
    expect(container.querySelector('p')).toBeNull();
  });

  it('should not render any topic tags if there are none', () => {
    const { container } = render(<TopicTags {...newsProps} />);

    expect(container.firstChild).toBeNull();
  });
});
