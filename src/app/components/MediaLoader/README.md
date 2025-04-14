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

So that the EMP can load video data, our localhost's domain name should be altered from `localhost:7080` to `localhost.bbc.com:7080` to fully encorporate the bbc domain name (bbc) and top-level domain (.com).

First, run the command (you only need to run this once):

`sudo -- sh -c -e "echo '127.0.0.1       localhost.bbc.com' >> /etc/hosts";`

Then, access local pages using: `localhost.bbc.com:7080/`,
eg.
Express pages: `http://localhost.bbc.com:7080/afaanoromoo/articles/c4g19kgl85ko`

Next pages: `http://localhost.bbc.com:7081/pidgin/live/c7p765ynk9qt?renderer_env=test`

Currently, the EMP is set to only load Live video assets by default. To load test assets, append the query `?renderer_env=test` to the url. Eg. `http://localhost.bbc.com:7080/afaanoromoo/articles/c4g19kgl85ko?renderer_env=test`

## Note on playback in local development

In the Next.js app we have `reactStrictMode: true`. This causes lifecycle hooks to be called twice in development mode. This can result in the media player being loaded twice, causing mulitple playbacks of the same media. This does **not** happen in production mode.

## Component Structure

    ├── MediaLoader
    	├── configs
    		├── aresMedia.ts
    		├── audio.ts
    		├── clipMedia.ts
    		├── legacyMedia.ts
    		├── liveMedia.ts
    		├── liveRadio.ts
    		├── tv.ts
    		├── index.ts
    	├── Placeholder
    	├── index.tsx

The MediaLoader component takes in a video block from the BFF and converts it into a BUMP settings object. The BFF does not provide video blocks in a uniformed way since our editors publish videos from different sources. For greater flexibility, we allow the BFF to provide video data in its native form and use respective scripts within the configs folder to process the data into a BUMP settings object. The logic for this is as follows:

1. BFF provides MediaLoader with a native response.
2. The native response is processed by `configs/index.ts` to build a basic set of settings.
3. `configs/index.ts` will then use a respective function in `configs` to further process the native response into a complete set of BUMP settings.

The following sources that our configs folder currently support are:
|Source|Description |
|--|--|
| aresMedia | For video content typically embedded on ArticlePage.|
| audio | For audio content typically embedded on PodcastPage and OnDemandAudioPage pages.|
| clipMedia | For video content typically embedded on Tipo curated pages, such as Live pages.|
| legacyMedia | For videos content typically embedded on TC2 pages, such as MediaArticlePage pages.|
| liveMedia | For live video content typically embedded on the header for the Live pages.|
| liveRadio | For live audio content typically embedded on the LiveRadioPage pages.|
| tv | For video content typically embedded on OnDemandTvPage pages.|

**Important: The media loader will not play live videos on the test environment and vice-versa.**
