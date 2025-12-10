# TopicTags

Topic tags used on World Service article onward journeys.

## Description

The `TopicTags` component is a styled `<ul>` or `<div>`, depending on the number of `TopicTag` components it contains. If there is only a single `TopicTag` component with the `TopicTags` component, then the `TopicTags` component is a styled `<div>`, otherwise it's a styled `<ul>`.

## Props

| Argument            | Type   | Required | Default                  | Example                                                                                                                                                                                                                                                                                                                    |
| ------------------- | ------ | -------- | ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| script              | object | Yes      | N/A                      | `latin`                                                                                                                                                                                                                                                                                                                    |
| service             | string | Yes      | N/A                      | `'news'`                                                                                                                                                                                                                                                                                                                   |
| dir                 | string | No       | `'ltr'`                  | One of `'ltr'` or `'rtl'`                                                                                                                                                                                                                                                                                                  |
| tagBackgroundColour | string | No       | The GEL variable `WHITE` | Any valid CSS `color`                                                                                                                                                                                                                                                                                                      |

## Usage

```jsx
import { TopicTags, TopicTag } from '#app/components/TopicTags';
import latin from '../ThemeProvider/fontScripts/latin';

const Wrapper = () => (
  <TopicTags script={latin} service="news" dir="ltr">
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
