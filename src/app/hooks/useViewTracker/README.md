# useViewTracker hook

The `useViewTracker` hook handles:

- tracking when an element is in view
- sending the event to ATI

A view/impression event is triggered when:

- 50% of the element is in the viewport for more than 1 second
- only once per element per page view

The hook returns a ref that can be assigned to the DOM element you want to monitor for a view/impression event that will be sent to ATI.

### Usage

```jsx
import useViewTracker from '#hooks/useViewTracker';

const MostRead = ({ pageData }) => {
  const ref = useViewTracker({
    pageData,
    componentName: 'most-read',
    campaignName: 'cps_wsoj',
  });

  return (
    <div ref={ref}>
      <h2>This is the most read component</h2>
    </div>
  );
};
```

### Props

| Argument      | Type   | Required | Example                                                                                                                       |
| ------------- | ------ | -------- | ----------------------------------------------------------------------------------------------------------------------------- |
| pageData      | object | yes      | The page data used to hydrate the page                                                                                        |
| componentName | string | yes      | The name of the component or an url encoded title of a promo e.g. `most_read` or `This%20is%20a%20promo%20title`              |
| campaignName  | string | yes      | The name of the campaign e.g. `cps_wsoj` typically defined by Business Analyists or Product Owners in the analytics interface |
| format        | string | no       | Can be used to track things like the position of a promo e.g. `[CHD=promo::2]`                                                |
| url           | string | no       | The url of the page e.g. `https://www.bbc.com/mundo/noticias-america-latina-56989232`                                         |
