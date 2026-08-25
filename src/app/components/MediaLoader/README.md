## Description

The MediaLoader takes data from the BFF and converts it into a BUMP settings object.

BUMP (BBC Universal Media Player) is a javascript module that embeds videos into a webpage. It's the BBC's alternative to the standard `<video>` interface in HTML5. BUMP is better because it takes into account the client's device (are they on mobile or PC?) and the client's connection (are they on 3G or WIFI?) and provides the best fitting embedded media player (EMP) for each user.

## Try it out

Below is a bare-bones example of how BUMP is used. To get a video working we provide BUMP with a valid settings object as outlined below.

- Cookbook provides us with a list of settings available: [Cook book link](https://cookbook.tools.bbc.co.uk/iplayer/customise)
- The BUMP documentation provides us with a full list of settings: [Confluence](https://confluence.dev.bbc.co.uk/display/mp/SMP+Settings+Object)

```
<html>
<head>
    <title>Koala and a Butterfly</title>
    <script type="text/javascript"
        src="https://static.bbci.co.uk/frameworks/requirejs/0.13.0/sharedmodules/require.js"></script>
    <script type="text/javascript">
        bbcRequireMap = {
            "bump-4": "https://emp.bbci.co.uk/emp/bump-4/bump-4"
        }
        require({ paths: bbcRequireMap, waitSeconds: 30 });
    </script>
</head>

<body>
    <div id="mediaPlayer" style="height:270px;width:480px"></div>
    <script type="text/javascript">
        let mediaPlayer;
        require(['bump-4'], function (bump) {
			// This is an example of a BUMP settings object.
            var settings = {
                product: 'iplayer',
                responsive: true,
                counterName: 'smp.demopage.player.page',
                playlistObject: {
                    "title": "Butterfly photobombs koala film shoot at Australia zoo",
                    "items": [
                        {
                            "versionID": "p049sq7k",
                            "kind": "programme",
                            "duration": 37
                        }]
                },
                statsObject: { clipPID: "p049sq7f" },
                autoplay: false
            }
            mediaPlayer = bump.player(document.getElementById('mediaPlayer'), settings);
            mediaPlayer.load();
        });

        function playButton() {
            mediaPlayer.play();
        }

        function stopButton() {
            mediaPlayer.pause();
        }

    </script>

    <button onclick="playButton()">PLAY |></button>
    <button onclick="stopButton()">STOP |></button>

</body>

</html>
```

## Local Development

So that the EMP can load video data, our localhost's domain name should be altered from `localhost:7081` to `localhost.bbc.com:7081` to fully incorporate the bbc domain name (bbc) and top-level domain (.com).

First, run the command (you only need to run this once):

`sudo -- sh -c -e "echo '127.0.0.1       localhost.bbc.com' >> /etc/hosts";`

Then, access local pages using `localhost.bbc.com:7081/`, eg.
`http://localhost.bbc.com:7081/pidgin/articles/cw0x29n2railo`

Currently, the EMP is set to only load Live video assets by default. To load test assets, append the query `?renderer_env=test` to the url. Eg. `http://localhost.bbc.com:7081/pidgin/articles/cw0x29n2railo?renderer_env=test`

## Note on playback in local development

In the Next.js app we have `reactStrictMode: true`. This causes lifecycle hooks to be called twice in development mode. This can result in the media player being loaded twice, causing mulitple playbacks of the same media. This does **not** happen in production mode.

## Component Structure

    ├── MediaLoader
    	├── configs
    		├── aresMedia.ts
    		├── audio.ts
    		├── legacyMedia.ts
    		├── liveMedia.ts
    		├── livePostClipMedia.ts
    		├── liveRadio.ts
    		├── portraitClipMedia.ts
    		├── tv.ts
    		├── constants.ts
    		├── warningLevels.ts
    		├── index.ts
    	├── utils
    	├── Amp
    	├── Message
    	├── Metadata
    	├── Placeholder
    	├── index.tsx
    	├── index.styles.ts
    	├── index.stories.tsx
    	├── types.ts

The MediaLoader component takes in a video block from the BFF and converts it into a BUMP settings object. The BFF does not provide video blocks in a uniformed way since our editors publish videos from different sources. For greater flexibility, we allow the BFF to provide video data in its native form and use respective scripts within the configs folder to process the data into a BUMP settings object. The logic for this is as follows:

1. BFF provides MediaLoader with a native response.
2. The native response is processed by `configs/index.ts` to build a basic set of settings.
3. `configs/index.ts` will then use a respective function in `configs` to further process the native response into a complete set of BUMP settings.

The following sources that our configs folder currently support are:
|Source|Description |
|--|--|
| aresMedia | For video content typically embedded on ArticlePage.|
| audio | For audio content typically embedded on PodcastPage and OnDemandAudioPage pages.|
| legacyMedia | For videos content typically embedded on TC2 pages, such as MediaArticlePage pages.|
| liveMedia | For live video content typically embedded on the header for the Live pages.|
| livePostClipMedia | For video content embedded within live posts on Live pages.|
| liveRadio | For live audio content typically embedded on the LiveRadioPage pages.|
| portraitClipMedia | For portrait (vertical) video content, such as short-form clips.|
| tv | For video content typically embedded on OnDemandTvPage pages.|

**Important: The media loader will not play live videos on the test environment and vice-versa.**

## Player initialisation

BUMP is loaded via RequireJS (`window.requirejs(['bump-4'], ...)`). The RequireJS callback cannot itself be `async`, so the player setup is wrapped in an inner `async` function that is invoked immediately. The player config is memoised (`useMemo`) so it keeps a stable identity across re-renders that aren't caused by a real input change (such as the fake fullscreen state toggling). Without this, `MediaContainer` would treat each render as a new config and tear down and recreate the BUMP player mid-playback.

When a player is rendered inside a caller's own full-viewport presentation (for example `PortraitVideoModal` on mobile portrait), the caller passes `withinFullscreenContainer`. This prevents MediaLoader from forcing SMP fake fullscreen and applying the global fullscreen page state, which would otherwise conflict with the caller's own fullscreen layout.

## Fake fullscreen

On devices that don't support native fullscreen for embedded players (notably iOS Safari), MediaLoader provides a "fake" fullscreen experience: the player wrapper expands to fill the viewport with a black backdrop behind it, while the rest of the page furniture (such as the caption) stays in the normal document flow.

### Overview

The backdrop and the player wrapper both need to sit at the **document root stacking context** rather than being constrained by an ancestor component's stacking context. This is achieved by rendering the backdrop into `document.body` via React's `createPortal`, so its `z-index` is directly comparable with the fixed, elevated player wrapper (backdrop below, player above). Escaping the ancestor stacking context is what makes this work on iOS Safari, where GPU compositing does not bypass CSS stacking as it does on desktop.

### How it works

- **`FakeFullscreenStyles`** injects the static fake-fullscreen CSS once per page. It is guarded by an element id so multiple players on the same page only add the `<style>` tag once, supports a Content Security Policy `nonce`, and is injected client-side only (fake fullscreen is a client interaction). Injection is deferred until after mount so it doesn't interfere with SSR hydration.
- **`FakeFullscreenLayer`** portals the black backdrop to `document.body`. The portal is deferred with `useState`/`useEffect` until after mount so the hydration render matches the server (both render nothing); portalling during hydration would insert the backdrop into `<body>` before hydration completes and cause a mismatch. It receives an `isActive` prop that toggles the display class.
- **The player wrapper** stays a fixed-position element with `z-index: 2147483647`. Because both it and the backdrop live at the document root, its `z-index` sits logically above the portalled backdrop.
- **Cleanup** removes the global fullscreen classes from `<html>` and `<body>` on unmount, but only if this instance was the one that activated fullscreen (tracked via a ref), so it doesn't clobber another player's active fullscreen state.

### Known issue

Fullscreen transitions can intermittently cause video playback to pause. The root cause is not yet understood — it may relate to portal mount timing and React hydration interactions, `z-index` interactions between fixed positioning and document-level rendering, iOS Safari GPU compositing with async portal rendering, or network conditions affecting portal mount timing. This behaviour still needs further investigation and testing.
