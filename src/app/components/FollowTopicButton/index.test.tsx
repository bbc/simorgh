import mockIdctaConfig from '#app/contexts/AccountContext/mocks';
import {
  render,
  screen,
} from '#app/components/react-testing-library-with-providers';
import FollowTopicButton from '.';

const topicData = {
  topicId: 'cw90edn9kw4t',
  title: 'India',
  service: 'hindi' as const,
  url: 'https://www.bbc.com/hindi/topics/cw90edn9kw4t',
};

describe('FollowTopicButton', () => {
  it('does not render when topicUasPersonalization is disabled', () => {
    render(<FollowTopicButton topicData={topicData} />, {
      service: 'hindi',
      idctaConfig: mockIdctaConfig,
      toggles: {
        uasPersonalization: { enabled: true, value: 'hindi' },
        topicUasPersonalization: { enabled: false },
      },
    });

    expect(
      screen.queryByTestId('follow-topic-btn-guest'),
    ).not.toBeInTheDocument();
  });

  it('renders when topicUasPersonalization is enabled', () => {
    render(<FollowTopicButton topicData={topicData} />, {
      service: 'hindi',
      idctaConfig: mockIdctaConfig,
      toggles: {
        uasPersonalization: { enabled: false },
        topicUasPersonalization: { enabled: true, value: 'hindi' },
      },
    });

    expect(screen.getByTestId('follow-topic-btn-guest')).toBeInTheDocument();
  });
});
