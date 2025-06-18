# ATI Analytics

This directory contains code for logging events to ATI (Piano) Analytics.

## Logging Click Events

There is a custom hook within Simorgh that handles logging click events.

- [useClickTrackerHandler](https://github.com/bbc/simorgh/blob/latest/src/app/hooks/useClickTrackerHandler/index.jsx) is a custom hook that returns a click event handler that you can assign to the `onClick` attribute of the DOM element you'd like to click track.

You can find instructions and examples on how to set up and use this custom hook [here](https://github.com/bbc/simorgh/blob/latest/src/app/hooks/useClickTrackerHandler/README.mdx).

## Logging View Events

There is a custom hook within Simorgh that handles logging view events.

- [useViewTracker](https://github.com/bbc/simorgh/blob/latest/src/app/hooks/useViewTracker/index.jsx) is a custom hook that returns a `ref` that you can assign to DOM elements you'd like to view track.

You can find instructions and examples on how to set up and use this custom hook [here](https://github.com/bbc/simorgh/blob/latest/src/app/hooks/useViewTracker/README.mdx).

## Tag Inspector

This ATI system was set up for adverts but repurposed by the BBC for click tracking. Because of this, the names of the fields that are seen in the ATI Tag Inspector are not indicative of the BBC's use of those fields. Below is a table of the ATI label and the corresponding BBC label. In the Simorgh code, we only refer to the BBC label so that the only time discrepancy is seen is in the ATI system. The one exception is with creation/attribute, which has been referred to as `action` in code as this is more representative of the meaning.

| ATi label         | BBC label       | Usage notes                                                                                                     |
| ----------------- | --------------- | --------------------------------------------------------------------------------------------------------------- |
| campaignId        | container       |                                                                                                                 |
| creation          | attribute       | Made up of `label~type`. This has been referred to as both creation and attribute as well as action internally. |
| variant           | personalisation | Also used for tracking MVT and experimentation                                                                  |
| format            | metadata        | in the form "key1=value~key2=another_value"                                                                     |
| generalPlacement  | placement       | The page identifier                                                                                             |
| detailedPlacement | account         | 0 for not signed-in                                                                                             |
| advertiserId      | source          |                                                                                                                 |
| url               | result          |                                                                                                                 |
