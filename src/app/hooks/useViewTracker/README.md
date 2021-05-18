# useViewTracker hook

The `useViewTracker` hook handles:

- tracking when an element is in view
- sending the event to ATI

A view event is triggered when:

- 50% of the element is in the viewport for more than 1 second
- only once per element per page view

`useViewTracker` returns a ref that can be assigned to the DOM element you want to monitor for a view event. When a view event is triggered then the hook will send the event data to ATI.

`useViewTracker` will only send 1 view event per hook initialisation. In other words, when visiting a page containing a component that is tracking views and a view event is logged, then it is only logged once (per page visit) no matter how many times the user scrolls the component in and out of view.

### Props

| Argument      | Type   | Required | Example                                                                                                          |
| ------------- | ------ | -------- | ---------------------------------------------------------------------------------------------------------------- |
| componentName | string | yes      | The name of the component or an url encoded title of a promo e.g. `most_read` or `This%20is%20a%20promo%20title` |
| format        | string | no       | Can be used to track things like the position of a promo e.g. `[CHD=promo::2]`                                   |
| url           | string | no       | The url of the page e.g. `https://www.bbc.com/mundo/noticias-america-latina-56989232`                            |

### Usage

**It's important to note that `useViewTracker` logs only 1 view event per instance.**

With this in mind, here are some examples of how you could setup view tracking for a component:

1. Log 1 view event when a component is viewed. Refer to the `Promo` component in the example below.
2. Log 1 view event when any of the the component's containing items are viewed. Refer to the `TopStories` component in the example below.
3. Log separate view events per component item viewed. Refer to the `Recommendations` component in the example below.

```jsx
import React, { forwardRef } from 'react';
import { EventTrackingContextProvider } from '#contexts/EventTrackingContext';
import useViewTracker from '#hooks/useViewTracker';

const Promo = () => {
  /*
   * Example 1 - Log 1 view event when a component is viewed.
   * In this example, one view event is triggered when the component is viewed.
   */
  const ref = useViewTracker({
    componentName: 'promo',
  });

  return (
    <div ref={ref}>
      <a href="promo-link">Promoted content</a>
    </div>
  );
};

const TopStories = () => {
  /*
   * Example 2 - Log 1 view event when any of the the component's containing items are viewed.
   * In this example, by initialising the hook OUTSIDE of the `topStories` map
   * callback function and assigning the single `ref` to multiple DOM elements, only
   * one view event is logged even if all 3 story items are viewed.
   */
  const ref = useViewTracker({
    componentName: 'top-stories',
  });
  const topStories = [
    {
      title: 'Top Story 1',
      link: 'link-1',
    },
    {
      title: 'Top Story 2',
      link: 'link-2',
    },
    {
      title: 'Top Story 3',
      link: 'link-3',
    },
  ];
  const TopStory = ({ title, link }) =>
    forwardRef(
      (props, ref)(
        <li ref={ref}>
          <a href={link}>{title}</a>
        </li>,
      ),
    );

  return (
    <ol>
      {topStories.map(({ title, link }) => (
        <TopStory ref={ref} title={title} link={link} />
      ))}
    </ol>
  );
};

const Recommendations = () => {
  /*
   * Example 3 - Log separate view events per component item viewed.
   * By initialising the hook INSIDE of the `recommendations` map
   * callback function and assigning each ref to each DOM element,
   * a view event is logged for each recommendation item viewed,
   * which totals 3 view events in this example.
   */
  const recommendations = [
    {
      title: 'Recommendation 1',
      link: 'link-1',
    },
    {
      title: 'Recommendation 2',
      link: 'link-2',
    },
    {
      title: 'Recommendation 3',
      link: 'link-3',
    },
  ];
  const Recommendation = ({ title, link }) => {
    const ref = useViewTracker({
      componentName: 'recommendations',
    });

    return (
      <li ref={ref}>
        <a href={link}>{title}</a>
      </li>
    );
  };

  return (
    <ul>
      {recommendations.map(({ title, link }) => (
        <Recommendation title={title} link={link} />
      ))}
    </ul>
  );
};

const ArticlePage = ({ pageData }) => {
  /*
   * EventTrackingContextProvider must wrapper all instances of useViewTracker
   */
  return (
    <EventTrackingContextProvider pageData={pageData}>
      <article>
        <h1>Article title</h1>
      </article>
      <Promo />
      <TopStories />
      <Recommendations />
    </EventTrackingContextProvider>
  );
};
```
