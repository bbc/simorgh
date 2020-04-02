# EventContext

This directory contains code meant for working with event listeners on DOM elements. It was created to address [this issue](https://github.com/bbc/simorgh/issues/3367).

## Listen to Click Events

For this, you will need the `useClickTracker` like:

```js
const { useClickTracker } = useContext(EventContext);

useClickTracker('[data-consent-banner]', (e) => {
  // handle the event
});
```

The `useClickTracker` function accepts two arguements,

- a query selector
- a function to handle the event

The event handler function will then be executed whenever a click is detected on an element that matches the query selector.
