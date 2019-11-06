# Media Player Guide

The aim of this guide is to give a brief overview of how the media player works within Simorgh. A more in-depth overview can be found within the `news-av-player` module, which will further aid a developers understanding of how we are managing the media player in Simorgh, so that they can continue to develop it.

## Implementation
It was evident in the early stages of development that the recommended way to implement our Standard Media Player (SMP) would not be possible, as it added far too much weight to the page.

To defer the loading of the media player and its dependencies, we've moved the responsibility of building the media player outside of Simorgh. Instead, when a media player needs to be rendered on a Simorgh page, the end-user will first see a placeholder component. This component will typically feature a placeholder image, a media player indicator and a duration. When the user clicks this placeholder, we make a call to another endpoint that returns a playable media player component, and use that to replace the placeholder.

_*Note that it is possible to use this implementation without a placeholder, just don't pass anything to the `placeholder` prop, and the media player will load in a frame on page load._

## Embed Endpoint
To render a media player we have built bespoke endpoints outside of Simorgh that take in various options, and return a fully working and playable media player. In theory, a developer can then just simply embed it into their page using a standard HTML `iframe` tag. This is what we do in the `@bbc/psammead-media-player` component. 

```
<iframe 
  src="https://www.bbc.com/ws/av-embeds/articles/cd4117egk3go/p07ftj65/en-GB"
  title="My Video Title">
</iframe>
```

We need to support different types of media, most of which have varied settings. To ease and simplify the configurations of each differing media type, we have configured separate endpoints per type of media, so that we can send as little as possible in the request:

| Type | AMP | Example URL |
|------|-----|-------------|
|Optimo|No| `https://www.bbc.com/ws/av-embeds/articles/{{asset_id}}/{{vpid}}/{{lang}}` |
|Optimo|Yes| `https://www.bbc.com/ws/av-embeds/articles/{{asset_id}}/{{vpid}}/{{lang}}/amp` |
|CPS|No| `https://www.bbc.com/ws/av-embeds/cps/{{service}}/{{asset_id}}/{{vpid}}/{{lang}}` |
|CPS|Yes| `https://www.bbc.com/ws/av-embeds/cps/{{service}}/{{asset_id}}/{{vpid}}/{{lang}}/amp` |
|Live Radio|No| `https://www.bbc.com/ws/av-embeds/media/{{service_id}}/liveradio/{{lang}}` |
|Live Radio|Yes| `https://www.bbc.com/ws/av-embeds/media/{{service_id}}/liveradio/{{lang}}/amp` |

## Media Player Component 
In Simorgh, we have a container called `MediaPlayer` that imports the [`@bbc/psammead-media-player`](https://github.com/bbc/psammead/tree/latest/packages/components/psammead-media-player) component. 

In the Simorgh container, we construct various properties that we will send to the above component. This includes things like the actual embed source URL, the placeholder image, and data relating to guidance. We are able to construct this data from the media block that is passed to the container.

Please read the [`@bbc/psammead-media-player` README](https://github.com/bbc/psammead/tree/latest/packages/components/psammead-media-player) for more information on how the component works.
