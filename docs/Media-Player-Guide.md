# Media Player Overview

This document gives a brief overview of how embedded media (audio and video) works within Simorgh. More details can be found within the `news-av-player` module documentation.

## Approach

Simorgh is designed to be AMP-first and all features are built to work for both AMP and canonical page users. At the time of writing the only viable method of including the BBC's Standard Media Player (SMP) on an AMP page is using the [amp-iframe](https://amp.dev/documentation/components/amp-iframe/) element and a custom _embed endpoint_ to serve the player itself.

To minimise the duplication that would arise from having two very different media player implementations it was decided to use an iframe-based approach for both AMP and canonical pages. The responsibility for configuring and rendering the media player was therefore moved largely outside of Simorgh into `news-av-player`. This simplifies the code and helps to reduce the testing and maintenance burden of supporting media on both platforms.

## Placeholder

In contexts such as article pages where there is a reasonable chance the user may decide not to play embedded media, a lightweight placeholder component can be rendered by Simorgh. In these contexts we defer embedding the actual player assets till we know that the user wants to interact with the media, reducing significantly the amount of data that uninterested users have to download. On other page types where media is central to the user proposition (such as media asset pages), the placeholder component is not used.

The placeholder component will typically feature a placeholder image, a media player indicator and a duration. When the user clicks this placeholder, we make a call to another endpoint that returns a playable media player component, and use that to replace the placeholder.

_Note that it is possible to use this implementation without a placeholder, just don't pass anything to the `placeholder` prop, and the media player will load in a frame on page load._

## Embed Endpoints

To render a media player we have built endpoints outside of Simorgh that take in various options, and return a fully working and playable media player. In theory, a developer can then just simply embed it into their page using a standard HTML `iframe` tag. This is what we do in the `@bbc/psammead-media-player` component.

For example:

```
<iframe
  src="https://some-embed-endpoint.bbc.com/ws/av-embeds/articles/cd4117egk3go/p07ftj65/en-GB"
  title="My Video Title">
</iframe>
```

We need to support different types of media, most of which have varied settings. To ease and simplify the configurations of each differing media type, we have configured separate endpoints per type of media, so that we can send as little as possible in the request:

| Type       | AMP | Example path                                                       |
| ---------- | --- | ------------------------------------------------------------------ |
| Optimo     | No  | `/ws/av-embeds/articles/{{asset_id}}/{{vpid}}/{{lang}}`            |
| Optimo     | Yes | `/ws/av-embeds/articles/{{asset_id}}/{{vpid}}/{{lang}}/amp`        |
| CPS        | No  | `/ws/av-embeds/cps/{{service}}/{{asset_id}}/{{vpid}}/{{lang}}`     |
| CPS        | Yes | `/ws/av-embeds/cps/{{service}}/{{asset_id}}/{{vpid}}/{{lang}}/amp` |
| Live Radio | No  | `/ws/av-embeds/media/{{service_id}}/liveradio/{{lang}}`            |
| Live Radio | Yes | `/ws/av-embeds/media/{{service_id}}/liveradio/{{lang}}/amp`        |

## Media Player Component

In Simorgh, we have a container called `MediaPlayer` that imports the [`@bbc/psammead-media-player`](https://github.com/bbc/psammead/tree/latest/packages/components/psammead-media-player) component.

In the Simorgh container, we construct various properties that we will send to the above component. This includes things like the actual embed source URL, the placeholder image, and data relating to guidance. We are able to construct this data from the media block that is passed to the container.

Please read the [`@bbc/psammead-media-player` README](https://github.com/bbc/psammead/tree/latest/packages/components/psammead-media-player) for more information on how the component works.
