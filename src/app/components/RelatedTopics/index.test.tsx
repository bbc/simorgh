import RelatedTopics from '#app/components/RelatedTopics';
import * as clickTracker from '#hooks/useClickTrackerHandler';
import * as viewTracker from '#hooks/useViewTracker';
import { render, screen } from '../react-testing-library-with-providers';

beforeEach(() => {
  jest.resetModules();
});

const topic = {
  topicName: 'foo',
  topicId: 'bar',
};

describe('Related Topics', () => {
  describe('Expected use', () => {
    it('should render correctly with no tags', () => {
      const { container } = render(<RelatedTopics topics={[]} />, {
        service: 'mundo',
      });
      expect(container.firstChild).toBeNull();
    });

    it('should render correctly with a single tag', () => {
      render(
        <RelatedTopics topics={[{ topicName: 'topic', topicId: '123' }]} />,
        { service: 'mundo' },
      );

      const multipleContainer = screen.queryByTestId('topic-tags-multiple');
      expect(multipleContainer).not.toBeInTheDocument();

      const singleContainer = screen.queryByTestId('topic-tags-single');
      expect(singleContainer).toBeInTheDocument();
    });

    it('should render correctly with multiple tags', () => {
      render(
        <RelatedTopics
          topics={[
            { topicName: 'topic1', topicId: '1' },
            { topicName: 'topic2', topicId: '2' },
            { topicName: 'topic3', topicId: '3' },
          ]}
        />,
        { service: 'mundo' },
      );

      const multipleContainer = screen.queryByTestId('topic-tags-multiple');
      expect(multipleContainer).toBeInTheDocument();

      const singleContainer = screen.queryByTestId('topic-tags-single');
      expect(singleContainer).not.toBeInTheDocument();
    });

    it('should construct the correct topics href given a topic id without a variant', () => {
      const { getByText } = render(<RelatedTopics topics={[topic]} />, {
        service: 'pidgin',
      });

      expect(getByText(topic.topicName)).toHaveAttribute(
        'href',
        `https://www.bbc.com/pidgin/topics/${topic.topicId}`,
      );
    });

    it('should construct the correct topics href given a topic id when service=cymrufyw', () => {
      const { getByText } = render(<RelatedTopics topics={[topic]} />, {
        service: 'cymrufyw',
      });

      expect(getByText(topic.topicName)).toHaveAttribute(
        'href',
        `https://www.bbc.co.uk/cymrufyw/pynciau/${topic.topicId}`,
      );
    });

    it('should construct the correct topics href given a topic id', () => {
      const { getByText } = render(<RelatedTopics topics={[topic]} />, {
        service: 'uzbek',
        variant: 'cyr',
      });

      expect(getByText(topic.topicName)).toHaveAttribute(
        'href',
        `https://www.bbc.com/uzbek/topics/${topic.topicId}/cyr`,
      );
    });

    describe('transliteration', () => {
      it('should not render when service is zhongwen and variant is simp', () => {
        const { container } = render(<RelatedTopics topics={[topic]} />, {
          service: 'zhongwen',
          variant: 'simp',
        });

        expect(container.firstChild).toBeNull();
      });

      it('should render when service is zhongwen and variant is trad', () => {
        const { container } = render(<RelatedTopics topics={[topic]} />, {
          service: 'zhongwen',
          variant: 'trad',
        });

        expect(container.firstChild).not.toBeNull();
      });
    });
  });

  describe('A11y', () => {
    it('should not render an unordered list when there is only one topic', () => {
      const { container } = render(
        <RelatedTopics topics={[{ topicName: 'topic1', topicId: '1' }]} />,
        { service: 'mundo' },
      );
      expect(container.querySelector('ul')).toBeNull();
    });

    it('should render an unordered list when there is more than one topic', () => {
      const { container } = render(
        <RelatedTopics
          topics={[
            { topicName: 'topic1', topicId: '1' },
            { topicName: 'topic2', topicId: '2' },
          ]}
        />,
        { service: 'mundo' },
      );
      expect(container.querySelector('ul')).not.toBeNull();
    });
  });

  describe('Event Tracking', () => {
    const eventTrackingData = {
      componentName: 'topics',
    };

    it('should call the click tracker with the correct params', () => {
      const clickTrackerSpy = jest.spyOn(clickTracker, 'default');
      render(
        <RelatedTopics topics={[{ topicName: 'topic', topicId: 'id' }]} />,
        { service: 'mundo' },
      );

      expect(clickTrackerSpy).toHaveBeenCalledWith(eventTrackingData);
    });

    it('should call the view tracker with the correct params', () => {
      const viewTrackerSpy = jest.spyOn(viewTracker, 'default');
      render(
        <RelatedTopics topics={[{ topicName: 'topic', topicId: 'id' }]} />,
        { service: 'mundo' },
      );

      expect(viewTrackerSpy).toHaveBeenCalledWith(eventTrackingData);
    });
  });
});
