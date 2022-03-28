# useOptimizelyScrollDepth

This hook is used to track scroll depth of a page and send an event to optimizely when the page view has reached a threshold. The current thresholds are set to 25%, 50%, 75% and 100% of the page. An event is only sent once for each threshold.

The `useOptimizelyScrollDepth` tracker handles:

- Tracking vertical scroll depth when scroll is activated.
- Sends an event to optimizely when scroll reaches threshold.

This hook is currently only being used in conjunction with `OptimizelyPageViewTracking`.

## Optimizely event
To send an event, the event will need to be setup on Optimizely before it can be called. Each event name must be unique and the event corresponding to the event name can be called using the `optimizely.track` function.

The following event names for the scroll depth thresholds are:

| Threshold | Event name |
|:---------:|:----------:|
| 25%       | scroll25   |
| 50%       | scroll50   |
| 75%       | scroll75   |
| 100%      | scroll100  |


## Usage

```jsx
import useOptimizelyScrollDepth from '#hooks/useOptimizelyScrollDepth';
const ExamplePage = () => {
  useOptimizelyScrollDepth();
}
```