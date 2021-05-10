# useClickTracker hook

The `useClickTracker` hook handles:

- Tracking when an element has been clicked
- Sending the event to ATI

A click event is sent to ATI when a user performs a valid click (as per [clickTypes.js](./clickTypes.js)) on a tracked component. Specifically the following are valid clicks:

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


The hook returns a React [reference](https://reactjs.org/docs/refs-and-the-dom.html), which can be added to a React component to track valid clicks on it, like so:

### Usage

```jsx
import useClickTracker from '#hooks/useClickTracker';

const MostRead = ({ pageData }) => {
  const clickTrackRef = useClickTracker({
    pageData,
    componentName: 'most-read',
    campaignName: 'cps_wsoj',
  });
  return (
    <div ref={clickTrackRef}>
      <h2>This is the most read component</h2>
    </div>
  );
};
```

### Props

| Argument      | Type   | Required | Example                                                                                                                              |
| ------------- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| pageData      | object | yes      | The page data used to hydrate the page.                                                                                              |
| componentName | string | yes      | The name of the component or an url encoded title of a promo e.g. `most_read` or `This%20is%20a%20promo%20title`.                    |
| campaignName  | string | yes      | The name of the campaign e.g. `cps_wsoj` typically defined by Business Analysts or Product Owners in the analytics interface |
| format        | string | no       | Can be used to track things like the position of a promo e.g. `[CHD=promo::2]`                                                       |
| href          | string | no       | If the component being tracked changes the location of the user upon click then it's necessary to include the URL through this prop. |
