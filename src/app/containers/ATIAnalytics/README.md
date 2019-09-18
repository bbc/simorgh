# ATI Analytics

This directory contains code for logging events to ATI Analytics.

## Log click events to ATI

For this, you will need to 

- build an ATI Url, using [buildATIClickParams](./params/index.js), which depends on the [RequestContext](../../contexts/RequestContext/index.jsx) and [ServiceContext](../../contexts/ServiceContext/index.jsx).

```js
const params = buildATIClickParams(props, useContext(RequestContext), useContext(ServiceContext));
```

- use a [beacon](./beacon/index.js), to send the request.

```js
useEffect(() => {
    sendViewBeacon({
      ...params,
      element: document.querySelector('header'),
      component: 'cookie-banner',
    });
}, []);
```

## Beacons

The `sendViewBeacon` used in the above example, is meant for impression events, such as the one sent when an element is displayed.

The `sendEventBeacon` is another type of beacon, meant for events such as clicks, scrolls, etc.

```js
const { useClickTracker } = eventContext;

useClickTracker('header *', e => {
    sendEventBeacon({
        ...params,
        element: e.target,
        component: 'cookie-banner',
        type: 'click',
        label: 'cookie-accept',
    });
});
```

In the above example, we [detect click events](../../contexts/EventContext/README.md) on any element within the `<header />`, and send an event beacon.

