# Containers

## Overview

This repo follows the container component pattern.

NB containers are just React components

"A container does the data fetching and then renders its corresponding sub-component. That's it." [Medium Blog Post Source](https://medium.com/@learnreact/container-components-c0e67432e005)

Here is a helper video to explain this pattern from Facebook: [Ext. YouTube Link](https://www.youtube.com/watch?v=KYzlpRvWZ6c)

Please refer to [Simorgh's coding standards](https://github.com/bbc/simorgh/blob/latest/docs/Code-Standards.md) documentation for further guidance.

## We strongly recommend using the following webpack plugins

These will reduce the size of your bundle considerably.

```js
/*
* The webpack.ContextReplacementPlugin allows us to load only
* the specific locales we require into our code. By using this
* plugin we can reference `moment/locale/en.js` in the files
* we need it, without importing it in every file or importing
* every locale.
*/
new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en-gb/),
/* moment-timezone-data-plugin allows you to specify how much
* and what specific timezone data you wish to bundle.
* matchZones: (string or array of strings) Only include data
* for time zones with names matching this value.
*/
new MomentTimezoneDataPlugin({
matchZones: 'Europe/London',
}),
```
