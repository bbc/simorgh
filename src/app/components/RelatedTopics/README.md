# RelatedTopics

Renders the Related Topics section for article onward journeys.

## Usage

```jsx
import RelatedTopics from '#app/components/RelatedTopics';

<RelatedTopics
  topics={[{ topicName: 'topic', topicId: '123' }]}
  backgroundColour="#F6F6F6"
  tagBackgroundColour="#FFFFFF"
/>;
```

Relies on `ServiceContext` and `RequestContext` being available, and uses `TopicTags` for the tag list.***
