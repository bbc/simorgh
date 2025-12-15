# TopicTags

Topic tags used on World Service article onward journeys.

## Description

The `TopicTags` component renders a `<ul>` when there are multiple `TopicTag` children, and a `<div>` when there is only a single tag.

## Usage

```jsx
import { TopicTags, TopicTag } from '#app/components/TopicTags';

const Wrapper = () => (
  <TopicTags>
    <TopicTag name="Retailing" link="/url/to/topic" />
    <TopicTag name="Business" link="/url/to/topic" />
    <TopicTag name="Viruses" link="/url/to/topic" />
  </TopicTags>
);
```

### When to use this component

The `TopicTag` component should only be used inside of a `TopicTags` component, and a `TopicTags` component should only be used to contain `TopicTag` components.

### Accessibility notes

The `TopicTags` component is fundamentally a `<ul>` when there is more than 1 `TopicTag`, and the `<ul>` uses the ARIA `role="list"` attribute. This reinstates the list semantics on VoiceOver which removes them due to the use of `list-style-type: none;` in the CSS.
