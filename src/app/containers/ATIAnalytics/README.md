# ATI Analytics

This directory contains code for logging events to ATI Analytics.

## Logging Click Events
For logging click events you will need four things:
* [useClickTracker](https://github.com/bbc/simorgh/blob/latest/src/app/contexts/EventContext/index.jsx) used to add click event to the to be tracked. This should be done by using `data-attributes` used in the component. This data attribute should also contain value for building the component info object, e.g. `data-navigation='Akuko_0'`
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

To get all the information about the component and the event, `getComponentInfo` will have to be used. This function takes in 3 parameters - event, name of the component, and component data.
Component data should be an object containing information obtained from the data attribute:
`const eventData = event.srcElement.dataset[componentName];` 

The component data object should contain a value for `creationLabel`, `child`, and optionally `adId`. These values will be used as part of the tracking URL.

In the navigation example, these values were obtained by splitting the information provided via data attribute (in this example, data-attribute looks as such: `data-navigation='akuko_0'` - akuko is the label used for the first link in the nav, and 0 is the link index.

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
		const eventData = event.srcElement.dataset.navigation;
		const componentDataSplit = eventData.split('_');
		const componentData = {
			creationLabel: componentDataSplit[0],
	      child: componentDataSplit[1],
	   };
	
		const componentInfo = getComponentInfo(event, 'navigation', componentData);

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
		const eventData = event.srcElement.dataset.navigation;
		const componentDataSplit = eventData.split('_');
		const componentData = {
			creationLabel: componentDataSplit[0],
		  child: componentDataSplit[1],
		};
		
		const componentInfo = getComponentInfo(event, 'navigation', componentData);

		sendEventBeacon({
	     'navigation',
	      type: 'click',
	      componentInfo,
	      …eventTrackingProps,
	    });
	});
}
```

Now clicking on the nav links should register as an event in the ATI Tag Inspector.
