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

The `sendEventBeacon` is another type of beacon, meant for events such as clicks, scrolls, etc. It sends an impression beacon, right before the event beacon.

```js
const { useClickTracker } = useContext(EventContext);

useClickTracker('[data-consent-banner] [data-consent-accept]', e => {
    sendEventBeacon({
        ...params,
        element: e.target,
        component: 'cookie-banner',
        type: 'click',
        label: 'cookie-accept',
    });
});

useClickTracker('[data-consent-banner] [data-consent-reject]', e => {
    sendEventBeacon({
        ...params,
        element: e.target,
        component: 'cookie-banner',
        type: 'click',
        label: 'cookie-reject',
    });
});
```

In the above example, we [detect click events](../../contexts/EventContext/README.md) on the element with the `data-consent-accept` and `data-consent-reject` attribute, and send an event beacon.
