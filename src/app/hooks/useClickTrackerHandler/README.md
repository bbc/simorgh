# useClickTracker hook

The `useClickTracker` hook handles:

- Tracking when an element has been clicked
- Sending the event to ATI

`useClickTracker` must be used in combination with [`useViewTracker`](https://github.com/bbc/simorgh/blob/latest/src/app/hooks/useViewTracker/index.jsx) so ATI can calculate the view/click ratio of an element.

A click event is sent to ATI when a user performs a valid click (as per [clickTypes.js](./clickTypes.js)) on a tracked element. Specifically the following are valid clicks:

- ### General
  - Middle Click
  - Unmodified left click
  - Left click + shift
  - Tap
- ### Windows
  - Left click + ctrl
  - Left click + shift + ctrl
  - Left click + shift + alt
  - Left click + ctrl + alt
  - Left click + shift + alt + ctrl
- ### macOS
  - Left click + cmd
  - Left click + cmd + option
  - Left click + shift + option
  - Left click + shift + option + cmd

The hook returns an event handler promise which can be given to a component's `onClick` property to track clicks on that element and any of its children. After the element has been clicked once, it will no longer send ATI requests on click.

### Usage

Here are some examples of how you could setup click tracking for a component.

⚠️ Remember to also implement [`useViewTracker`](https://github.com/bbc/simorgh/blob/latest/src/app/hooks/useViewTracker/index.jsx) so ATI can calculate the view/click ratio of a component.

1. Log a single click event for a single element on click.
2. Log a single click event whenever one of the child elements is clicked.
3. Log separate click events for each of a number of elements on click.

```jsx
const Promo = () => {
  /*
   * Example 1 - Log 1 click event when a component is clicked.
   * In this example, one click event is triggered when the a tag is is clicked within the component and it will bring the user to the linked page.
   */
  const clickTrackerHandler = useClickTrackerHandler({
    componentName: 'promo',
    url: 'promo-link',
  });

  return (
    <div>
      <a href="promo-link" onClick={clickTrackerHandler}>Promoted content</a>
    </div>
  )
};

const Promo = () => {
  /*
   * Example 2 - Log 1 click event when any of the buttons are clicked
   * In this example, if any of the buttons are clicked a click event will
   * be logged because the handler is given to the onClick property of the parent
   * element.
   * Note: If 'Button 1' is clicked and then 'Button 2' is clicked afterwards, only
   * one click event will be logged.
   */
  const clickTrackerHandler = useClickTrackerHandler({
    componentName: 'promo',
  });

  return (
    <div onClick={clickTrackerHandler}>
      <button>Button 1</button>
      <button>Button 2</button>
      <button>Button 3</button>
    </div>
  )
};

const TopStories = () => {
  /*
   * Example 3 - Log separate click events per component item clicked.
   * By initialising the hook INSIDE of the `topStories` map
   * callback function and assigning each handler to each DOM element's onClick
   * property, a click event is logged for each top story item clicked
   */
  const eventTrackingData = {
    componentName: 'top-stories',
  };

  const topStories = [
    {
      title: 'Top Story 1',
      url: 'link-1',
    },
    {
      title: 'Top Story 2',
      url: 'link-2',
    },
    {
      title: 'Top Story 3',
      url: 'link-3',
    },
  ];
  const TopStory = ({ title, url }) => {

    const clickTrackerHandler = useClickTrackerHandler({
      ...eventTrackingData,
      url,
    });

    return (
      <li>
        <a href={url} onClick={clickTrackerHandler}>{title}</a>
      </li>,
    ),
  );

  return (
    <ol>
      {topStories.map(({ title, url }) => (
        <TopStory title={title} url={url} />
      ))}
    </ol>
  );
};
```

### Props

| Argument          | Type    | Required | Example                                                                                                                                                                                                              |
| ----------------- | ------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| campaignID        | string  | no       | Provide this to override the `campaignID` provided by the `EventTrackingContext` component. This is useful for specific campaigns where you want to use a custom campaign ID                                         |
| componentName     | string  | yes      | The name of the component or an url encoded title of a promo e.g. `most_read` or `This%20is%20a%20promo%20title`.                                                                                                    |
| format            | string  | no       | Can be used to track things like the position of a promo e.g. `[CHD=promo::2]`                                                                                                                                       |
| url               | string  | no       | If the component being tracked changes the location of the user upon click then it's necessary to include the URL through this prop.                                                                                 |
| preventNavigation | boolean | no       | Use this if you need to perform any additional tasks after sending the click event by setting to `true` and awaiting the event handler callback. Ensure you redirect the user to their destination when you are done |
