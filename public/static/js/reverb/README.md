# Reverb

We are self-hosting the Reverb script. The script should be available via the paths listed below:

```
https://static.files.bbci.co.uk/ws/simorgh-assets/public/static/js/reverb/reverb-3.10.2.js on LIVE
https://static.test.files.bbci.co.uk/ws/simorgh-assets/public/static/js/reverb/reverb-3.10.2.js on TEST
https://static.test.files.bbci.co.uk/ws/simorgh2-preview-assets/public/static/js/reverb/reverb-3.10.2.js on PREVIEW2
https://static.test.files.bbci.co.uk/ws/simorgh1-preview-assets/public/static/js/reverb/reverb-3.10.2.js on PREVIEW1
http://localhost:7080/static/js/reverb/reverb-3.10.2.js on LOCAL
```

## How to update Reverb script

1. Get the latest version of the Reverb script from the Reverb team.
    - Please contact the Reverb team via the Slack channel, `#help-reverb`, for assistance.
2. Minify the new Reverb script.
    - Consider using [minify by HookyQR](https://marketplace.visualstudio.com/items?itemName=HookyQR.minify) in VS Code (or equivalent tool in your code editor of choice)
    to minify the script in your local environment.
3. Copy and paste the minified script into `./reverb-{version}.js` file, where `{version}` is the updated version number.
4. Update the CHANGELOG.md with details of the new script.
5. Update `SIMORGH_REVERB_SOURCE` in the files below to reference the new version.

```
envConfig/live.env
envConfig/test.env
envConfig/preview1.env
envConfig/preview2.env
envConfig/local.env
```

