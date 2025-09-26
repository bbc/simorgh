# AMP Experiment

This directory contains code for a generic wrapper component that contains an `<amp-experiment/>` and an `<amp-analytics/>`. This component should be used when running experiments on AMP pages.


## Usage
This component can be placed anywhere on a page that the experiment runs on and does not render any visual components.

It accepts `experimentConfig` and `analyticsConfig` as props. These are objects that should be formatted as such:

**`experimentConfig`**
```
{
  "experimentName": {
    "variants": {
      "control": 12.5,
      "variant_1": 12.5,
      "variant_2": 25.0
    }
  }
}
```

**`analyticsConfig`**
```
{
  "requests": { // Endpoints to send requests to
    "request-name": request-value, 
    ...
  },
  "triggers": {  // Triggers for when to send events
    "trigger-name": trigger-object,
  }
}
```

## Analytics configuration
This component is designed to have a separate `<amp-analytics/>` component from existing ones on a page for better isolation of code/events specific to a given experiment.

**Note: This component will not add AMP experiment name/variant information to pageview events. This should be done separately by passing `ampExperimentName` to the `atiData` used.**
