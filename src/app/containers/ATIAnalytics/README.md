# ATI Analytics

This directory contains code for logging events to ATI Analytics.

## Logging Click Events
For logging click events you will need four things:
* [useClickTracker](https://github.com/bbc/simorgh/blob/latest/src/app/contexts/EventContext/index.jsx) used to add click event to the component to be tracked. This should be done by using `data-attributes` used in the component. This event handler also needs to get the component data ready for the `getComponentInfo` function, which can be done using other data attributes.
* to compose the tracking URL via [buildATIClickParams](https://github.com/bbc/simorgh/blob/latest/src/app/containers/ATIAnalytics/params/index.js#L41) which uses [RequestContext](https://github.com/bbc/simorgh/blob/latest/src/app/contexts/RequestContext/index.jsx) and [ServiceContext](https://github.com/bbc/simorgh/blob/latest/src/app/contexts/ServiceContext/index.jsx).
* to get all the component information by using [getComponentInfo](https://github.com/bbc/simorgh/blob/latest/src/app/lib/analyticsUtils/index.js)
* [sendEventBeacon](https://github.com/bbc/simorgh/blob/latest/src/app/containers/ATIAnalytics/beacon/index.js) for sending the two events - 'click' and 'view'.

## How to set up tracking for a component
In the container for the component you're trying to track,  import `EventContext`, and use `useClickTracker` as such:

```jsx
import React, { useContext } from 'react';
import { EventContext } from '#contexts/EventContext';

const componentContainer = () => {
	const { useClickTracker } = useContext(EventContext);

	useClickTracker('[data-attr]', event => {
		// `sendEventBeacon` will go here
	});
}
```

Provide `useClickTracker` with the data-attribute attached to the component to be tracked, e.g. for Navigation component that would be `data-navigation`. This data attribute should be set in the component's container and passed down to the Psammead component.

If not done already, Request and Service Contexts will need to be imported to create the tracking URL. To do so, import `buildATIClickParams` and use it within the container to get props required for sending the event beacon.

```jsx
import React, { useContext } from 'react';
import { buildATIClickParams } from '../ATIAnalytics/params';
import { EventContext } from '#contexts/EventContext';
import { RequestContext } from '#contexts/RequestContext';
import { ServiceContext } from '#contexts/ServiceContext';

const componentContainer = () => {
	const { useClickTracker } = useContext(EventContext);
	const eventTrackingProps = buildATIClickParams(
		{},
		useContext(RequestContext),
		useContext(ServiceContext)
	);


	useClickTracker('[data-attr]', event => {
		// `sendEventBeacon` will go here
	});
}
```

To get all the information about the component and the event, `getComponentInfo` will have to be used. This function takes in 3 parameters - the result, name of the component, and component data.
Component data should be an object containing information obtained from data attributes.
The result is a string of the result of having clicked, eg the url of the link or the name of the video being played.

The component data object should contain a value for `creationLabel`, `child`, and optionally `source`. These values will be used as part of the tracking URL.
- source: The source of the event at a high level. Examples include an urn, or 'responsive_web'
- child: The specific child of the data that is doing the action - eg button::1
- creationLabel: The name of the action - eg navigation-home

In the navigation example, these values were obtained by using multiple data attributes.

```jsx
import React, { useContext } from 'react';
import { buildATIClickParams } from '../ATIAnalytics/params';
import { EventContext } from '#contexts/EventContext';
import { RequestContext } from '#contexts/RequestContext';
import { ServiceContext } from '#contexts/ServiceContext';

const componentContainer = () => {
	const { useClickTracker } = useContext(EventContext);
	const eventTrackingProps = buildATIClickParams(
		{},
		useContext(RequestContext),
		useContext(ServiceContext)
	);

	  useClickTracker('[data-navigation]', event => {
		const componentName = 'navigation';
		const componentData = {
			containerLabel: event.srcElement.dataset.containerlabel,
			child: event.srcElement.dataset.child,
		}

		const componentInfo = getComponentInfo({
			result: event.target.href,
			componentName,
			componentData,
		});

		// `sendEventBeacon` will go here
	});
}
```

All this information can then be used to put together the event beacon.

```jsx
import React, { useContext } from 'react';
import { buildATIClickParams } from '../ATIAnalytics/params';
import { EventContext } from '#contexts/EventContext';
import { RequestContext } from '#contexts/RequestContext';
import { ServiceContext } from '#contexts/ServiceContext';
import { sendEventBeacon } from '../ATIAnalytics/beacon';

const componentContainer = () => {
	const { useClickTracker } = useContext(EventContext);
	const eventTrackingProps = buildATIClickParams(
		{},
		useContext(RequestContext),
		useContext(ServiceContext)
	);

	useClickTracker('[data-navigation]', event => {
		const componentName = 'navigation';
		const componentData = {
			containerLabel: event.srcElement.dataset.containerlabel,
			child: event.srcElement.dataset.child,
		}

		const componentInfo = getComponentInfo({
			result: event.target.href,
			componentName,
			componentData,
		});

		sendEventBeacon({
			componentName,
			type: 'click',
			componentInfo,
			...eventTrackingProps,
		});
	});
}
```

Now clicking on the nav links should register as a click event in the ATI Tag Inspector.

## Tag Inspector

This ATI system was set up for adverts but repurposed by the BBC for click tracking. Because of this, the names of the fields that are seen in the ATI Tag Inspector are not indicative of the BBC's use of those fields. Below is a table of the ATI label and the corresponding BBC label. In the Simorgh code, we only refer to the BBC label so that the only time discrepancy is seen is in the ATI system.

| ATi label | BBC label | Usage notes |
| --------- | --------- | ----------- |
| camapaignId | container | |
| creation | attribute | Made up of `label~type` |
| variant | personalisation | Also used for tracking MVT and experimentation |
| format | metadata | in the form "key1=value~key2=another_value" |
| generalPlacement | placement | The page identifier |
| detailedPlacement | account | 0 for not signed-in |
| advertiserId | source | |
| url | result | |
